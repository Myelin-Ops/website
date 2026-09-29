import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { isAdminSession } from "@/lib/adminAuth";
import { getWriteClient } from "@/lib/sanity";

// Vercel rejects request bodies over ~4.5MB, so keep uploads under that.
const MAX_BYTES = 4 * 1024 * 1024;

// Only these picture fields on a page-builder section can be replaced:
//   sections[_key=="x"].image              (the block's own picture)
//   sections[_key=="x"].insights[2].image  (a per-insight picture)
const IMAGE_PATH = /^(sections\[_key=="[A-Za-z0-9_-]+"\])(?:\.insights\[(\d)\])?\.image$/;

// Replaces one picture on a page-builder section with an uploaded image.
export async function POST(request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    const documentId = form.get("documentId");
    const path = form.get("path");
    const pagePath = form.get("pagePath");

    const match = typeof path === "string" ? path.match(IMAGE_PATH) : null;
    if (typeof documentId !== "string" || !documentId || !match) {
      return NextResponse.json({ error: "Invalid picture location." }, { status: 400 });
    }
    if (!file || typeof file === "string" || !file.type?.startsWith("image/")) {
      return NextResponse.json({ error: "Please choose an image file." }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "That image is too large (max 4MB)." }, { status: 413 });
    }

    const client = getWriteClient();
    const asset = await client.assets.upload("image", Buffer.from(await file.arrayBuffer()), {
      filename: file.name,
      contentType: file.type,
    });
    const image = { _type: "image", asset: { _type: "reference", _ref: asset._id } };

    const [, sectionPath, insightIndex] = match;
    const patch = client.patch(documentId);

    if (insightIndex !== undefined) {
      // The section may not have its insights stored yet (they fall back to
      // built-in text), so make sure enough empty ones exist to attach to.
      const insights =
        (await client.fetch(`*[_id == $id][0].${sectionPath}[0].insights`, { id: documentId })) || [];
      const needed = Number(insightIndex) + 1;
      if (insights.length < needed) {
        const padded = [...insights];
        while (padded.length < needed) {
          padded.push({ _type: "insight", _key: Math.random().toString(36).slice(2, 12) });
        }
        await client.patch(documentId).set({ [`${sectionPath}.insights`]: padded }).commit();
      }
    }

    await patch.set({ [path]: image }).commit();
    revalidateTag("sanity", { expire: 0 });
    revalidatePath("/", "layout");
    if (typeof pagePath === "string" && pagePath) revalidatePath(pagePath);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin section image error:", err);
    return NextResponse.json({ error: "Failed to upload the image." }, { status: 500 });
  }
}
