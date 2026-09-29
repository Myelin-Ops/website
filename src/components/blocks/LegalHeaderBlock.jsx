"use client";

import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function LegalHeaderBlock({ block }) {
  const data = block?.en || block?.sq || {};

  return (
    <section className="py-16 md:py-24 px-4 md:px-12 pt-32 md:pt-40">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {data?.title || "Legal"}
          </h1>
          {data?.lastUpdated && (
            <p className="text-gray-500 text-sm">
              Last updated: {data.lastUpdated}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default LegalHeaderBlock;
