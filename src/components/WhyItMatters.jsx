'use client'

import React from "react";
import { motion } from "framer-motion";

function WhyItMatters() {
  return (
    <section className="w-full py-16 md:py-24 px-4 bg-[#0F1419]">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs md:text-sm font-semibold text-gray-400 tracking-widest uppercase">
            WHY IT MATTERS
          </p>
        </motion.div>

        {/* Content Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Organizations are living systems.
            </h2>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              Organizations function as interconnected ecosystems where performance stems with internal dynamics.
            </p>
          </motion.div>

          {/* Right Side - Placeholder for Background Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative w-full h-80 md:h-96 bg-gradient-to-br from-[#1a2a4a] to-[#0F1419] rounded-lg border border-gray-700 flex items-center justify-center"
          >
            <p className="text-gray-500 text-sm">Background image placeholder</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default WhyItMatters;
