"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const TOTAL_TIME = 15000; // 15 seconds in milliseconds
const TICK_INTERVAL = 20; // Update every 20ms for smooth tracking

function Testimonials() {
  const { t } = useTranslation();
  const testimonialsList = t("testimonials.list", { returnObjects: true });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  useEffect(() => {
    if (isPaused) return;

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
  }, [currentIndex, isPaused]); // Resets when index changes, but PAUSES when isPaused changes

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + testimonialsList.length) % testimonialsList.length,
    );
    setTimeLeft(TOTAL_TIME);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsList.length);
    setTimeLeft(TOTAL_TIME);
  };

  const currentTestimonial = testimonialsList[currentIndex];
  const progressPercentage = (timeLeft / TOTAL_TIME) * 100;

  return (
    <section className="w-full py-20 px-4 bg-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20 md:mb-10"
        >
          <h2 className="text-2xl md:text-5xl font-bold text-black tracking-widest uppercase">
            {t("testimonials.label")}
          </h2>
          <div className="w-16 h-1 bg-cyan-500 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Carousel Container */}
        <div className="max-w-[80rem] mx-auto w-full">
          <div className="flex items-center gap-4 md:gap-12 lg:gap-20">
            {/* Desktop Navigation */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrev}
              className="hidden md:flex p-4 border border-gray-200 rounded-full text-gray-400 hover:text-cyan-500 hover:border-cyan-500 transition-all duration-300 flex-shrink-0"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={30} />
            </motion.button>

            {/* Testimonial Card */}
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
                  {/* Decorative Quote Mark */}
                  <div className="mb-6 md:mb-8 flex justify-center opacity-10">
                    <Quote size={32} className="text-cyan-600 fill-cyan-600" />
                  </div>

                  <p className="text-gray-800 text-base md:text-xl lg:text-2xl font-light italic leading-relaxed mb-8 md:mb-10 max-w-5xl mx-auto">
                    "{currentTestimonial.quote}"
                  </p>

                  <div className="mt-auto">
                    <div className="w-10 h-[1px] bg-cyan-500/30 mx-auto mb-6" />
                    <p className="text-black font-semibold text-xs md:text-sm tracking-[0.2em] uppercase">
                      {currentTestimonial.author}
                    </p>
                  </div>

                  {/* Resumeable Progress Timer Line */}
                  <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-100/50">
                    <motion.div
                      style={{ width: `${progressPercentage}%` }}
                      className="h-full bg-cyan-500"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dots */}
              <div className="flex justify-center gap-3 mt-12">
                {testimonialsList.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setTimeLeft(TOTAL_TIME);
                    }}
                    className={`h-1.5 transition-all duration-500 rounded-full ${
                      index === currentIndex
                        ? "bg-cyan-500 w-12"
                        : "bg-gray-200 w-3 hover:bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="hidden md:flex p-4 border border-gray-200 rounded-full text-gray-400 hover:text-cyan-500 hover:border-cyan-500 transition-all duration-300 flex-shrink-0"
              aria-label="Next testimonial"
            >
              <ChevronRight size={30} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
