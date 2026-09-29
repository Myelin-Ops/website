"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSanityContent } from "@/lib/useSanityContent";
import { useEditMode } from "@/components/admin/EditModeProvider";
import Editable from "@/components/admin/Editable";

// Home's hero: full split-word highlight treatment + background blurs.
function HomeHero({ documentId, path, title, subtitle, highlight, description }) {
  const { isEditing } = useEditMode();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, duration: 0.3 } },
  };

  // While editing, the subtitle is shown as one plain editable string instead
  // of the word-split/highlighted spans below - contentEditable can't safely
  // coexist with child elements it doesn't control.
  const subtitleContent = isEditing ? (
    <Editable documentId={documentId} path={path && `${path}.subtitle`} value={subtitle} />
  ) : (
    subtitle.split(" ").map((word, index) => (
      <span key={index} className={word === highlight ? " text-[#13ECEC]" : ""}>
        {word}
        {index < subtitle.split(" ").length - 1 && " "}
      </span>
    ))
  );

  return (
    <div className="relative w-full min-h-[45vh] md:min-h-screen overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 0.6, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/12 opacity-60 pointer-events-none"
      >
        <Image src="/background-blur.svg" alt="" width={600} height={600} className="blur-3xl" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.6, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute right-0 top-1/2 -translate-y-120 translate-x-1/12 opacity-60 pointer-events-none"
      >
        <Image src="/background-blur-2.svg" alt="" width={600} height={600} className="blur-3xl" />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center self-center mt-32 px-4 text-center"
      >
        <h1 className="block xl:hidden text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          <Editable documentId={documentId} path={path && `${path}.title`} value={title} />{" "}
          {subtitleContent}
        </h1>

        <h1 className="hidden xl:block text-6xl font-black leading-none mb-2">
          <Editable documentId={documentId} path={path && `${path}.title`} value={title} />
        </h1>
        <h1 className="hidden xl:block text-6xl font-black leading-none max-w-3/4 mb-8">
          {isEditing
            ? subtitleContent
            : subtitle.split(" ").map((word, index) => (
                <span
                  key={index}
                  className={(word === "thrive." ? "block" : "") + (word === highlight ? " text-[#13ECEC]" : "")}
                >
                  {word}
                  {index < subtitle.split(" ").length - 1 && " "}
                </span>
              ))}
        </h1>

        {(description || isEditing) && (
          <p className="hidden md:block text-gray-500 text-base md:mt-10 md:text-xl max-w-md md:max-w-2xl">
            <Editable documentId={documentId} path={path && `${path}.description`} value={description} />
          </p>
        )}
      </motion.div>
    </div>
  );
}

// Simpler hero used on About/Services/Team/Contact/Credits: centered title + subtitle only.
function SimpleHero({ documentId, path, title, subtitle }) {
  return (
    <section className="relative min-h-[40vh] md:min-h-[60vh] flex flex-col justify-center px-4 md:px-12 text-center max-w-6xl mx-auto py-12 md:py-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none z-0"
      >
        <Image
          src="/background-blur.svg"
          alt=""
          width={1000}
          height={1000}
          className="blur-[80px] opacity-70 scale-125"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <h1 className="text-3xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
          <Editable documentId={documentId} path={path && `${path}.title`} value={title} />
        </h1>
        <p className="text-sm md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          <Editable documentId={documentId} path={path && `${path}.subtitle`} value={subtitle} />
        </p>
      </motion.div>
    </section>
  );
}

function HeroBlock({ data, documentId, i18nPrefix = "hero", variant = "home" }) {
  const { sanity, st } = useSanityContent(data);
  const title = st(sanity?.title, `${i18nPrefix}.title`);
  const subtitle = st(sanity?.subtitle, `${i18nPrefix}.subtitle`);
  const highlight = st(sanity?.highlight, `${i18nPrefix}.highlight`);
  const description = st(sanity?.description, `${i18nPrefix}.description`);
  const path = sanity?._key ? `sections[_key=="${sanity._key}"]` : null;

  if (variant === "home") {
    return (
      <HomeHero
        documentId={documentId}
        path={path}
        title={title}
        subtitle={subtitle}
        highlight={highlight}
        description={description}
      />
    );
  }
  return <SimpleHero documentId={documentId} path={path} title={title} subtitle={subtitle} />;
}

export default HeroBlock;
