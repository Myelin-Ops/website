"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSanityContent } from "@/lib/useSanityContent";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};

function MetaphorBlock({ data }) {
  const { sanity, st } = useSanityContent(data);

  return (
    <section className="min-h-0 md:min-h-screen flex items-center px-4 md:px-12 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto w-full py-12 md:py-20">
        <div className="text-center mb-12 md:mb-20">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl md:text-4xl font-black text-gray-900 mb-6"
          >
            {st(sanity?.title, "metaphor.title")}
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-gray-600 text-base"
          >
            {st(sanity?.subtitle, "metaphor.subtitle")}
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {Object.entries(sanity?.cards || {}).map(([key, card]) => (
            <motion.div
              key={key}
              variants={fadeUp}
              className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-center flex flex-col items-center"
            >
              <h3 className="text-2xl font-bold mb-4 md:mb-6 italic">
                {st(card?.title, `metaphor.${key}.title`)}
              </h3>
              <p className="text-gray-500 leading-relaxed text-base lg:text-lg">
                {st(card?.description, `metaphor.${key}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default MetaphorBlock;
