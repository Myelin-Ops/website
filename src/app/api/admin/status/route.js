import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAdminSession, issueSessionCookie } from "@/lib/adminAuth";

// Reports whether the visitor is a logged-in editor. With ?touch=1 (sent when
// the editor is actually doing something on the page) it also renews the
// 30-minute inactivity timer. A plain check never renews it, so an idle tab
// can't keep the session alive.
export async function GET(request) {
  const isAdmin = await isAdminSession();
  if (isAdmin && new URL(request.url).searchParams.get("touch") === "1") {
    issueSessionCookie(await cookies());
  }
  return NextResponse.json({ isAdmin });
}
