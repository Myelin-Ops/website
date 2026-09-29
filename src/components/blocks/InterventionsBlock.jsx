"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSanityContent } from "@/lib/useSanityContent";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function InterventionsBlock({ data }) {
  const { t, sanity, st } = useSanityContent(data);

  return (
    <section className="py-16 md:py-24 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {Object.entries(sanity?.interventions || {}).map(([key, intervention]) => (
            <motion.div
              key={key}
              variants={fadeUp}
              className="p-8 bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-100 hover:shadow-lg transition-all"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {st(intervention?.title, `interventions.${key}.title`)}
              </h3>
              <p className="text-gray-600 mb-6">
                {st(intervention?.description, `interventions.${key}.description`)}
              </p>
              <ul className="space-y-2">
                {(intervention?.items || []).map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-cyan-500 rounded-full shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default InterventionsBlock;
