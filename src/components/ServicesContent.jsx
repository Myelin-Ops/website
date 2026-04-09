"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
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
  ShieldAlert
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
    { icon: TrendingUp, label: "Organizational..." },
    { icon: Target, label: "Optional Interventions" },
    { icon: SearchCheck, label: "Individual Capability" },
    { icon: Network, label: "Vertical Development" },
    { icon: ShieldAlert, label: "Technical Support" },
  ];

  const methodology = [
    {
      key: "diagnostic",
      icon: SearchCheck,
      color: "bg-blue-50 text-blue-500",
    },
    {
      key: "strategy",
      icon: Zap,
      color: "bg-cyan-50 text-cyan-500",
    },
    {
      key: "implementation",
      icon: Briefcase,
      color: "bg-emerald-50 text-emerald-500",
    },
  ];

  const interventions = [
    {
      key: "groupDynamics",
      icon: Users,
      color: "text-blue-500",
    },
    {
      key: "neuroLeadership",
      icon: Brain,
      color: "text-cyan-500",
    },
    {
      key: "migration",
      icon: Globe,
      color: "text-indigo-500",
    },
    {
      key: "advancement",
      icon: Network,
      color: "text-emerald-500",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex flex-col justify-center px-4 md:px-12 text-center max-w-6xl mx-auto py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            {t("services.hero.title")}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t("services.hero.subtitle")}
          </p>
        </motion.div>
      </section>

      {/* Category Mini-Nav */}
      <section className="py-12 border-y border-gray-100 bg-gray-50/30 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex justify-between items-center gap-8 min-w-max">
          {categories.map((cat, i) => (
            <div key={i} className="flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
              <cat.icon size={20} className="text-gray-900" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-gray-900">
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Intro Description Section */}
      <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto text-center">
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           variants={fadeUp}
        >
          <span className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase mb-4 block">
            {t("services.intro.title")}
          </span>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("services.intro.description")}
          </h2>
        </motion.div>
      </section>

      {/* Methodology Section */}
      <section className="py-24 px-4 md:px-12 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              {t("services.methodology.title")}
            </h2>
            <p className="text-gray-500 text-lg">
              {t("services.methodology.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {methodology.map((step) => (
              <motion.div
                key={step.key}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100/50 hover:shadow-xl transition-all duration-500"
              >
                <div className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center mb-8`}>
                  <step.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  {t(`services.methodology.steps.${step.key}.title`)}
                </h3>
                <p className="text-gray-600 leading-relaxed italic">
                  {t(`services.methodology.steps.${step.key}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interventions Grid */}
      <section className="py-32 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {interventions.map((service) => (
              <motion.div
                key={service.key}
                variants={fadeUp}
                className="group p-10 md:p-12 rounded-[40px] bg-white border border-gray-100 hover:border-black transition-all duration-500 flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className={`p-4 rounded-2xl bg-gray-50 ${service.color} group-hover:bg-black group-hover:text-white transition-colors`}>
                    <service.icon size={32} />
                  </div>
                  <ChevronRight className="text-gray-300 group-hover:text-black transition-colors" size={24} />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold mb-6 group-hover:translate-x-2 transition-transform">
                  {t(`services.list.${service.key}.title`)}
                </h3>
                
                <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                  {t(`services.list.${service.key}.description`)}
                </p>

                <ul className="mt-auto space-y-4 pt-8 border-t border-gray-100">
                  {t(`services.list.${service.key}.items`, { returnObjects: true }).map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                      <span className="w-1.5 h-1.5 bg-black rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-4 md:px-12 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-6xl mx-auto rounded-[60px] bg-gray-900 overflow-hidden relative"
        >
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-linear-to-bl from-[#00E5E5]/10 to-transparent rounded-full -mr-64 -mt-64 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-linear-to-tr from-blue-500/10 to-transparent rounded-full -ml-64 -mb-64 blur-3xl pointer-events-none" />

          <div className="relative z-10 py-24 px-8 md:px-20 text-center text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 max-w-4xl mx-auto leading-tight">
              {t("services.cta.title")}
            </h2>
            <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              {t("services.cta.description")}
            </p>
            <button className="px-12 py-5 bg-[#00E5E5] text-black font-extrabold rounded-full text-lg hover:scale-105 transition-all shadow-2xl shadow-cyan-500/20 active:scale-95">
              {t("services.cta.button")}
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default ServicesContent;
