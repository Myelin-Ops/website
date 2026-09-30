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

  // Inactivity timeout: while logged in, real activity (click/typing/scroll)
  // renews the server's 30-minute timer, at most once a minute. A plain check
  // every minute notices when the session has ended, and hides the editing
  // controls instead of leaving them on a dead session.
  useEffect(() => {
    if (!isAdmin) return undefined;

    let lastTouch = Date.now();
    const ping = (touch) =>
      fetch(`/api/admin/status${touch ? "?touch=1" : ""}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.isAdmin) {
            setIsAdmin(false);
            setIsEditing(false);
          }
        })
        .catch(() => {});

    const onActivity = () => {
      if (Date.now() - lastTouch < 60 * 1000) return;
      lastTouch = Date.now();
      ping(true);
    };
    const events = ["click", "keydown", "scroll", "pointerdown"];
    events.forEach((name) => window.addEventListener(name, onActivity, { passive: true }));
    const interval = setInterval(() => ping(false), 60 * 1000);

    return () => {
      events.forEach((name) => window.removeEventListener(name, onActivity));
      clearInterval(interval);
    };
  }, [isAdmin]);

  return (
    <EditModeContext.Provider value={{ isAdmin, isEditing: isAdmin && isEditing, setIsEditing }}>
      {children}
    </EditModeContext.Provider>
  );
}
