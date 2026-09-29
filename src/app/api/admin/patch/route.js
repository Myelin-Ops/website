import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminSession } from "@/lib/adminAuth";
import { getWriteClient } from "@/lib/sanity";

export async function POST(request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { documentId, path, value, pagePath } = await request.json();

  if (!documentId || !path || typeof value !== "string") {
    return NextResponse.json({ error: "Missing documentId, path, or value" }, { status: 400 });
  }

  try {
    await getWriteClient().patch(documentId).set({ [path]: value }).commit();
    if (pagePath) revalidatePath(pagePath);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin patch error:", err);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
