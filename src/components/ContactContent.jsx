"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Mail, Phone, Linkedin, Instagram, Facebook, Twitter } from "lucide-react";
import Link from "next/link";

import Image from "next/image";
import logo from "@/../public/myelin-logo.png";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function ContactContent() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for form submission would go here
    console.log("Form submitted:", formData);
    alert("Thank you! Your message has been sent.");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 md:px-12 text-center max-w-5xl mx-auto flex flex-col items-center">
        {/* Mobile Logo Logo */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="mb-8 lg:hidden"
        >
          <Image src={logo} alt="Myelin OPS" width={180} height={60} className="h-auto" />
        </motion.div>

        {/* Brand Description (Mobile Only) */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="lg:hidden text-gray-500 text-base max-w-sm mb-12 leading-relaxed"
        >
          {t("common.footer.brand.description")}
        </motion.p>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
        >
          {t("contact.hero.title")}
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          {t("contact.hero.subtitle")}
        </motion.p>
      </section>

      {/* Main Content Section */}
      <section className="pb-32 px-4 md:px-12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col space-y-12 lg:space-y-12"
          >
            {/* Desktop-only Boxes */}
            <div className="hidden lg:flex flex-col space-y-12">
              {/* Email Box */}
              <div className="bg-white p-8 rounded-md border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center text-cyan-500 shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {t("contact.info.email.title")}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      {t("contact.info.email.subtitle")}
                    </p>
                    <a
                      href={`mailto:${t("contact.info.email.value")}`}
                      className="text-gray-900 font-bold hover:text-cyan-500 transition-colors"
                    >
                      {t("contact.info.email.value")}
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone Box */}
              <div className="bg-white p-8 rounded-md border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center text-cyan-500 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {t("contact.info.phone.title")}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      {t("contact.info.phone.subtitle")}
                    </p>
                    <a
                      href={`tel:${t("contact.info.phone.value").replace(/\s/g, "")}`}
                      className="text-gray-900 font-bold hover:text-cyan-500 transition-colors"
                    >
                      {t("contact.info.phone.value")}
                    </a>
                  </div>
                </div>
              </div>

              {/* Socials & Credits (Desktop) */}
              <div className="pt-8">
                <span className="text-xs font-bold tracking-widest text-gray-400 uppercase block mb-6">
                  {t("contact.info.connect")}
                </span>
                <div className="flex gap-4 mb-16">
                  {[
                    { icon: Linkedin, link: "https://www.linkedin.com/company/myelin-ops/posts/?feedView=all" },
                    { icon: Instagram, link: "https://www.instagram.com/myelinops/" },
                    { icon: Facebook, link: "https://www.facebook.com/profile.php?id=61556761803602" },
                  ].map((item, i) => (
                    <a
                      key={i}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border border-gray-100 rounded-lg flex items-center justify-center text-gray-900 hover:bg-black hover:text-white transition-all"
                    >
                      <item.icon size={18} />
                    </a>
                  ))}
                </div>
                <Link
                  href="/credits"
                  className="text-xs font-bold tracking-widest text-gray-400 uppercase hover:text-cyan-500 transition-colors"
                >
                  {t("contact.info.credits")}
                </Link>
              </div>
            </div>

            {/* Mobile-only Minimalist Info (Screenshot Style) */}
            <div className="flex lg:hidden flex-col items-center text-center space-y-16 py-10">
              {/* Contact Group */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {t("common.footer.contact.title")}
                </h3>
                <div className="flex flex-col space-y-2">
                  <a href={`mailto:${t("contact.info.email.value")}`} className="text-[#13ECEC] font-semibold text-lg">
                    {t("contact.info.email.value")}
                  </a>
                  <a href={`tel:${t("contact.info.phone.value").replace(/\s/g, "")}`} className="text-gray-700 font-medium">
                    {t("contact.info.phone.value")}
                  </a>
                </div>
              </div>

              {/* Legal Group */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {t("common.footer.legal.title")}
                </h3>
                <div className="flex flex-col space-y-3">
                  <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                    {t("common.footer.legal.privacy")}
                  </Link>
                  <Link href="/terms" className="text-gray-600 hover:text-gray-900">
                    {t("common.footer.legal.terms")}
                  </Link>
                </div>
              </div>

              {/* Social Group */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {t("common.footer.social.title")}
                </h3>
                <div className="flex flex-wrap gap-6 justify-center">
                  {[
                    { icon: Instagram, label: "Instagram", link: "https://www.instagram.com/myelinops/" },
                    { icon: Facebook, label: "Facebook", link: "https://www.facebook.com/profile.php?id=61556761803602" },
                    { icon: Linkedin, label: "LinkedIn", link: "https://www.linkedin.com/company/myelin-ops/" },
                    { icon: Twitter, label: "Twitter", link: "https://x.com/MyelinOPS" },
                  ].map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.link}
                        aria-label={social.label}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-600 hover:text-black transition-colors"
                      >
                        {social.label === "Twitter" ? (
                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-6 h-6 fill-current"
                          >
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                          </svg>
                        ) : (
                          <Icon className="w-6 h-6" />
                        )}
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Credits (Mobile) */}
              <Link
                href="/credits"
                className="text-[10px] font-bold tracking-[0.3em] text-gray-300 uppercase hover:text-cyan-500 transition-colors pt-8"
              >
                {t("contact.info.credits")}
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-white p-8 md:p-12 rounded-md shadow-2xl shadow-gray-200/50 border border-gray-50"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-10">
              {t("contact.form.title")}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  {t("contact.form.name.label")}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("contact.form.name.placeholder")}
                  required
                  className="w-full bg-gray-50 border-none rounded-md p-4 text-gray-900 placeholder:text-gray-300 focus:ring-2 focus:ring-cyan-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  {t("contact.form.email.label")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("contact.form.email.placeholder")}
                  required
                  className="w-full bg-gray-50 border-none rounded-md p-4 text-gray-900 placeholder:text-gray-300 focus:ring-2 focus:ring-cyan-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  {t("contact.form.message.label")}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("contact.form.message.placeholder")}
                  required
                  rows={6}
                  className="w-full bg-gray-50 border-none rounded-md p-4 text-gray-900 placeholder:text-gray-300 focus:ring-2 focus:ring-cyan-400 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-5 bg-cyan-400 text-black font-extrabold rounded-md hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-cyan-400/20"
              >
                {t("contact.form.submit")}
              </button>

              <p className="text-center text-[11px] text-gray-400">
                {t("contact.form.agreement")}{" "}
                <Link
                  href="/privacy"
                  className="underline hover:text-gray-900 transition-colors"
                >
                  Privacy Policy
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default ContactContent;
