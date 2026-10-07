"use client";

import React from "react";
import { ChevronUp, Heart } from "lucide-react";
import { WEDDING_DATA } from "@/lib/weddingData";

export default function V2Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#FAF5EC] border-t-2 border-amber-300 py-16 px-4 text-center text-[#3A0512]">
      <div className="max-w-md mx-auto space-y-4">
        {/* Monogram Crest */}
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 p-0.5 shadow-md border border-amber-400">
          <div className="w-full h-full rounded-full bg-[#FFFDF9] flex items-center justify-center">
            <span className="font-decor text-[#580B1E] font-bold text-base">S&A</span>
          </div>
        </div>

        <h3 className="font-editorial text-2xl font-bold text-[#580B1E]">
          {WEDDING_DATA.couple.groom.name} & {WEDDING_DATA.couple.bride.name}
        </h3>

        <p className="font-royal text-xs font-bold text-amber-900 uppercase tracking-widest">
          {WEDDING_DATA.couple.hashtag}
        </p>

        <p className="text-xs text-stone-600 font-editorial italic max-w-xs mx-auto">
          “With heartfelt gratitude for your love, presence, and blessings.”
        </p>

        <p className="text-[11px] font-semibold text-stone-700">
          The Singhania & Sharma Families • Udaipur 2026
        </p>

        <div className="pt-4">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-amber-100 transition-colors shadow-xs"
          >
            <span>Back to Top</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
