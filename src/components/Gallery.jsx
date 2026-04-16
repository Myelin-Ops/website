"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import gallery1 from "../assets/images/gallery/gallery1.png";
import gallery2 from "../assets/images/gallery/gallery2.png";
import gallery3 from "../assets/images/gallery/gallery3.png";
import gallery4 from "../assets/images/gallery/gallery4.png";
import gallery5 from "../assets/images/gallery/gallery5.png";

const galleryImages = [
  {
    id: 1,
    src: gallery1,
    alt: "Team collaboration",
    span: "col-span-1 row-span-1",
  },
  {
    id: 2,
    src: gallery2,
    alt: "Meeting presentation",
    span: "col-span-1 row-span-1",
  },
  {
    id: 3,
    src: gallery3,
    alt: "Team group photo",
    span: "col-span-1 row-span-1",
  },
  {
    id: 4,
    src: gallery4,
    alt: "Workshop activity",
    span: "col-span-1 row-span-1",
  },
  {
    id: 5,
    src: gallery5,
    alt: "Team building",
    span: "col-span-1 md:col-span-2 row-span-1",
  },
];

function Gallery() {
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
    <section className="w-full py-12 md:py-24 px-4 bg-[#F9F9F9]">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="text-center mb-12 md:mb-16"
      >
        <h2 className="text-2xl md:text-4xl font-bold text-black tracking-widest uppercase">
          {t("gallery.title")}
        </h2>
      </motion.div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto">
        {/* Desktop Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden md:grid grid-cols-2 gap-4 auto-rows-[350px]"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              className={`${image.span} rounded-2xl overflow-hidden cursor-pointer group relative`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="md:hidden grid grid-cols-1 gap-4 auto-rows-[200px]"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              className="rounded-2xl overflow-hidden cursor-pointer group relative"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Gallery;
