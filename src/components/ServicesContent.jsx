"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
  Users,
  Brain,
  Globe,
  Network,
  SearchCheck,
  Zap,
  Briefcase,
  ChevronRight,
  TrendingUp,
  Target,
  ShieldCheck,
  BarChart3,
  Settings2,
  CheckCircle2,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};

function ServicesContent() {
  const { t } = useTranslation();

  const categories = [
    { id: "01", key: "dynamics" },
    { id: "02", key: "assessments" },
    { id: "03", key: "leadership" },
    { id: "04", key: "reintegration" },
    { id: "05", key: "tailored" },
  ];

  const methodology = [
    {
      key: "diagnostic",
      icon: BarChart3,
    },
    {
      key: "strategy",
      icon: TrendingUp,
    },
    {
      key: "implementation",
      icon: Settings2,
    },
  ];

  const interventions = [
    {
      key: "groupDynamics",
      icon: Users,
    },
    {
      key: "neuroLeadership",
      icon: Brain,
    },
    {
      key: "advancement",
      icon: Network,
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] md:min-h-[60vh] flex flex-col justify-center px-4 md:px-12 text-center max-w-6xl mx-auto py-12 md:py-20 overflow-hidden">
        {/* Background Glow (Signature Style) */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none z-0"
        >
          <Image
            src="/background-blur.svg"
            alt=""
            width={1000}
            height={1000}
            className="blur-[80px] opacity-70 scale-125"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="relative z-10"
        >
          <h1 className="text-3xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
            {t("services.hero.title")}
          </h1>
          <p className="text-sm md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("services.hero.subtitle")}
          </p>
        </motion.div>
      </section>

      {/* Comprehensive Interventions Section */}
      <section className="py-24 md:py-48 px-4 md:px-12 bg-[#F6F8F8] border-t border-gray-50 flex items-center min-h-[60vh]">
        <div className="max-w-[1440px] mx-auto text-center w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
              {t("services.intro.title")}
            </h2>
            <p className="text-gray-500 text-sm md:text-xl max-w-4xl mx-auto mb-32 leading-relaxed">
              {t("services.intro.subtitle")}
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-20 gap-x-12 md:gap-4 items-start">
              {categories.map((cat, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className={`flex flex-col items-center gap-4 group ${i === categories.length - 1 ? "col-span-2 lg:col-span-1" : ""}`}
                >
                  <span className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-[0.3em] text-[#13ECEC] uppercase">
                    {cat.id}
                  </span>
                  <span className="text-sm md:text-lg font-bold text-gray-900 tracking-tight text-center leading-snug max-w-[250px]">
                    {t(`services.intro.categories.${cat.key}`)}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-24 px-4 md:px-12 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-5xl font-black text-gray-900 mb-6">
              {t("services.methodology.title")}
            </h2>
            <p className="text-gray-500 text-base md:text-xl">
              {t("services.methodology.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-[339px]:gap-4">
            {methodology.map((step) => (
              <motion.div
                key={step.key}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-[#F6F8F8] p-12 max-[339px]:p-5 rounded-3xl border border-gray-100/50 hover:shadow-xl transition-all duration-500"
              >
                <div className="w-14 h-14 max-[339px]:w-10 max-[339px]:h-10 bg-white rounded-2xl flex items-center justify-center mb-10 max-[339px]:mb-4 shadow-sm">
                  <step.icon
                    className="w-7 h-7 max-[339px]:w-5 max-[339px]:h-5"
                    style={{ color: "#13ECEC" }}
                  />
                </div>
                <h3 className="text-2xl max-[339px]:text-lg font-bold mb-4 max-[339px]:mb-2">
                  {t(`services.methodology.steps.${step.key}.title`)}
                </h3>
                <p className="text-gray-500 leading-relaxed text-base max-[339px]:text-xs max-[339px]:leading-snug">
                  {t(`services.methodology.steps.${step.key}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interventions Details Grid */}
      <section className="py-32 px-4 md:px-12 bg-[#F6F8F8]">
        <div className="max-w-[1840px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 2xl:grid-cols-3 gap-8"
          >
            {interventions.map((service) => (
              <motion.div
                key={service.key}
                variants={fadeUp}
                className="group p-10 md:p-14 rounded-[40px] bg-white border border-gray-100 hover:border-[#13ECEC]/30 transition-all duration-500 flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-10">
                  <div className="w-16 h-16 rounded-2xl bg-[#13DAEC]/10 flex items-center justify-center">
                    <service.icon size={32} style={{ color: "#13ECEC" }} />
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-8 tracking-tight">
                  {t(`services.list.${service.key}.title`)}
                </h3>

                <p className="text-gray-500 text-lg mb-10 leading-relaxed">
                  {t(`services.list.${service.key}.description`)}
                </p>

                <ul className="mt-auto space-y-5 pt-10 border-t border-gray-100/50">
                  {t(`services.list.${service.key}.items`, {
                    returnObjects: true,
                  }).map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-base text-gray-700 font-medium"
                    >
                      <span className="w-1.5 h-1.5 bg-[#13ECEC] rounded-full mt-2.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-0 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="w-full bg-[#111818] overflow-hidden relative"
        >
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-linear-to-bl from-[#13ECEC]/10 to-transparent rounded-full -mr-64 -mt-64 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-linear-to-tr from-blue-500/5 to-transparent rounded-full -ml-64 -mb-64 blur-3xl pointer-events-none" />

          <div className="relative z-10 py-24 px-4 text-center text-white">
            <h2 className="text-2xl md:text-5xl font-black md:max-w-[600px] mb-8 max-w-4xl mx-auto leading-tight">
              {t("services.cta.title")}
            </h2>
            <p className="hidden md:block text-gray-400 text-sm md:text-base mb-12 max-w-2xl mx-auto leading-relaxed">
              {t("services.cta.description")}
            </p>
            <Link href="/contact" className="inline-block mb-14">
              <button className="px-4 py-4 cursor-pointer md:px-12 md:py-5 bg-[#13ECEC] text-black font-extrabold rounded-md text-base md:text-lg hover:scale-105 transition-all shadow-2xl shadow-cyan-500/20 active:scale-95">
                {t("services.cta.button")}
              </button>
            </Link>
            <div className="border-t border-white/5 pt-10">
              <p className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0 text-[10px] font-bold tracking-[0.4em] text-gray-500 uppercase">
                <span>{t("services.cta.frameworks")}</span>
                <span className="md:mx-4">•</span>
                <span>{t("services.cta.alignment")}</span>
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default ServicesContent;
