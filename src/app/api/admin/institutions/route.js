import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { isAdminSession } from "@/lib/adminAuth";
import { getWriteClient } from "@/lib/sanity";
import { seedCollection, assetRef } from "@/lib/seedCollection";
import { translateLong } from "@/lib/translateLong";

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

// Copies the built-in institutions into Sanity in one step. The pictures were already
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
      "institution",
      items,
      (item, index) => ({
        _type: "institution",
        name: { en: String(item.nameEn || ""), sq: String(item.nameSq || item.nameEn || "") },
        logo: assetRef(item.assetId),
        ...(item.scale ? { scale: String(item.scale) } : {}),
        order: index + 1,
      }),
      pagePath,
    );
    return NextResponse.json({ success: true, ids });
  } catch (err) {
    console.error("Admin institution seed error:", err);
    return NextResponse.json({ error: "Could not copy the built-in list." }, { status: 500 });
  }
}

// Adds an institution (logo + name) at the end of the list.
//   - Normal add: `name` written in `lang`. Written in English, the Albanian
//     name is filled in by translation; written in Albanian it's Albanian only.
//   - Copying the built-in list into Sanity: `nameEn` and `nameSq` given directly.
export async function POST(request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const form = await request.formData();
    const file = form.get("file");
    const pagePath = form.get("pagePath");

    if (!file || typeof file === "string" || !file.type?.startsWith("image/")) {
      return NextResponse.json({ error: "Please choose a logo image." }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "That image is too large (max 4MB)." }, { status: 413 });
    }

    const text = (key) => String(form.get(key) || "").trim();
    const name = {};
    if (text("nameEn") || text("nameSq")) {
      if (text("nameEn")) name.en = text("nameEn");
      if (text("nameSq")) name.sq = text("nameSq");
    } else {
      const typed = text("name");
      if (!typed) {
        return NextResponse.json({ error: "Please enter the institution's name." }, { status: 400 });
      }
      if (form.get("lang") === "sq") {
        name.sq = typed;
      } else {
        name.en = typed;
        // Institution names are often the same in both languages; keep the original if translation fails.
        name.sq = (await translateLong(typed, "en", "sq")) || typed;
      }
    }

    const client = getWriteClient();
    const asset = await client.assets.upload("image", Buffer.from(await file.arrayBuffer()), {
      filename: file.name,
      contentType: file.type,
    });
    const lastOrder = await client.fetch(`*[_type == "institution"] | order(order desc)[0].order`);
    const scale = text("scale");

    const created = await client.create({
      _type: "institution",
      name,
      logo: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
      ...(scale ? { scale } : {}),
      order: (typeof lastOrder === "number" ? lastOrder : 0) + 1,
    });
    refresh(pagePath);
    return NextResponse.json({ success: true, id: created._id });
  } catch (err) {
    console.error("Admin institution upload error:", err);
    return NextResponse.json({ error: "Failed to save the institution." }, { status: 500 });
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
    console.error("Admin institution delete error:", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
