"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import Image from "next/image";

// Images
import whyItMatters1 from "../assets/images/background/why-it-matters-1.png";
import whyItMatters2 from "../assets/images/background/why-it-matters-2.png";
import whyItMatters3 from "../assets/images/background/why-it-matters-3.png";
import whyItMatters4 from "../assets/images/background/why-it-matters-4.png";

function WhyItMatters() {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Sequential piling transforms
  const y2 = useTransform(scrollYProgress, [0.22, 0.45], ["100vh", "0vh"]);
  const y3 = useTransform(scrollYProgress, [0.48, 0.72], ["100vh", "0vh"]);
  const y4 = useTransform(scrollYProgress, [0.75, 0.98], ["100vh", "0vh"]);

  const sections = [
    {
      id: 1,
      label: t("whyItMatters.label"),
      title: t("whyItMatters.title"),
      description: t("whyItMatters.description"),
      image: whyItMatters1,
      y: 0,
      zIndex: 10,
    },
    {
      id: 2,
      title: t("scrollableInsights.card1.title"),
      description: t("scrollableInsights.card1.description"),
      image: whyItMatters2,
      y: y2,
      zIndex: 20,
    },
    {
      id: 3,
      title: t("scrollableInsights.card2.title"),
      description: t("scrollableInsights.card2.description"),
      image: whyItMatters3,
      y: y3,
      zIndex: 30,
    },
    {
      id: 4,
      title: t("scrollableInsights.card3.title"),
      description: t("scrollableInsights.card3.description"),
      image: whyItMatters4,
      y: y4,
      zIndex: 40,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative h-[400vh] bg-[#030708] overflow-visible"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            style={{
              y: section.y,
              zIndex: section.zIndex,
            }}
            className="absolute bg-[#0F1A24] inset-0 w-full h-full flex items-center shadow-[0_-10px_40px_rgba(0,0,0,0.7)]"
          >
            <div className="max-w-7xl mx-auto w-full px-4 md:px-8">
              {/* Section Label (Original Design: Top Centered) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center mb-6"
              >
                <p className="text-xs md:text-xl font-semibold text-gray-400 tracking-widest uppercase">
                  {section.label}
                </p>
              </motion.div>

              {/* Grid Content (Refined for mobile centering) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center md:text-left"
                >
                  <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 md:mb-8 leading-tight">
                    {section.title}
                  </h2>
                  <p className="text-base md:text-lg lg:text-xl text-gray-400 leading-relaxed max-w-lg mx-auto md:mx-0">
                    {section.description}
                  </p>
                </motion.div>

                {/* Right Side - Image Area (Hidden on mobile) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7 }}
                  style={{
                    maskImage:
                      "radial-gradient(circle, black 40%, transparent 80%)",
                    WebkitMaskImage:
                      "radial-gradient(circle, black 40%, transparent 80%)",
                  }}
                  className="hidden md:block relative aspect-square mx-auto h-72 md:h-96 lg:h-[32rem] rounded-full overflow-hidden"
                >
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover bg-[#0F1A24] opacity-80 mix-blend-screen transition-all duration-700"
                    priority={index === 0}
                  />
                  {/* Subtle gradient for depth */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#0F1A24]/40 to-transparent pointer-events-none" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default WhyItMatters;
