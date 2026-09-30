import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyPassword, issueSessionCookie } from "@/lib/adminAuth";

export async function POST(request) {
  // If the server was never given the login settings, say so - otherwise every
  // password just looks "incorrect" and the real problem is hard to find.
  const missing = ["ADMIN_EDIT_PASSWORD", "ADMIN_SESSION_SECRET"].filter((name) => !process.env[name]);
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Editor login isn't set up on this server: missing ${missing.join(" and ")}.` },
      { status: 503 },
    );
  }

  const { password } = await request.json();

  if (!verifyPassword(password)) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  issueSessionCookie(await cookies());

  return NextResponse.json({ success: true });
}
