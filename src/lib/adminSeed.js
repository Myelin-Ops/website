// Browser-side helpers for copying a built-in list (institutions, partners,
// gallery pictures) into Sanity the first time an editor changes it.
//
// Every picture is uploaded first (in parallel, so it's quick), and only then is
// the whole list created in ONE server step. If the editor refreshes or closes
// the tab partway, nothing half-finished is left in Sanity.

// Fetches a built-in picture (a StaticImageData `src`, or an optimised URL) as a File.
export async function fetchAsFile(url, filename) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Could not prepare the built-in pictures.");
  const blob = await res.blob();
  return new File([blob], filename, { type: blob.type || "image/png" });
}

export async function uploadAsset(file) {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/admin/assets", { method: "POST", body: form });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || "Could not upload a picture.");
  return json.assetId;
}

// `entries` are { file, ...fields }: each file is uploaded, then all items are
// created together. Returns the new document ids in the same order as `entries`.
export async function seedFromBuiltIn(endpoint, entries, pagePath, onProgress) {
  let uploaded = 0;
  const items = await Promise.all(
    entries.map(async ({ file, ...fields }) => {
      const assetId = await uploadAsset(file);
      uploaded += 1;
      onProgress?.(uploaded, entries.length);
      return { assetId, ...fields };
    }),
  );

  const res = await fetch(endpoint, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items, pagePath }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || "Could not copy the built-in list.");
  return json.ids;
}
