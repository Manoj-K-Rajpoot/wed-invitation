"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, MapPin, Calendar } from "lucide-react";
import { WEDDING_DATA } from "@/lib/weddingData";

export default function V2StoryTimeline() {
  const { ourStory } = WEDDING_DATA;

  return (
    <section id="story" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-14 space-y-2">
        <span className="text-[11px] font-bold font-royal uppercase tracking-widest text-amber-900 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-300">
          Our Journey
        </span>
        <h2 className="font-editorial text-3xl sm:text-5xl text-[#580B1E] font-bold">
          Our Love Story
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
          How two souls found their forever melody by the serene waters of Lake Pichola.
        </p>
        <div className="w-20 h-0.5 bg-amber-400 mx-auto mt-2" />
      </div>

      {/* Vertical Timeline */}
      <div className="relative space-y-8 before:absolute before:inset-0 before:left-5 sm:before:left-1/2 before:w-0.5 before:bg-amber-300">
        {ourStory.map((chapter, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                isEven ? "sm:flex-row-reverse" : ""
              } pl-12 sm:pl-0 gap-4 sm:gap-10`}
            >
              {/* Timeline Center Node */}
              <div className="absolute left-5 sm:left-1/2 top-0 sm:top-1/2 -translate-x-1/2 sm:-translate-y-1/2 w-8 h-8 rounded-full bg-[#580B1E] border-2 border-amber-400 flex items-center justify-center text-amber-200 shadow-md z-10">
                <Heart className="w-4 h-4 fill-amber-300 text-amber-300" />
              </div>

              {/* Story Content Card */}
              <div className={`w-full sm:w-1/2 ${isEven ? "sm:text-right" : "sm:text-left"}`}>
                <div className="p-6 rounded-3xl bg-[#FFFDF9] border-2 border-amber-300/70 shadow-md hover:shadow-lg transition-all space-y-2">
                  <div className={`flex items-center gap-2 ${isEven ? "sm:justify-end" : "justify-start"}`}>
                    <span className="text-[10px] font-bold font-royal uppercase tracking-widest text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                      {chapter.chapterNumber}
                    </span>
                    <span className="text-xs text-stone-500">{chapter.year}</span>
                  </div>

                  <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#580B1E]">
                    {chapter.title}
                  </h3>

                  <p className={`text-xs text-amber-800 font-semibold flex items-center gap-1 ${isEven ? "sm:justify-end" : "justify-start"}`}>
                    <MapPin className="w-3.5 h-3.5 text-red-600" />
                    <span>{chapter.location}</span>
                  </p>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                    {chapter.story}
                  </p>

                  <p className="text-xs text-stone-500 italic font-editorial pt-1">
                    “{chapter.quote}”
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
