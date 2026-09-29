"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSanityContent } from "@/lib/useSanityContent";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function CategoriesBlock({ data }) {
  const { sanity, st } = useSanityContent(data);

  return (
    <section className="py-16 md:py-24 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl md:text-4xl font-black text-gray-900 mb-6"
          >
            {st(sanity?.title, "categories.title")}
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-gray-600 text-base max-w-3xl mx-auto"
          >
            {st(sanity?.subtitle, "categories.subtitle")}
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {(sanity?.categories || []).map((category, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="p-6 md:p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {st(category?.label, `categories.${category?.key}.label`)}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default CategoriesBlock;
