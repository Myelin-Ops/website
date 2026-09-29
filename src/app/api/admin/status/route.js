import { NextResponse } from "next/server";
import { isAdminSession } from "@/lib/adminAuth";

export async function GET() {
  return NextResponse.json({ isAdmin: await isAdminSession() });
}
