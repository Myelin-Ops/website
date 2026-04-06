'use client'

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function CTA() {
  const { t } = useTranslation();
  return (
    <section className="w-full py-12 md:py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#111818] to-[#0f2629] rounded-2xl p-8 md:p-12 text-center"
        >
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            {t('cta.title')}
          </h2>

          {/* Description */}
          <p className="text-gray-300 text-sm md:text-base mb-8 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 md:px-8 py-3 md:py-4 bg-cyan-400 text-black font-semibold rounded-lg hover:bg-cyan-300 transition-colors w-full sm:w-auto"
            >
              {t('cta.primaryButton')}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 md:px-8 py-3 md:py-4 border border-gray-500 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors w-full sm:w-auto"
            >
              {t('cta.secondaryButton')}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTA;
