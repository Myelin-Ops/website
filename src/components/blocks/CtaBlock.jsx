"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSanityContent } from "@/lib/useSanityContent";
import Editable from "@/components/admin/Editable";

// Home-style CTA: dark card, "Schedule Consultation" + "Explore Services" buttons.
// Other pages' CTAs (About/Services/Team) have their own distinct styling and are
// wired up as this same block type, with their own variant, when those pages migrate.
function CtaBlock({ data, documentId, i18nPrefix = "cta" }) {
  const { sanity, st } = useSanityContent(data);
  const title = st(sanity?.title, `${i18nPrefix}.title`);
  const description = st(sanity?.description, `${i18nPrefix}.description`);
  const primaryButton = st(sanity?.primaryButton, `${i18nPrefix}.primaryButton`);
  const secondaryButton = st(sanity?.secondaryButton, `${i18nPrefix}.secondaryButton`);
  const path = sanity?._key ? `sections[_key=="${sanity._key}"]` : null;

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
