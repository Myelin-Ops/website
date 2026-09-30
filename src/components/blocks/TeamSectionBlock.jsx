"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { useSanityContent } from "@/lib/useSanityContent";
import { pickImage } from "@/lib/sanityImage";
import Editable from "@/components/admin/Editable";
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

const FALLBACK_MEMBERS = [
  { key: "arnisa", section: "visionary", photo: arnisaImg },
  { key: "zanfina", section: "research", photo: zanfinaImg },
  { key: "ardita", section: "research", photo: arditaImg },
];

// `teamMembers` is an { en, sq } bundle of Team Member documents (global collection).
function TeamSectionBlock({ data, documentId, teamMembers, i18nPrefix = "team" }) {
  const { t, sanity, st } = useSanityContent(data);
  const { sanity: membersSanity } = useSanityContent(teamMembers);
  const path = sanity?._key ? `sections[_key=="${sanity._key}"]` : null;

  const memberList = membersSanity?.length
    ? membersSanity
    : FALLBACK_MEMBERS.map((m) => ({
        ...m,
        name: t(`${i18nPrefix}.members.${m.key}.name`),
        role: t(`${i18nPrefix}.members.${m.key}.role`),
        bio: t(`${i18nPrefix}.members.${m.key}.bio`),
        linkedin: t(`${i18nPrefix}.members.${m.key}.linkedin`),
      }));
  const visionary = memberList.find((m) => m.section === "visionary");
  const researchMembers = memberList.filter((m) => m.section === "research");

  return (
    <>
      <section className="py-24 px-4 md:px-12 bg-[#F6F8F8]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <span className="w-8 h-0.5 bg-cyan-400" />
            <span className="text-lg md:text-xl font-bold tracking-widest text-gray-900 uppercase">
              <Editable
                documentId={documentId}
                path={path && `${path}.visionaryLabel`}
                value={st(sanity?.visionaryLabel, `${i18nPrefix}.sections.visionary`)}
              />
            </span>
          </div>

          {visionary && (
            <>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="hidden lg:flex bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex-row items-stretch max-w-6xl mx-auto w-full isolate"
              >
                <div className="w-2/5 relative aspect-2/3">
                  <Image
                    src={pickImage(visionary.photoUrl, visionary.photo)}
                    alt={visionary.name}
                    className="w-full h-full object-cover object-top"
                    fill
                  />
                </div>
                <div className="w-3/5 p-16 flex flex-col justify-between flex-1">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{visionary.name}</h2>
                    <span className="text-cyan-500 font-bold text-base tracking-widest uppercase block">
                      {visionary.role}
                    </span>
                  </div>
                  <div className="flex flex-col justify-center flex-1 py-8">
                    <p className="text-gray-600 leading-relaxed text-lg m-0">{visionary.bio}</p>
                  </div>
                  <div>
                    <a
                      href={visionary.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-100 rounded-lg inline-flex items-center justify-center text-gray-400 hover:text-cyan-500 hover:bg-cyan-50 transition-colors"
                    >
                      <Linkedin size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="lg:hidden bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col max-w-xl mx-auto w-full isolate"
              >
                <div className="relative aspect-4/5 w-full">
                  <Image
                    src={pickImage(visionary.photoUrl, visionary.photo)}
                    alt={visionary.name}
                    className="w-full h-full object-cover object-center"
                    fill
                  />
                </div>
                <div className="p-8 flex flex-col">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{visionary.name}</h2>
                    <span className="text-cyan-500 font-bold text-sm tracking-widest uppercase block">
                      {visionary.role}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm mb-8">{visionary.bio}</p>
                  <div>
                    <a
                      href={visionary.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-100 rounded-lg inline-flex items-center justify-center text-gray-400 hover:text-cyan-500 hover:bg-cyan-50 transition-colors"
                    >
                      <Linkedin size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </section>

      <section className="py-24 px-4 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-cyan-400" />
              <span className="text-base md:text-xl font-bold tracking-widest text-gray-900 uppercase">
                <Editable
                  documentId={documentId}
                  path={path && `${path}.researchLabel`}
                  value={st(sanity?.researchLabel, `${i18nPrefix}.sections.research`)}
                />
              </span>
            </div>
            <p className="text-gray-500 ml-11 text-sm md:text-lg">
              <Editable
                documentId={documentId}
                path={path && `${path}.researchSubtitle`}
                value={st(sanity?.researchSubtitle, `${i18nPrefix}.sections.research_subtitle`)}
              />
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-56 max-w-6xl mx-auto"
          >
            {researchMembers.map((member) => (
              <motion.div
                key={member.key || member._id || member.name}
                variants={fadeUp}
                className="bg-white rounded-3xl overflow-hidden flex flex-col h-full w-full max-w-xl mx-auto isolate"
              >
                <div className="relative h-112.5 lg:h-137.5 w-full">
                  <Image
                    src={pickImage(member.photoUrl, member.photo)}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                    fill
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <span className="text-cyan-500 font-bold text-sm md:text-base tracking-widest uppercase mb-8 block">
                    {member.role}
                  </span>
                  <p className="text-gray-600 leading-relaxed mb-10">{member.bio}</p>
                  <a
                    href={member.linkedin}
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
    </>
  );
}

export default TeamSectionBlock;
