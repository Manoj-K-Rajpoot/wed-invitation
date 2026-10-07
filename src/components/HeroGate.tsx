"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronUp, Music, UserCheck } from "lucide-react";
import { audioEngine } from "@/lib/audioEngine";

interface HeroGateProps {
  onOpen: () => void;
  isOpen: boolean;
  guestName?: string;
}

export default function HeroGate({ onOpen, isOpen, guestName = "Esteemed Guest" }: HeroGateProps) {
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const handleOpen = () => {
    if (!isOpen) {
      if (audioEngine) {
        audioEngine.start();
      }
      onOpen();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY !== null) {
      const touchEndY = e.changedTouches[0].clientY;
      if (touchStartY - touchEndY > 40) {
        // Swiped up
        handleOpen();
      }
    }
    setTouchStartY(null);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#150308] perspective-1000 select-none"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 1.2, delay: 0.8, ease: "easeInOut" },
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Ambient Palace Lighting & Velvet Backdrop */}
          <div className="absolute inset-0 bg-radial from-amber-600/25 via-burgundy-950/80 to-stone-950 z-0" />

          {/* Left Decorative Palace Lantern */}
          <div className="hidden lg:flex absolute left-8 top-1/3 z-20 flex-col items-center opacity-75">
            <div className="w-0.5 h-32 bg-amber-500/40" />
            <div className="w-12 h-16 rounded-xl border-2 border-amber-400/60 bg-amber-500/20 shadow-lg shadow-amber-500/50 flex items-center justify-center animate-pulse">
              <div className="w-4 h-6 rounded-full bg-amber-300 blur-xs" />
            </div>
          </div>

          {/* Right Decorative Palace Lantern */}
          <div className="hidden lg:flex absolute right-8 top-1/3 z-20 flex-col items-center opacity-75">
            <div className="w-0.5 h-32 bg-amber-500/40" />
            <div className="w-12 h-16 rounded-xl border-2 border-amber-400/60 bg-amber-500/20 shadow-lg shadow-amber-500/50 flex items-center justify-center animate-pulse">
              <div className="w-4 h-6 rounded-full bg-amber-300 blur-xs" />
            </div>
          </div>

          {/* MAIN ARCHED DOORWAY CONTAINER */}
          <div className="relative w-full h-full max-w-4xl max-h-[920px] flex items-center justify-center overflow-hidden lg:rounded-t-[200px] lg:border-t-4 lg:border-x-4 lg:border-amber-500/60 lg:shadow-2xl shadow-amber-900/50">
            {/* Top Marigold & Floral Toran Garland */}
            <div className="absolute top-0 inset-x-0 h-16 z-30 flex justify-around items-start pointer-events-none opacity-90 overflow-hidden">
              {[...Array(14)].map((_, i) => (
                <div key={i} className="flex flex-col items-center animate-pulse" style={{ animationDelay: `${i * 0.18}s` }}>
                  <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-amber-500 shadow-md shadow-amber-500/40 border border-yellow-300" />
                  <div className="w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-full bg-orange-600 -mt-1 shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-red-700 -mt-1" />
                  <div className="w-1.5 h-5 bg-amber-300/80 rounded-full -mt-0.5" />
                </div>
              ))}
            </div>

            {/* Draped Sheer Silk Curtain Left */}
            <motion.div
              className="absolute top-0 left-0 w-1/3 h-full z-20 pointer-events-none opacity-70"
              style={{
                background: "linear-gradient(135deg, rgba(212,175,55,0.4) 0%, rgba(136,14,79,0.3) 100%)",
                backdropFilter: "blur(2px)",
                maskImage: "radial-gradient(ellipse at top left, black 40%, transparent 80%)",
              }}
              exit={{
                x: "-120%",
                opacity: 0,
                transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
              }}
            />

            {/* Draped Sheer Silk Curtain Right */}
            <motion.div
              className="absolute top-0 right-0 w-1/3 h-full z-20 pointer-events-none opacity-70"
              style={{
                background: "linear-gradient(225deg, rgba(212,175,55,0.4) 0%, rgba(136,14,79,0.3) 100%)",
                backdropFilter: "blur(2px)",
                maskImage: "radial-gradient(ellipse at top right, black 40%, transparent 80%)",
              }}
              exit={{
                x: "120%",
                opacity: 0,
                transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
              }}
            />

            {/* LEFT DOOR PANEL */}
            <motion.div
              className="absolute top-0 left-0 w-1/2 h-full z-10 origin-left flex flex-col justify-between border-r-2 border-amber-500/70 shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #320E04 0%, #1D0601 45%, #100301 100%)",
                boxShadow: "inset -15px 0 35px rgba(0,0,0,0.85), inset 0 0 35px rgba(184,134,11,0.25)",
              }}
              exit={{
                x: "-100%",
                rotateY: -30,
                opacity: 0.9,
                transition: { duration: 1.4, ease: [0.65, 0, 0.35, 1] },
              }}
            >
              {/* Wooden Inlays & Carvings */}
              <div className="absolute inset-3 sm:inset-6 border border-amber-500/30 rounded-t-[100px] flex flex-col items-center justify-between p-4">
                <div className="w-full h-full border border-amber-500/20 rounded-t-[90px] flex flex-col items-center justify-around py-6">
                  {/* Brass Carved Mandala Ring */}
                  <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full border-4 border-dashed border-amber-500/40 flex items-center justify-center">
                    <div className="w-14 h-14 sm:w-22 sm:h-22 rounded-full border-2 border-amber-400/50 flex items-center justify-center bg-amber-950/40">
                      <span className="text-amber-400 text-xl sm:text-2xl font-serif">卐</span>
                    </div>
                  </div>

                  {/* Left Brass Door Ring */}
                  <div className="relative flex items-center justify-end w-full pr-1 sm:pr-3">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-4 border-amber-400 bg-gradient-to-br from-yellow-500 to-amber-900 shadow-xl flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full border-2 border-amber-200" />
                    </div>
                  </div>

                  {/* Diamond Studs */}
                  <div className="grid grid-cols-2 gap-3 opacity-40">
                    <div className="w-2.5 h-2.5 bg-amber-400 rotate-45" />
                    <div className="w-2.5 h-2.5 bg-amber-400 rotate-45" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT DOOR PANEL */}
            <motion.div
              className="absolute top-0 right-0 w-1/2 h-full z-10 origin-right flex flex-col justify-between border-l-2 border-amber-500/70 shadow-2xl"
              style={{
                background: "linear-gradient(225deg, #320E04 0%, #1D0601 45%, #100301 100%)",
                boxShadow: "inset 15px 0 35px rgba(0,0,0,0.85), inset 0 0 35px rgba(184,134,11,0.25)",
              }}
              exit={{
                x: "100%",
                rotateY: 30,
                opacity: 0.9,
                transition: { duration: 1.4, ease: [0.65, 0, 0.35, 1] },
              }}
            >
              {/* Wooden Inlays & Carvings */}
              <div className="absolute inset-3 sm:inset-6 border border-amber-500/30 rounded-t-[100px] flex flex-col items-center justify-between p-4">
                <div className="w-full h-full border border-amber-500/20 rounded-t-[90px] flex flex-col items-center justify-around py-6">
                  {/* Brass Carved Mandala Ring */}
                  <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full border-4 border-dashed border-amber-500/40 flex items-center justify-center">
                    <div className="w-14 h-14 sm:w-22 sm:h-22 rounded-full border-2 border-amber-400/50 flex items-center justify-center bg-amber-950/40">
                      <span className="text-amber-400 text-xl sm:text-2xl font-serif">ॐ</span>
                    </div>
                  </div>

                  {/* Right Brass Door Ring */}
                  <div className="relative flex items-center justify-start w-full pl-1 sm:pl-3">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-4 border-amber-400 bg-gradient-to-br from-yellow-500 to-amber-900 shadow-xl flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full border-2 border-amber-200" />
                    </div>
                  </div>

                  {/* Diamond Studs */}
                  <div className="grid grid-cols-2 gap-3 opacity-40">
                    <div className="w-2.5 h-2.5 bg-amber-400 rotate-45" />
                    <div className="w-2.5 h-2.5 bg-amber-400 rotate-45" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CENTER ROYAL SEAL & INTERACTIVE CTA */}
            <motion.div
              className="relative z-40 flex flex-col items-center text-center px-4 max-w-sm"
              exit={{
                scale: 0.8,
                opacity: 0,
                transition: { duration: 0.6 },
              }}
            >
              {/* Auspicious Shlok Greeting */}
              <div className="mb-3 px-4 py-1 rounded-full bg-black/65 border border-amber-500/50 backdrop-blur-md">
                <p className="text-amber-300 text-xs sm:text-sm font-serif tracking-widest uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "8s" }} />
                  <span>शुभ विवाह निमंत्रण</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "8s" }} />
                </p>
              </div>

              {/* Personalized Guest Tag */}
              {guestName && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-3 flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-[11px] font-medium backdrop-blur-sm"
                >
                  <UserCheck className="w-3.5 h-3.5 text-amber-300" />
                  <span>Specially Invited: <strong className="text-amber-100">{guestName}</strong></span>
                </motion.div>
              )}

              {/* Couple Monogram Wax Seal */}
              <motion.div
                className="w-20 h-20 sm:w-26 sm:h-26 rounded-full p-1 bg-gradient-to-br from-amber-300 via-amber-600 to-yellow-800 shadow-2xl cursor-pointer"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleOpen}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#3A0512] to-stone-900 border-2 border-amber-400/90 flex flex-col items-center justify-center shadow-inner">
                  <span className="font-decor text-amber-300 text-xl sm:text-2xl font-bold tracking-tighter">
                    S & A
                  </span>
                  <span className="text-[9px] text-amber-400/90 tracking-widest uppercase font-serif mt-0.5">
                    Udaipur 2026
                  </span>
                </div>
              </motion.div>

              {/* Title */}
              <div className="mt-4 space-y-0.5">
                <h1 className="font-editorial text-2xl sm:text-3xl text-amber-100 font-semibold tracking-wide drop-shadow-md">
                  Sajal & Aaradhya
                </h1>
                <p className="text-xs text-amber-300/80 font-sans tracking-wider">
                  Cordially Invite You to Their Wedding
                </p>
              </div>

              {/* Interactive Open Invitation Button */}
              <motion.button
                onClick={handleOpen}
                className="mt-5 group relative px-7 py-3 rounded-full overflow-hidden shadow-2xl border border-amber-400/60 bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 text-stone-950 font-royal font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 hover:shadow-amber-500/50 hover:scale-105 active:scale-95"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2 text-stone-950 font-bold">
                  <span>Open Invitation</span>
                  <ChevronUp className="w-4 h-4 animate-bounce" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 opacity-90 group-hover:opacity-100 transition-opacity" />
              </motion.button>

              {/* Mobile swipe helper */}
              <p className="mt-2.5 text-[10px] text-amber-300/70 flex items-center gap-1.5 tracking-wider font-sans">
                <Music className="w-3 h-3 text-amber-400 animate-pulse" />
                <span>Swipe up or tap to enter with royal music</span>
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
