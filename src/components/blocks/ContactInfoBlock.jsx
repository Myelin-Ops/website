"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Instagram, Facebook } from "lucide-react";
import Link from "next/link";
import { useSanityContent } from "@/lib/useSanityContent";
import Editable from "@/components/admin/Editable";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const SOCIALS = [
  { icon: Linkedin, link: "https://www.linkedin.com/company/myelin-ops/posts/?feedView=all" },
  { icon: Instagram, link: "https://www.instagram.com/myelinops/" },
  { icon: Facebook, link: "https://www.facebook.com/profile.php?id=61556761803602" },
];

// Left column of the contact layout; the page wraps this and ContactFormBlock in one grid.
function ContactInfoBlock({ data, documentId, i18nPrefix = "info" }) {
  const { t, sanity, st } = useSanityContent(data);
  const path = sanity?._key ? `sections[_key=="${sanity._key}"]` : null;
  const emailValue = sanity?.emailValue || t(`${i18nPrefix}.email.value`);
  const phoneValue = sanity?.phoneValue || t(`${i18nPrefix}.phone.value`);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="order-2 lg:order-1 space-y-12"
    >
      <div className="bg-white p-8 rounded-2xl border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex gap-6 items-start">
          <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center text-cyan-500 shrink-0">
            <Mail size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              <Editable
                documentId={documentId}
                path={path && `${path}.emailTitle`}
                value={st(sanity?.emailTitle, `${i18nPrefix}.email.title`)}
              />
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              <Editable
                documentId={documentId}
                path={path && `${path}.emailSubtitle`}
                value={st(sanity?.emailSubtitle, `${i18nPrefix}.email.subtitle`)}
              />
            </p>
            <a
              href={`mailto:${emailValue}`}
              className="text-gray-900 font-bold hover:text-cyan-500 transition-colors"
            >
              {emailValue}
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex gap-6 items-start">
          <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center text-cyan-500 shrink-0">
            <Phone size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              <Editable
                documentId={documentId}
                path={path && `${path}.phoneTitle`}
                value={st(sanity?.phoneTitle, `${i18nPrefix}.phone.title`)}
              />
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              <Editable
                documentId={documentId}
                path={path && `${path}.phoneSubtitle`}
                value={st(sanity?.phoneSubtitle, `${i18nPrefix}.phone.subtitle`)}
              />
            </p>
            <a
              href={`tel:${phoneValue.replace(/\s/g, "")}`}
              className="text-gray-900 font-bold hover:text-cyan-500 transition-colors"
            >
              {phoneValue}
            </a>
          </div>
        </div>
      </div>

      <div className="pt-8 text-center md:text-left">
        <span className="text-xs font-bold tracking-widest text-gray-400 uppercase block mb-6">
          <Editable
            documentId={documentId}
            path={path && `${path}.connectLabel`}
            value={st(sanity?.connectLabel, `${i18nPrefix}.connect`)}
          />
        </span>
        <div className="flex gap-4 mb-16 justify-center md:justify-start">
          {SOCIALS.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-gray-100 rounded-lg flex items-center justify-center text-gray-900 hover:bg-black hover:text-white transition-all"
            >
              <item.icon size={18} />
            </a>
          ))}
        </div>
        <Link
          href="/credits"
          className="text-xs font-bold tracking-widest text-cyan-500 uppercase transition-colors underline underline-offset-4"
        >
          {st(sanity?.creditsLabel, `${i18nPrefix}.credits`)}
        </Link>
      </div>
    </motion.div>
  );
}

export default ContactInfoBlock;
