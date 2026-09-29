"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Brain, Network } from "lucide-react";
import { useSanityContent } from "@/lib/useSanityContent";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};

const ICONS = { groupDynamics: Users, neuroLeadership: Brain, advancement: Network };
const DEFAULT_KEYS = ["groupDynamics", "neuroLeadership", "advancement"];

function InterventionsBlock({ data, i18nPrefix = "list" }) {
  const { t, sanity, st } = useSanityContent(data);
  const keys = Object.keys(sanity?.interventions || {}).length
    ? Object.keys(sanity.interventions)
    : DEFAULT_KEYS;

  return (
    <section className="py-32 px-4 md:px-12 bg-[#F6F8F8]">
      <div className="max-w-460 mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 2xl:grid-cols-3 gap-8"
        >
          {keys.map((key) => {
            const intervention = sanity?.interventions?.[key];
            const Icon = ICONS[key];
            const items = intervention?.items?.length
              ? intervention.items
              : t(`${i18nPrefix}.${key}.items`, { returnObjects: true });
            return (
              <motion.div
                key={key}
                variants={fadeUp}
                className="group p-10 md:p-14 rounded-[40px] bg-white border border-gray-100 hover:border-[#13ECEC]/30 transition-all duration-500 flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-10">
                  <div className="w-16 h-16 rounded-2xl bg-[#13DAEC]/10 flex items-center justify-center">
                    {Icon && <Icon size={32} style={{ color: "#13ECEC" }} />}
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-8 tracking-tight">
                  {st(intervention?.title, `${i18nPrefix}.${key}.title`)}
                </h3>
                <p className="text-gray-500 text-lg mb-10 leading-relaxed">
                  {st(intervention?.description, `${i18nPrefix}.${key}.description`)}
                </p>
                <ul className="mt-auto space-y-5 pt-10 border-t border-gray-100/50">
                  {Array.isArray(items) &&
                    items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-base text-gray-700 font-medium">
                        <span className="w-1.5 h-1.5 bg-[#13ECEC] rounded-full mt-2.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default InterventionsBlock;
