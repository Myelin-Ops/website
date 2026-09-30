"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Quote, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSanityContent } from "@/lib/useSanityContent";
import Editable from "@/components/admin/Editable";
import { useEditMode } from "@/components/admin/EditModeProvider";

const TOTAL_TIME = 15000; // 15 seconds in milliseconds
const TICK_INTERVAL = 20; // Update every 20ms for smooth tracking

function TestimonialsSectionBlock({ data, documentId, testimonials }) {
  const { t, i18n, sanity, st } = useSanityContent(data);
  const { isEditing } = useEditMode();
  const pathname = usePathname();
  const router = useRouter();
  const { sanity: testimonialsSanity } = useSanityContent(testimonials);
  const label = st(sanity?.label, "testimonials.label");
  const path = sanity?._key ? `sections[_key=="${sanity._key}"]` : null;
  const fallbackList = t("testimonials.list", { returnObjects: true });
  const testimonialsList = testimonialsSanity?.length
    ? testimonialsSanity
    : Array.isArray(fallbackList)
      ? fallbackList
      : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [adding, setAdding] = useState(false);
  const [newQuote, setNewQuote] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [busy, setBusy] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsList.length);
    setTimeLeft(TOTAL_TIME);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonialsList.length) % testimonialsList.length);
    setTimeLeft(TOTAL_TIME);
  };

  useEffect(() => {
    if (isPaused || isEditing || testimonialsList.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          handleNext();
          return TOTAL_TIME;
        }
        return prev - TICK_INTERVAL;
      });
    }, TICK_INTERVAL);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isPaused, isEditing, testimonialsList.length]);

  const currentTestimonial = testimonialsList[Math.min(currentIndex, testimonialsList.length - 1)];
  const progressPercentage = (timeLeft / TOTAL_TIME) * 100;

  const addTestimonial = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quote: newQuote, author: newAuthor, lang: i18n.language, pagePath: pathname }),
      });
      if (!res.ok) {
        window.alert("Could not add the testimonial. Please try again.");
        return;
      }
      setNewQuote("");
      setNewAuthor("");
      setAdding(false);
      // The new testimonial is appended last; show it once the list refreshes.
      setCurrentIndex(testimonialsSanity?.length ?? 0);
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  const deleteTestimonial = async () => {
    if (!currentTestimonial?._id) return;
    setBusy(true);
    setDeleteError("");
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: currentTestimonial._id, pagePath: pathname }),
      });
      if (!res.ok) {
        setDeleteError("Could not delete the testimonial. Please try again.");
        return;
      }
      setConfirmingDelete(false);
      setCurrentIndex(0);
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  // Visitors see nothing without testimonials; editors still get the section so
  // they can add the first one.
  if (testimonialsList.length === 0 && !isEditing) return null;

  return (
    <section className="w-full py-20 px-4 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20 md:mb-10"
        >
          <h2 className="text-2xl md:text-5xl font-bold text-black tracking-widest uppercase">
            <Editable documentId={documentId} path={path && `${path}.label`} value={label} />
          </h2>
          <div className="w-16 h-1 bg-cyan-500 mx-auto mt-6 rounded-full" />
        </motion.div>

        {isEditing && (
          <div className="max-w-3xl mx-auto mb-8 text-center">
            {adding ? (
              <form
                onSubmit={addTestimonial}
                className="bg-white border border-gray-200 rounded-2xl p-5 text-left shadow-lg space-y-3"
              >
                <p className="text-sm font-bold text-gray-900">
                  New testimonial ({i18n.language === "sq" ? "Shqip" : "English"})
                </p>
                <textarea
                  value={newQuote}
                  onChange={(e) => setNewQuote(e.target.value)}
                  placeholder="Quote"
                  rows={4}
                  required
                  className="w-full border border-gray-200 rounded-lg p-3 text-sm"
                />
                <input
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="Author (name, role)"
                  required
                  className="w-full border border-gray-200 rounded-lg p-3 text-sm"
                />
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setAdding(false)}
                    className="px-4 py-2 text-sm rounded-lg bg-gray-100 text-gray-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={busy}
                    className="px-4 py-2 text-sm rounded-lg bg-black text-white font-semibold disabled:opacity-50 cursor-pointer"
                  >
                    {busy ? "Saving..." : "Add testimonial"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setAdding(true)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-white border border-gray-200 text-gray-700 hover:text-black cursor-pointer"
                >
                  <Plus size={16} /> Add testimonial
                </button>
                {currentTestimonial?._id && (
                  <button
                    onClick={() => {
                      setDeleteError("");
                      setConfirmingDelete(true);
                    }}
                    disabled={busy}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-white border border-gray-200 text-red-500 hover:text-red-600 disabled:opacity-50 cursor-pointer"
                  >
                    <Trash2 size={16} /> Delete this one
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {currentTestimonial && (
        <div className="max-w-[80rem] mx-auto w-full">
          <div className="flex items-center gap-4 md:gap-12 lg:gap-20">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrev}
              className="hidden md:flex p-4 cursor-pointer border border-gray-200 rounded-full text-gray-400 hover:text-cyan-500 hover:border-cyan-500 transition-all duration-300 flex-shrink-0"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={30} />
            </motion.button>

            <div
              className="flex-1 relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.98, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.98, x: -20 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-[#FAFAFA] border border-gray-100 rounded-[2.5rem] p-10 md:p-12 lg:p-16 shadow-2xl shadow-gray-200/40 relative overflow-hidden min-h-[300px] flex flex-col justify-center text-center"
                >
                  <div className="mb-6 md:mb-8 flex justify-center opacity-10">
                    <Quote size={32} className="text-cyan-600 fill-cyan-600" />
                  </div>

                  <p className="text-gray-800 text-base md:text-xl lg:text-2xl font-light italic leading-relaxed mb-8 md:mb-10 max-w-5xl mx-auto">
                    &quot;
                    <Editable
                      documentId={currentTestimonial._id}
                      path={currentTestimonial._id ? "quote" : null}
                      value={currentTestimonial.quote}
                    />
                    &quot;
                  </p>

                  <div className="mt-auto">
                    <div className="w-10 h-[1px] bg-cyan-500/30 mx-auto mb-6" />
                    <p className="text-black font-semibold text-xs md:text-sm tracking-[0.2em] uppercase">
                      <Editable
                        documentId={currentTestimonial._id}
                        path={currentTestimonial._id ? "author" : null}
                        value={currentTestimonial.author}
                      />
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-100/50">
                    <motion.div style={{ width: `${progressPercentage}%` }} className="h-full bg-cyan-500" />
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center gap-3 mt-12">
                {testimonialsList.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setTimeLeft(TOTAL_TIME);
                    }}
                    className={`h-1.5 transition-all cursor-pointer duration-500 rounded-full ${
                      index === currentIndex ? "bg-cyan-500 w-12" : "bg-gray-200 w-3 hover:bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="hidden md:flex p-4 cursor-pointer border border-gray-200 rounded-full text-gray-400 hover:text-cyan-500 hover:border-cyan-500 transition-all duration-300 flex-shrink-0"
              aria-label="Next testimonial"
            >
              <ChevronRight size={30} />
            </motion.button>
          </div>
        </div>
        )}
      </div>
      {confirmingDelete && currentTestimonial && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
          onClick={() => !busy && setConfirmingDelete(false)}
          onKeyDown={(e) => e.key === "Escape" && !busy && setConfirmingDelete(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-testimonial-title"
        >
          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                <Trash2 size={20} />
              </div>
              <h3 id="delete-testimonial-title" className="text-lg font-bold text-gray-900">
                Delete this testimonial?
              </h3>
            </div>
            <p className="text-sm text-gray-500 mb-3">
              This removes it from the website in both English and Shqip. This can&apos;t be undone.
            </p>
            <blockquote className="text-sm text-gray-700 italic bg-gray-50 border border-gray-100 rounded-lg p-3 mb-2 line-clamp-3">
              &quot;{currentTestimonial.quote}&quot;
              <span className="block not-italic font-semibold mt-1 text-gray-900">{currentTestimonial.author}</span>
            </blockquote>
            {deleteError && <p className="text-sm text-red-600 mt-2">{deleteError}</p>}
            <div className="flex justify-end gap-2 mt-5">
              <button
                autoFocus
                onClick={() => setConfirmingDelete(false)}
                disabled={busy}
                className="px-4 py-2 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={deleteTestimonial}
                disabled={busy}
                className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50 cursor-pointer"
              >
                {busy ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default TestimonialsSectionBlock;
