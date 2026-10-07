"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Calendar, Heart, ArrowDown, Download, UserCheck } from "lucide-react";
import { WEDDING_DATA } from "@/lib/weddingData";
import { generateGoogleCalendarUrl, downloadIcsFile } from "@/lib/calendar";

interface V2HeroProps {
  guestName?: string;
}

export default function V2Hero({ guestName }: V2HeroProps) {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(WEDDING_DATA.couple.weddingTimestamp).getTime();
    const update = () => {
      const diff = target - new Date().getTime();
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 overflow-hidden">
      {/* Subtle Arch Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-amber-200/40 via-rose-100/20 to-transparent rounded-full pointer-events-none blur-2xl" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        {/* Auspicious Shlok Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-950 font-hindi text-xs sm:text-sm font-bold shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>॥ ॐ श्री गणेशाय नमः ॥</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
        </motion.div>

        {/* Personalized Guest Badge */}
        {guestName && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-1.5 text-xs font-serif text-amber-900"
          >
            <UserCheck className="w-3.5 h-3.5 text-amber-700" />
            <span>Cordially Inviting: <strong className="text-[#580B1E]">{guestName}</strong></span>
          </motion.div>
        )}

        {/* Couple Names (WordPress Editorial Typography) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-2"
        >
          <p className="font-editorial text-sm sm:text-base uppercase tracking-widest text-stone-600 font-medium">
            We Request The Pleasure Of Your Company At The Wedding Of
          </p>
          <h1 className="font-script text-5xl sm:text-7xl md:text-8xl text-[#580B1E] font-bold tracking-tight drop-shadow-xs">
            {WEDDING_DATA.couple.groom.name} & {WEDDING_DATA.couple.bride.name}
          </h1>
          <p className="font-editorial text-base sm:text-xl text-stone-700 italic max-w-lg mx-auto">
            “Two souls, one heartbeat, united forever in love.”
          </p>
        </motion.div>

        {/* Date & Destination Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-6 py-2.5 rounded-2xl bg-white border border-amber-300 shadow-sm text-xs sm:text-sm font-royal font-bold text-amber-950"
        >
          <span>Monday, 14 December 2026</span>
          <span className="hidden sm:inline text-amber-400">•</span>
          <span>The Oberoi Udaivilas, Udaipur</span>
        </motion.div>

        {/* COUNTDOWN TIMER BLOCK */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="pt-4"
        >
          <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-sm mx-auto">
            {[
              { label: "Days", val: countdown.days },
              { label: "Hours", val: countdown.hours },
              { label: "Minutes", val: countdown.minutes },
              { label: "Seconds", val: countdown.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-[#FFFDF9] border border-amber-300/80 shadow-sm text-center"
              >
                <div className="font-royal text-2xl sm:text-3xl font-bold text-[#580B1E]">
                  {String(item.val).padStart(2, "0")}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-900 mt-0.5">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Add To Calendar Buttons */}
          <div className="flex justify-center gap-3 mt-5">
            <a
              href={generateGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#580B1E] text-amber-100 text-xs font-royal font-bold uppercase shadow-sm hover:bg-[#430816] transition-all"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>Add to Calendar</span>
            </a>
            <button
              onClick={downloadIcsFile}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-amber-50 transition-all shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-stone-500" />
              <span>Save .ICS</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Down Scroll Indicator */}
      <a href="#invitation" className="absolute bottom-4 left-1/2 -translate-x-1/2 text-stone-400 hover:text-[#580B1E] transition-colors flex flex-col items-center gap-1 text-[10px] uppercase tracking-widest font-royal">
        <span>Scroll to Explore</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </a>
    </section>
  );
}
