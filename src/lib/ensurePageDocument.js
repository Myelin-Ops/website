import { DEFAULT_SECTIONS_BY_DOCUMENT } from "@/lib/defaultSections";

// Server-only. Makes sure a page's Sanity document exists and holds its section
// list, copying the built-in layout in the first time. Pages that haven't been
// edited yet only exist in code, so without this an inline edit would have
// nothing to write into. Never touches a page that already has sections.
export async function ensurePageDocument(client, documentId) {
  const defaults = DEFAULT_SECTIONS_BY_DOCUMENT[documentId];
  if (!defaults) return;

  await client.createIfNotExists({ _id: documentId, _type: documentId });
  const sections = await client.fetch(`*[_id == $id][0].sections`, { id: documentId });
  if (!Array.isArray(sections) || sections.length === 0) {
    await client.patch(documentId).set({ sections: defaults }).commit();
  }
}
