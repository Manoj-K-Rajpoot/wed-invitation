"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Heart,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Download,
  Send,
  MessageCircle,
  Check,
  Languages,
  Compass
} from "lucide-react";
import confetti from "canvas-confetti";
import { WEDDING_DATA } from "@/lib/weddingData";
import { generateGoogleCalendarUrl, downloadIcsFile } from "@/lib/calendar";
import { audioEngine } from "@/lib/audioEngine";

function Version1Content() {
  const searchParams = useSearchParams();
  const [guestName, setGuestName] = useState("Honored Guest");
  const [isBoxOpened, setIsBoxOpened] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isHindi, setIsHindi] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isScratched, setIsScratched] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);

  // Scratch Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  // RSVP State
  const [rsvpForm, setRsvpForm] = useState({
    name: "",
    phone: "",
    guests: "2",
    dietary: "Royal Vegetarian",
    attending: ["mehndi", "haldi", "sangeet", "wedding", "reception"],
    song: "",
    message: "",
  });
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Countdown timer
  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const to = searchParams.get("to") || searchParams.get("guest") || "";
    if (to) {
      const name = to.replace(/\+/g, " ");
      setGuestName(name);
      setRsvpForm((prev) => ({ ...prev, name }));
    }
  }, [searchParams]);

  useEffect(() => {
    const target = new Date(WEDDING_DATA.couple.weddingTimestamp).getTime();
    const timer = setInterval(() => {
      const diff = target - new Date().getTime();
      if (diff > 0) {
        setCountdown({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / 1000 / 60) % 60),
          s: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize Scratch Canvas on Card 1
  useEffect(() => {
    if (!isBoxOpened || activeCardIndex !== 1 || isScratched) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width * (window.devicePixelRatio || 1);
    canvas.height = height * (window.devicePixelRatio || 1);
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#D4AF37");
    grad.addColorStop(0.3, "#F9F3DC");
    grad.addColorStop(0.6, "#E5C158");
    grad.addColorStop(1, "#B8860B");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 300; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? "rgba(255,255,255,0.6)" : "rgba(184,134,11,0.3)";
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = "#580B1E";
    ctx.font = "bold 15px 'Cinzel', serif";
    ctx.textAlign = "center";
    ctx.fillText("✨ SCRATCH GOLDEN FOIL ✨", width / 2, height / 2 - 8);
    ctx.font = "12px 'Montserrat', sans-serif";
    ctx.fillText("Reveal the Sacred Wedding Muhurat", width / 2, height / 2 + 14);

    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.lineWidth = 3;
    ctx.strokeRect(6, 6, width - 12, height - 12);
  }, [isBoxOpened, activeCardIndex, isScratched]);

  const handleOpenBox = () => {
    setIsBoxOpened(true);
    if (audioEngine) {
      audioEngine.start();
      setIsPlayingMusic(true);
    }
    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#E8A598", "#FF4081", "#FFA000", "#FFF8E1"],
    });
  };

  const toggleAudio = () => {
    if (audioEngine) {
      const state = audioEngine.toggle();
      setIsPlayingMusic(state);
    }
  };

  const triggerPetalShower = () => {
    confetti({
      particleCount: 65,
      spread: 90,
      origin: { y: 0.5 },
      colors: ["#D4AF37", "#E8A598", "#D81B60", "#FFB300", "#FFF8E1"],
    });
  };

  // Scratch handler
  const scratchFoil = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 42;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (lastPosRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPosRef.current.x * dpr, lastPosRef.current.y * dpr);
      ctx.lineTo(x * dpr, y * dpr);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x * dpr, y * dpr, 20 * dpr, 0, Math.PI * 2);
      ctx.fill();
    }
    lastPosRef.current = { x, y };

    try {
      const img = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let clear = 0;
      for (let i = 3; i < img.length; i += 32) {
        if (img[i] === 0) clear += 8;
      }
      const p = Math.round((clear / (img.length / 4)) * 100);
      setScratchPercent(p);
      if (p >= 38 && !isScratched) {
        setIsScratched(true);
        triggerPetalShower();
      }
    } catch {}
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDrawingRef.current = true;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    lastPosRef.current = { x, y };
    scratchFoil(x, y);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawingRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    scratchFoil(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
  };

  const tabs = [
    { id: 0, label: "Patrika", icon: Sparkles },
    { id: 1, label: "Save Date", icon: Calendar },
    { id: 2, label: "Itinerary", icon: Clock },
    { id: 3, label: "Our Story", icon: Heart },
    { id: 4, label: "Venue", icon: MapPin },
    { id: 5, label: "RSVP", icon: Send },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#3A0512] flex flex-col items-center justify-center p-3 sm:p-6 select-none overflow-x-hidden font-sans relative">
      {/* LUXURY WATERMARK BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none opacity-35 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:26px_26px]" />

      {/* FLOATING CORNER UTILITY CONTROLS (No bulky website header) */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
        {/* Language Toggle */}
        <button
          onClick={() => setIsHindi(!isHindi)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFFDF9]/90 backdrop-blur-md border border-amber-400/60 text-[11px] font-hindi font-semibold text-[#580B1E] shadow-sm hover:bg-amber-50 transition-all hover:scale-105 active:scale-95"
        >
          <Languages className="w-3.5 h-3.5 text-amber-700" />
          <span>{isHindi ? "English" : "हिंदी"}</span>
        </button>

        {/* Audio Player Toggle */}
        <button
          onClick={toggleAudio}
          className="w-8 h-8 rounded-full bg-[#FFFDF9]/90 backdrop-blur-md border border-amber-400/60 flex items-center justify-center text-[#580B1E] shadow-sm hover:bg-amber-50 transition-all hover:scale-105 active:scale-95"
          title={isPlayingMusic ? "Mute Music" : "Play Music"}
        >
          {isPlayingMusic ? <Volume2 className="w-4 h-4 text-amber-700 animate-pulse" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
        </button>
      </div>

      {/* MAIN INVITATION CARD CANVAS */}
      <main className="w-full max-w-lg flex flex-col items-center justify-center my-auto z-20">
        <AnimatePresence mode="wait">
          {/* STATE A: CLOSED PRISTINE IVORY SILK WEDDING BOX */}
          {!isBoxOpened ? (
            <motion.div
              key="box-closed"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.06, opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="relative w-full aspect-[4/5] rounded-[32px] p-2 bg-gradient-to-br from-[#FFFDF9] via-[#FBF5E8] to-[#EFE1C6] shadow-2xl border-2 border-amber-400/60"
            >
              <div className="w-full h-full rounded-[24px] bg-[#FFFDF9] p-6 sm:p-8 flex flex-col items-center justify-between text-center border border-amber-300 shadow-inner relative overflow-hidden">
                {/* Traditional Gold Foil Borders */}
                <div className="absolute inset-3 border border-amber-400/40 rounded-2xl pointer-events-none" />
                <div className="absolute inset-4 border border-dashed border-amber-400/30 rounded-xl pointer-events-none" />

                {/* Top Auspicious Invocation */}
                <div className="relative z-10 space-y-1">
                  <p className="font-hindi text-xs sm:text-sm font-bold text-amber-900 tracking-widest uppercase flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>॥ ॐ श्री गणेशाय नमः ॥</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  </p>
                  <p className="text-[10px] sm:text-xs text-stone-600 font-serif tracking-widest uppercase">
                    The Royal Wedding Invitation
                  </p>
                </div>

                {/* Center 24K Gold Foil Seal */}
                <div className="relative z-10 flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleOpenBox}
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-amber-300 via-amber-500 to-amber-700 shadow-xl cursor-pointer flex items-center justify-center"
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-b from-[#FFFDF9] to-[#F5EAD4] border-2 border-amber-500 flex flex-col items-center justify-center shadow-inner">
                      <span className="font-decor text-3xl sm:text-4xl text-[#580B1E] font-bold tracking-wider">
                        S & A
                      </span>
                      <span className="text-[9px] uppercase tracking-widest text-amber-800 font-serif mt-0.5">
                        Udaipur 2026
                      </span>
                    </div>
                  </motion.div>

                  <h2 className="font-script text-3xl sm:text-4xl text-[#580B1E] font-bold mt-4 drop-shadow-xs">
                    Sajal & Aaradhya
                  </h2>
                  <p className="text-xs text-stone-600 font-hindi mt-0.5">
                    १४ दिसंबर २०२६ • द ओबेरॉय उदयविलास, उदयपुर
                  </p>
                </div>

                {/* Guest Greeting & Open Button */}
                <div className="relative z-10 space-y-3 w-full">
                  <div className="px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-xs text-amber-900 font-serif">
                    <span>सादर आमंत्रण: <strong className="text-[#580B1E]">{guestName}</strong></span>
                  </div>

                  <button
                    onClick={handleOpenBox}
                    className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-stone-950 font-royal font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-stone-950" />
                    <span>Open Royal Wedding Patrika</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* STATE B: MULTI-CARD LUXURY FOLIO */
            <motion.div
              key="box-opened"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col items-center"
            >
              {/* TOP NAVIGATION TABS */}
              <div className="w-full overflow-x-auto no-scrollbar flex items-center justify-start sm:justify-center gap-1.5 p-1 mb-3 bg-white/90 border border-amber-300/80 rounded-full shadow-md backdrop-blur-sm">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeCardIndex === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveCardIndex(tab.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-royal font-semibold transition-all whitespace-nowrap ${
                        isActive
                          ? "bg-[#580B1E] text-amber-100 shadow-md font-bold scale-105"
                          : "text-stone-700 hover:text-amber-900 hover:bg-amber-100/60"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* CARD INSERT CONTAINER */}
              <div className="relative w-full min-h-[490px] sm:min-h-[530px] rounded-[28px] p-6 sm:p-8 bg-[#FFFDF9] text-[#3A0512] shadow-2xl border-2 border-amber-400/60 flex flex-col justify-between overflow-hidden">
                {/* Traditional Corner Flourishes */}
                <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-600 pointer-events-none" />
                <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-600 pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-600 pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-600 pointer-events-none" />

                <AnimatePresence mode="wait">
                  {/* CARD 0: TRADITIONAL PATRIKA & SHLOKAS */}
                  {activeCardIndex === 0 && (
                    <motion.div
                      key="card-0"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4 text-center my-auto"
                    >
                      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-amber-100 to-amber-300 p-0.5 shadow-md flex items-center justify-center border border-amber-400">
                        <div className="w-full h-full rounded-full bg-[#580B1E] flex items-center justify-center p-2 text-amber-300">
                          <svg viewBox="0 0 100 100" className="w-10 h-10 fill-current">
                            <path d="M50 8 C42 8 36 14 36 22 C36 28 40 33 46 35 C42 38 38 43 38 50 C38 57 43 62 49 64 C48 67 47 70 45 74 C43 78 40 82 35 84 C38 86 42 87 46 87 C54 87 59 81 61 74 C63 67 62 61 61 55 C66 52 70 46 70 39 C70 30 63 22 55 22 C55 14 50 8 50 8 Z" />
                            <circle cx="50" cy="28" r="3" fill="#FFD700" />
                          </svg>
                        </div>
                      </div>

                      <p className="font-hindi text-sm font-bold text-amber-900">
                        {WEDDING_DATA.shlokas[0].sanskrit}
                      </p>

                      <div className="space-y-1">
                        <p className="text-xs uppercase font-editorial tracking-wider text-stone-600">
                          Together with their families
                        </p>
                        <h2 className="font-script text-4xl sm:text-5xl text-[#580B1E] font-bold">
                          {isHindi ? WEDDING_DATA.couple.groom.hindiFullName : WEDDING_DATA.couple.groom.fullName}
                        </h2>
                        <div className="flex items-center justify-center gap-3 my-1">
                          <div className="h-px bg-amber-600/40 w-12" />
                          <span className="font-script text-xl text-amber-900 font-bold">&</span>
                          <div className="h-px bg-amber-600/40 w-12" />
                        </div>
                        <h2 className="font-script text-4xl sm:text-5xl text-[#580B1E] font-bold">
                          {isHindi ? WEDDING_DATA.couple.bride.hindiFullName : WEDDING_DATA.couple.bride.fullName}
                        </h2>
                      </div>

                      <p className="text-xs sm:text-sm text-stone-700 font-editorial italic max-w-sm mx-auto leading-relaxed">
                        {isHindi
                          ? WEDDING_DATA.hindiPatrika.invitationNote
                          : "Cordially invite you to celebrate their sacred wedding ceremony and bestow your auspicious blessings."}
                      </p>

                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 font-royal font-semibold">
                        Monday, 14 December 2026 • The Oberoi Udaivilas, Udaipur
                      </div>
                    </motion.div>
                  )}

                  {/* CARD 1: COUNTDOWN & SCRATCH-TO-REVEAL SAVE THE DATE */}
                  {activeCardIndex === 1 && (
                    <motion.div
                      key="card-1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4 text-center my-auto"
                    >
                      <div>
                        <span className="text-[10px] font-bold font-royal uppercase tracking-widest text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                          Auspicious Countdown
                        </span>
                        <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#580B1E] mt-1">
                          Until Two Souls Become One
                        </h3>
                      </div>

                      {/* 4-Box Countdown */}
                      <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
                        {[
                          { l: "Days", v: countdown.d },
                          { l: "Hours", v: countdown.h },
                          { l: "Mins", v: countdown.m },
                          { l: "Secs", v: countdown.s },
                        ].map((c, i) => (
                          <div key={i} className="p-2 rounded-xl bg-amber-50/80 border border-amber-300 shadow-xs text-center">
                            <span className="font-royal text-lg sm:text-xl font-bold text-[#580B1E]">{c.v}</span>
                            <span className="block text-[9px] uppercase font-bold text-amber-900">{c.l}</span>
                          </div>
                        ))}
                      </div>

                      {/* Scratch Foil Layer */}
                      <div className="relative w-full h-44 rounded-2xl overflow-hidden shadow-inner border-2 border-amber-400">
                        {/* Revealed Content Under Foil */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#580B1E] via-[#450716] to-[#25030B] p-4 flex flex-col items-center justify-center text-center text-amber-100">
                          <span className="text-[10px] uppercase tracking-widest text-amber-300 font-bold">Save The Date</span>
                          <h4 className="font-royal text-2xl font-bold text-amber-200 mt-1">14 DECEMBER 2026</h4>
                          <p className="text-xs text-stone-200 font-editorial italic mt-0.5">Muhurat: 06:00 PM • The Oberoi Udaivilas</p>
                        </div>

                        {/* Interactive Foil Canvas */}
                        <canvas
                          ref={canvasRef}
                          style={{ touchAction: "none" }}
                          className={`absolute inset-0 w-full h-full cursor-pointer z-10 transition-opacity duration-500 ${
                            isScratched ? "opacity-0 pointer-events-none" : "opacity-100"
                          }`}
                          onPointerDown={handlePointerDown}
                          onPointerMove={handlePointerMove}
                          onPointerUp={handlePointerUp}
                        />
                      </div>

                      {!isScratched && (
                        <div className="flex items-center justify-between text-[11px] text-stone-600">
                          <span>Scratch foil with finger ({scratchPercent}%)</span>
                          <button
                            onClick={() => {
                              setIsScratched(true);
                              triggerPetalShower();
                            }}
                            className="text-amber-800 font-bold underline"
                          >
                            Reveal Now
                          </button>
                        </div>
                      )}

                      {/* Add to Calendar */}
                      <div className="flex gap-2 pt-1">
                        <a
                          href={generateGoogleCalendarUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2.5 px-3 rounded-xl bg-[#580B1E] text-amber-100 text-xs font-royal font-bold uppercase shadow hover:bg-[#430816] flex items-center justify-center gap-1.5"
                        >
                          <Calendar className="w-3.5 h-3.5 text-amber-300" />
                          <span>Google Calendar</span>
                        </a>
                        <button
                          onClick={downloadIcsFile}
                          className="py-2.5 px-3 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs font-semibold hover:bg-stone-50 flex items-center justify-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5 text-stone-600" />
                          <span>.ICS File</span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* CARD 2: ITINERARY & ATTIRE PALETTES */}
                  {activeCardIndex === 2 && (
                    <motion.div
                      key="card-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-3 my-auto overflow-y-auto max-h-[420px] pr-1"
                    >
                      <div className="text-center pb-2 border-b border-amber-200">
                        <span className="text-[10px] font-bold font-royal uppercase tracking-widest text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                          Ritual Schedule
                        </span>
                        <h3 className="font-editorial text-xl font-bold text-[#580B1E] mt-1">
                          The 5 Sacred Celebrations
                        </h3>
                      </div>

                      <div className="space-y-2.5">
                        {WEDDING_DATA.itinerary.map((ev) => (
                          <div
                            key={ev.id}
                            className="p-3 rounded-xl bg-amber-50/60 border border-amber-300/80 shadow-xs space-y-1.5"
                          >
                            <div className="flex items-center justify-between">
                              <h4 className="font-royal text-xs sm:text-sm font-bold text-[#580B1E]">
                                {ev.title}
                              </h4>
                              <span className="text-[10px] uppercase font-bold text-amber-900 bg-white px-2 py-0.5 rounded-full border border-amber-200">
                                {ev.time}
                              </span>
                            </div>

                            <p className="text-[11px] text-stone-600">
                              {ev.date} • {ev.subVenue}
                            </p>

                            {/* Attire Color Chips */}
                            <div className="flex items-center justify-between pt-1 border-t border-amber-200/50 text-[10px]">
                              <span className="text-stone-600 font-medium">Dress: <strong className="text-[#580B1E]">{ev.dressCode}</strong></span>
                              <div className="flex items-center gap-1">
                                {ev.colorPalette.map((c, ci) => (
                                  <div
                                    key={ci}
                                    title={c.name}
                                    className="w-3.5 h-3.5 rounded-full border border-stone-300 shadow-xs"
                                    style={{ backgroundColor: c.hex }}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* CARD 3: OUR STORY */}
                  {activeCardIndex === 3 && (
                    <motion.div
                      key="card-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-3 my-auto text-center"
                    >
                      <span className="text-[10px] font-bold font-royal uppercase tracking-widest text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                        Our Story
                      </span>
                      <h3 className="font-editorial text-2xl font-bold text-[#580B1E]">
                        From Udaipur With Love
                      </h3>

                      <div className="space-y-2.5 max-h-[340px] overflow-y-auto text-left pr-1">
                        {WEDDING_DATA.ourStory.map((st) => (
                          <div key={st.id} className="p-3 rounded-xl bg-amber-50/60 border border-amber-300/80 shadow-xs space-y-1">
                            <div className="flex items-center justify-between text-[10px] font-bold text-amber-900">
                              <span>{st.chapterNumber}: {st.title}</span>
                              <span className="text-stone-500 font-normal">{st.year}</span>
                            </div>
                            <p className="text-[11px] text-stone-700 leading-relaxed font-sans">{st.story}</p>
                            <p className="text-[10px] text-stone-500 italic font-editorial">“{st.quote}”</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* CARD 4: VENUE & CONCIERGE */}
                  {activeCardIndex === 4 && (
                    <motion.div
                      key="card-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-3 text-center my-auto"
                    >
                      <span className="text-[10px] font-bold font-royal uppercase tracking-widest text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                        The Royal Venue
                      </span>
                      <h3 className="font-royal text-xl font-bold text-[#580B1E]">
                        {WEDDING_DATA.venue.name}
                      </h3>
                      <p className="text-xs text-stone-600 font-editorial italic">
                        {WEDDING_DATA.venue.address}
                      </p>

                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-left text-xs space-y-1.5">
                        <p className="font-bold text-stone-900">Airport & Coach Transfers:</p>
                        <p className="text-stone-600 text-[11px]">{WEDDING_DATA.venue.airportInfo}</p>
                        <p className="text-amber-900 font-semibold text-[11px]">Hospitality Desk: {WEDDING_DATA.venue.conciergeContact}</p>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <a
                          href={WEDDING_DATA.venue.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2.5 px-4 rounded-xl bg-[#580B1E] text-amber-100 text-xs font-royal font-bold uppercase shadow hover:bg-[#430816] flex items-center justify-center gap-1.5"
                        >
                          <Compass className="w-3.5 h-3.5 text-amber-300" />
                          <span>Google Maps</span>
                        </a>
                        <a
                          href={WEDDING_DATA.venue.appleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-4 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs font-semibold hover:bg-stone-50"
                        >
                          Apple Maps
                        </a>
                      </div>
                    </motion.div>
                  )}

                  {/* CARD 5: RSVP & 1-CLICK WHATSAPP */}
                  {activeCardIndex === 5 && (
                    <motion.div
                      key="card-5"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-3 text-center my-auto"
                    >
                      <span className="text-[10px] font-bold font-royal uppercase tracking-widest text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                        Confirm Attendance
                      </span>
                      <h3 className="font-editorial text-2xl font-bold text-[#580B1E]">
                        Grace Us With Your Presence
                      </h3>

                      {rsvpSubmitted ? (
                        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-center space-y-2">
                          <Check className="w-8 h-8 mx-auto text-emerald-600" />
                          <h4 className="font-royal font-bold text-sm">RSVP Received!</h4>
                          <p className="text-xs font-editorial italic">Thank you, {rsvpForm.name}. The Singhania & Sharma families warmly await your arrival in Udaipur.</p>
                        </div>
                      ) : (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            setRsvpSubmitted(true);
                            triggerPetalShower();
                          }}
                          className="space-y-2 text-left text-xs"
                        >
                          <div>
                            <label className="block text-[11px] font-semibold text-stone-700">Full Name *</label>
                            <input
                              type="text"
                              required
                              value={rsvpForm.name}
                              onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                              placeholder="Your Name"
                              className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[11px] font-semibold text-stone-700">Guests</label>
                              <select
                                value={rsvpForm.guests}
                                onChange={(e) => setRsvpForm({ ...rsvpForm, guests: e.target.value })}
                                className="w-full px-2 py-2 rounded-lg border border-stone-300 bg-white"
                              >
                                <option value="1">1 Person</option>
                                <option value="2">2 Persons</option>
                                <option value="3">3 Persons</option>
                                <option value="4">4+ Persons</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold text-stone-700">Dietary</label>
                              <select
                                value={rsvpForm.dietary}
                                onChange={(e) => setRsvpForm({ ...rsvpForm, dietary: e.target.value })}
                                className="w-full px-2 py-2 rounded-lg border border-stone-300 bg-white"
                              >
                                <option value="Royal Vegetarian">Royal Pure Veg</option>
                                <option value="Jain Vegetarian">Strict Jain</option>
                                <option value="Multi-Cuisine">Multi-Cuisine</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-stone-700">Blessings / Message</label>
                            <textarea
                              rows={2}
                              value={rsvpForm.message}
                              onChange={(e) => setRsvpForm({ ...rsvpForm, message: e.target.value })}
                              placeholder="Leave your warm wishes and blessings..."
                              className="w-full px-3 py-1.5 rounded-lg border border-stone-300 bg-white text-xs"
                            />
                          </div>

                          <div className="flex gap-2 pt-1">
                            <button
                              type="submit"
                              className="flex-1 py-2.5 px-3 rounded-xl bg-[#580B1E] text-amber-100 font-royal font-bold text-xs uppercase shadow hover:bg-[#430816]"
                            >
                              Submit Online
                            </button>
                            <a
                              href={`https://wa.me/${WEDDING_DATA.venue.whatsappNumber}?text=${encodeURIComponent(
                                `Namaste! Confirming RSVP for Sajal & Aaradhya Wedding:\nName: ${rsvpForm.name}\nGuests: ${rsvpForm.guests}\nDietary: ${rsvpForm.dietary}`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="py-2.5 px-3 rounded-xl bg-emerald-600 text-white font-semibold text-xs flex items-center gap-1 shadow hover:bg-emerald-700"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        </form>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* BOTTOM NAVIGATION CONTROLS */}
                <div className="pt-3 border-t border-amber-200 flex items-center justify-between text-xs text-stone-600">
                  <button
                    disabled={activeCardIndex === 0}
                    onClick={() => setActiveCardIndex((prev) => Math.max(0, prev - 1))}
                    className="flex items-center gap-1 font-semibold disabled:opacity-30 hover:text-[#580B1E]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <span className="text-[10px] font-bold text-amber-900 font-royal">
                    Card {activeCardIndex + 1} of {tabs.length}
                  </span>

                  <button
                    disabled={activeCardIndex === tabs.length - 1}
                    onClick={() => setActiveCardIndex((prev) => Math.min(tabs.length - 1, prev + 1))}
                    className="flex items-center gap-1 font-semibold disabled:opacity-30 hover:text-[#580B1E]"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function Version1Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center text-[#580B1E] font-royal">Opening Royal Patrika...</div>}>
      <Version1Content />
    </Suspense>
  );
}
