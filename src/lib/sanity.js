import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { draftMode } from "next/headers";
import { projectId, dataset, apiVersion } from "@/sanity/env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Enable CDN for faster reads in production
});

// Image URL builder for Sanity hosted images
const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

const readToken = process.env.SANITY_API_READ_TOKEN;

// Fetches published content normally, or draft content (with click-to-edit
// overlays enabled) when Next.js draft mode is on, e.g. from Sanity's
// Presentation tool. Inline edits (src/app/api/admin/*) call `revalidatePath`
// on save instead of bypassing this cache, so regular pages stay statically
// generated/ISR'd rather than rendering dynamically for every visitor.
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

  return client.fetch(query, params, { next: { revalidate: 60 } });
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
