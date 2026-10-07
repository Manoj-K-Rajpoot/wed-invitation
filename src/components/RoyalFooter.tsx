"use client";

import React from "react";
import { ChevronUp, Heart, Sparkles } from "lucide-react";
import { WEDDING_DATA } from "@/lib/weddingData";

export default function RoyalFooter() {
  const { couple } = WEDDING_DATA;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#24030B] via-[#1A0207] to-[#0D0104] text-amber-100 py-16 px-4 border-t-2 border-amber-600/40 text-center overflow-hidden">
      {/* Decorative Golden Arch Flourish */}
      <div className="max-w-md mx-auto flex flex-col items-center relative z-10">
        {/* Monogram Royal Crest */}
        <div className="relative mb-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-200 p-0.5 shadow-2xl flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#3A0512] flex flex-col items-center justify-center border-2 border-amber-400/80 shadow-inner">
              <span className="font-decor text-2xl sm:text-3xl text-amber-300 font-bold tracking-wider">
                {couple.monogram}
              </span>
              <span className="text-[9px] uppercase tracking-widest text-amber-400 font-serif">
                Est. 2026
              </span>
            </div>
          </div>
        </div>

        {/* Couple Full Names */}
        <h3 className="font-editorial text-3xl sm:text-4xl text-amber-100 font-bold tracking-wide">
          {couple.groom.name} & {couple.bride.name}
        </h3>

        <p className="font-royal text-xs sm:text-sm text-amber-400 font-semibold tracking-widest uppercase mt-2">
          {couple.hashtag}
        </p>

        {/* Heartfelt family gratitude */}
        <div className="my-6 space-y-2 max-w-sm">
          <p className="text-xs sm:text-sm text-stone-300 italic font-editorial leading-relaxed">
            “Your gracious presence, warm blessings, and loving prayers are the greatest gift as we begin our new journey together.”
          </p>
          <div className="w-24 h-px bg-amber-500/40 mx-auto my-3" />
          <p className="text-[11px] uppercase tracking-wider text-amber-300/80 font-serif">
            With Love & Regards
          </p>
          <p className="text-xs text-amber-200 font-semibold">
            The Singhania & Sharma Families
          </p>
        </div>

        {/* Scroll To Top Button */}
        <button
          onClick={scrollToTop}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-royal font-semibold hover:bg-amber-500/30 hover:text-white transition-all shadow-lg active:scale-95"
        >
          <span>Return to Top</span>
          <ChevronUp className="w-4 h-4" />
        </button>

        {/* Copyright / Crafted with love note */}
        <p className="text-[10px] text-stone-500 mt-12 flex items-center justify-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          <span>for Sajal & Aaradhya’s Sacred Wedding</span>
        </p>
      </div>
    </footer>
  );
}
