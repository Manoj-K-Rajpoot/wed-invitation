"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Sparkles, X, Heart } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  tagline: string;
  location: string;
  gradient: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: "The Golden Sunset at Lake Pichola",
    tagline: "Where the reflection of palaces mirrors our shared dreams.",
    location: "Udaipur Ghats",
    gradient: "from-amber-200 via-rose-100 to-amber-300",
  },
  {
    id: 2,
    title: "Whispers in the Courtyard",
    tagline: "Laughter echoed across ancient arches and lotus ponds.",
    location: "Zenana Mahal",
    gradient: "from-rose-200 via-amber-100 to-rose-300",
  },
  {
    id: 3,
    title: "The Royal Promise",
    tagline: "A starlit night, a question asked, and a forever bond sealed.",
    location: "Jagmandir Island",
    gradient: "from-amber-100 via-orange-100 to-yellow-200",
  },
  {
    id: 4,
    title: "Rhythms of Love",
    tagline: "Stepping into melody, dance, and festive celebrations.",
    location: "City Palace Lawns",
    gradient: "from-yellow-100 via-rose-100 to-amber-200",
  },
  {
    id: 5,
    title: "Embraced by Tradition",
    tagline: "Honouring timeless heritage and sacred Vedic rituals.",
    location: "The Oberoi Udaivilas",
    gradient: "from-rose-100 via-amber-200 to-orange-100",
  },
  {
    id: 6,
    title: "Forever Begins Now",
    tagline: "Two souls, one sacred path, blessed for seven lifetimes.",
    location: "Lakefront Promenade",
    gradient: "from-amber-200 via-yellow-100 to-rose-200",
  },
];

export default function V2PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-14 space-y-2">
        <span className="text-[11px] font-bold font-royal uppercase tracking-widest text-amber-900 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-300">
          Pre-Wedding Moments
        </span>
        <h2 className="font-editorial text-3xl sm:text-5xl text-[#580B1E] font-bold">
          Captured Memories & Romance
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
          Glimpses from our pre-wedding photoshoot amidst the royal heritage of Udaipur.
        </p>
        <div className="w-20 h-0.5 bg-amber-400 mx-auto mt-2" />
      </div>

      {/* Masonry / Grid Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {GALLERY_ITEMS.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            onClick={() => setSelectedPhoto(item)}
            className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl border-2 border-amber-300/80 transition-all"
          >
            {/* Artistic Photography Placeholder Gradient / Frame */}
            <div className={`w-full h-full bg-gradient-to-tr ${item.gradient} p-6 flex flex-col justify-between transition-transform duration-500 group-hover:scale-105`}>
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-xs text-[10px] font-royal font-bold text-amber-950 uppercase border border-amber-200">
                  {item.location}
                </span>
                <Heart className="w-4 h-4 text-[#580B1E] fill-[#580B1E]/30" />
              </div>

              {/* Couple Silhouette / Artistic Monogram Inset */}
              <div className="w-20 h-20 mx-auto rounded-full bg-white/70 backdrop-blur-sm border-2 border-amber-400 flex items-center justify-center text-center p-2 shadow-inner">
                <span className="font-decor text-amber-900 font-bold text-sm">S & A</span>
              </div>

              <div className="bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-amber-200/80">
                <h4 className="font-royal text-xs font-bold text-[#580B1E]">
                  {item.title}
                </h4>
                <p className="text-[11px] text-stone-600 italic font-editorial truncate">
                  {item.tagline}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full rounded-3xl bg-[#FFFDF9] border-2 border-amber-400 p-6 sm:p-8 space-y-4 shadow-2xl text-center"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-700 hover:bg-stone-200"
              >
                <X className="w-4 h-4" />
              </button>

              <div className={`w-full h-64 rounded-2xl bg-gradient-to-tr ${selectedPhoto.gradient} flex items-center justify-center border border-amber-300 p-6`}>
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 mx-auto rounded-full bg-white/80 flex items-center justify-center border border-amber-400 shadow">
                    <Camera className="w-8 h-8 text-[#580B1E]" />
                  </div>
                  <p className="font-decor text-lg font-bold text-[#580B1E]">Sajal & Aaradhya</p>
                  <p className="text-xs text-amber-900 font-semibold">{selectedPhoto.location}</p>
                </div>
              </div>

              <div>
                <h3 className="font-royal text-xl font-bold text-[#580B1E]">{selectedPhoto.title}</h3>
                <p className="text-xs text-stone-600 font-editorial italic mt-1">{selectedPhoto.tagline}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
