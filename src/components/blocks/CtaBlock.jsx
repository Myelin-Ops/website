"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSanityContent } from "@/lib/useSanityContent";
import Editable from "@/components/admin/Editable";

// Home-style CTA: dark card, "Schedule Consultation" + "Explore Services" buttons.
// Other pages' CTAs (About/Services/Team) have their own distinct styling and are
// wired up as this same block type, with their own variant, when those pages migrate.
function CtaBlock({ data, documentId, i18nPrefix = "cta", variant = "home" }) {
  const { sanity, st } = useSanityContent(data);
  const title = st(sanity?.title, `${i18nPrefix}.title`);
  const description = st(sanity?.description, `${i18nPrefix}.description`);
  const primaryButton = st(sanity?.primaryButton, `${i18nPrefix}.primaryButton`);
  const secondaryButton = st(sanity?.secondaryButton, `${i18nPrefix}.secondaryButton`);
  const path = sanity?._key ? `sections[_key=="${sanity._key}"]` : null;

  if (variant === "team") {
    const subtitle = st(sanity?.subtitle, `${i18nPrefix}.subtitle`);
    const button = st(sanity?.button, `${i18nPrefix}.button`);
    return (
      <section className="py-24 px-4 md:px-12 bg-gray-50/30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto rounded-2xl bg-[#0A1A1A] overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-125 h-125 bg-linear-to-bl from-[#00E5E5]/10 to-transparent rounded-full -mr-64 -mt-64 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-125 h-125 bg-linear-to-tr from-blue-500/5 to-transparent rounded-full -ml-64 -mb-64 blur-3xl pointer-events-none" />
          <div className="relative z-10 py-24 px-8 md:px-20 text-center text-white">
            <h2 className="text-xl md:text-3xl lg:text-5xl font-bold mb-8 max-w-4xl mx-auto leading-tight">
              <Editable documentId={documentId} path={path && `${path}.title`} value={title} />
            </h2>
            <p className="hidden md:block text-gray-400 text-base mb-12 max-w-2xl mx-auto leading-relaxed">
              <Editable documentId={documentId} path={path && `${path}.subtitle`} value={subtitle} />
            </p>
            <Link href="/contact" className="inline-block">
              <button className="px-8 py-4 cursor-pointer md:px-12 md:py-5 bg-[#00E5E5] text-black font-extrabold rounded-md text-base md:text-lg hover:scale-105 transition-all shadow-2xl shadow-cyan-500/20 active:scale-95">
                <Editable documentId={documentId} path={path && `${path}.button`} value={button} />
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
    );
  }

  if (variant === "services") {
    const button = st(sanity?.button, `${i18nPrefix}.button`);
    const frameworks = st(sanity?.frameworks, `${i18nPrefix}.frameworks`);
    const alignment = st(sanity?.alignment, `${i18nPrefix}.alignment`);
    return (
      <section className="py-0 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full bg-[#111818] overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-125 h-125 bg-linear-to-bl from-[#13ECEC]/10 to-transparent rounded-full -mr-64 -mt-64 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-125 h-125 bg-linear-to-tr from-blue-500/5 to-transparent rounded-full -ml-64 -mb-64 blur-3xl pointer-events-none" />
          <div className="relative z-10 py-24 px-4 text-center text-white">
            <h2 className="text-2xl md:text-5xl font-black md:max-w-150 mb-8 max-w-4xl mx-auto leading-tight">
              <Editable documentId={documentId} path={path && `${path}.title`} value={title} />
            </h2>
            <p className="hidden md:block text-gray-400 text-sm md:text-base mb-12 max-w-2xl mx-auto leading-relaxed">
              <Editable documentId={documentId} path={path && `${path}.description`} value={description} />
            </p>
            <Link href="/contact" className="inline-block mb-14">
              <button className="px-4 py-4 cursor-pointer md:px-12 md:py-5 bg-[#13ECEC] text-black font-extrabold rounded-md text-base md:text-lg hover:scale-105 transition-all shadow-2xl shadow-cyan-500/20 active:scale-95">
                <Editable documentId={documentId} path={path && `${path}.button`} value={button} />
              </button>
            </Link>
            <div className="border-t border-white/5 pt-10">
              <p className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0 text-[10px] font-bold tracking-[0.4em] text-gray-500 uppercase">
                <Editable documentId={documentId} path={path && `${path}.frameworks`} value={frameworks} />
                <span className="md:mx-4">•</span>
                <Editable documentId={documentId} path={path && `${path}.alignment`} value={alignment} />
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  if (variant === "about") {
    return (
      <section className="py-12 md:py-20 px-4 md:px-12 flex items-center bg-[#F6F8F8]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto w-full rounded-4xl bg-[#111818] overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-bl from-cyan-500/20 to-transparent rounded-full -mr-48 -mt-48 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-blue-500/10 to-transparent rounded-full -ml-48 -mb-48 blur-3xl pointer-events-none" />
          <div className="relative z-10 py-16 md:py-24 px-8 md:px-20 text-center text-white">
            <h2 className="text-2xl md:text-5xl font-black mb-8">
              <Editable documentId={documentId} path={path && `${path}.title`} value={title} />
            </h2>
            <p className="hidden md:block text-gray-400 text-base mb-12 max-w-3xl mx-auto">
              <Editable documentId={documentId} path={path && `${path}.description`} value={description} />
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact" className="w-full sm:w-auto">
                <button className="px-8 py-4 cursor-pointer bg-[#00E5E5] text-black font-bold rounded-md text-base hover:scale-105 transition-transform w-full sm:w-[220px]">
                  <Editable documentId={documentId} path={path && `${path}.primaryButton`} value={primaryButton} />
                </button>
              </Link>
              <a
                href="/portfolio.pdf"
                download
                className="py-4 border border-white/20 text-white font-bold rounded-md text-base hover:bg-white/10 transition-colors flex items-center justify-center w-full sm:w-[220px]"
              >
                <Editable documentId={documentId} path={path && `${path}.secondaryButton`} value={secondaryButton} />
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="w-full py-12 md:py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#111818] to-[#0f2629] rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            <Editable documentId={documentId} path={path && `${path}.title`} value={title} />
          </h2>
          <p className="text-gray-300 text-sm md:text-base mb-8 max-w-2xl mx-auto">
            <Editable documentId={documentId} path={path && `${path}.description`} value={description} />
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 cursor-pointer md:px-8 py-3 md:py-4 bg-cyan-400 text-black font-semibold rounded-lg hover:bg-cyan-300 transition-colors w-full"
              >
                <Editable documentId={documentId} path={path && `${path}.primaryButton`} value={primaryButton} />
              </motion.button>
            </Link>
            <Link href="/services" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 md:px-8 cursor-pointer py-3 md:py-4 border border-gray-500 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors w-full"
              >
                <Editable documentId={documentId} path={path && `${path}.secondaryButton`} value={secondaryButton} />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CtaBlock;
