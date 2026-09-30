import { randomUUID } from "crypto";
import { revalidatePath, revalidateTag } from "next/cache";

// Server-only. Copies a page's built-in list (institutions, partners, gallery
// pictures) into Sanity in ONE transaction, so the list is either complete or
// not there at all. If the collection already has documents (for example a
// double click, or another tab got there first) nothing is created and the
// existing ids are returned instead - never a duplicate or partial copy.
//
// `buildDoc(item, index)` turns one item into a Sanity document.
// Returns the document ids in list order. Each document gets an id generated
// here (not by Sanity), because the order a transaction reports its results in
// is not guaranteed - the editor UI maps list positions to these ids.
export async function seedCollection(client, type, items, buildDoc, pagePath) {
  const existing = await client.fetch(`*[_type == $type] | order(order asc)._id`, { type });
  if (existing.length > 0) return { ids: existing, created: false };

  const ids = items.map(() => randomUUID());
  const transaction = client.transaction();
  items.forEach((item, index) => transaction.create({ _id: ids[index], ...buildDoc(item, index) }));
  await transaction.commit();

  revalidateTag("sanity", { expire: 0 });
  revalidatePath("/", "layout");
  if (pagePath) revalidatePath(pagePath);
  return { ids, created: true };
}

export const assetRef = (assetId) => ({
  _type: "image",
  asset: { _type: "reference", _ref: assetId },
});
