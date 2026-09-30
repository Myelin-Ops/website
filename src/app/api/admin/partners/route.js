import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { isAdminSession } from "@/lib/adminAuth";
import { getWriteClient } from "@/lib/sanity";
import { seedCollection, assetRef } from "@/lib/seedCollection";

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

// Copies the built-in partner logos into Sanity in one step. The pictures were already
// uploaded through /api/admin/assets; `items` refer to them by asset id.
export async function PUT(request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { items, pagePath } = await request.json();
  if (!Array.isArray(items) || items.length === 0 || items.some((item) => typeof item?.assetId !== "string")) {
    return NextResponse.json({ error: "Missing items" }, { status: 400 });
  }

  try {
    const { ids } = await seedCollection(
      getWriteClient(),
      "partner",
      items,
      (item, index) => ({
        _type: "partner",
        name: String(item.name || ""),
        logo: assetRef(item.assetId),
        ...(item.scale ? { scale: String(item.scale) } : {}),
        order: index + 1,
      }),
      pagePath,
    );
    return NextResponse.json({ success: true, ids });
  } catch (err) {
    console.error("Admin partner seed error:", err);
    return NextResponse.json({ error: "Could not copy the built-in list." }, { status: 500 });
  }
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
