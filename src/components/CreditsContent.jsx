"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSanityContent } from "@/lib/useSanityContent";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function CreditsContent({ data }) {
  const { sanity, st } = useSanityContent(data);
  const heroTitle = st(sanity?.hero?.title, "credits.hero.title");
  const heroDescription = st(sanity?.hero?.description, "credits.hero.description");
  const supervisorLabel = st(sanity?.supervisor?.label, "credits.supervisor.label");
  const supervisorName = st(sanity?.supervisor?.name, "credits.supervisor.name");
  const leadLabel = st(sanity?.team?.lead?.label, "credits.team.lead.label");
  const leadName = st(sanity?.team?.lead?.name, "credits.team.lead.name");
  const developersLabel = st(sanity?.team?.developers?.label, "credits.team.developers.label");
  const developersNames = st(sanity?.team?.developers?.names, "credits.team.developers.names");
  const outro = st(sanity?.outro, "credits.outro");

  return (
    <div className="bg-white min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-4xl w-full text-center space-y-10">
        {/* Title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            {heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {heroDescription}
          </p>
        </motion.div>

        {/* Supervision */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ delay: 0.1 }}
          className="pt-4"
        >
          <h2 className="text-lg md:text-xl font-medium text-gray-600">
            {supervisorLabel}{" "}
            <span className="font-bold text-gray-900">
              {supervisorName}
            </span>
          </h2>
        </motion.div>

        {/* Team Details */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ delay: 0.2 }}
        >
          <p className="text-md md:text-lg text-gray-600">
            {leadLabel}{" "}
            <span className="font-bold text-gray-900">
              {leadName}
            </span>
          </p>
          <p className="text-md md:text-lg text-gray-600">
            {developersLabel}{" "}
            <span className="font-bold text-gray-900">
              {developersNames}
            </span>
          </p>
        </motion.div>

        {/* Appreciation Outro */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ delay: 0.3 }}
          className="pt-8"
        >
          <p className="text-gray-500 italic text-lg leading-relaxed max-w-2xl mx-auto">
            {outro}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default CreditsContent;
