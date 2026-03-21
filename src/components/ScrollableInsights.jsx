'use client'

import React from "react";
import { motion } from "framer-motion";

const insights = [
  {
    id: 1,
    title: "Leadership shapes collective cognition.",
    description: "Effective leadership determines how teams perceive complexity and psychological safety.",
  },
  {
    id: 2,
    title: "Culture influences performance.",
    description: "Cultural alignment directly impacts decision quality and operational clarity.",
  },
  {
    id: 3,
    title: "Intervention changes trajectories.",
    description: "Evidence-based interventions shift organizations from reactive management to sustainable development.",
  },
];

function ScrollableInsights() {
  return (
    <section className="w-full py-16 md:py-24 px-4 bg-[#0F1419]">
      <div className="max-w-7xl mx-auto">
        {/* Scrollable Cards Container */}
        <div className="space-y-8 md:space-y-12">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left Content */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                    {insight.title}
                  </h3>
                  <p className="text-base text-gray-300 leading-relaxed">
                    {insight.description}
                  </p>
                </div>

                {/* Right Side - Placeholder for Background Image */}
                <div className="relative w-full h-64 md:h-72 bg-gradient-to-br from-[#1a2a4a] to-[#0F1419] rounded-lg border border-gray-700 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">Background image placeholder</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll hint for mobile */}
        <p className="text-xs text-gray-500 mt-4 md:hidden">
          Scroll down to see more
        </p>
      </div>
    </section>
  );
}

export default ScrollableInsights;
