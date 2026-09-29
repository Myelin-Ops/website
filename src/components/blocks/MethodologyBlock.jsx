"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSanityContent } from "@/lib/useSanityContent";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function MethodologyBlock({ data }) {
  const { sanity, st } = useSanityContent(data);

  return (
    <section className="py-16 md:py-24 px-4 md:px-12 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl md:text-4xl font-black text-gray-900 mb-6"
          >
            {st(sanity?.title, "methodology.title")}
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-gray-600 text-base max-w-3xl mx-auto"
          >
            {st(sanity?.subtitle, "methodology.subtitle")}
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {Object.entries(sanity?.steps || {}).map(([key, step], i) => (
            <motion.div
              key={key}
              variants={fadeUp}
              className="p-6 md:p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all"
            >
              <div className="text-3xl font-bold text-cyan-500 mb-4">{i + 1}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {st(step?.title, `methodology.${key}.title`)}
              </h3>
              <p className="text-gray-600">
                {st(step?.description, `methodology.${key}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default MethodologyBlock;
