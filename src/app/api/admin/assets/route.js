import { NextResponse } from "next/server";
import { isAdminSession } from "@/lib/adminAuth";
import { getWriteClient } from "@/lib/sanity";

// Vercel rejects request bodies over ~4.5MB, so keep uploads under that.
const MAX_BYTES = 4 * 1024 * 1024;

// Uploads one image to Sanity's asset store and returns its id. Used when copying
// a built-in list into Sanity: every picture is uploaded first, then the list's
// documents are created in a single step (see lib/seedCollection.js), so an
// interrupted copy can never leave a half-filled list behind.
export async function POST(request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!file || typeof file === "string" || !file.type?.startsWith("image/")) {
      return NextResponse.json({ error: "Please choose an image file." }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "That image is too large (max 4MB)." }, { status: 413 });
    }

    const asset = await getWriteClient().assets.upload("image", Buffer.from(await file.arrayBuffer()), {
      filename: file.name,
      contentType: file.type,
    });
    return NextResponse.json({ success: true, assetId: asset._id });
  } catch (err) {
    console.error("Admin asset upload error:", err);
    return NextResponse.json({ error: "Failed to upload the image." }, { status: 500 });
  }
}
