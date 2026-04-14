"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Brain, ShieldCheck, Lightbulb, Handshake, Zap } from "lucide-react";

// Import images
import gallery1 from "@/assets/images/gallery/gallery1.png";
import gallery2 from "@/assets/images/gallery/gallery2.png";

// New icons for metaphor
import neuronIcon from "@/assets/images/icons/neuron-icon.png";
import shieldIcon from "@/assets/images/icons/shield-icon.png";

// Institution Logos
import upLogo from "@/assets/images/partners/up-logo.png";
import uhzLogo from "@/assets/images/partners/uhz-logo.png";
import vushtrriaLogo from "@/assets/images/partners/vushtrria-logo.png";
import cacttusLogo from "@/assets/images/partners/cacttus-logo.png";
import albiLogo from "@/assets/images/partners/albi-logo.png";
import kosovajobLogo from "@/assets/images/partners/kosovajob-logo.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};

function AboutUsContent() {
  const { t } = useTranslation();

  const institutions = [
    {
      src: uhzLogo,
      label: "University of Prishtina",
      scale: "scale-120 md:scale-170",
    },
    {
      src: upLogo,
      label: "University of Peja",
      scale: "scale-100 md:scale-140",
    },
    {
      src: vushtrriaLogo,
      label: "Municipality of Vushtrria",
    },
    {
      src: cacttusLogo,
      label: "Cacttus Education",
      scale: "scale-140",
    },
    {
      src: albiLogo,
      label: "Albi Fashion Group",
      scale: "scale-110 md:scale-140",
    },
    { src: kosovajobLogo, label: "KosovaJob", scale: "scale-120 md:scale-150" },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-[80vh] flex flex-col justify-center px-4 md:px-12 text-center max-w-5xl mx-auto overflow-hidden">
        {/* Background Glows (Matching Homepage Style) */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none z-0"
        >
          <Image
            src="/background-blur.svg"
            alt=""
            width={1000}
            height={1000}
            className="blur-[80px] opacity-90 scale-125"
          />
        </motion.div>

        <div className="relative z-10 w-full">
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight"
          >
            {t("about.hero.title")}
          </motion.h1>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            {t("about.hero.subtitle")}
          </motion.p>
        </div>
      </section>

      <section className="min-h-0 md:min-h-screen flex items-center px-4 md:px-12 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto w-full py-12 md:py-20">
          <div className="text-center mb-12 md:mb-20">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
            >
              {t("about.metaphor.title")}
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-gray-600 text-base"
            >
              {t("about.metaphor.subtitle")}
            </motion.p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {/* Card 1: Brain */}
            <motion.div
              variants={fadeUp}
              className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-center flex flex-col items-center min-h-0 lg:min-h-[460px]"
            >
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 md:mb-10 text-blue-500">
                <Brain size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4 md:mb-6 italic">
                {t("about.metaphor.cards.brain.title")}
              </h3>
              <p className="text-gray-500 leading-relaxed text-base lg:text-lg">
                {t("about.metaphor.cards.brain.description")}
              </p>
            </motion.div>

            {/* Card 2: Neurons */}
            <motion.div
              variants={fadeUp}
              className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-center flex flex-col items-center min-h-0 lg:min-h-[460px]"
            >
              <div className="w-20 h-20 bg-cyan-50 rounded-full flex items-center justify-center mb-6 md:mb-10">
                <Image
                  src={neuronIcon}
                  alt="Neurons"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 md:mb-6 italic">
                {t("about.metaphor.cards.neurons.title")}
              </h3>
              <p className="text-gray-500 leading-relaxed text-base lg:text-lg">
                {t("about.metaphor.cards.neurons.description")}
              </p>
            </motion.div>

            {/* Card 3: Protective Layer */}
            <motion.div
              variants={fadeUp}
              className="p-6 md:p-10 rounded-3xl shadow-md transition-all text-center flex flex-col items-center min-h-0 lg:min-h-[460px]"
              style={{
                backgroundColor: "#EAF7F7",
                border: "1px solid #BFF5F5",
              }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6 md:mb-10 shadow-lg shadow-cyan-400/20"
                style={{ backgroundColor: "#13ECEC" }}
              >
                <Image
                  src={shieldIcon}
                  alt="Protection"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-4 md:mb-6 italic">
                {t("about.metaphor.cards.protective.title")}
              </h3>
              <p className="text-gray-600 leading-relaxed text-base lg:text-lg">
                {t("about.metaphor.cards.protective.description")}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="min-h-0 md:min-h-screen flex items-center px-4 md:px-12">
        <div className="max-w-7xl mx-auto w-full py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-[#EAF7F7] p-6 md:p-8 rounded-3xl"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 ">
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
      <section className="py-16 md:py-32 px-4 md:px-12 bg-[#F6F8F8]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="text-xl md:text-4xl font-bold text-gray-900 mb-12 md:mb-20"
          >
            Trusted by Leading Institutions
          </motion.h2>
          <motion.div
            animate="visible"
            variants={stagger}
            className="grid grid-cols-2 lg:grid-cols-3 gap-y-12 md:gap-y-24 gap-x-8 md:gap-x-12 items-start"
          >
            {institutions.map((inst, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex flex-col items-center"
              >
                <div className="h-32 md:h-52 w-full flex items-center justify-center mb-6 md:mb-8 px-4">
                  <Image
                    src={inst.src}
                    alt={inst.label}
                    width={300}
                    height={200}
                    className={`max-h-full w-auto object-contain ${inst.scale || ""}`}
                  />
                </div>
                <h3 className="text-base md:text-xl font-bold text-gray-900 mt-4">
                  {inst.label}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="min-h-0 md:min-h-screen flex items-center px-4 md:px-12 max-w-7xl mx-auto">
        <div className="w-full py-16 md:py-24">
          <div className="text-center mb-12 md:mb-20">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              {t("about.values.title")}
            </motion.h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {/* Protection */}
            <motion.div
              variants={fadeUp}
              className="p-6 md:p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center"
            >
              <ShieldCheck
                className="mb-6"
                size={40}
                style={{ color: "#13ECEC" }}
              />
              <h3 className="text-xl font-bold mb-4">
                {t("about.values.protection.title")}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                {t("about.values.protection.description")}
              </p>
            </motion.div>

            {/* Clarity */}
            <motion.div
              variants={fadeUp}
              className="p-6 md:p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center"
            >
              <Lightbulb
                className="mb-6"
                size={40}
                style={{ color: "#13ECEC" }}
              />
              <h3 className="text-xl font-bold mb-4">
                {t("about.values.clarity.title")}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                {t("about.values.clarity.description")}
              </p>
            </motion.div>

            {/* Trust */}
            <motion.div
              variants={fadeUp}
              className="p-6 md:p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center"
            >
              <Handshake
                className="mb-6"
                size={40}
                style={{ color: "#13ECEC" }}
              />
              <h3 className="text-xl font-bold mb-4">
                {t("about.values.trust.title")}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                {t("about.values.trust.description")}
              </p>
            </motion.div>

            {/* Acceleration */}
            <motion.div
              variants={fadeUp}
              className="p-6 md:p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center"
            >
              <Zap className="mb-6" size={40} style={{ color: "#13ECEC" }} />
              <h3 className="text-xl font-bold mb-4">
                {t("about.values.acceleration.title")}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                {t("about.values.acceleration.description")}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About CTA Section */}
      <section className="py-12 md:py-20 px-4 md:px-12 flex items-center bg-[#F6F8F8]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-7xl mx-auto w-full rounded-4xl bg-[#111818] overflow-hidden relative"
        >
          {/* Gradient decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-bl from-cyan-500/20 to-transparent rounded-full -mr-48 -mt-48 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-blue-500/10 to-transparent rounded-full -ml-48 -mb-48 blur-3xl pointer-events-none" />

          <div className="relative z-10 py-16 md:py-24 px-8 md:px-20 text-center text-white">
            <h2 className="text-2xl md:text-4xl font-bold mb-8">
              {t("about.cta.title")}
            </h2>
            <p className="hidden md:block text-gray-400 text-base mb-12 max-w-3xl mx-auto">
              {t("about.cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact" className="w-full sm:w-auto">
                <button className="px-8 py-4 bg-[#00E5E5] text-black font-bold rounded-md text-base hover:scale-105 transition-transform w-full sm:w-[220px]">
                  {t("about.cta.primaryButton")}
                </button>
              </Link>
              <a
                href="/portfolio.pdf"
                download
                className="px-8 py-4 border border-white/20 text-white font-bold rounded-md text-base hover:bg-white/10 transition-colors flex items-center justify-center w-full sm:w-[220px]"
              >
                {t("about.cta.secondaryButton")}
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default AboutUsContent;
