"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Languages, Heart } from "lucide-react";
import { WEDDING_DATA } from "@/lib/weddingData";

export default function V2InvitationLetter() {
  const [isHindi, setIsHindi] = useState(false);
  const { couple, shlokas, hindiPatrika } = WEDDING_DATA;

  return (
    <section id="invitation" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10 space-y-2">
        <span className="text-[11px] font-bold font-royal uppercase tracking-widest text-amber-900 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-300">
          The Sacred Invitation
        </span>
        <h2 className="font-editorial text-3xl sm:text-5xl text-[#580B1E] font-bold">
          Shubh Vivah Patrika
        </h2>
        <div className="w-20 h-0.5 bg-amber-400 mx-auto mt-2" />
      </div>

      {/* Main Framed Letter Card */}
      <div className="relative deckle-edge-card p-6 sm:p-12 md:p-14 rounded-3xl border-2 border-amber-400/70 shadow-xl bg-[#FFFDF9] text-center">
        {/* Language Switch Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsHindi(!isHindi)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-xs font-semibold text-amber-900 shadow-xs hover:bg-amber-100 transition-colors"
          >
            <Languages className="w-3.5 h-3.5 text-amber-700" />
            <span>{isHindi ? "Read in English" : "हिंदी पत्रिका में देखें"}</span>
          </button>
        </div>

        {/* Auspicious Ganesha Emblem */}
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-amber-100 to-amber-300 p-0.5 shadow-md flex items-center justify-center border border-amber-400 mb-4">
          <div className="w-full h-full rounded-full bg-[#580B1E] flex items-center justify-center p-2.5 text-amber-300">
            <svg viewBox="0 0 100 100" className="w-10 h-10 fill-current">
              <path d="M50 8 C42 8 36 14 36 22 C36 28 40 33 46 35 C42 38 38 43 38 50 C38 57 43 62 49 64 C48 67 47 70 45 74 C43 78 40 82 35 84 C38 86 42 87 46 87 C54 87 59 81 61 74 C63 67 62 61 61 55 C66 52 70 46 70 39 C70 30 63 22 55 22 C55 14 50 8 50 8 Z" />
              <circle cx="50" cy="28" r="3" fill="#FFD700" />
            </svg>
          </div>
        </div>

        <p className="font-hindi text-sm font-bold text-amber-900 mb-6">
          {shlokas[0].sanskrit}
        </p>

        {isHindi ? (
          /* HINDI PATRIKA */
          <div className="space-y-4 max-w-2xl mx-auto font-hindi">
            <p className="text-sm text-stone-700">
              {hindiPatrika.subheading}
            </p>
            <p className="text-sm sm:text-base text-stone-800 leading-relaxed">
              {hindiPatrika.invitationNote}
            </p>

            <div className="py-4 space-y-3">
              <div>
                <h3 className="text-3xl sm:text-4xl text-[#580B1E] font-bold">
                  {couple.groom.hindiFullName}
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  सुपुत्र: {couple.groom.hindiSonOf} (पौत्र: {couple.groom.hindiGrandsonOf})
                </p>
              </div>

              <div className="flex items-center justify-center gap-3">
                <div className="h-px bg-amber-400 w-16" />
                <span className="text-amber-900 font-bold text-sm">संग</span>
                <div className="h-px bg-amber-400 w-16" />
              </div>

              <div>
                <h3 className="text-3xl sm:text-4xl text-[#580B1E] font-bold">
                  {couple.bride.hindiFullName}
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  सुपुत्री: {couple.bride.hindiDaughterOf} (पौत्री: {couple.bride.hindiGranddaughterOf})
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 font-bold">
              सोमवार, १४ दिसंबर २०२६ • द ओबेरॉय उदयविलास, उदयपुर
            </div>
          </div>
        ) : (
          /* ENGLISH FORMAL LETTER */
          <div className="space-y-4 max-w-2xl mx-auto">
            <p className="font-editorial text-xs sm:text-sm text-stone-600 uppercase tracking-wider">
              With the divine blessings of our ancestors and almighty
            </p>

            <p className="font-editorial text-base sm:text-lg text-stone-800 italic">
              The Singhania & Sharma families cordially request the honour of your presence at the wedding celebrations of their beloved children
            </p>

            <div className="py-4 space-y-3">
              <div>
                <h3 className="font-script text-4xl sm:text-5xl text-[#580B1E] font-bold">
                  {couple.groom.fullName}
                </h3>
                <p className="text-xs text-stone-600 font-sans mt-0.5">
                  Son of <strong className="text-stone-800">{couple.groom.sonOf}</strong>
                </p>
              </div>

              <div className="flex items-center justify-center gap-3">
                <div className="h-px bg-amber-400 w-16" />
                <span className="font-script text-2xl text-[#580B1E] font-bold">&</span>
                <div className="h-px bg-amber-400 w-16" />
              </div>

              <div>
                <h3 className="font-script text-4xl sm:text-5xl text-[#580B1E] font-bold">
                  {couple.bride.fullName}
                </h3>
                <p className="text-xs text-stone-600 font-sans mt-0.5">
                  Daughter of <strong className="text-stone-800">{couple.bride.daughterOf}</strong>
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-300/80 my-2">
              <p className="font-royal text-xs sm:text-sm text-amber-950 font-semibold leading-relaxed">
                {shlokas[1].sanskrit}
              </p>
              <p className="text-xs text-stone-600 italic mt-1 font-editorial">
                {shlokas[1].translation}
              </p>
            </div>

            <p className="font-royal text-sm font-bold text-amber-950 uppercase pt-2">
              Monday, 14th of December, Two Thousand Twenty-Six
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
