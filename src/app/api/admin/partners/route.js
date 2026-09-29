import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { isAdminSession } from "@/lib/adminAuth";
import { getWriteClient } from "@/lib/sanity";

// Vercel rejects request bodies over ~4.5MB, so keep uploads under that.
const MAX_BYTES = 4 * 1024 * 1024;

function refresh(pagePath) {
  revalidateTag("sanity", { expire: 0 });
  revalidatePath("/", "layout");
  if (pagePath) revalidatePath(pagePath);
}

async function requireAdmin() {
  if (await isAdminSession()) return null;
  return NextResponse.json({ error: "Not logged in" }, { status: 401 });
}

// Adds a partner logo at the end of the list.
export async function POST(request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const form = await request.formData();
    const file = form.get("file");
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
    const lastOrder = await client.fetch(`*[_type == "partner"] | order(order desc)[0].order`);
    const scale = form.get("scale");

    const created = await client.create({
      _type: "partner",
      name: String(form.get("name") || "").trim() || file.name.replace(/\.[^.]+$/, ""),
      logo: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
      ...(typeof scale === "string" && scale ? { scale } : {}),
      order: (typeof lastOrder === "number" ? lastOrder : 0) + 1,
    });
    refresh(pagePath);
    return NextResponse.json({ success: true, id: created._id });
  } catch (err) {
    console.error("Admin partner upload error:", err);
    return NextResponse.json({ error: "Failed to upload the logo." }, { status: 500 });
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
    console.error("Admin partner delete error:", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
