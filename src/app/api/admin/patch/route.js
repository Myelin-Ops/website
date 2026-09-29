import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { isAdminSession } from "@/lib/adminAuth";
import { getWriteClient } from "@/lib/sanity";
import { translateLong } from "@/lib/translateLong";

export async function POST(request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { documentId, path, value, pagePath } = await request.json();

  if (!documentId || !path || typeof value !== "string") {
    return NextResponse.json({ error: "Missing documentId, path, or value" }, { status: 400 });
  }

  try {
    const client = getWriteClient();
    const set = { [path]: value };
    let translationOk = true;

    // Editing English also refreshes the Albanian copy of the same field.
    // Editing Albanian only changes Albanian.
    const match = path.match(/^(.*)\.en$/);
    if (match) {
      const [, parent] = match;

      // A field saved as a plain string (not { en, sq }) can't take a
      // sub-path, so turn it into an object first, keeping its old text as English.
      const current = await client.fetch(`*[_id == $id][0].${parent}`, { id: documentId });
      if (typeof current === "string") {
        await client.patch(documentId).set({ [parent]: { en: current } }).commit();
      }

      const translated = await translateLong(value, "en", "sq");
      if (translated) set[`${parent}.sq`] = translated;
      else translationOk = false;
    }

    await client.patch(documentId).set(set).commit();
    // Expire cached Sanity data right away so the refresh shows the change.
    revalidateTag("sanity", { expire: 0 });
    revalidatePath("/", "layout");
    if (pagePath) revalidatePath(pagePath);
    return NextResponse.json({ success: true, translated: translationOk });
  } catch (err) {
    console.error("Admin patch error:", err);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
