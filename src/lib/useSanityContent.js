"use client";

import { useTranslation } from "react-i18next";

// Resolves content Sanity-first, i18next-fallback. `data` is a { en, sq } bundle
// fetched server-side for both languages so switching languages never refetches.
export function useSanityContent(data) {
  const { t, i18n } = useTranslation();
  const sanity = data ? data[i18n.language] ?? data.en ?? null : null;

  const st = (sanityValue, i18nKey, options) =>
    sanityValue !== undefined && sanityValue !== null && sanityValue !== ""
      ? sanityValue
      : t(i18nKey, options);

  return { t, i18n, sanity, st };
}
