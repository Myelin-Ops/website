"use client";

import React, { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ImageUp } from "lucide-react";
import { useSanityContent } from "@/lib/useSanityContent";
import Editable from "@/components/admin/Editable";
import { useEditMode } from "@/components/admin/EditModeProvider";
import { shrinkImage } from "@/lib/shrinkImage";
import { pickImage } from "@/lib/sanityImage";
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
  const { isEditing } = useEditMode();
  const pathname = usePathname();
  const router = useRouter();
  const fileInputRef = useRef(null);
  const uploadTarget = useRef(null);
  const [uploading, setUploading] = useState(null);
  const [uploadError, setUploadError] = useState("");

  const pictures = [
    { field: "imageOne", src: pickImage(sanity?.imageOneUrl, aboutus1), alt: "Presentation illustration", extra: "" },
    {
      field: "imageTwo",
      src: pickImage(sanity?.imageTwoUrl, aboutus2),
      alt: "Meeting illustration",
      extra: " max-sm:mt-6 sm:mt-12",
    },
  ];

  const replacePicture = async (field, file) => {
    setUploading(field);
    setUploadError("");
    try {
      const form = new FormData();
      form.append("file", await shrinkImage(file));
      form.append("documentId", documentId);
      form.append("path", `${path}.${field}`);
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
  const items = sanity?.items?.length
    ? sanity.items
    : t(`${i18nPrefix}.items`, { returnObjects: true });

  return (
    <section className="min-h-0 md:min-h-screen flex items-center px-4 md:px-12">
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
            {pictures.map((picture) => (
              <motion.div
                key={picture.field}
                variants={fadeUp}
                className={`rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-100/30 aspect-square h-auto sm:aspect-auto sm:h-64 md:h-80 relative${picture.extra}`}
              >
                <Image
                  src={picture.src}
                  alt={picture.alt}
                  width={400}
                  height={500}
                  quality={100}
                  priority
                  className="w-full h-full object-cover contrast-[1.05] brightness-[1.1] saturate-[1.1]"
                />
                {isEditing && path && (
                  <button
                    type="button"
                    disabled={uploading !== null}
                    onClick={() => {
                      uploadTarget.current = picture.field;
                      fileInputRef.current?.click();
                    }}
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-white text-gray-800 shadow-lg hover:bg-gray-100 disabled:opacity-60 cursor-pointer"
                  >
                    <ImageUp size={16} />
                    {uploading === picture.field ? "Uploading..." : "Replace picture"}
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ApproachBlock;
