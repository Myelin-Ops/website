"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useSanityContent } from "@/lib/useSanityContent";
import { pickImage } from "@/lib/sanityImage";
import { shrinkImage } from "@/lib/shrinkImage";
import { fetchAsFile, seedFromBuiltIn } from "@/lib/adminSeed";
import Editable from "@/components/admin/Editable";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";
import { useEditMode } from "@/components/admin/EditModeProvider";
import barutiLogo from "@/assets/images/partners/Baruti-AG-Logo.png";
import londonSchoolLogo from "@/assets/images/partners/London-School-Logo.png";
import upLogo from "@/assets/images/partners/up-logo.png";
import uniprLogo from "@/assets/images/partners/unipr-logo.png";
import vushtrriaLogo from "@/assets/images/partners/vushtrria-logo.png";
import cacttusLogo from "@/assets/images/partners/cacttus-logo.png";
import albiLogo from "@/assets/images/partners/albi-logo.png";
import kosovajobLogo from "@/assets/images/partners/kosovajob-logo.png";
import caritasAustriaLogo from "@/assets/images/partners/Caritas_Austria.gif";
import austriaMohLogo from "@/assets/images/partners/Austria-MoH.png";
import caritasKosovaLogo from "@/assets/images/partners/social_logo_caritas.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Built-in list, shown until Sanity has institutions. `key` is the i18next name key.
const FALLBACK_INSTITUTIONS = [
  { key: "baruti", src: barutiLogo, scale: "scale-110 md:scale-110" },
  {
    key: "londonSchool",
    src: londonSchoolLogo,
    scale: "scale-110 md:scale-110",
  },
  { key: "up", src: uniprLogo, scale: "scale-100 md:scale-100" },
  { key: "uhz", src: upLogo, scale: "scale-120 md:scale-100" },
  { key: "vushtrria", src: vushtrriaLogo },
  { key: "cacttus", src: cacttusLogo, scale: "scale-130" },
  { key: "albi", src: albiLogo, scale: "scale-110 md:scale-140" },
  { key: "kosovajob", src: kosovajobLogo, scale: "scale-120 md:scale-120" },
  {
    key: "caritasAustria",
    src: caritasAustriaLogo,
    scale: "scale-120 md:scale-120",
  },
  { key: "austriaMoh", src: austriaMohLogo, scale: "scale-110 md:scale-110" },
  {
    key: "caritasKosova",
    src: caritasKosovaLogo,
    scale: "scale-120 md:scale-120",
  },
];

