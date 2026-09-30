// next/image's src accepts either a URL string (Sanity) or a local StaticImageData import (fallback).
export function pickImage(sanityUrl, fallbackStaticImport) {
  return sanityUrl || fallbackStaticImport;
}
