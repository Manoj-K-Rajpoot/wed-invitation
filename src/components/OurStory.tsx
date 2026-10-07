"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, HeartHandshake, Gem, MapPin, Calendar, Heart } from "lucide-react";
import { WEDDING_DATA } from "@/lib/weddingData";

export default function OurStory() {
  const { ourStory } = WEDDING_DATA;

  const getIcon = (name: string) => {
    switch (name) {
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-amber-400" />;
      case "HeartHandshake":
        return <HeartHandshake className="w-5 h-5 text-amber-400" />;
      case "Gem":
        return <Gem className="w-5 h-5 text-amber-400" />;
      default:
        return <Heart className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 text-xs font-semibold uppercase tracking-widest mb-3">
          <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600" />
          <span>Our Journey of Love</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-5xl text-[#580B1E] font-bold">
          Our Love Story
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto mt-2 font-sans">
          How two individual paths intertwined to create a lifetime of shared dreams and cherished memories.
        </p>
      </div>

      {/* Couple Luxury Portrait Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-2xl mx-auto mb-16 p-3 sm:p-5 rounded-3xl bg-gradient-to-br from-amber-200 via-amber-400 to-amber-700 shadow-2xl"
      >
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#4A0A19] to-[#24030B] p-8 sm:p-12 text-center text-amber-100 border border-amber-300/40">
          {/* Subtle Corner Accents */}
          <div className="absolute top-3 left-3 text-amber-400 text-xl font-serif">✦</div>
          <div className="absolute top-3 right-3 text-amber-400 text-xl font-serif">✦</div>
          <div className="absolute bottom-3 left-3 text-amber-400 text-xl font-serif">✦</div>
          <div className="absolute bottom-3 right-3 text-amber-400 text-xl font-serif">✦</div>

          {/* Couple Silhouette / Artistic Illustration Graphic */}
          <div className="w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-200 p-1 shadow-2xl mb-6">
            <div className="w-full h-full rounded-full bg-gradient-to-b from-stone-900 to-burgundy-deep flex flex-col items-center justify-center p-4 border border-amber-300/60">
              <span className="font-decor text-3xl sm:text-4xl text-amber-300 font-bold tracking-wider">
                S & A
              </span>
              <span className="text-[10px] sm:text-xs text-amber-400/90 font-serif tracking-widest mt-1 uppercase">
                Forever In Love
              </span>
            </div>
          </div>

          <h3 className="font-script text-3xl sm:text-5xl text-amber-200 font-bold mb-2">
            Sajal Singhania & Aaradhya Sharma
          </h3>
          <p className="font-editorial text-base sm:text-lg text-amber-100/90 italic max-w-lg mx-auto">
            “When soul meets soul on life’s blessed path, love writes a melody that echoes through eternity.”
          </p>

          <div className="mt-6 inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-black/40 border border-amber-500/30 text-xs text-amber-300">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>From Udaipur With Love • Est. 2023</span>
          </div>
        </div>
      </motion.div>

      {/* Vertical Narrative Chapters Timeline */}
      <div className="relative max-w-2xl mx-auto">
        {/* Central Connecting Golden Path Line */}
        <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-amber-400 via-amber-600 to-amber-900 -translate-x-1/2 opacity-70" />

        <div className="space-y-12">
          {ourStory.map((chapter, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                  isEven ? "sm:flex-row-reverse" : ""
                } pl-14 sm:pl-0 gap-4 sm:gap-8`}
              >
                {/* Center Node Icon */}
                <div className="absolute left-6 sm:left-1/2 top-0 sm:top-1/2 -translate-x-1/2 -translate-y-0 sm:-translate-y-1/2 z-10 w-11 h-11 rounded-full bg-gradient-to-br from-amber-300 via-amber-600 to-amber-800 p-0.5 shadow-xl flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-stone-900 flex items-center justify-center">
                    {getIcon(chapter.icon)}
                  </div>
                </div>

                {/* Chapter Card */}
                <div className={`w-full sm:w-1/2 ${isEven ? "sm:text-right" : "sm:text-left"}`}>
                  <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-amber-500/30 shadow-lg hover:shadow-amber-500/20 transition-all duration-300">
                    <div className={`flex items-center gap-2 mb-2 ${isEven ? "sm:justify-end" : "justify-start"}`}>
                      <span className="text-[11px] font-bold font-royal tracking-widest text-amber-700 bg-amber-100/80 px-2.5 py-0.5 rounded-full">
                        {chapter.chapterNumber}
                      </span>
                      <span className="text-xs text-stone-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-stone-400" />
                        {chapter.year}
                      </span>
                    </div>

                    <h4 className="font-editorial text-xl sm:text-2xl font-bold text-[#580B1E]">
                      {chapter.title}
                    </h4>

                    <p className={`text-xs text-amber-800 font-semibold flex items-center gap-1 mt-0.5 mb-3 ${isEven ? "sm:justify-end" : "justify-start"}`}>
                      <MapPin className="w-3 h-3" />
                      {chapter.location}
                    </p>

                    <p className="text-stone-700 text-xs sm:text-sm leading-relaxed font-sans">
                      {chapter.story}
                    </p>

                    <div className="mt-4 pt-3 border-t border-amber-100">
                      <p className="text-xs text-stone-600 italic font-editorial">
                        {chapter.quote}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
