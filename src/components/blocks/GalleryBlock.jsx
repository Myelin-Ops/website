"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Trash2, ImageUp, Maximize2, Minimize2 } from "lucide-react";
import { shrinkImage } from "@/lib/shrinkImage";
import { fetchAsFile, seedFromBuiltIn } from "@/lib/adminSeed";
import { useSanityContent } from "@/lib/useSanityContent";
import { pickImage } from "@/lib/sanityImage";
import Editable from "@/components/admin/Editable";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";
import { useEditMode } from "@/components/admin/EditModeProvider";
import gallery1 from "@/assets/images/gallery/gallery1.png";
import gallery2 from "@/assets/images/gallery/gallery2.png";
import gallery3 from "@/assets/images/gallery/gallery3.png";
import gallery4 from "@/assets/images/gallery/gallery4.png";
import gallery5 from "@/assets/images/gallery/gallery5.png";
import gallery6 from "@/assets/images/gallery/gallery6.png";

const NORMAL_SPAN = "col-span-1 row-span-1";
const WIDE_SPAN = "col-span-1 md:col-span-2 row-span-1";

const fallbackGalleryImages = [
  { id: 1, src: gallery1, alt: "Team collaboration", span: NORMAL_SPAN },
  { id: 2, src: gallery2, alt: "Meeting presentation", span: NORMAL_SPAN },
  { id: 3, src: gallery3, alt: "Team group photo", span: NORMAL_SPAN },
  { id: 4, src: gallery4, alt: "Workshop activity", span: NORMAL_SPAN },
  { id: 5, src: gallery5, alt: "Team building", span: WIDE_SPAN },
  { id: 6, src: gallery6, alt: "Corporate event", span: WIDE_SPAN },
];

const isWide = (span) => !!span && span.includes("md:col-span-2");

