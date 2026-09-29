"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSanityContent } from "@/lib/useSanityContent";
import { pickImage } from "@/lib/sanityImage";
import Editable from "@/components/admin/Editable";
import interneuronLogo from "@/assets/images/partners/Interneuron_Solutions.png";
import partner1 from "@/assets/images/partners/partner1.png";
import partner2 from "@/assets/images/partners/partner2.png";
import partner3 from "@/assets/images/partners/partner3.png";
import partner4 from "@/assets/images/partners/partner4.png";

const fallbackPartners = [
  { id: 1, src: interneuronLogo, alt: "Interneuron Solutions", scale: "scale-150 md:scale-170" },
  { id: 2, src: partner1, alt: "Partner 1" },
  { id: 3, src: partner2, alt: "Partner 2" },
  { id: 4, src: partner3, alt: "Partner 3" },
  { id: 5, src: partner4, alt: "Partner 4" },
];

function PartnersBlock({ data, documentId, partners }) {
  const { sanity, st } = useSanityContent(data);
  const title = st(sanity?.title, "partners.title");
  const path = sanity?._key ? `sections[_key=="${sanity._key}"]` : null;
  const partnersList = partners?.length
    ? partners.map((partner) => ({
        id: partner._id,
        src: pickImage(partner.logoUrl, null),
        alt: partner.name,
        scale: partner.scale,
      }))
    : fallbackPartners;

  const doubledPartners = [...partnersList, ...partnersList];

  return (
    <section className="w-full py-12 md:py-24 bg-white border-y border-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <h2 className="text-center text-sm font-bold tracking-[0.3em] text-gray-400 uppercase">
          <Editable documentId={documentId} path={path && `${path}.title`} value={title} />
        </h2>
      </div>

      <div className="relative flex items-center overflow-hidden group h-[100px]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          className="flex items-center whitespace-nowrap"
          whileHover={{ animationPlayState: "paused" }}
        >
          {doubledPartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex-shrink-0 w-[250px] md:w-[350px] px-10 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            >
              <div className="relative w-full h-[80px]">
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  fill
                  className={`object-contain ${partner.scale || ""}`}
                />
              </div>
            </div>
          ))}
        </motion.div>

        <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}

export default PartnersBlock;
