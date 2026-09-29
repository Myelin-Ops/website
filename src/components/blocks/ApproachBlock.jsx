"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSanityContent } from "@/lib/useSanityContent";
import Editable from "@/components/admin/Editable";
import aboutus1 from "@/assets/images/aboutus/aboutus1.png";
import aboutus2 from "@/assets/images/aboutus/aboutus2.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};

function ApproachBlock({ data, documentId, i18nPrefix = "approach" }) {
  const { t, sanity, st } = useSanityContent(data);
  const path = sanity?._key ? `sections[_key=="${sanity._key}"]` : null;
  const items = sanity?.items?.length
    ? sanity.items
    : t(`${i18nPrefix}.items`, { returnObjects: true });

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
              <Editable
                documentId={documentId}
                path={path && `${path}.title`}
                value={st(sanity?.title, `${i18nPrefix}.title`)}
              />
            </h2>
            <p className="text-lg text-gray-700 mb-6 font-medium">
              <Editable
                documentId={documentId}
                path={path && `${path}.description1`}
                value={st(sanity?.description1, `${i18nPrefix}.description1`)}
              />
            </p>
            <ul className="space-y-4 mb-8">
              {Array.isArray(items) &&
                items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-black rounded-full shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
            </ul>
            <p className="text-gray-600 italic border-l-4 border-gray-200 pl-6 py-2">
              <Editable
                documentId={documentId}
                path={path && `${path}.description2`}
                value={st(sanity?.description2, `${i18nPrefix}.description2`)}
              />
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 gap-2 sm:gap-4 relative"
          >
            <motion.div
              variants={fadeUp}
              className="rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-100/30 aspect-square h-auto sm:aspect-auto sm:h-64 md:h-80"
            >
              <Image
                src={aboutus1}
                alt="Presentation illustration"
                width={400}
                height={500}
                quality={100}
                priority
                className="w-full h-full object-cover contrast-[1.05] brightness-[1.1] saturate-[1.1]"
              />
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-100/30 aspect-square h-auto sm:aspect-auto sm:h-64 md:h-80 max-sm:mt-6 sm:mt-12"
            >
              <Image
                src={aboutus2}
                alt="Meeting illustration"
                width={400}
                height={500}
                quality={100}
                priority
                className="w-full h-full object-cover contrast-[1.05] brightness-[1.1] saturate-[1.1]"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ApproachBlock;
