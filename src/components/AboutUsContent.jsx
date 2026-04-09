"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Brain,
  Zap,
  Shield,
  ShieldCheck,
  Lightbulb,
  Handshake,
  Layers,
} from "lucide-react";

// Import images
import gallery1 from "@/assets/images/gallery/gallery1.png";
import gallery2 from "@/assets/images/gallery/gallery2.png";
import partner1 from "@/assets/images/partners/partner1.png";
import partner2 from "@/assets/images/partners/partner2.png";
import partner3 from "@/assets/images/partners/partner3.png";
import partner4 from "@/assets/images/partners/partner4.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};

function AboutUsContent() {
  const { t } = useTranslation();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col justify-center px-4 md:px-12 text-center max-w-5xl mx-auto">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-4xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight"
        >
          {t("about.hero.title")}
        </motion.h1>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
        >
          {t("about.hero.subtitle")}
        </motion.p>
      </section>

      {/* The Myelin Metaphor Section */}
      <section className="min-h-screen flex items-center px-4 md:px-12 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto w-full py-20">
          <div className="text-center mb-20">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              {t("about.metaphor.title")}
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-gray-600 text-lg"
            >
              {t("about.metaphor.subtitle")}
            </motion.p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Card 1: Brain */}
            <motion.div
              variants={fadeUp}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-500">
                <Brain size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">
                {t("about.metaphor.cards.brain.title")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t("about.metaphor.cards.brain.description")}
              </p>
            </motion.div>

            {/* Card 2: Neurons */}
            <motion.div
              variants={fadeUp}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center"
            >
              <div className="w-16 h-16 bg-cyan-50 rounded-full flex items-center justify-center mx-auto mb-6 text-cyan-500">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">
                {t("about.metaphor.cards.neurons.title")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t("about.metaphor.cards.neurons.description")}
              </p>
            </motion.div>

            {/* Card 3: Protective Layer */}
            <motion.div
              variants={fadeUp}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center"
            >
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">
                {t("about.metaphor.cards.protective.title")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t("about.metaphor.cards.protective.description")}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="min-h-screen flex items-center px-8 md:px-12">
        <div className="max-w-7xl mx-auto w-full py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-[#EAF7F7] p-8 rounded-3xl"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 ">
                {t("about.approach.title")}
              </h2>
              <p className="text-lg text-gray-700 mb-6 font-medium">
                {t("about.approach.description1")}
              </p>
              <ul className="space-y-4 mb-8">
                {t("about.approach.items", { returnObjects: true }).map(
                  (item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-gray-600"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 bg-black rounded-full shrink-0" />
                      <span>{item}</span>
                    </li>
                  ),
                )}
              </ul>
              <p className="text-gray-600 italic border-l-4 border-gray-200 pl-6 py-2 ">
                {t("about.approach.description2")}
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-2 gap-4 relative"
            >
              <motion.div
                variants={fadeUp}
                className="rounded-3xl overflow-hidden shadow-lg h-64 md:h-80"
              >
                <Image
                  src={gallery1}
                  alt="Workshop illustration"
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                variants={fadeUp}
                className="rounded-3xl overflow-hidden shadow-lg h-64 md:h-80 mt-12"
              >
                <Image
                  src={gallery2}
                  alt="Meeting illustration"
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-32 px-4 md:px-12 bg-gray-50/50 grayscale opacity-80">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-12">
            {t("about.partners.title")}
          </h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center"
          >
            {[partner1, partner2, partner3, partner4, partner1, partner2].map(
              (src, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex justify-center"
                >
                  <Image
                    src={src}
                    alt={`Partner ${i + 1}`}
                    width={150}
                    height={80}
                    className="max-h-12 w-auto object-contain"
                  />
                </motion.div>
              ),
            )}
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="min-h-screen flex items-center px-4 md:px-12 max-w-7xl mx-auto">
        <div className="w-full py-24">
          <div className="text-center mb-20">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              {t("about.values.title")}
            </motion.h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Protection */}
            <motion.div
              variants={fadeUp}
              className="p-8 rounded-2xl border border-gray-100 hover:border-black transition-colors group"
            >
              <ShieldCheck
                className="mb-6 group-hover:scale-110 transition-transform"
                size={32}
              />
              <h3 className="text-xl font-bold mb-3">
                {t("about.values.protection.title")}
              </h3>
              <p className="text-gray-600 text-sm">
                {t("about.values.protection.description")}
              </p>
            </motion.div>

            {/* Clarity */}
            <motion.div
              variants={fadeUp}
              className="p-8 rounded-2xl border border-gray-100 hover:border-black transition-colors group"
            >
              <Lightbulb
                className="mb-6 group-hover:scale-110 transition-transform"
                size={32}
              />
              <h3 className="text-xl font-bold mb-3">
                {t("about.values.clarity.title")}
              </h3>
              <p className="text-gray-600 text-sm">
                {t("about.values.clarity.description")}
              </p>
            </motion.div>

            {/* Trust */}
            <motion.div
              variants={fadeUp}
              className="p-8 rounded-2xl border border-gray-100 hover:border-black transition-colors group"
            >
              <Handshake
                className="mb-6 group-hover:scale-110 transition-transform"
                size={32}
              />
              <h3 className="text-xl font-bold mb-3">
                {t("about.values.trust.title")}
              </h3>
              <p className="text-gray-600 text-sm">
                {t("about.values.trust.description")}
              </p>
            </motion.div>

            {/* Accommodation */}
            <motion.div
              variants={fadeUp}
              className="p-8 rounded-2xl border border-gray-100 hover:border-black transition-colors group"
            >
              <Layers
                className="mb-6 group-hover:scale-110 transition-transform"
                size={32}
              />
              <h3 className="text-xl font-bold mb-3">
                {t("about.values.accommodation.title")}
              </h3>
              <p className="text-gray-600 text-sm">
                {t("about.values.accommodation.description")}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About CTA Section */}
      <section className="min-h-[80vh] flex items-center px-4 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-6xl mx-auto w-full rounded-4xl bg-gray-900 overflow-hidden relative"
        >
          {/* Gradient decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-bl from-cyan-500/20 to-transparent rounded-full -mr-48 -mt-48 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-blue-500/10 to-transparent rounded-full -ml-48 -mb-48 blur-3xl pointer-events-none" />

          <div className="relative z-10 py-24 px-8 md:px-20 text-center text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              {t("about.cta.title")}
            </h2>
            <p className="text-gray-400 text-xl mb-12 max-w-3xl mx-auto">
              {t("about.cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-10 py-5 bg-[#00E5E5] text-black font-bold rounded-full text-lg hover:scale-105 transition-transform">
                {t("about.cta.primaryButton")}
              </button>
              <button className="px-10 py-5 border border-white/20 text-white font-bold rounded-full text-lg hover:bg-white/10 transition-colors">
                {t("about.cta.secondaryButton")}
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default AboutUsContent;
