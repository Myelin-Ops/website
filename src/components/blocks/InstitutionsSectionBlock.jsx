"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSanityContent } from "@/lib/useSanityContent";
import { pickImage } from "@/lib/sanityImage";
import Editable from "@/components/admin/Editable";
import barutiLogo from "@/assets/images/partners/Baruti-AG-Logo.png";
import londonSchoolLogo from "@/assets/images/partners/London-School-Logo.png";
import upLogo from "@/assets/images/partners/up-logo.png";
import uniprLogo from "@/assets/images/partners/unipr-logo.png";
import vushtrriaLogo from "@/assets/images/partners/vushtrria-logo.png";
import cacttusLogo from "@/assets/images/partners/cacttus-logo.png";
import albiLogo from "@/assets/images/partners/albi-logo.png";
import kosovajobLogo from "@/assets/images/partners/kosovajob-logo.png";
import caritasAustriaLogo from "@/assets/images/partners/Caritas_Austria.gif";
import austriaMohLogo from "@/assets/images/partners/Austria-MoH.png";
import caritasKosovaLogo from "@/assets/images/partners/social_logo_caritas.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};

// `institutions` is an { en, sq } bundle of Institution documents (global collection).
function InstitutionsSectionBlock({ data, documentId, institutions, i18nPrefix = "partners" }) {
  const { t, sanity, st } = useSanityContent(data);
  const { sanity: institutionsSanity } = useSanityContent(institutions);
  const path = sanity?._key ? `sections[_key=="${sanity._key}"]` : null;

  const fallbackInstitutions = [
    { src: barutiLogo, label: t(`${i18nPrefix}.baruti`), scale: "scale-110 md:scale-110" },
    { src: londonSchoolLogo, label: t(`${i18nPrefix}.londonSchool`), scale: "scale-110 md:scale-110" },
    { src: uniprLogo, label: t(`${i18nPrefix}.up`), scale: "scale-100 md:scale-100" },
    { src: upLogo, label: t(`${i18nPrefix}.uhz`), scale: "scale-120 md:scale-100" },
    { src: vushtrriaLogo, label: t(`${i18nPrefix}.vushtrria`) },
    { src: cacttusLogo, label: t(`${i18nPrefix}.cacttus`), scale: "scale-130" },
    { src: albiLogo, label: t(`${i18nPrefix}.albi`), scale: "scale-110 md:scale-140" },
    { src: kosovajobLogo, label: t(`${i18nPrefix}.kosovajob`), scale: "scale-120 md:scale-120" },
    { src: caritasAustriaLogo, label: t(`${i18nPrefix}.caritasAustria`), scale: "scale-120 md:scale-120" },
    { src: austriaMohLogo, label: t(`${i18nPrefix}.austriaMoh`), scale: "scale-110 md:scale-110" },
    { src: caritasKosovaLogo, label: t(`${i18nPrefix}.caritasKosova`), scale: "scale-120 md:scale-120" },
  ];

  const list = institutionsSanity?.length
    ? institutionsSanity.map((inst) => ({
        src: pickImage(inst.logoUrl, null),
        label: inst.name,
        scale: inst.scale,
      }))
    : fallbackInstitutions;

  return (
    <section className="py-16 md:py-32 px-4 md:px-12 bg-[#F6F8F8]">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
          className="text-xl md:text-4xl font-bold text-gray-900 mb-12 md:mb-20"
        >
          <Editable
            documentId={documentId}
            path={path && `${path}.title`}
            value={st(sanity?.title, `${i18nPrefix}.title`)}
          />
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto gap-y-12 md:gap-y-24 gap-x-8 md:gap-x-12 items-start justify-items-center"
        >
          {list.map((inst, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`flex flex-col items-center ${i === 8 ? "lg:col-start-1" : ""}`}
            >
              <div className="h-32 md:h-52 w-full flex items-center justify-center mb-6 md:mb-8 px-4">
                {inst.src && (
                  <Image
                    src={inst.src}
                    alt={inst.label || ""}
                    width={300}
                    height={200}
                    className={`max-h-full w-auto object-contain ${inst.scale || ""}`}
                  />
                )}
              </div>
              <h3 className="text-base md:text-xl font-bold text-gray-900 mt-4">{inst.label}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default InstitutionsSectionBlock;
