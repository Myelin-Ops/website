"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSanityContent } from "@/lib/useSanityContent";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function InstitutionsSectionBlock({ data }) {
  const { sanity, st } = useSanityContent(data);

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
          {st(sanity?.title, "institutions.title")}
        </motion.h2>
      </div>
    </section>
  );
}

export default InstitutionsSectionBlock;
