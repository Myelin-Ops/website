"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSanityContent } from "@/lib/useSanityContent";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function ApproachBlock({ data }) {
  const { t, sanity, st } = useSanityContent(data);

  return (
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              {st(sanity?.title, "approach.title")}
            </h2>
            <p className="text-lg text-gray-700 mb-6 font-medium">
              {st(sanity?.description1, "approach.description1")}
            </p>
            <ul className="space-y-4 mb-8">
              {(sanity?.items?.length
                ? sanity.items
                : t("approach.items", { returnObjects: true })
              ).map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-black rounded-full shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-600 italic border-l-4 border-gray-200 pl-6 py-2">
              {st(sanity?.description2, "approach.description2")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ApproachBlock;
