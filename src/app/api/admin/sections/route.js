import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { isAdminSession } from "@/lib/adminAuth";
import { getWriteClient } from "@/lib/sanity";

export async function POST(request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { documentId, sections, pagePath } = await request.json();

  if (!documentId || !Array.isArray(sections)) {
    return NextResponse.json({ error: "Missing documentId or sections" }, { status: 400 });
  }

  try {
    const client = getWriteClient();
    // The page may still be showing built-in default sections with no Sanity
    // document behind them yet, so make sure the document exists first.
    await client.createIfNotExists({ _id: documentId, _type: documentId });

    // `sections` only carries the desired order/membership ({ _key, _type }).
    // Keep each section's existing stored content; sections that aren't in the
    // document yet (defaults) are created empty and fall back to built-in copy.
    const existing = (await client.getDocument(documentId))?.sections || [];
    const byKey = new Map(existing.map((s) => [s._key, s]));
    const next = sections.map((s) => byKey.get(s._key) ?? { _type: s._type, _key: s._key });

    await client.patch(documentId).set({ sections: next }).commit();
    // Expire cached Sanity data right away so the refresh shows the change.
    revalidateTag("sanity", { expire: 0 });
    revalidatePath("/", "layout");
    if (pagePath) revalidatePath(pagePath);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin sections save error:", err);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
