import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
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
    await getWriteClient().patch(documentId).set({ sections }).commit({ autoGenerateArrayKeys: true });
    if (pagePath) revalidatePath(pagePath);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin sections save error:", err);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
