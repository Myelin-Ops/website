'use client'

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import whyItMatters1 from "../assets/images/background/why-it-matters-1.png";
import Image from "next/image";

function WhyItMatters() {
  const { t } = useTranslation();
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
            {t('whyItMatters.label')}
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
              {t('whyItMatters.title')}
            </h2>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              {t('whyItMatters.description')}
            </p>
          </motion.div>

          {/* Right Side - Background Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden"
          >
            <Image
              src={whyItMatters1}
              alt="Why it matters background"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default WhyItMatters;
