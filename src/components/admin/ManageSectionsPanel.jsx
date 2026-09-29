"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Layers, ChevronUp, ChevronDown, X, Plus } from "lucide-react";
import { useEditMode } from "./EditModeProvider";
import { PAGE_BLOCK_TYPES } from "@/lib/pageBuilderConfig";

function randomKey() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function blockLabel(type, options) {
  return options.find((o) => o.type === type)?.label || type;
}

export default function ManageSectionsPanel({ documentId, pageType, sections }) {
  const { isAdmin, isEditing } = useEditMode();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [localSections, setLocalSections] = useState(sections || []);
  const [addType, setAddType] = useState("");
  const [saving, setSaving] = useState(false);

  const options = PAGE_BLOCK_TYPES[pageType];

  if (!isAdmin || !isEditing || !options) return null;

  const move = (index, direction) => {
    const next = [...localSections];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setLocalSections(next);
  };

  const remove = (index) => {
    setLocalSections(localSections.filter((_, i) => i !== index));
  };

  const add = () => {
    if (!addType) return;
    setLocalSections([...localSections, { _type: addType, _key: randomKey() }]);
    setAddType("");
  };

  const save = async () => {
    setSaving(true);
    try {
      await fetch("/api/admin/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentId, sections: localSections, pagePath: pathname }),
      });
      router.refresh();
      setOpen(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {open && (
        <div className="mb-3 w-80 max-h-[70vh] overflow-y-auto bg-white rounded-2xl border border-gray-200 shadow-2xl p-4">
          <h3 className="font-bold text-gray-900 mb-3">Page Sections</h3>
          <ul className="space-y-2 mb-4">
            {localSections.map((section, i) => (
              <li
                key={section._key || i}
                className="flex items-center justify-between gap-2 bg-gray-50 rounded-lg px-3 py-2 text-sm"
              >
                <span className="text-gray-800">{blockLabel(section._type, options)}</span>
                <div className="flex items-center gap-1 text-gray-400">
                  <button onClick={() => move(i, -1)} disabled={i === 0} className="disabled:opacity-30 cursor-pointer">
                    <ChevronUp size={16} />
                  </button>
                  <button
                    onClick={() => move(i, 1)}
                    disabled={i === localSections.length - 1}
                    className="disabled:opacity-30 cursor-pointer"
                  >
                    <ChevronDown size={16} />
                  </button>
                  <button onClick={() => remove(i)} className="hover:text-red-500 cursor-pointer">
                    <X size={16} />
                  </button>
                </div>
              </li>
            ))}
            {localSections.length === 0 && (
              <li className="text-sm text-gray-400 text-center py-4">No sections yet</li>
            )}
          </ul>

          <div className="flex gap-2 mb-4">
            <select
              value={addType}
              onChange={(e) => setAddType(e.target.value)}
              className="flex-1 text-sm border border-gray-200 rounded-lg px-2 py-2 bg-white"
            >
              <option value="">Add a section...</option>
              {options.map((o) => (
                <option key={o.type} value={o.type}>
                  {o.label}
                </option>
              ))}
            </select>
            <button
              onClick={add}
              disabled={!addType}
              className="px-3 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 disabled:opacity-40 cursor-pointer"
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            onClick={save}
            disabled={saving}
            className="w-full py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 disabled:opacity-50 cursor-pointer"
          >
            {saving ? "Saving..." : "Save Sections"}
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-5 py-3 rounded-full shadow-lg font-semibold text-sm bg-white border border-gray-200 text-gray-700 hover:text-black transition-colors cursor-pointer"
      >
        <Layers size={18} />
        Sections
      </button>
    </div>
  );
}
