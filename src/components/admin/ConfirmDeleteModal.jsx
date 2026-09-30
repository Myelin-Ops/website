"use client";

import { createPortal } from "react-dom";
import { Trash2 } from "lucide-react";

// Small confirmation dialog for destructive edits (delete a picture, etc.).
// Rendered into document.body so it covers the whole page, including the
// floating edit buttons, whatever section it was opened from.
export default function ConfirmDeleteModal({
  title,
  message,
  busy,
  progress,
  error,
  onCancel,
  onConfirm,
  children,
}) {
  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 px-4"
      onClick={() => !busy && onCancel()}
      onKeyDown={(e) => e.key === "Escape" && !busy && onCancel()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-delete-title"
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
            <Trash2 size={20} />
          </div>
          <h3 id="confirm-delete-title" className="text-lg font-bold text-gray-900">
            {title}
          </h3>
        </div>
        <p className="text-sm text-gray-500 mb-3">{message}</p>
        {children}
        {busy && progress && <p className="text-sm text-cyan-700 mt-2">{progress}</p>}
        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        <div className="flex justify-end gap-2 mt-5">
          <button
            autoFocus
            onClick={onCancel}
            disabled={busy}
            className="px-4 py-2 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={busy}
            className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50 cursor-pointer"
          >
            {busy ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
