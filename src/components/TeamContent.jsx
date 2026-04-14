"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Linkedin } from "lucide-react";

// Team images
import arnisaImg from "@/assets/images/team/arnisa.png";
import zanfinaImg from "@/assets/images/team/zanfina.png";
import arditaImg from "@/assets/images/team/ardita.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};

function TeamContent() {
  const { t } = useTranslation();

  const members = [
    { key: "zanfina", image: zanfinaImg },
    { key: "ardita", image: arditaImg },
  ];

  return (
    <div className="bg-[#F6F8F8] min-h-screen">
      {/* Hero Section */}
      <section className="min-h-[40vh] lg:min-h-[50vh] flex flex-col justify-center px-4 md:px-8 text-center max-w-5xl mx-auto py-20">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-8 leading-tight"
        >
          {t("team.hero.title")}
        </motion.h1>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-sm md:text-base lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
        >
          {t("team.hero.subtitle")}
        </motion.p>
      </section>

      {/* The Visionary Section */}
      <section className="py-24 px-4 md:px-12 bg-[#F6F8F8]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <span className="w-8 h-[2px] bg-cyan-400" />
            <span className="text-lg md:text-xl font-bold tracking-widest text-gray-900 uppercase">
              {t("team.sections.visionary")}
            </span>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-gray-100 flex flex-col lg:flex-row items-stretch"
          >
            <div className="lg:w-2/5 relative h-80 lg:h-[520px]">
              <Image
                src={arnisaImg}
                alt={t("team.members.arnisa.name")}
                className="w-full h-full object-cover"
                fill
              />
            </div>
            <div className="lg:w-3/5 p-8 md:p-16 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {t("team.members.arnisa.name")}
              </h2>
              <span className="text-cyan-500 font-bold text-sm md:text-base tracking-widest uppercase mb-8 block">
                {t("team.members.arnisa.role")}
              </span>
              <p className="text-gray-600 leading-relaxed mb-10 text-sm md:text-lg">
                {t("team.members.arnisa.bio")}
              </p>
              <a
                href={t("team.members.arnisa.linkedin")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-500 hover:bg-cyan-50 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Research & Strategy Team Section */}
      <section className="py-24 px-4 md:px-12 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-cyan-400" />
              <span className="text-base md:text-xl font-bold tracking-widest text-gray-900 uppercase">
                {t("team.sections.research")}
              </span>
            </div>
            <p className="text-gray-500 ml-11 text-sm md:text-lg">
              {t("team.sections.research_subtitle")}
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {members.map((member) => (
              <motion.div
                key={member.key}
                variants={fadeUp}
                className="bg-white rounded-[40px] overflow-hidden border border-gray-100 flex flex-col"
              >
                <div className="relative h-[400px] w-full">
                  <Image
                    src={member.image}
                    alt={t(`team.members.${member.key}.name`)}
                    className="w-full h-full object-cover"
                    fill
                  />
                </div>
                <div className="p-10 flex flex-col flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {t(`team.members.${member.key}.name`)}
                  </h3>
                  <span className="text-cyan-500 font-bold text-sm md:text-base tracking-widest uppercase mb-8 block">
                    {t(`team.members.${member.key}.role`)}
                  </span>
                  <p className="text-gray-600 leading-relaxed mb-10">
                    {t(`team.members.${member.key}.bio`)}
                  </p>
                  <a
                    href={t(`team.members.${member.key}.linkedin`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-500 hover:bg-cyan-50 transition-colors"
                  >
                    <Linkedin size={18} />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-4 md:px-12 bg-gray-50/30">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-6xl mx-auto rounded-[16] bg-[#0A1A1A] overflow-hidden relative"
        >
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-linear-to-bl from-[#00E5E5]/10 to-transparent rounded-full -mr-64 -mt-64 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-linear-to-tr from-blue-500/5 to-transparent rounded-full -ml-64 -mb-64 blur-3xl pointer-events-none" />

          <div className="relative z-10 py-24 px-8 md:px-20 text-center text-white">
            <h2 className="text-xl md:text-3xl lg:text-5xl font-bold mb-8 max-w-4xl mx-auto leading-tight">
              {t("team.cta.title")}
            </h2>
            <p className="hidden md:block text-gray-400 text-base mb-12 max-w-2xl mx-auto leading-relaxed">
              {t("team.cta.subtitle")}
            </p>
            <Link href="/contact" className="inline-block">
              <button className="px-8 py-4 md:px-12 md:py-5 bg-[#00E5E5] text-black font-extrabold rounded-md text-base md:text-lg hover:scale-105 transition-all shadow-2xl shadow-cyan-500/20 active:scale-95">
                {t("team.cta.button")}
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default TeamContent;
