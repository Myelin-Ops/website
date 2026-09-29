"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSanityContent } from "@/lib/useSanityContent";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function LegalSectionBlock({ data }) {
  const { sanity, st } = useSanityContent(data);

  return (
    <section className="py-12 md:py-16 px-4 md:px-12">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {st(sanity?.title, "legal.section.title")}
          </h2>
          <div className="prose prose-sm md:prose-base max-w-none">
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {st(sanity?.content, "legal.section.content")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default LegalSectionBlock;
