"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSanityContent } from "@/lib/useSanityContent";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function TeamSectionBlock({ data }) {
  const { sanity, st } = useSanityContent(data);

  return (
    <section className="py-16 md:py-24 px-4 md:px-12 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {st(sanity?.visionaryLabel, "team.visionary.label")}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-12">
            {st(sanity?.researchLabel, "team.research.label")}
          </p>
          <p className="text-gray-500">
            {st(sanity?.researchSubtitle, "team.research.subtitle")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default TeamSectionBlock;