function GalleryBlock({ data, documentId, images }) {
  const { sanity, st } = useSanityContent(data);
  const { isEditing } = useEditMode();
  const pathname = usePathname();
  const router = useRouter();
  const title = st(sanity?.title, "gallery.title");
  const path = sanity?._key ? `sections[_key=="${sanity._key}"]` : null;

  const usingSanityImages = !!images?.length;
  const galleryImages = usingSanityImages
    ? images.map((image) => ({
        id: image._id,
        src: pickImage(image.imageUrl, null),
        alt: image.alt,
        span: image.span,
      }))
    : fallbackGalleryImages;

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState("");
  const [deleting, setDeleting] = useState(null); // image being confirmed for deletion
  const addInputRef = useRef(null);
  const replaceInputRef = useRef(null);
  const replaceTarget = useRef(null);

  const upload = async (file, extra = {}) => {
    const form = new FormData();
    form.append("file", await shrinkImage(file));
    form.append("pagePath", pathname);
    Object.entries(extra).forEach(([key, value]) => value && form.append(key, value));
    const res = await fetch("/api/admin/gallery", { method: "POST", body: form });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json.error || "Could not upload the image.");
    return json.id;
  };

  // The site shows its built-in photos until Sanity has any. Before the first
  // change, copy them into Sanity so they aren't lost. Returns the Sanity ids in
  // grid order. The pictures are uploaded first and the whole set is created in
  // one step, so the gallery is never left with only some of its pictures.
  const ensureSanityImages = async () => {
    if (usingSanityImages) return galleryImages.map((image) => image.id);
    try {
      setProgress(`Setting up the gallery (first time only): 0 of ${fallbackGalleryImages.length}...`);
      const entries = await Promise.all(
        fallbackGalleryImages.map(async (image) => ({
          // The originals are 2-24MB; the optimised copy is what visitors already see.
          file: await fetchAsFile(
            `/_next/image?url=${encodeURIComponent(image.src.src)}&w=1920&q=75`,
            `${image.alt}.webp`,
          ),
          alt: image.alt,
          span: image.span,
        })),
      );
      return await seedFromBuiltIn("/api/admin/gallery", entries, pathname, (done, total) =>
        setProgress(`Setting up the gallery (first time only): ${done} of ${total}...`),
      );
    } finally {
      setProgress("");
    }
  };

  const run = async (action) => {
    setBusy(true);
    setError("");
    try {
      await action();
      router.refresh();
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const addPicture = (file) =>
    run(async () => {
      await ensureSanityImages();
      await upload(file);
    });

  const replacePicture = (file) =>
    run(async () => {
      const ids = await ensureSanityImages();
      const index = galleryImages.findIndex((image) => image.id === replaceTarget.current);
      await upload(file, { replaceId: ids[index] });
    });

  const toggleWide = (image) =>
    run(async () => {
      const ids = await ensureSanityImages();
      const index = galleryImages.findIndex((item) => item.id === image.id);
      const res = await fetch("/api/admin/gallery", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: ids[index],
          span: isWide(image.span) ? NORMAL_SPAN : WIDE_SPAN,
          pagePath: pathname,
        }),
      });
      if (!res.ok) throw new Error("Could not change the picture size.");
    });

  const deletePicture = async () => {
    setBusy(true);
    setError("");
    try {
      const ids = await ensureSanityImages();
      const index = galleryImages.findIndex((item) => item.id === deleting.id);
      const res = await fetch("/api/admin/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: ids[index], pagePath: pathname }),
      });
      if (!res.ok) throw new Error("Could not delete the picture. Please try again.");
      setDeleting(null);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const controls = (image) =>
    isEditing && (
      <div className="absolute top-3 right-3 z-10 flex gap-2">
        <button
          type="button"
          title="Replace picture"
          disabled={busy}
          onClick={() => {
            replaceTarget.current = image.id;
            replaceInputRef.current?.click();
          }}
          className="w-9 h-9 rounded-full bg-white/95 text-gray-800 shadow flex items-center justify-center hover:bg-white disabled:opacity-50 cursor-pointer"
        >
          <ImageUp size={17} />
        </button>
        <button
          type="button"
          title={isWide(image.span) ? "Make normal width" : "Make wide"}
          disabled={busy}
          onClick={() => toggleWide(image)}
          className="hidden md:flex w-9 h-9 rounded-full bg-white/95 text-gray-800 shadow items-center justify-center hover:bg-white disabled:opacity-50 cursor-pointer"
        >
          {isWide(image.span) ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
        </button>
        <button
          type="button"
          title="Delete picture"
          disabled={busy}
          onClick={() => {
            setError("");
            setDeleting(image);
          }}
          className="w-9 h-9 rounded-full bg-white/95 text-red-500 shadow flex items-center justify-center hover:bg-white disabled:opacity-50 cursor-pointer"
        >
          <Trash2 size={17} />
        </button>
      </div>
    );

  const addTile = (className) =>
    isEditing && (
      <button
        type="button"
        disabled={busy}
        onClick={() => addInputRef.current?.click()}
        className={`${className} rounded-2xl border-2 border-dashed border-gray-300 text-gray-500 hover:border-cyan-400 hover:text-cyan-600 flex flex-col items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer`}
      >
        <Plus size={28} />
        <span className="text-sm font-semibold">{busy ? "Working..." : "Add picture"}</span>
      </button>
    );

  return (
    <section className="w-full py-12 md:py-24 px-4 bg-[#F9F9F9]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="text-center mb-12 md:mb-16"
      >
        <h2 className="text-2xl md:text-4xl font-bold text-black tracking-widest uppercase">
          <Editable documentId={documentId} path={path && `${path}.title`} value={title} />
        </h2>
      </motion.div>

      {isEditing && (
        <div className="max-w-7xl mx-auto mb-4 text-center">
          <p className="text-sm text-gray-500">
            {galleryImages.length} {galleryImages.length === 1 ? "picture" : "pictures"} in the grid. Use the buttons
            on a picture to replace, resize or delete it, or add a new one.
          </p>
          {error && !deleting && <p className="text-sm text-red-600 mt-2">{error}</p>}
          {busy && progress && <p className="text-sm text-cyan-700 mt-2">{progress}</p>}
        </div>
      )}

      <input
        ref={addInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) addPicture(file);
        }}
      />
      <input
        ref={replaceInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) replacePicture(file);
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="hidden md:grid grid-cols-2 grid-flow-dense gap-4 auto-rows-[350px]">
          {galleryImages.map((image) => (
            <motion.div
              key={image.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className={`${image.span || NORMAL_SPAN} rounded-2xl overflow-hidden group relative`}
            >
              <Image
                src={image.src}
                alt={image.alt || ""}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              {controls(image)}
            </motion.div>
          ))}
          {addTile("col-span-1 row-span-1")}
        </div>

        <div className="md:hidden grid grid-cols-1 gap-4 auto-rows-[200px]">
          {galleryImages.map((image) => (
            <motion.div
              key={image.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className="rounded-2xl overflow-hidden cursor-pointer group relative"
            >
              <Image
                src={image.src}
                alt={image.alt || ""}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              {controls(image)}
            </motion.div>
          ))}
          {addTile("")}
        </div>
      </div>

      {deleting && (
        <ConfirmDeleteModal
          title="Delete this picture?"
          message="This removes it from the gallery on the website. This can't be undone."
          busy={busy}
          progress={progress}
          error={error}
          onCancel={() => setDeleting(null)}
          onConfirm={deletePicture}
        >
          <div className="relative w-full h-40 rounded-lg overflow-hidden bg-gray-100 mb-2">
            <Image src={deleting.src} alt={deleting.alt || ""} fill className="object-cover" />
          </div>
        </ConfirmDeleteModal>
      )}
    </section>
  );
}

export default GalleryBlock;
