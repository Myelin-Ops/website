import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { draftMode } from "next/headers";
import { isAdminSession } from "@/lib/adminAuth";
import { projectId, dataset, apiVersion } from "@/sanity/env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Sanity's public CDN can keep serving old content for 20-40+ seconds after an
  // edit, so visitors wouldn't see a saved change. Reads go straight to the API
  // instead; the tagged Next.js data cache below already keeps pages fast, and
  // it's cleared the moment an editor saves.
  useCdn: false,
});

// Image URL builder for Sanity hosted images
const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

const readToken = process.env.SANITY_API_READ_TOKEN;

// Fetches published content normally, or draft content (with click-to-edit
// overlays enabled) when Next.js draft mode is on, e.g. from Sanity's
// Presentation tool. Visitors read through the tagged data cache ("sanity"),
// which inline edits (src/app/api/admin/*) expire on save. Because this checks
// the editor's session cookie, pages render on demand rather than statically.
export async function sanityFetch(query, params = {}) {
  const { isEnabled: isDraftMode } = await draftMode();

  if (isDraftMode) {
    if (!readToken) {
      throw new Error(
        "SANITY_API_READ_TOKEN is missing — required to preview draft content."
      );
    }
    return client
      .withConfig({
        token: readToken,
        useCdn: false,
        perspective: "drafts",
        stega: { enabled: true, studioUrl: "/studio" },
      })
      .fetch(query, params, { cache: "no-store" });
  }

  // A logged-in editor always reads live data (no ISR/data cache, no CDN), so
  // router.refresh() right after a save shows the change immediately.
  if (await isAdminSession()) {
    return client.withConfig({ useCdn: false }).fetch(query, params, { cache: "no-store" });
  }

  return client.fetch(query, params, { next: { revalidate: 60, tags: ["sanity"] } });
}

const writeToken = process.env.SANITY_API_WRITE_TOKEN;

// Server-only client for saving inline edits. Never import this into a
// client component — the write token must stay on the server.
export function getWriteClient() {
  if (!writeToken) {
    throw new Error("SANITY_API_WRITE_TOKEN is missing — required to save edits.");
  }
  return client.withConfig({ token: writeToken, useCdn: false });
}
