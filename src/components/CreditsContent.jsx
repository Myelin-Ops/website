"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function CreditsContent() {
  const { t } = useTranslation();

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
            {t("credits.hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {t("credits.hero.description")}
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
            {t("credits.supervisor.label")}{" "}
            <span className="font-bold text-gray-900">
              {t("credits.supervisor.name")}
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
            {t("credits.team.lead.label")}{" "}
            <span className="font-bold text-gray-900">
              {t("credits.team.lead.name")}
            </span>
          </p>
          <p className="text-md md:text-lg text-gray-600">
            {t("credits.team.developers.label")}{" "}
            <span className="font-bold text-gray-900">
              {t("credits.team.developers.names")}
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
            {t("credits.outro")}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default CreditsContent;
