"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Settings2 } from "lucide-react";
import { useSanityContent } from "@/lib/useSanityContent";
import Editable from "@/components/admin/Editable";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ICONS = { diagnostic: BarChart3, strategy: TrendingUp, implementation: Settings2 };
const DEFAULT_KEYS = ["diagnostic", "strategy", "implementation"];

function MethodologyBlock({ data, documentId, i18nPrefix = "methodology" }) {
  const { sanity, st } = useSanityContent(data);
  const path = sanity?._key ? `sections[_key=="${sanity._key}"]` : null;
  const keys = Object.keys(sanity?.steps || {}).length ? Object.keys(sanity.steps) : DEFAULT_KEYS;

  return (
    <section className="py-24 px-4 md:px-12 bg-white">
      <div className="max-w-360 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-5xl font-black text-gray-900 mb-6">
            <Editable
              documentId={documentId}
              path={path && `${path}.title`}
              value={st(sanity?.title, `${i18nPrefix}.title`)}
            />
          </h2>
          <p className="text-gray-500 text-base md:text-xl">
            <Editable
              documentId={documentId}
              path={path && `${path}.subtitle`}
              value={st(sanity?.subtitle, `${i18nPrefix}.subtitle`)}
            />
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-[339px]:gap-4">
          {keys.map((key) => {
            const step = sanity?.steps?.[key];
            const Icon = ICONS[key];
            return (
              <motion.div
                key={key}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-[#F6F8F8] p-12 max-[339px]:p-5 rounded-3xl border border-gray-100/50 hover:shadow-xl transition-all duration-500"
              >
                <div className="w-14 h-14 max-[339px]:w-10 max-[339px]:h-10 bg-white rounded-2xl flex items-center justify-center mb-10 max-[339px]:mb-4 shadow-sm">
                  {Icon && (
                    <Icon className="w-7 h-7 max-[339px]:w-5 max-[339px]:h-5" style={{ color: "#13ECEC" }} />
                  )}
                </div>
                <h3 className="text-2xl max-[339px]:text-lg font-bold mb-4 max-[339px]:mb-2">
                  {st(step?.title, `${i18nPrefix}.steps.${key}.title`)}
                </h3>
                <p className="text-gray-500 leading-relaxed text-base max-[339px]:text-xs max-[339px]:leading-snug">
                  {st(step?.description, `${i18nPrefix}.steps.${key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default MethodologyBlock;
