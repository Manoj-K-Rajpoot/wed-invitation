"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Sparkles, Shirt, ChevronDown, ChevronUp } from "lucide-react";
import { WEDDING_DATA } from "@/lib/weddingData";

export default function V2EventsGrid() {
  const { itinerary } = WEDDING_DATA;
  const [expandedAttireId, setExpandedAttireId] = useState<string | null>(null);

  return (
    <section id="events" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-14 space-y-2">
        <span className="text-[11px] font-bold font-royal uppercase tracking-widest text-amber-900 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-300">
          The Celebrations Itinerary
        </span>
        <h2 className="font-editorial text-3xl sm:text-5xl text-[#580B1E] font-bold">
          Wedding Events & Rituals
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
          Five royal celebrations spanning music, color, traditions, and divine vows at The Oberoi Udaivilas.
        </p>
        <div className="w-20 h-0.5 bg-amber-400 mx-auto mt-2" />
      </div>

      {/* Grid of Event Cards (WordPress / Elementor Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {itinerary.map((event, idx) => {
          const isExpanded = expandedAttireId === event.id;

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-3xl bg-[#FFFDF9] border-2 border-amber-300/70 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden"
            >
              {/* Event Card Header */}
              <div className="p-6 bg-gradient-to-br from-[#FAF5EC] to-[#F5EAD4] border-b border-amber-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-[#580B1E] text-amber-200">
                    Day {idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-amber-900 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {event.time}
                  </span>
                </div>

                <h3 className="font-royal text-lg sm:text-xl font-bold text-[#580B1E] pt-2">
                  {event.title}
                </h3>
                <p className="text-[11px] text-stone-500 font-serif">
                  {event.subtitle}
                </p>
              </div>

              {/* Event Card Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="space-y-1 text-xs">
                    <p className="font-bold text-stone-900 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-700" />
                      <span>{event.date}</span>
                    </p>
                    <p className="text-stone-600 flex items-center gap-1.5 pl-5">
                      <MapPin className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                      <span>{event.subVenue}</span>
                    </p>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed font-sans">
                    {event.description}
                  </p>
                </div>

                {/* Attire Swatches & Guide */}
                <div className="pt-3 border-t border-stone-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-600 font-medium">Dress Code:</span>
                    <button
                      onClick={() => setExpandedAttireId(isExpanded ? null : event.id)}
                      className="text-[11px] font-bold text-amber-900 hover:text-[#580B1E] flex items-center gap-1 underline"
                    >
                      <Shirt className="w-3 h-3" />
                      <span>{isExpanded ? "Close Guide" : "Lookbook"}</span>
                    </button>
                  </div>

                  <p className="text-xs font-bold text-[#580B1E]">
                    {event.dressCode}
                  </p>

                  {/* Color Swatch Dots */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <span className="text-[10px] text-stone-500 font-medium">Palette:</span>
                    {event.colorPalette.map((col, cIdx) => (
                      <div
                        key={cIdx}
                        title={col.name}
                        className="w-4 h-4 rounded-full border border-stone-300 shadow-xs"
                        style={{ backgroundColor: col.hex }}
                      />
                    ))}
                  </div>

                  {/* Expandable Lookbook Suggestions */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-stone-700 space-y-1 mt-2"
                    >
                      <p><strong className="text-amber-950">Men:</strong> {event.recommendedAttire.men}</p>
                      <p><strong className="text-amber-950">Women:</strong> {event.recommendedAttire.women}</p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