// `institutions` is an { en, sq } bundle of Institution documents (global collection).
function InstitutionsSectionBlock({
  data,
  documentId,
  institutions,
  i18nPrefix = "partners",
}) {
  const { t, i18n, sanity, st } = useSanityContent(data);
  const { sanity: institutionsSanity } = useSanityContent(institutions);
  const { isEditing } = useEditMode();
  const pathname = usePathname();
  const router = useRouter();
  const path = sanity?._key ? `sections[_key=="${sanity._key}"]` : null;

  const usingSanityInstitutions = !!institutionsSanity?.length;
  const list = usingSanityInstitutions
    ? institutionsSanity.map((inst) => ({
        id: inst._id,
        src: pickImage(inst.logoUrl, null),
        label: inst.name,
        scale: inst.scale,
      }))
    : FALLBACK_INSTITUTIONS.map((inst) => ({
        id: inst.key,
        src: inst.src,
        label: t(`${i18nPrefix}.${inst.key}`),
        scale: inst.scale,
      }));

  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newLogo, setNewLogo] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const logoInputRef = useRef(null);

  const save = async (file, fields) => {
    const form = new FormData();
    form.append("file", await shrinkImage(file));
    form.append("pagePath", pathname);
    Object.entries(fields).forEach(
      ([key, value]) => value && form.append(key, value),
    );
    const res = await fetch("/api/admin/institutions", {
      method: "POST",
      body: form,
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok)
      throw new Error(json.error || "Could not save the institution.");
    return json.id;
  };

  // The site shows its built-in list until Sanity has institutions. Before the
  // first change, copy it into Sanity (English and Albanian names) so it isn't
  // lost. Returns the Sanity ids in list order. The pictures are uploaded first
  // and the whole list is created in one step, so it's never half-copied.
  const ensureSanityInstitutions = async () => {
    if (usingSanityInstitutions) return list.map((inst) => inst.id);
    const en = i18n.getFixedT("en");
    const sq = i18n.getFixedT("sq");
    try {
      setProgress(`Setting up the list (first time only): 0 of ${FALLBACK_INSTITUTIONS.length}...`);
      const entries = await Promise.all(
        FALLBACK_INSTITUTIONS.map(async (inst) => ({
          file: await fetchAsFile(inst.src.src, `${inst.key}.${inst.src.src.endsWith(".gif") ? "gif" : "png"}`),
          nameEn: en(`${i18nPrefix}.${inst.key}`),
          nameSq: sq(`${i18nPrefix}.${inst.key}`),
          scale: inst.scale,
        })),
      );
      return await seedFromBuiltIn("/api/admin/institutions", entries, pathname, (done, total) =>
        setProgress(`Setting up the list (first time only): ${done} of ${total}...`),
      );
    } finally {
      setProgress("");
    }
  };

  const addInstitution = async (e) => {
    e.preventDefault();
    if (!newLogo) {
      setError("Please choose a logo.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await ensureSanityInstitutions();
      setProgress("Adding your institution...");
      await save(newLogo, { name: newName, lang: i18n.language });
      setNewName("");
      setNewLogo(null);
      setAdding(false);
      router.refresh();
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const removeInstitution = async () => {
    setBusy(true);
    setError("");
    try {
      const ids = await ensureSanityInstitutions();
      const index = list.findIndex((inst) => inst.id === deleting.id);
      const res = await fetch("/api/admin/institutions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: ids[index], pagePath: pathname }),
      });
      if (!res.ok)
        throw new Error("Could not remove the institution. Please try again.");
      setDeleting(null);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="py-16 md:py-32 px-4 md:px-12 bg-[#F6F8F8]">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
          className="text-xl md:text-4xl font-bold text-gray-900 mb-12 md:mb-20"
        >
          <Editable
            documentId={documentId}
            path={path && `${path}.title`}
            value={st(sanity?.title, `${i18nPrefix}.title`)}
          />
        </motion.h2>

        {isEditing && (
          <div className="max-w-2xl mx-auto mb-12 text-center">
            <p className="text-sm text-gray-500 mb-3">
              {list.length} {list.length === 1 ? "institution" : "institutions"}
              . Remove one with the × button, or add a new one with a logo and a
              name.
            </p>
            {error && !deleting && (
              <p className="text-sm text-red-600 mb-3">{error}</p>
            )}
            {busy && progress && (
              <p className="text-sm text-cyan-700 mb-3">{progress}</p>
            )}
            {adding ? (
              <form
                onSubmit={addInstitution}
                className="bg-white border border-gray-200 rounded-2xl p-5 text-left shadow-lg space-y-3"
              >
                <p className="text-sm font-bold text-gray-900">
                  New institution (
                  {i18n.language === "sq" ? "Shqip" : "English"})
                </p>
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Institution name"
                  required
                  className="w-full border border-gray-200 rounded-lg p-3 text-sm"
                />
                {/* The real file input is hidden: only the button is clickable
                    (and shows the pointer), not the empty space beside it. */}
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => setNewLogo(e.target.files?.[0] || null)}
                />
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => logoInputRef.current?.click()}
                    className="px-3 py-2 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer shrink-0"
                  >
                    Choose File
                  </button>
                  <span className="text-sm text-gray-600 truncate">
                    {newLogo ? newLogo.name : "No file chosen"}
                  </span>
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setAdding(false);
                      setNewLogo(null);
                      setNewName("");
                      setError("");
                    }}
                    className="px-4 py-2 text-sm rounded-lg bg-gray-100 text-gray-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={busy}
                    className="px-4 py-2 text-sm rounded-lg bg-black text-white font-semibold disabled:opacity-50 cursor-pointer"
                  >
                    {busy ? "Saving..." : "Add institution"}
                  </button>
                </div>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setAdding(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-white border border-gray-200 text-gray-700 hover:text-black cursor-pointer"
              >
                <Plus size={16} /> Add institution
              </button>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto gap-y-12 md:gap-y-24 gap-x-8 md:gap-x-12 items-start justify-items-center">
          {list.map((inst, i) => (
            // Each item animates on its own (not through a parent), so an item added
            // later in edit mode still appears instead of staying at "hidden".
            <motion.div
              key={inst.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className={`relative flex flex-col items-center ${i === 8 ? "lg:col-start-1" : ""}`}
            >
              {isEditing && (
                <button
                  type="button"
                  title="Remove institution"
                  disabled={busy}
                  onClick={() => {
                    setError("");
                    setDeleting(inst);
                  }}
                  className="absolute -top-2 right-0 z-10 w-7 h-7 rounded-full bg-red-600 text-white shadow flex items-center justify-center hover:bg-red-700 disabled:opacity-50 cursor-pointer"
                >
                  <X size={16} />
                </button>
              )}
              <div className="h-32 md:h-52 w-full flex items-center justify-center mb-6 md:mb-8 px-4">
                {inst.src && (
                  <Image
                    src={inst.src}
                    alt={inst.label || ""}
                    width={300}
                    height={200}
                    className={`max-h-full w-auto object-contain ${inst.scale || ""}`}
                  />
                )}
              </div>
              <h3 className="text-base md:text-xl font-bold text-gray-900 mt-4">
                {usingSanityInstitutions ? (
                  <Editable
                    documentId={inst.id}
                    path="name"
                    value={inst.label}
                  />
                ) : (
                  inst.label
                )}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>

      {deleting && (
        <ConfirmDeleteModal
          title="Remove this institution?"
          message="This removes its logo and name from the website. This can't be undone."
          busy={busy}
          progress={progress}
          error={error}
          onCancel={() => setDeleting(null)}
          onConfirm={removeInstitution}
        >
          <div className="rounded-lg bg-gray-50 border border-gray-100 p-3 mb-2 text-center">
            <div className="relative w-full h-20 mb-2">
              {deleting.src && (
                <Image
                  src={deleting.src}
                  alt={deleting.label || ""}
                  fill
                  className="object-contain"
                />
              )}
            </div>
            <p className="text-sm font-semibold text-gray-900">
              {deleting.label}
            </p>
          </div>
        </ConfirmDeleteModal>
      )}
    </section>
  );
}

export default InstitutionsSectionBlock;
