"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSanityContent } from "@/lib/useSanityContent";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function ContactFormBlock({ data }) {
  const { sanity, st } = useSanityContent(data);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-12 bg-[#F9FAFB]">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {st(sanity?.title, "contact.form.title")}
          </h2>
        </motion.div>

        <motion.form
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          onSubmit={handleSubmit}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100"
        >
          <div className="mb-6">
            <label className="block text-gray-900 font-semibold mb-2">
              {st(sanity?.nameLabel, "contact.form.nameLabel")}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={st(sanity?.namePlaceholder, "contact.form.namePlaceholder")}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-900 font-semibold mb-2">
              {st(sanity?.emailLabel, "contact.form.emailLabel")}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={st(sanity?.emailPlaceholder, "contact.form.emailPlaceholder")}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-900 font-semibold mb-2">
              {st(sanity?.messageLabel, "contact.form.messageLabel")}
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={st(sanity?.messagePlaceholder, "contact.form.messagePlaceholder")}
              rows="5"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500"
              required
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" required />
              <span className="text-sm text-gray-600">
                {st(sanity?.agreement, "contact.form.agreement")}
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-4 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : st(sanity?.submit, "contact.form.submit")}
          </button>
        </motion.form>
      </div>
    </section>
  );
}

export default ContactFormBlock;
