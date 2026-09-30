// Server-only: translates inline-edited text between English (en) and Albanian (sq).
//
// Uses Google Cloud Translation when GOOGLE_TRANSLATE_API_KEY is set (best
// quality). Otherwise falls back to MyMemory's free keyless endpoint, which is
// rate-limited (about 5,000 characters/day) and noticeably less accurate.
// MyMemory counts its daily limit per email address: anonymous is ~5,000
// characters/day, but sending a real email (the `de` parameter) raises it to
// ~50,000/day. `scope` ("pages" or "testimonials") picks a separate address
// for each, so each gets its own limit:
//   MYMEMORY_EMAIL_PAGES, MYMEMORY_EMAIL_TESTIMONIALS (or one shared MYMEMORY_EMAIL)
//
// Returns null when translation fails so callers can still save the English.
const MYMEMORY_EMAIL_ENV = {
  pages: "MYMEMORY_EMAIL_PAGES",
  testimonials: "MYMEMORY_EMAIL_TESTIMONIALS",
};

export async function translate(text, from, to, scope = "pages") {
  if (!text || !text.trim()) return text;

  try {
    const googleKey = process.env.GOOGLE_TRANSLATE_API_KEY;
    if (googleKey) {
      const res = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${googleKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ q: text, source: from, target: to, format: "text" }),
        },
      );
      if (!res.ok) return null;
      const json = await res.json();
      return json?.data?.translations?.[0]?.translatedText ?? null;
    }

    // MyMemory rejects queries over 500 bytes; inline-edited fields are short.
    if (Buffer.byteLength(text) > 500) return null;
    const email = process.env[MYMEMORY_EMAIL_ENV[scope]] || process.env.MYMEMORY_EMAIL;
    const emailParam = email ? `&de=${encodeURIComponent(email)}` : "";
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}${emailParam}`,
    );
    if (!res.ok) return null;
    const json = await res.json();
    if (json?.responseStatus !== 200) return null;
    return json?.responseData?.translatedText ?? null;
  } catch (err) {
    console.error("Translation error:", err);
    return null;
  }
}
