import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { isAdminSession } from "@/lib/adminAuth";
import { getWriteClient } from "@/lib/sanity";
import { translateLong } from "@/lib/translateLong";
import homeEn from "@/locales/en/home.json";
import homeSq from "@/locales/sq/home.json";

function refresh(pagePath) {
  revalidateTag("sanity", { expire: 0 });
  revalidatePath("/", "layout");
  if (pagePath) revalidatePath(pagePath);
}

// Adds a testimonial written in the editor's current language. Written in
// English, the Albanian copy is filled in by translation (same rule as inline edits).
export async function POST(request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { quote, author, lang, pagePath } = await request.json();
  if (typeof quote !== "string" || typeof author !== "string" || !quote.trim() || !author.trim()) {
    return NextResponse.json({ error: "Quote and author are required" }, { status: 400 });
  }
  const language = lang === "sq" ? "sq" : "en";

  try {
    const client = getWriteClient();
    let lastOrder = await client.fetch(`*[_type == "testimonial"] | order(order desc)[0].order`);

    // The site shows its built-in testimonials until Sanity has any. Copy them in
    // before the first new one, otherwise adding one would make them disappear.
    if (typeof lastOrder !== "number") {
      const builtInEn = homeEn?.testimonials?.list || [];
      const builtInSq = homeSq?.testimonials?.list || [];
      const seed = client.transaction();
      builtInEn.forEach((item, i) => {
        seed.create({
          _type: "testimonial",
          quote: { en: item.quote, sq: builtInSq[i]?.quote || item.quote },
          author: { en: item.author, sq: builtInSq[i]?.author || item.author },
          order: i + 1,
        });
      });
      if (builtInEn.length) await seed.commit();
      lastOrder = builtInEn.length;
    }

    const doc = {
      _type: "testimonial",
      quote: { [language]: quote.trim() },
      author: { [language]: author.trim() },
      order: (typeof lastOrder === "number" ? lastOrder : 0) + 1,
    };

    if (language === "en") {
      const [quoteSq, authorSq] = await Promise.all([
        translateLong(quote.trim(), "en", "sq", "testimonials"),
        translateLong(author.trim(), "en", "sq", "testimonials"),
      ]);
      if (quoteSq) doc.quote.sq = quoteSq;
      // Names are usually the same in both languages; keep the original if translation fails.
      doc.author.sq = authorSq || author.trim();
    }

    const created = await client.create(doc);
    refresh(pagePath);
    return NextResponse.json({ success: true, id: created._id });
  } catch (err) {
    console.error("Admin testimonial create error:", err);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { id, pagePath } = await request.json();
  if (typeof id !== "string" || !id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const client = getWriteClient();
    const draftId = id.startsWith("drafts.") ? id : `drafts.${id}`;
    const publishedId = id.replace(/^drafts\./, "");
    await client.transaction().delete(publishedId).delete(draftId).commit();
    refresh(pagePath);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin testimonial delete error:", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
