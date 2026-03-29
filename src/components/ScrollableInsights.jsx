'use client'

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import whyItMatters2 from "../assets/images/background/why-it-matters-2.png";
import whyItMatters3 from "../assets/images/background/why-it-matters-3.png";
import whyItMatters4 from "../assets/images/background/why-it-matters-4.png";
import Image from "next/image";

function ScrollableInsights() {
  const { t } = useTranslation();

  const insights = [
    {
      id: 1,
      title: t('scrollableInsights.card1.title'),
      description: t('scrollableInsights.card1.description'),
      image: whyItMatters2,
    },
    {
      id: 2,
      title: t('scrollableInsights.card2.title'),
      description: t('scrollableInsights.card2.description'),
      image: whyItMatters3,
    },
    {
      id: 3,
      title: t('scrollableInsights.card3.title'),
      description: t('scrollableInsights.card3.description'),
      image: whyItMatters4,
    },
  ];
  return (
    <section className="w-full py-16 md:py-24 px-4 bg-[#0F1419]">
      <div className="max-w-7xl mx-auto">
        {/* Scrollable Cards Container */}
        <div className="space-y-8 md:space-y-12">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left Content */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                    {insight.title}
                  </h3>
                  <p className="text-base text-gray-300 leading-relaxed">
                    {insight.description}
                  </p>
                </div>

                {/* Right Side - Background Image */}
                <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
                  <Image
                    src={insight.image}
                    alt={insight.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll hint for mobile */}
        <p className="text-xs text-gray-500 mt-4 md:hidden">
          {t('scrollableInsights.scrollHint')}
        </p>
      </div>
    </section>
  );
}

export default ScrollableInsights;
