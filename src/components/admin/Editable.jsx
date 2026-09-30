"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import { useEditMode } from "./EditModeProvider";

// Inline, on-page text editing for a single Sanity field. `path` is a
// Sanity JSONMatch path WITHOUT the language suffix (e.g.
// `sections[_key=="abc123"].title`) - the active i18next language is
// appended automatically, so editing follows whichever language the
// language switcher is currently set to.
//
// All fields backed by this component are plain string/text values (no
// rich text anywhere in the schema), so every field is treated as one
// logical line: pressing Enter saves instead of inserting a line break;
// long text still wraps visually via normal CSS.
function Editable({ as: Tag = "span", documentId, path, value, className }) {
  const { isAdmin, isEditing } = useEditMode();
  const { i18n } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  if (!isAdmin || !isEditing || !path || !documentId) {
    return <Tag className={className}>{value}</Tag>;
  }

  const fullPath = `${path}.${i18n.language}`;

  const handleBlur = async (e) => {
    const next = e.currentTarget.textContent;
    if (next === value) return;

    setSaving(true);
    try {
      const res = await fetch("/api/admin/patch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentId, path: fullPath, value: next, pagePath: pathname }),
      });
      if (res.status === 401) {
        // The session timed out: send the editor to log in again.
        window.location.href = "/admin/login";
        return;
      }
      router.refresh();
    } finally {
      setSaving(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  return (
    <Tag
      key={fullPath}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`${className || ""} outline-dashed outline-1 outline-cyan-400/70 focus:outline-2 focus:outline-cyan-500 cursor-text rounded-sm ${saving ? "opacity-50" : ""}`}
    >
      {value}
    </Tag>
  );
}

export default Editable;
