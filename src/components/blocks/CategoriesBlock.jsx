"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSanityContent } from "@/lib/useSanityContent";
import Editable from "@/components/admin/Editable";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const DEFAULT_KEYS = ["dynamics", "assessments", "leadership", "reintegration", "tailored"];

function CategoriesBlock({ data, documentId, i18nPrefix = "categories" }) {
  const { sanity, st } = useSanityContent(data);
  const path = sanity?._key ? `sections[_key=="${sanity._key}"]` : null;
  const categories = sanity?.categories?.length
    ? sanity.categories
    : DEFAULT_KEYS.map((key) => ({ key }));

  return (
    <section className="py-24 md:py-48 px-4 md:px-12 bg-[#F6F8F8] border-t border-gray-50 flex items-center min-h-[60vh]">
      <div className="max-w-360 mx-auto text-center w-full">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
            <Editable
              documentId={documentId}
              path={path && `${path}.title`}
              value={st(sanity?.title, `${i18nPrefix}.title`)}
            />
          </h2>
          <p className="text-gray-500 text-sm md:text-xl max-w-4xl mx-auto mb-32 leading-relaxed">
            <Editable
              documentId={documentId}
              path={path && `${path}.subtitle`}
              value={st(sanity?.subtitle, `${i18nPrefix}.subtitle`)}
            />
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-20 gap-x-12 md:gap-4 items-start">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.key ?? i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`flex flex-col items-center gap-4 group ${i === categories.length - 1 ? "col-span-2 lg:col-span-1" : ""}`}
              >
                <span className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-[0.3em] text-[#13ECEC] uppercase">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm md:text-lg font-bold text-gray-900 tracking-tight text-center leading-snug max-w-62.5">
                  {st(cat.label, `${i18nPrefix}.categories.${cat.key}`)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CategoriesBlock;
