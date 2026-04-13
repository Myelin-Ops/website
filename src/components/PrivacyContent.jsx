"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Image from "next/image";

function PrivacyContent() {
  const { t } = useTranslation();

  const sections = [
    "introduction",
    "dataCollection",
    "useOfData",
    "security",
    "cookies",
    "thirdParties",
    "rights",
    "updates",
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="relative min-h-screen bg-white pt-32 pb-24 px-4 md:px-8 overflow-hidden">
      {/* Background Glows (Enhanced for Visibility) */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute left-1/2 top-[-100px] -translate-x-1/2 pointer-events-none z-0"
      >
        <Image
          src="/background-blur.svg"
          alt=""
          width={1000}
          height={1000}
          className="blur-[80px] opacity-90 scale-125"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute right-[-200px] top-[20%] pointer-events-none z-0"
      >
        <Image
          src="/background-blur-2.svg"
          alt=""
          width={600}
          height={600}
          className="blur-[60px] opacity-60"
        />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-black mb-6 tracking-tight"
          >
            {t("privacy.title")}
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-gray-500 font-medium tracking-widest uppercase text-sm"
          >
            {t("privacy.lastUpdated")}
          </motion.p>
          <motion.div 
            variants={itemVariants}
            className="w-20 h-1 bg-cyan-500 mx-auto mt-8 rounded-full" 
          />
        </div>

        {/* Content Sections */}
        <div className="space-y-12 md:space-y-20">
          {sections.map((section) => (
            <motion.section 
              key={section} 
              variants={itemVariants}
              className="group"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 group-hover:text-cyan-600 transition-colors">
                {t(`privacy.${section}.title`)}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed font-light italic">
                {t(`privacy.${section}.content`)}
              </div>
              <div className="h-[1px] w-full bg-gray-100 mt-12 md:mt-16" />
            </motion.section>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div 
          variants={itemVariants}
          className="mt-24 p-8 bg-gray-50 rounded-3xl text-center"
        >
          <p className="text-gray-500 text-sm">
            For any questions or concerns regarding our privacy practices, please contact us at{" "}
            <a href="mailto:info@myelinops.com" className="text-black font-semibold hover:text-cyan-600 transition-colors underline underline-offset-4">
              info@myelinops.com
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default PrivacyContent;
