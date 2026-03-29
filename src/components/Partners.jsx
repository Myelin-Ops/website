'use client'

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import partner1 from "@/assets/images/partners/partner1.png";
import partner2 from "@/assets/images/partners/partner2.png";
import partner3 from "@/assets/images/partners/partner3.png";
import partner4 from "@/assets/images/partners/partner4.png";

const partners = [
  { id: 1, src: partner1, alt: "Partner 1" },
  { id: 2, src: partner2, alt: "Partner 2" },
  { id: 3, src: partner3, alt: "Partner 3" },
  { id: 4, src: partner4, alt: "Partner 4" },
];

function Partners() {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="w-full py-12 md:py-20 px-4 bg-white">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="text-center mb-12 md:mb-16"
      >
        <h2 className="text-2xl md:text-4xl font-bold text-black tracking-widest uppercase">
          {t('partners.title')}
        </h2>
      </motion.div>

      {/* Partners Grid */}
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center justify-items-center"
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.id}
              variants={itemVariants}
              className="relative w-full h-32 md:h-40 flex items-center justify-center"
            >
              <Image
                src={partner.src}
                alt={partner.alt}
                fill
                className="object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Partners;
