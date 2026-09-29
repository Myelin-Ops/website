const SHRINK_ABOVE_BYTES = 1.5 * 1024 * 1024;
const MAX_SIDE = 2400;

// Phone/camera photos are often 5-20MB, more than the upload route accepts.
// Scale big pictures down in the browser first; small ones are sent unchanged.
export async function shrinkImage(file) {
  if (file.size <= SHRINK_ABOVE_BYTES) return file;
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.85));
  if (!blob) return file;
  return new File([blob], file.name.replace(/.[^.]+$/, "") + ".jpg", { type: "image/jpeg" });
}
