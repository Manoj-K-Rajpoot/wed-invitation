"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Languages, Sparkles, UserCheck } from "lucide-react";
import { WEDDING_DATA } from "@/lib/weddingData";

interface TraditionalCardProps {
  guestName?: string;
}

export default function TraditionalCard({ guestName }: TraditionalCardProps) {
  const { couple, shlokas, hindiPatrika } = WEDDING_DATA;
  const [lang, setLang] = useState<"en" | "hi">("en");

  return (
    <section className="relative py-12 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Outer Royal Bordered Deckle-Edge Frame */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative deckle-edge-card p-6 sm:p-12 md:p-16 rounded-3xl border-2 border-amber-600/50 text-center overflow-hidden"
      >
        {/* Ornate Gold Corner Flourishes */}
        <div className="absolute top-3 left-3 w-10 sm:w-14 h-10 sm:h-14 border-t-2 border-l-2 border-amber-600 pointer-events-none">
          <div className="w-5 sm:w-7 h-5 sm:h-7 border-t border-l border-amber-400 mt-1 ml-1" />
        </div>
        <div className="absolute top-3 right-3 w-10 sm:w-14 h-10 sm:h-14 border-t-2 border-r-2 border-amber-600 pointer-events-none">
          <div className="w-5 sm:w-7 h-5 sm:h-7 border-t border-r border-amber-400 mt-1 mr-1 ml-auto" />
        </div>
        <div className="absolute bottom-3 left-3 w-10 sm:w-14 h-10 sm:h-14 border-b-2 border-l-2 border-amber-600 pointer-events-none">
          <div className="w-5 sm:w-7 h-5 sm:h-7 border-b border-l border-amber-400 mb-1 ml-1 mt-auto" />
        </div>
        <div className="absolute bottom-3 right-3 w-10 sm:w-14 h-10 sm:h-14 border-b-2 border-r-2 border-amber-600 pointer-events-none">
          <div className="w-5 sm:w-7 h-5 sm:h-7 border-b border-r border-amber-400 mb-1 mr-1 ml-auto mt-auto" />
        </div>

        {/* Top Floating Language Switcher Toggle */}
        <div className="relative z-20 flex items-center justify-between gap-2 mb-6">
          {guestName ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs font-semibold">
              <UserCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>For: {guestName}</span>
            </div>
          ) : <div />}

          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 text-amber-200 border border-amber-500/60 shadow-md text-xs font-royal font-semibold hover:bg-stone-800 transition-all hover:scale-105"
          >
            <Languages className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === "en" ? "हिंदी पत्रिका" : "English Letter"}</span>
          </button>
        </div>

        {/* Auspicious Ganesha Emblem & Shloka */}
        <div className="relative z-10 flex flex-col items-center mb-6">
          <div className="relative mb-3">
            <div className="w-18 h-18 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-amber-100 via-amber-200 to-amber-400 p-0.5 shadow-lg flex items-center justify-center border border-amber-500/50">
              <div className="w-full h-full rounded-full bg-[#580B1E] flex items-center justify-center p-3 shadow-inner">
                {/* SVG Lord Ganesha Motif */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-12 h-12 sm:w-14 sm:h-14 text-amber-300 fill-current filter drop-shadow"
                >
                  <path d="M50 8 C42 8 36 14 36 22 C36 28 40 33 46 35 C42 38 38 43 38 50 C38 57 43 62 49 64 C48 67 47 70 45 74 C43 78 40 82 35 84 C38 86 42 87 46 87 C54 87 59 81 61 74 C63 67 62 61 61 55 C66 52 70 46 70 39 C70 30 63 22 55 22 C55 14 50 8 50 8 Z M50 16 C53 16 55 19 55 22 C48 22 45 22 45 22 C45 19 47 16 50 16 Z M56 30 C58 30 60 32 60 34 C60 36 58 38 56 38 C54 38 52 36 52 34 C52 32 54 30 56 30 Z M46 45 C48 45 50 47 50 49 C50 51 48 53 46 53 C44 53 42 51 42 49 C42 47 44 45 46 45 Z" />
                  <circle cx="50" cy="28" r="3" fill="#FFD700" />
                  <circle cx="50" cy="40" r="2.5" fill="#FF5722" />
                </svg>
              </div>
            </div>
            {/* Auspicious Badge */}
            <div className="absolute -bottom-2 inset-x-0 flex justify-center">
              <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 shadow">
                ॥ ॐ ॥
              </span>
            </div>
          </div>

          <h3 className="font-royal text-base sm:text-lg font-bold text-amber-800 tracking-widest uppercase mt-3">
            {shlokas[0].sanskrit}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mt-1 italic font-editorial">
            “{shlokas[0].translation}”
          </p>

          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent my-4" />
        </div>

        {/* BILINGUAL CONTENT SWITCHER */}
        <AnimatePresence mode="wait">
          {lang === "en" ? (
            /* ENGLISH LETTER */
            <motion.div
              key="english"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 space-y-4 max-w-2xl mx-auto"
            >
              <p className="font-editorial text-xs sm:text-sm text-stone-700 tracking-wider uppercase">
                With the divine blessings of our ancestors and the almighty
              </p>

              <p className="font-editorial text-base sm:text-lg text-stone-800 italic">
                The Singhania & Sharma families cordially request the honour of your presence and blessings at the wedding celebrations of their beloved children
              </p>

              {/* BRIDE & GROOM CALLIGRAPHY */}
              <div className="py-4 sm:py-6 space-y-3">
                {/* Groom Details */}
                <div className="space-y-1">
                  <h2 className="font-script fluid-couple-name text-[#580B1E] font-bold tracking-normal drop-shadow-sm">
                    {couple.groom.fullName}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 font-sans tracking-wide">
                    Son of <span className="font-semibold text-stone-800">{couple.groom.sonOf}</span>
                  </p>
                  <p className="text-[11px] sm:text-xs text-stone-500 italic">
                    Grandson of {couple.groom.grandsonOf}
                  </p>
                </div>

                {/* Auspicious Knot / "Weds" */}
                <div className="flex items-center justify-center gap-4 py-2">
                  <div className="h-px bg-gradient-to-r from-transparent to-amber-600 w-16 sm:w-24" />
                  <div className="w-10 h-10 rounded-full border border-amber-500/80 bg-amber-100/80 flex items-center justify-center shadow-inner">
                    <span className="font-script text-2xl text-[#580B1E] font-bold">&</span>
                  </div>
                  <div className="h-px bg-gradient-to-l from-transparent to-amber-600 w-16 sm:w-24" />
                </div>

                {/* Bride Details */}
                <div className="space-y-1">
                  <h2 className="font-script fluid-couple-name text-[#580B1E] font-bold tracking-normal drop-shadow-sm">
                    {couple.bride.fullName}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 font-sans tracking-wide">
                    Daughter of <span className="font-semibold text-stone-800">{couple.bride.daughterOf}</span>
                  </p>
                  <p className="text-[11px] sm:text-xs text-stone-500 italic">
                    Granddaughter of {couple.bride.granddaughterOf}
                  </p>
                </div>
              </div>

              {/* Sacred Rigvedic Verse */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/40 my-4">
                <p className="font-royal text-xs sm:text-sm text-amber-900 font-semibold leading-relaxed whitespace-pre-line">
                  {shlokas[1].sanskrit}
                </p>
                <p className="text-xs text-stone-600 italic mt-1.5 font-editorial">
                  {shlokas[1].translation}
                </p>
              </div>

              {/* Date & Destination */}
              <div className="pt-2 text-stone-800">
                <p className="font-royal text-sm sm:text-base font-bold tracking-widest text-amber-900 uppercase">
                  Monday, 14th of December, Two Thousand Twenty-Six
                </p>
                <p className="font-editorial text-base sm:text-lg text-stone-700 font-medium mt-1">
                  At The Oberoi Udaivilas, Lake Pichola, Udaipur, Rajasthan
                </p>
              </div>
            </motion.div>
          ) : (
            /* TRADITIONAL HINDI SHUBH VIVAH PATRIKA */
            <motion.div
              key="hindi"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 space-y-4 max-w-2xl mx-auto"
            >
              <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-amber-500/20 text-amber-900 font-hindi text-sm font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>{hindiPatrika.heading}</span>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 font-hindi">
                {hindiPatrika.subheading}
              </p>

              <p className="text-sm sm:text-base text-stone-800 font-hindi leading-relaxed">
                {hindiPatrika.invitationNote}
              </p>

              {/* HINDI BRIDE & GROOM CALLIGRAPHY */}
              <div className="py-4 sm:py-6 space-y-4">
                {/* Groom */}
                <div className="space-y-1">
                  <span className="text-xs font-hindi text-amber-900 font-bold uppercase">आयुष्मान</span>
                  <h2 className="font-hindi text-3xl sm:text-5xl text-[#580B1E] font-bold">
                    {couple.groom.hindiFullName}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-700 font-hindi">
                    सुपुत्र: {couple.groom.hindiSonOf}
                  </p>
                  <p className="text-xs text-stone-500 font-hindi">
                    पौत्र: {couple.groom.hindiGrandsonOf}
                  </p>
                </div>

                {/* Sang (संग) */}
                <div className="flex items-center justify-center gap-3">
                  <div className="h-px bg-amber-600/50 w-20" />
                  <span className="px-3 py-1 rounded-full bg-amber-200 text-amber-900 font-hindi font-bold text-sm">
                    संग
                  </span>
                  <div className="h-px bg-amber-600/50 w-20" />
                </div>

                {/* Bride */}
                <div className="space-y-1">
                  <span className="text-xs font-hindi text-amber-900 font-bold uppercase">आयुष्मती</span>
                  <h2 className="font-hindi text-3xl sm:text-5xl text-[#580B1E] font-bold">
                    {couple.bride.hindiFullName}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-700 font-hindi">
                    सुपुत्री: {couple.bride.hindiDaughterOf}
                  </p>
                  <p className="text-xs text-stone-500 font-hindi">
                    पौत्री: {couple.bride.hindiGranddaughterOf}
                  </p>
                </div>
              </div>

              {/* Shloka in Hindi */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/40 my-4 font-hindi">
                <p className="text-sm sm:text-base text-amber-950 font-bold">
                  {shlokas[1].sanskrit}
                </p>
                <p className="text-xs text-stone-600 mt-1">
                  {shlokas[1].hindi}
                </p>
              </div>

              {/* Family Blessings Notes */}
              <div className="pt-2 text-xs sm:text-sm text-stone-800 space-y-1 font-hindi">
                <p className="font-bold text-amber-900">
                  सोमवार, १४ दिसंबर २०२६ • द ओबेरॉय उदयविलास, उदयपुर (राजस्थान)
                </p>
                <p className="text-stone-600 text-xs mt-2">
                  <strong>दर्शनाभिलाषी:</strong> {hindiPatrika.darshanaAbhilashi}
                </p>
                <p className="text-stone-600 text-xs">
                  <strong>स्वागताकांक्षी:</strong> {hindiPatrika.swagatKarta}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Lotus Motif Divider */}
        <div className="relative z-10 mt-8 flex justify-center items-center gap-3">
          <div className="w-12 h-px bg-amber-600/40" />
          <span className="text-amber-700 text-lg">🪷</span>
          <div className="w-12 h-px bg-amber-600/40" />
        </div>
      </motion.div>
    </section>
  );
}
