'use client'

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

function HomeContent() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Left Background Blur */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 0.6, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/12 opacity-60 pointer-events-none"
      >
        <Image
          src="/background-blur.svg"
          alt=""
          width={600}
          height={600}
          className="blur-3xl"
        />
      </motion.div>

      {/* Right Background Blur */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.6, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute right-0 top-1/2 -translate-y-120 translate-x-1/12 opacity-60 pointer-events-none"
      >
        <Image
          src="/background-blur-2.svg"
          alt=""
          width={600}
          height={600}
          className="blur-3xl"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center self-center mt-55 md:mt-50 px-4 text-center" 
      >
        <motion.h1
          variants={itemVariants}
          className="text-3xl md:text-6xl font-extrabold leading-tight md:leading-none max-w-4xl md:max-w-5xl mb-6 md:mb-8"
        >
          We are the protective layer that helps{" "}
          <span className="text-[#13ECEC]">organizations</span> and people
          thrive.
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-gray-500 text-base md:text-lg max-w-md md:max-w-xl"
        >
          Science-based strategies that protect your culture, elevate
          leadership, and drive sustainable performance.
        </motion.p>
      </motion.div>
    </div>
  );
}

export default HomeContent;
