"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Turnstile } from "@marsidev/react-turnstile";
import { useSanityContent } from "@/lib/useSanityContent";
import Editable from "@/components/admin/Editable";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Right column of the contact layout; the page wraps this and ContactInfoBlock in one grid.
function ContactFormBlock({ data, documentId, i18nPrefix = "form" }) {
  const { t, sanity, st } = useSanityContent(data);
  const path = sanity?._key ? `sections[_key=="${sanity._key}"]` : null;
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [turnstileToken, setTurnstileToken] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const turnstileRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!turnstileToken) {
      setErrorMessage("Please complete the security check.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, turnstileToken }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTurnstileToken(null);
      if (turnstileRef.current) turnstileRef.current.reset();
    } catch (err) {
      setErrorMessage(err.message);
      setStatus("error");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClass =
    "w-full bg-gray-50 border-none rounded-xl p-4 text-gray-900 placeholder:text-gray-300 focus:ring-2 focus:ring-cyan-400 transition-all";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="order-1 lg:order-2 bg-white p-8 md:p-12 rounded-[40px] shadow-2xl shadow-gray-200/50 border border-gray-50"
    >
      <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-10">
        <Editable
          documentId={documentId}
          path={path && `${path}.title`}
          value={st(sanity?.title, `${i18nPrefix}.title`)}
        />
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-3">
            {st(sanity?.nameLabel, `${i18nPrefix}.name.label`)}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={st(sanity?.namePlaceholder, `${i18nPrefix}.name.placeholder`)}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-3">
            {st(sanity?.emailLabel, `${i18nPrefix}.email.label`)}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={st(sanity?.emailPlaceholder, `${i18nPrefix}.email.placeholder`)}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-3">
            {st(sanity?.messageLabel, `${i18nPrefix}.message.label`)}
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={st(sanity?.messagePlaceholder, `${i18nPrefix}.message.placeholder`)}
            required
            rows={6}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="flex justify-center">
          <Turnstile
            ref={turnstileRef}
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
            onSuccess={(token) => {
              setTurnstileToken(token);
              if (status === "error") setStatus("idle");
            }}
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className={`w-full cursor-pointer py-5 flex items-center justify-center gap-3 text-black font-extrabold rounded-2xl transition-all shadow-lg ${
            status === "success"
              ? "bg-green-400 shadow-green-400/20"
              : "bg-cyan-400 hover:scale-[1.02] active:scale-95 shadow-cyan-400/20 disabled:opacity-50 disabled:cursor-not-allowed"
          }`}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              {t(`${i18nPrefix}.sending`, "Sending...")}
            </>
          ) : status === "success" ? (
            <>
              <CheckCircle2 size={20} />
              {t(`${i18nPrefix}.sent`, "Message Sent!")}
            </>
          ) : (
            st(sanity?.submit, `${i18nPrefix}.submit`)
          )}
        </button>

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-xl text-sm"
          >
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </motion.div>
        )}

        {status === "success" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm font-medium text-green-600"
          >
            {t(`${i18nPrefix}.success_msg`, "We'll get back to you shortly.")}
          </motion.p>
        )}

        <p className="text-center text-[11px] text-gray-400">
          {st(sanity?.agreement, `${i18nPrefix}.agreement`)}{" "}
          <Link href="/privacy" className="underline hover:text-gray-900 transition-colors">
            {st(sanity?.privacyLink, `${i18nPrefix}.privacy_link`)}
          </Link>
        </p>
      </form>
    </motion.div>
  );
}

export default ContactFormBlock;
