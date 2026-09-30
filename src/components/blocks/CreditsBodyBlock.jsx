"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSanityContent } from "@/lib/useSanityContent";
import Editable from "@/components/admin/Editable";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function CreditsBodyBlock({ data, documentId, i18nPrefix = "credits" }) {
  const { sanity, st } = useSanityContent(data);
  const path = sanity?._key ? `sections[_key=="${sanity._key}"]` : null;
  const field = (name) => path && `${path}.${name}`;

  return (
    <section className="pb-20 px-4">
      <div className="max-w-4xl w-full mx-auto text-center space-y-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-lg md:text-xl font-medium text-gray-600">
            <Editable
              documentId={documentId}
              path={field("supervisorLabel")}
              value={st(sanity?.supervisorLabel, `${i18nPrefix}.supervisor.label`)}
            />{" "}
            <span className="font-bold text-gray-900">
              {st(sanity?.supervisorName, `${i18nPrefix}.supervisor.name`)}
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ delay: 0.2 }}
        >
          <p className="text-md md:text-lg text-gray-600">
            <Editable
              documentId={documentId}
              path={field("leadLabel")}
              value={st(sanity?.leadLabel, `${i18nPrefix}.team.lead.label`)}
            />{" "}
            <span className="font-bold text-gray-900">
              {st(sanity?.leadName, `${i18nPrefix}.team.lead.name`)}
            </span>
          </p>
          <p className="text-md md:text-lg text-gray-600">
            <Editable
              documentId={documentId}
              path={field("developersLabel")}
              value={st(sanity?.developersLabel, `${i18nPrefix}.team.developers.label`)}
            />{" "}
            <span className="font-bold text-gray-900">
              {st(sanity?.developersNames, `${i18nPrefix}.team.developers.names`)}
            </span>
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ delay: 0.3 }}
          className="pt-8"
        >
          <p className="text-gray-500 italic text-lg leading-relaxed max-w-2xl mx-auto">
            <Editable
              documentId={documentId}
              path={field("outro")}
              value={st(sanity?.outro, `${i18nPrefix}.outro`)}
            />
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default CreditsBodyBlock;
