"use client";

import { Pencil, X, LogOut } from "lucide-react";
import { useEditMode } from "./EditModeProvider";

export default function EditModeToggle() {
  const { isAdmin, isEditing, setIsEditing } = useEditMode();

  if (!isAdmin) return null;

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    // Full reload so EditModeProvider's login check re-runs and the toggle disappears.
    window.location.href = "/";
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-3 py-3 rounded-full bg-white border border-gray-200 shadow-lg text-gray-600 hover:text-black transition-colors cursor-pointer"
        aria-label="Log out"
      >
        <LogOut size={18} />
      </button>
      <button
        onClick={() => setIsEditing(!isEditing)}
        className={`flex items-center gap-2 px-5 py-3 rounded-full shadow-lg font-semibold text-sm transition-colors cursor-pointer ${
          isEditing ? "bg-cyan-400 text-black" : "bg-black text-white hover:bg-gray-800"
        }`}
      >
        {isEditing ? <X size={18} /> : <Pencil size={18} />}
        {isEditing ? "Done Editing" : "Edit Page"}
      </button>
    </div>
  );
}
