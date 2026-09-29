"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSanityContent } from "@/lib/useSanityContent";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function CreditsBodyBlock({ data }) {
  const { sanity, st } = useSanityContent(data);

  return (
    <section className="py-16 md:py-24 px-4 md:px-12">
      <div className="max-w-3xl mx-auto">
        {/* Supervisor */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-12 p-8 bg-[#F9FAFB] rounded-2xl"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {st(sanity?.supervisorLabel, "credits.supervisor.label")}
          </h3>
          <p className="text-lg text-gray-600">{sanity?.supervisorName}</p>
        </motion.div>

        {/* Team Lead */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-12 p-8 bg-[#F9FAFB] rounded-2xl"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {st(sanity?.leadLabel, "credits.lead.label")}
          </h3>
          <p className="text-lg text-gray-600">{sanity?.leadName}</p>
        </motion.div>

        {/* Developers */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-12 p-8 bg-[#F9FAFB] rounded-2xl"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {st(sanity?.developersLabel, "credits.developers.label")}
          </h3>
          <p className="text-lg text-gray-600">{sanity?.developersNames}</p>
        </motion.div>

        {/* Outro */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="pt-8 border-t border-gray-200"
        >
          <p className="text-gray-600 leading-relaxed">
            {st(sanity?.outro, "credits.outro")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default CreditsBodyBlock;
