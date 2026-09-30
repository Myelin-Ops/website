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
  const { isEditing } = useEditMode();
  const pathname = usePathname();
  const router = useRouter();
  const title = st(sanity?.title, "partners.title");
  const path = sanity?._key ? `sections[_key=="${sanity._key}"]` : null;

  const usingSanityPartners = !!partners?.length;
  const partnersList = usingSanityPartners
    ? partners.map((partner) => ({
        id: partner._id,
        src: pickImage(partner.logoUrl, null),
        alt: partner.name,
        scale: partner.scale,
      }))
    : fallbackPartners;

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState("");
  const [deleting, setDeleting] = useState(null); // logo being confirmed for removal
  const addInputRef = useRef(null);

  const upload = async (file, extra = {}) => {
    const form = new FormData();
    form.append("file", await shrinkImage(file));
    form.append("pagePath", pathname);
    Object.entries(extra).forEach(([key, value]) => value && form.append(key, value));
    const res = await fetch("/api/admin/partners", { method: "POST", body: form });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json.error || "Could not upload the logo.");
    return json.id;
  };

  // The site shows its built-in logos until Sanity has any. Before the first
  // change, copy them into Sanity so they aren't lost. Returns the Sanity ids in
  // list order. The logos are uploaded first and the whole list is created in
  // one step, so it's never half-copied.
  const ensureSanityPartners = async () => {
    if (usingSanityPartners) return partnersList.map((partner) => partner.id);
    try {
      setProgress(`Setting up the logos (first time only): 0 of ${fallbackPartners.length}...`);
      const entries = await Promise.all(
        fallbackPartners.map(async (partner) => ({
          file: await fetchAsFile(partner.src.src, `${partner.alt}.png`),
          name: partner.alt,
          scale: partner.scale,
        })),
      );
      return await seedFromBuiltIn("/api/admin/partners", entries, pathname, (done, total) =>
        setProgress(`Setting up the logos (first time only): ${done} of ${total}...`),
      );
    } finally {
      setProgress("");
    }
  };

  const addLogo = async (file) => {
    setBusy(true);
    setError("");
    try {
      await ensureSanityPartners();
      await upload(file);
      router.refresh();
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const removeLogo = async () => {
    setBusy(true);
    setError("");
    try {
      const ids = await ensureSanityPartners();
      const index = partnersList.findIndex((partner) => partner.id === deleting.id);
      const res = await fetch("/api/admin/partners", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: ids[index], pagePath: pathname }),
      });
      if (!res.ok) throw new Error("Could not remove the logo. Please try again.");
      setDeleting(null);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const doubledPartners = [...partnersList, ...partnersList];

  return (
    <section className="w-full py-12 md:py-24 bg-white border-y border-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <h2 className="text-center text-sm font-bold tracking-[0.3em] text-gray-400 uppercase">
          <Editable documentId={documentId} path={path && `${path}.title`} value={title} />
        </h2>
      </div>

      <input
        ref={addInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) addLogo(file);
        }}
      />

      {isEditing ? (
        // While editing, the moving strip becomes a still grid so each logo
        // can be reached and removed.
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm text-gray-500 mb-6">
            {partnersList.length} {partnersList.length === 1 ? "logo" : "logos"}. Remove one with the × button, or add a
            new one.
          </p>
          {error && !deleting && <p className="text-center text-sm text-red-600 mb-4">{error}</p>}
          {busy && progress && <p className="text-center text-sm text-cyan-700 mb-4">{progress}</p>}
          <div className="flex flex-wrap justify-center gap-4">
            {partnersList.map((partner) => (
              <div
                key={partner.id}
                className="relative w-[180px] h-[100px] rounded-xl border border-gray-200 bg-white flex items-center justify-center p-4"
              >
                <div className="relative w-full h-full">
                  <Image src={partner.src} alt={partner.alt || ""} fill className="object-contain" />
                </div>
                <button
                  type="button"
                  title="Remove logo"
                  disabled={busy}
                  onClick={() => {
                    setError("");
                    setDeleting(partner);
                  }}
                  className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-600 text-white shadow flex items-center justify-center hover:bg-red-700 disabled:opacity-50 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              disabled={busy}
              onClick={() => addInputRef.current?.click()}
              className="w-[180px] h-[100px] rounded-xl border-2 border-dashed border-gray-300 text-gray-500 hover:border-cyan-400 hover:text-cyan-600 flex flex-col items-center justify-center gap-1 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Plus size={24} />
              <span className="text-sm font-semibold">{busy ? "Working..." : "Add logo"}</span>
            </button>
          </div>
        </div>
      ) : (
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
      )}

      {deleting && (
        <ConfirmDeleteModal
          title="Remove this logo?"
          message="This removes it from the partners strip on the website. This can't be undone."
          busy={busy}
          progress={progress}
          error={error}
          onCancel={() => setDeleting(null)}
          onConfirm={removeLogo}
        >
          <div className="relative w-full h-24 rounded-lg bg-gray-50 border border-gray-100 mb-2">
            <Image src={deleting.src} alt={deleting.alt || ""} fill className="object-contain p-3" />
          </div>
        </ConfirmDeleteModal>
      )}
    </section>
  );
}

export default PartnersBlock;
