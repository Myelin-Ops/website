import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyPassword, issueSessionCookie } from "@/lib/adminAuth";

export async function POST(request) {
  const { password } = await request.json();

  if (!verifyPassword(password)) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  issueSessionCookie(await cookies());

  return NextResponse.json({ success: true });
}
