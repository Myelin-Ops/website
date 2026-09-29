"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSanityContent } from "@/lib/useSanityContent";
import Editable from "@/components/admin/Editable";
import { ShieldCheck, Lightbulb, Handshake, Zap } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};

const iconMap = {
  protection: ShieldCheck,
  clarity: Lightbulb,
  trust: Handshake,
  acceleration: Zap,
};

const DEFAULT_KEYS = ["protection", "clarity", "trust", "acceleration"];

function ValuesBlock({ data, documentId, i18nPrefix = "values" }) {
  const { sanity, st } = useSanityContent(data);
  const path = sanity?._key ? `sections[_key=="${sanity._key}"]` : null;
  const keys = Object.keys(sanity?.items || {}).length ? Object.keys(sanity.items) : DEFAULT_KEYS;

  return (
    <section className="min-h-0 md:min-h-screen flex items-center px-4 md:px-12 max-w-7xl mx-auto">
      <div className="w-full py-16 md:py-24">
        <div className="text-center mb-12 md:mb-20">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            <Editable
              documentId={documentId}
              path={path && `${path}.title`}
              value={st(sanity?.title, `${i18nPrefix}.title`)}
            />
          </motion.h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {keys.map((key) => {
            const item = sanity?.items?.[key];
            const IconComponent = iconMap[key];
            return (
              <motion.div
                key={key}
                variants={fadeUp}
                className="p-6 md:p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center"
              >
                {IconComponent && (
                  <IconComponent className="w-10 h-10 mb-6" style={{ color: "#13ECEC" }} />
                )}
                <h3 className="text-xl font-bold mb-4">
                  {st(item?.title, `${i18nPrefix}.${key}.title`)}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                  {st(item?.description, `${i18nPrefix}.${key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default ValuesBlock;
