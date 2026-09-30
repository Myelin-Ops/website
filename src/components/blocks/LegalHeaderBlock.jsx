"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSanityContent } from "@/lib/useSanityContent";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

// Title + "last updated" line for Privacy/Terms, with the page's background glows.
function LegalHeaderBlock({ data, i18nPrefix = "privacy" }) {
  const { sanity, st } = useSanityContent(data);
  const title = st(sanity?.title, `${i18nPrefix}.title`);
  const lastUpdated = st(sanity?.lastUpdated, `${i18nPrefix}.lastUpdated`);
  // Sanity stores a bare date; the built-in copy already includes its own label.
  const lastUpdatedText = DATE_ONLY.test(lastUpdated) ? `Last updated: ${lastUpdated}` : lastUpdated;

  return (
    <section className="pt-32 pb-16 md:pb-24 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute left-1/2 -top-25 -translate-x-1/2 pointer-events-none z-0"
      >
        <Image
          src="/background-blur.svg"
          alt=""
          width={1000}
          height={1000}
          className="blur-[80px] opacity-90 scale-125"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute -right-50 top-[20%] pointer-events-none z-0"
      >
        <Image
          src="/background-blur-2.svg"
          alt=""
          width={600}
          height={600}
          className="blur-[60px] opacity-60"
        />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } } }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold text-black mb-6 tracking-tight"
        >
          {title}
        </motion.h1>
        {lastUpdatedText && (
          <motion.p
            variants={itemVariants}
            className="text-gray-500 font-medium tracking-widest uppercase text-sm"
          >
            {lastUpdatedText}
          </motion.p>
        )}
        <motion.div variants={itemVariants} className="w-20 h-1 bg-cyan-500 mx-auto mt-8 rounded-full" />
      </motion.div>
    </section>
  );
}

export default LegalHeaderBlock;
