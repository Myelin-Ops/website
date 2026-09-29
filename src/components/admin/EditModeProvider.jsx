"use client";

import { createContext, useContext, useEffect, useState } from "react";

const EditModeContext = createContext({
  isAdmin: false,
  isEditing: false,
  setIsEditing: () => {},
});

export function useEditMode() {
  return useContext(EditModeContext);
}

// Checks admin login status client-side (via a small API route) rather than
// reading the session cookie in the root layout/Server Component - that would
// force every page to opt out of static rendering/ISR just to show a toggle
// only the site owner ever sees.
export default function EditModeProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/status")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setIsAdmin(!!data.isAdmin);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <EditModeContext.Provider value={{ isAdmin, isEditing: isAdmin && isEditing, setIsEditing }}>
      {children}
    </EditModeContext.Provider>
  );
}
