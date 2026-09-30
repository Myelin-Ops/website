"use client";

import React, { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { ImageUp } from "lucide-react";
import { useSanityContent } from "@/lib/useSanityContent";
import Editable from "@/components/admin/Editable";
import { useEditMode } from "@/components/admin/EditModeProvider";
import { shrinkImage } from "@/lib/shrinkImage";
import { pickImage } from "@/lib/sanityImage";
import Image from "next/image";

import whyItMatters1 from "@/assets/images/background/why-it-matters-1.png";
import whyItMatters2 from "@/assets/images/background/why-it-matters-2.png";
import whyItMatters3 from "@/assets/images/background/why-it-matters-3.png";
import whyItMatters4 from "@/assets/images/background/why-it-matters-4.png";

function WhyItMattersBlock({ data, documentId }) {
  const { sanity, st } = useSanityContent(data);
  const containerRef = useRef(null);
  const basePath = sanity?._key ? `sections[_key=="${sanity._key}"]` : null;
  const { isEditing } = useEditMode();
  const pathname = usePathname();
  const router = useRouter();
  const fileInputRef = useRef(null);
  const uploadTarget = useRef(null);
  const [uploading, setUploading] = useState(null); // slide id being uploaded
  const [uploadError, setUploadError] = useState("");

  const replacePicture = async (slide, file) => {
    setUploading(slide.id);
    setUploadError("");
    try {
      const form = new FormData();
      form.append("file", await shrinkImage(file));
      form.append("documentId", documentId);
      form.append("path", slide.imagePath);
      form.append("pagePath", pathname);
      const res = await fetch("/api/admin/section-image", { method: "POST", body: form });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Could not upload the image.");
      router.refresh();
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(null);
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y2 = useTransform(scrollYProgress, [0.22, 0.45], ["100vh", "0vh"]);
  const y3 = useTransform(scrollYProgress, [0.48, 0.72], ["100vh", "0vh"]);
  const y4 = useTransform(scrollYProgress, [0.75, 0.98], ["100vh", "0vh"]);

  const insights = sanity?.insights?.length ? sanity.insights : [];
  const insightAt = (index) => insights[index];

  const sections = [
    {
      id: 1,
      label: st(sanity?.label, "whyItMatters.label"),
      labelPath: basePath && `${basePath}.label`,
      title: st(sanity?.title, "whyItMatters.title"),
      titlePath: basePath && `${basePath}.title`,
      description: st(sanity?.description, "whyItMatters.description"),
      descriptionPath: basePath && `${basePath}.description`,
      image: pickImage(sanity?.imageUrl, whyItMatters1),
      imagePath: basePath && `${basePath}.image`,
      y: 0,
      zIndex: 10,
    },
    {
      id: 2,
      title: st(insightAt(0)?.title, "scrollableInsights.card1.title"),
      titlePath: basePath && `${basePath}.insights[0].title`,
      description: st(insightAt(0)?.description, "scrollableInsights.card1.description"),
      descriptionPath: basePath && `${basePath}.insights[0].description`,
      image: pickImage(insightAt(0)?.imageUrl, whyItMatters2),
      imagePath: basePath && `${basePath}.insights[0].image`,
      y: y2,
      zIndex: 20,
    },
    {
      id: 3,
      title: st(insightAt(1)?.title, "scrollableInsights.card2.title"),
      titlePath: basePath && `${basePath}.insights[1].title`,
      description: st(insightAt(1)?.description, "scrollableInsights.card2.description"),
      descriptionPath: basePath && `${basePath}.insights[1].description`,
      image: pickImage(insightAt(1)?.imageUrl, whyItMatters3),
      imagePath: basePath && `${basePath}.insights[1].image`,
      y: y3,
      zIndex: 30,
    },
    {
      id: 4,
      title: st(insightAt(2)?.title, "scrollableInsights.card3.title"),
      titlePath: basePath && `${basePath}.insights[2].title`,
      description: st(insightAt(2)?.description, "scrollableInsights.card3.description"),
      descriptionPath: basePath && `${basePath}.insights[2].description`,
      image: pickImage(insightAt(2)?.imageUrl, whyItMatters4),
      imagePath: basePath && `${basePath}.insights[2].image`,
      y: y4,
      zIndex: 40,
    },
  ];

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#030708] overflow-visible">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file && uploadTarget.current) replacePicture(uploadTarget.current, file);
        }}
      />
      {uploadError && (
        <p className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] px-4 py-2 rounded-lg bg-red-600 text-white text-sm shadow-lg">
          {uploadError}
        </p>
      )}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            style={{ y: section.y, zIndex: section.zIndex }}
            className="absolute bg-[#0F1A24] inset-0 w-full h-full flex items-center shadow-[0_-10px_40px_rgba(0,0,0,0.7)]"
          >
            <div className="max-w-7xl mx-auto w-full px-4 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center mb-6"
              >
                <p className="text-xs md:text-xl font-semibold text-gray-400 tracking-widest uppercase">
                  {section.labelPath !== undefined ? (
                    <Editable documentId={documentId} path={section.labelPath} value={section.label} />
                  ) : (
                    section.label
                  )}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center md:text-left"
                >
                  <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 md:mb-8 leading-tight">
                    <Editable documentId={documentId} path={section.titlePath} value={section.title} />
                  </h2>
                  <p className="text-base md:text-lg lg:text-xl text-gray-400 leading-relaxed max-w-lg mx-auto md:mx-0">
                    <Editable documentId={documentId} path={section.descriptionPath} value={section.description} />
                  </p>
                </motion.div>

                <div className="hidden md:block relative mx-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7 }}
                  style={{
                    maskImage: "radial-gradient(circle, black 40%, transparent 80%)",
                    WebkitMaskImage: "radial-gradient(circle, black 40%, transparent 80%)",
                  }}
                  className="relative aspect-square mx-auto h-72 md:h-96 lg:h-[32rem] rounded-full overflow-hidden"
                >
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover bg-[#0F1A24] opacity-80 mix-blend-screen transition-all duration-700"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0F1A24]/40 to-transparent pointer-events-none" />
                </motion.div>
                {isEditing && section.imagePath && (
                  <button
                    type="button"
                    disabled={uploading !== null}
                    onClick={() => {
                      uploadTarget.current = section;
                      fileInputRef.current?.click();
                    }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-white text-gray-800 shadow-lg hover:bg-gray-100 disabled:opacity-60 cursor-pointer"
                  >
                    <ImageUp size={16} />
                    {uploading === section.id ? "Uploading..." : "Replace picture"}
                  </button>
                )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default WhyItMattersBlock;
