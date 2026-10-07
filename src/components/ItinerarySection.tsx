"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, Sparkles, Feather, Sun, Music, Flame, Wine, Palette, Shirt } from "lucide-react";
import { WEDDING_DATA, EventItinerary } from "@/lib/weddingData";

export default function ItinerarySection() {
  const { itinerary } = WEDDING_DATA;
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [activeAttireEvent, setActiveAttireEvent] = useState<string | null>(null);

  const getEventIcon = (name: string) => {
    switch (name) {
      case "Feather":
        return <Feather className="w-5 h-5 text-amber-300" />;
      case "Sun":
        return <Sun className="w-5 h-5 text-yellow-300" />;
      case "Music":
        return <Music className="w-5 h-5 text-indigo-300" />;
      case "Flame":
        return <Flame className="w-5 h-5 text-rose-300" />;
      case "Wine":
        return <Wine className="w-5 h-5 text-amber-200" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-300" />;
    }
  };

  const filteredEvents = activeFilter === "all" 
    ? itinerary 
    : itinerary.filter((ev) => ev.id === activeFilter);

  return (
    <section className="relative py-16 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 text-xs font-semibold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>The Royal Festivities</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-5xl text-[#580B1E] font-bold">
          The Celebrations Itinerary
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto mt-2 font-sans">
          Join us in an enchanting 3-day royal celebration with curated attire guides, auspicious timings, and festive memories.
        </p>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-full text-xs font-royal font-semibold transition-all ${
              activeFilter === "all"
                ? "bg-[#580B1E] text-amber-200 shadow-md scale-105 border border-amber-400/40"
                : "bg-white/80 text-stone-700 hover:bg-amber-100/60 border border-stone-200"
            }`}
          >
            All Functions ({itinerary.length})
          </button>
          {itinerary.map((ev) => (
            <button
              key={ev.id}
              onClick={() => setActiveFilter(ev.id)}
              className={`px-4 py-2 rounded-full text-xs font-royal font-semibold transition-all ${
                activeFilter === ev.id
                  ? "bg-[#580B1E] text-amber-200 shadow-md scale-105 border border-amber-400/40"
                  : "bg-white/80 text-stone-700 hover:bg-amber-100/60 border border-stone-200"
              }`}
            >
              {ev.title.split("&")[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Itinerary Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((event: EventItinerary, idx: number) => {
            const isAttireOpen = activeAttireEvent === event.id;

            return (
              <motion.div
                layout
                key={event.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative group rounded-3xl overflow-hidden bg-gradient-to-br from-[#FFFDF9] to-[#FAF3E6] border border-amber-500/40 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Event Header Banner with Thematic Gradient */}
                <div className={`p-6 bg-gradient-to-r ${event.bgGradient} text-amber-100 relative overflow-hidden`}>
                  {/* Decorative Faint Background Icon */}
                  <div className="absolute right-0 top-0 bottom-0 w-32 opacity-10 flex items-center justify-center pointer-events-none">
                    <div className="scale-150 transform rotate-12">
                      {getEventIcon(event.iconName)}
                    </div>
                  </div>

                  <div className="relative z-10 flex items-start justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
                      {getEventIcon(event.iconName)}
                    </div>

                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-black/40 border border-amber-400/40 text-amber-300">
                      Day {idx + 1}
                    </span>
                  </div>

                  <div className="relative z-10 mt-4">
                    <span className="text-xs font-serif tracking-wider text-amber-300/90 uppercase font-semibold">
                      {event.subtitle}
                    </span>
                    <h3 className="font-royal text-xl sm:text-2xl font-bold text-white mt-0.5">
                      {event.title}
                    </h3>
                    <p className="text-[11px] font-hindi text-amber-200/80">
                      {event.hindiTitle}
                    </p>
                  </div>
                </div>

                {/* Event Body Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Date and Time Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-500/10 text-stone-800">
                        <Calendar className="w-4 h-4 text-amber-700 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-[11px] text-stone-900">{event.date}</p>
                          <p className="text-[10px] text-stone-500">{event.hindiDate}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-500/10 text-stone-800">
                        <Clock className="w-4 h-4 text-amber-700 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-[11px] text-stone-900">{event.time}</p>
                        </div>
                      </div>
                    </div>

                    {/* Poetic Auspicious Time tagline */}
                    <p className="text-[11px] text-amber-800 italic font-editorial text-center">
                      “{event.timeTagline}”
                    </p>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                      {event.description}
                    </p>
                  </div>

                  {/* Sub-venue and Attire Guide */}
                  <div className="space-y-3 pt-3 border-t border-amber-200/60 text-xs">
                    <div className="flex items-center gap-2 text-stone-800">
                      <MapPin className="w-3.5 h-3.5 text-red-700 flex-shrink-0" />
                      <span className="font-semibold">{event.subVenue}</span>
                      <span className="text-stone-500 font-normal">({event.venue})</span>
                    </div>

                    {/* Interactive Dress Code Swatches */}
                    <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-stone-800 font-semibold">
                          <Palette className="w-3.5 h-3.5 text-amber-700" />
                          <span>Dress Code: {event.dressCode}</span>
                        </div>
                        <button
                          onClick={() => setActiveAttireEvent(isAttireOpen ? null : event.id)}
                          className="text-[10px] font-bold text-amber-800 hover:text-amber-950 underline flex items-center gap-1"
                        >
                          <Shirt className="w-3 h-3" />
                          <span>{isAttireOpen ? "Hide Guide" : "Lookbook"}</span>
                        </button>
                      </div>

                      {/* Color Palette Chips */}
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-[10px] text-stone-500 font-medium">Palette:</span>
                        <div className="flex items-center gap-1.5">
                          {event.colorPalette.map((color, cIdx) => (
                            <div
                              key={cIdx}
                              title={color.name}
                              className="w-5 h-5 rounded-full border border-stone-300 shadow-xs cursor-pointer hover:scale-125 transition-transform"
                              style={{ backgroundColor: color.hex }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Expandable Lookbook Suggestions */}
                      {isAttireOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-2 border-t border-amber-500/20 space-y-1.5 text-[11px] text-stone-700"
                        >
                          <p>
                            <strong className="text-amber-900">Gentlemen:</strong> {event.recommendedAttire.men}
                          </p>
                          <p>
                            <strong className="text-amber-900">Ladies:</strong> {event.recommendedAttire.women}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
