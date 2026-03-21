"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonialsList = [
  {
    id: 1,
    quote:
      "It was a privilege to collaborate with Myelin OPS. The company provided an insightful analysis on workplace stress and its impact on performance provided great value to our municipality's employees. Myelin OPS is an ideal partner for any organization seeking to enhance well-being and performance at work.",
    author: "Municipality of Vushtrria",
  },
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + testimonialsList.length) % testimonialsList.length,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsList.length);
  };

  const handleViewMore = () => {
    setVisibleCount((prev) => Math.min(prev + 2, testimonialsList.length));
  };

  const currentTestimonial = testimonialsList[currentIndex];
  const visibleTestimonials = testimonialsList.slice(0, visibleCount);

  return (
    <section className="w-full py-8 md:py-24 px-4">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="text-center mb-8 md:mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-black">
          Testimonials
        </h2>
      </motion.div>

      {/* Desktop Carousel View */}
      <div className="hidden md:block">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-6 md:gap-12">
            {/* Previous Button */}
            {testimonialsList.length > 1 && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrev}
                className="flex-shrink-0 p-3 md:p-4 border border-gray-300 rounded-full hover:border-gray-400 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-black" />
              </motion.button>
            )}

            {/* Testimonial Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 bg-gradient-to-br from-cyan-200 to-cyan-100 rounded-3xl p-8 md:p-12 text-center"
              >
                <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8">
                  "{currentTestimonial.quote}"
                </p>
                <p className="text-gray-800 font-semibold text-sm md:text-base">
                  - {currentTestimonial.author}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Next Button */}
            {testimonialsList.length > 1 && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="flex-shrink-0 p-3 md:p-4 border border-gray-300 rounded-full hover:border-gray-400 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-black" />
              </motion.button>
            )}
          </div>

          {/* Indicator Dots */}
          {testimonialsList.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {testimonialsList.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setCurrentIndex(index)}
                  className={`rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-cyan-500 w-8 h-2"
                      : "bg-gray-300 w-2 h-2 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></motion.button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Grid View */}
      <div className="md:hidden">
        <div className="grid grid-cols-1 gap-4">
          {visibleTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-cyan-200 to-cyan-100 rounded-3xl p-6 text-center"
            >
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>
              <p className="text-gray-800 font-semibold text-xs">
                - {testimonial.author}
              </p>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        {visibleCount < testimonialsList.length &&
          testimonialsList.length > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center mt-8"
            >
              <button
                onClick={handleViewMore}
                className="text-cyan-600 hover:text-cyan-700 font-medium text-sm underline transition-colors"
              >
                View more
              </button>
            </motion.div>
          )}
      </div>
    </section>
  );
}

export default Testimonials;
