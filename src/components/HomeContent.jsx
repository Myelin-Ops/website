"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function HomeContent() {
  const { t } = useTranslation();
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

  return (
    <div className="relative w-full min-h-[45vh] md:min-h-screen overflow-hidden">
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
        className="relative z-10 flex flex-col items-center self-center mt-32 md:mt-65 px-4 text-center"
      >
        {/* Mobile-tablet: all combined into one h1 */}
        <h1 className="block xl:hidden text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          {t("hero.title")}{" "}
          {t("hero.subtitle")
            .split(" ")
            .map((word, index) => (
              <span
                key={index}
                className={
                  word === t("hero.highlight") ? " text-[#13ECEC]" : ""
                }
              >
                {word}
                {index < t("hero.subtitle").split(" ").length - 1 && " "}
              </span>
            ))}
        </h1>

        {/* Desktop: two separate h1s */}
        <h1 className="hidden xl:block text-6xl font-extrabold leading-none mb-2">
          {t("hero.title")}
        </h1>
        <h1 className="hidden xl:block text-6xl font-extrabold leading-none max-w-3/4 mb-8">
          {t("hero.subtitle")
            .split(" ")
            .map((word, index) => (
              <span
                key={index}
                className={
                  (word === "thrive." ? "block" : "") +
                  (word === t("hero.highlight") ? " text-[#13ECEC]" : "")
                }
              >
                {word}
                {index < t("hero.subtitle").split(" ").length - 1 && " "}
              </span>
            ))}
        </h1>

        <p className="hidden md:block text-gray-500 text-base md:text-lg max-w-md md:max-w-xl">
          {t("hero.description")}
        </p>
      </motion.div>
    </div>
  );
}

export default HomeContent;
