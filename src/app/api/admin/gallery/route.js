import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { isAdminSession } from "@/lib/adminAuth";
import { getWriteClient } from "@/lib/sanity";

// Vercel rejects request bodies over ~4.5MB, so keep uploads under that.
const MAX_BYTES = 4 * 1024 * 1024;
const SPANS = ["col-span-1 row-span-1", "col-span-1 md:col-span-2 row-span-1"];

function refresh(pagePath) {
  revalidateTag("sanity", { expire: 0 });
  revalidatePath("/", "layout");
  if (pagePath) revalidatePath(pagePath);
}

async function requireAdmin() {
  if (await isAdminSession()) return null;
  return NextResponse.json({ error: "Not logged in" }, { status: 401 });
}

// Uploads one picture. With `replaceId` it swaps the picture on that gallery
// item; otherwise it adds a new item at the end of the grid.
export async function POST(request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const form = await request.formData();
    const file = form.get("file");
    const replaceId = form.get("replaceId");
    const pagePath = form.get("pagePath");

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

    if (typeof replaceId === "string" && replaceId) {
      await client.patch(replaceId).set({ image }).commit();
      refresh(pagePath);
      return NextResponse.json({ success: true, id: replaceId });
    }

    const lastOrder = await client.fetch(`*[_type == "galleryImage"] | order(order desc)[0].order`);
    const span = form.get("span");
    const created = await client.create({
      _type: "galleryImage",
      image,
      alt: String(form.get("alt") || "").trim() || file.name.replace(/\.[^.]+$/, ""),
      span: SPANS.includes(span) ? span : SPANS[0],
      order: (typeof lastOrder === "number" ? lastOrder : 0) + 1,
    });
    refresh(pagePath);
    return NextResponse.json({ success: true, id: created._id });
  } catch (err) {
    console.error("Admin gallery upload error:", err);
    return NextResponse.json({ error: "Failed to upload the image." }, { status: 500 });
  }
}

// Switches a picture between one column and two columns wide.
export async function PATCH(request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id, span, pagePath } = await request.json();
  if (typeof id !== "string" || !id || !SPANS.includes(span)) {
    return NextResponse.json({ error: "Missing id or invalid span" }, { status: 400 });
  }

  try {
    await getWriteClient().patch(id).set({ span }).commit();
    refresh(pagePath);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin gallery span error:", err);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}

export async function DELETE(request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id, pagePath } = await request.json();
  if (typeof id !== "string" || !id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const publishedId = id.replace(/^drafts\./, "");
    await getWriteClient()
      .transaction()
      .delete(publishedId)
      .delete(`drafts.${publishedId}`)
      .commit();
    refresh(pagePath);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin gallery delete error:", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
