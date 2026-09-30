"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSanityContent } from "@/lib/useSanityContent";
import Editable from "@/components/admin/Editable";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function LegalSectionBlock({ data, documentId, i18nPrefix = "legal.section" }) {
  const { sanity, st } = useSanityContent(data);
  const path = sanity?._key ? `sections[_key=="${sanity._key}"]` : null;

  return (
    <section className="relative z-10 px-4 md:px-8 pb-12 md:pb-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="group max-w-4xl mx-auto"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 group-hover:text-cyan-600 transition-colors">
          <Editable
            documentId={documentId}
            path={path && `${path}.title`}
            value={st(sanity?.title, `${i18nPrefix}.title`)}
          />
        </h2>
        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed font-light italic whitespace-pre-wrap">
          <Editable
            documentId={documentId}
            path={path && `${path}.content`}
            value={st(sanity?.content, `${i18nPrefix}.content`)}
          />
        </div>
        <div className="h-px w-full bg-gray-100 mt-12 md:mt-16" />
      </motion.div>
    </section>
  );
}

export default LegalSectionBlock;
