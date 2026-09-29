"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Incorrect password");
      }

      // Full reload (not client-side navigation) so EditModeProvider's
      // one-time login check re-runs against the freshly-set session cookie.
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded-2xl border border-gray-100 shadow-sm"
      >
        <h1 className="text-xl font-bold text-gray-900 mb-6 text-center">Edit Mode Login</h1>
        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          required
          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-900 mb-4 focus:ring-2 focus:ring-cyan-400 outline-none"
        />
        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {loading ? "Checking..." : "Log In"}
        </button>
      </form>
    </div>
  );
}
