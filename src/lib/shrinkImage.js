const SHRINK_ABOVE_BYTES = 1.5 * 1024 * 1024;
const MAX_SIDE = 2400;
// A shrunk PNG (logo/graphic) bigger than this is re-encoded as JPEG instead,
// to stay under the upload route's 4MB limit.
const MAX_PNG_BYTES = 3.5 * 1024 * 1024;

const toBlob = (canvas, type, quality) => new Promise((resolve) => canvas.toBlob(resolve, type, quality));

// Phone/camera photos are often 5-20MB, more than the upload route accepts.
// Scale big pictures down in the browser first; small ones are sent unchanged.
// PNG/WebP stay PNG so logos keep their transparent background.
export async function shrinkImage(file) {
  if (file.size <= SHRINK_ABOVE_BYTES) return file;
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  const baseName = file.name.replace(/\.[^.]+$/, "");

  if (file.type === "image/png" || file.type === "image/webp") {
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const png = await toBlob(canvas, "image/png");
    if (png && png.size <= MAX_PNG_BYTES) {
      return new File([png], `${baseName}.png`, { type: "image/png" });
    }
    // Too big as PNG: fall back to JPEG on a white background.
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  }

  const jpeg = await toBlob(canvas, "image/jpeg", 0.85);
  if (!jpeg) return file;
  return new File([jpeg], `${baseName}.jpg`, { type: "image/jpeg" });
}
