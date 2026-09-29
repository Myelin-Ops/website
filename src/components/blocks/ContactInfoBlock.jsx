"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSanityContent } from "@/lib/useSanityContent";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function ContactInfoBlock({ data }) {
  const { sanity, st } = useSanityContent(data);

  return (
    <section className="py-16 md:py-24 px-4 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Email */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center md:text-left"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {st(sanity?.emailTitle, "contact.email.title")}
            </h3>
            <p className="text-gray-600 mb-4">
              {st(sanity?.emailSubtitle, "contact.email.subtitle")}
            </p>
            <a
              href={`mailto:${sanity?.emailValue}`}
              className="text-cyan-600 font-semibold hover:underline"
            >
              {sanity?.emailValue}
            </a>
          </motion.div>

          {/* Phone */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center md:text-left"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {st(sanity?.phoneTitle, "contact.phone.title")}
            </h3>
            <p className="text-gray-600 mb-4">
              {st(sanity?.phoneSubtitle, "contact.phone.subtitle")}
            </p>
            <a
              href={`tel:${sanity?.phoneValue}`}
              className="text-cyan-600 font-semibold hover:underline"
            >
              {sanity?.phoneValue}
            </a>
          </motion.div>
        </div>

        <div className="mt-12 pt-12 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              {st(sanity?.connectLabel, "contact.connect.label")}
            </h4>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              {st(sanity?.creditsLabel, "contact.credits.label")}
            </h4>
            <Link href="/credits" className="text-cyan-600 hover:underline">
              Credits
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactInfoBlock;
