import { translate } from "@/lib/translate";

// The free translation service rejects anything over ~500 bytes, and testimonial
// quotes (or Privacy/Terms paragraphs) are longer than that. This splits long
// text into sentence-sized pieces, translates each one with the same service
// (src/lib/translate.js) and joins them back together.
//
// Returns null if any piece fails, so callers keep the existing text instead of
// saving half a translation.
const MAX_CHUNK_BYTES = 450;

const bytes = (text) => Buffer.byteLength(text);

// A single sentence longer than the limit is cut at word boundaries.
function splitByWords(sentence) {
  const parts = [];
  let current = "";
  for (const word of sentence.split(/(\s+)/)) {
    if (bytes(current + word) > MAX_CHUNK_BYTES && current) {
      parts.push(current);
      current = "";
    }
    current += word;
  }
  if (current) parts.push(current);
  return parts;
}

export function splitIntoChunks(text) {
  const sentences = text.match(/[^.!?]+[.!?]+["')\]]*\s*|[^.!?]+$/g) || [text];
  const chunks = [];
  let current = "";

  for (const sentence of sentences.flatMap((s) => (bytes(s) > MAX_CHUNK_BYTES ? splitByWords(s) : [s]))) {
    if (current && bytes(current + sentence) > MAX_CHUNK_BYTES) {
      chunks.push(current);
      current = "";
    }
    current += sentence;
  }
  if (current) chunks.push(current);
  return chunks;
}

export async function translateLong(text, from, to, scope) {
  if (!text || !text.trim()) return text;
  if (bytes(text) <= MAX_CHUNK_BYTES) return translate(text, from, to, scope);

  const translated = [];
  for (const chunk of splitIntoChunks(text)) {
    const result = await translate(chunk.trim(), from, to, scope);
    if (!result) return null;
    translated.push(result);
  }
  return translated.join(" ");
}
