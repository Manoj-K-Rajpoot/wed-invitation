"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Calendar, Download, Sparkles, Clock, CheckCircle2, ChevronDown, Hand } from "lucide-react";
import { generateGoogleCalendarUrl, generateOutlookCalendarUrl, downloadIcsFile } from "@/lib/calendar";
import { WEDDING_DATA } from "@/lib/weddingData";

export default function ScratchCardCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [showCalendarMenu, setShowCalendarMenu] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  // Real-time Countdown Timer calculation
  useEffect(() => {
    const targetDate = new Date(WEDDING_DATA.couple.weddingTimestamp).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize Golden Metallic Scratch Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width * (typeof window !== "undefined" ? window.devicePixelRatio : 1);
    canvas.height = height * (typeof window !== "undefined" ? window.devicePixelRatio : 1);
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

    // Render luxurious gold foil gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#C59B27");
    gradient.addColorStop(0.25, "#F3E5AB");
    gradient.addColorStop(0.5, "#E5C158");
    gradient.addColorStop(0.75, "#D4AF37");
    gradient.addColorStop(1, "#8C6B1B");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add ornate foil glitter texture
    for (let i = 0; i < 400; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? "rgba(255,255,255,0.4)" : "rgba(100,60,10,0.3)";
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = Math.random() * 2;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Canvas Cover Text & Emblem
    ctx.fillStyle = "#3A0512";
    ctx.font = "bold 16px 'Cinzel', serif";
    ctx.textAlign = "center";
    ctx.fillText("✨ SCRATCH TO REVEAL ✨", width / 2, height / 2 - 12);

    ctx.fillStyle = "#580B1E";
    ctx.font = "12px 'Montserrat', sans-serif";
    ctx.fillText("Rub or swipe across the golden foil", width / 2, height / 2 + 14);

    // Border
    ctx.strokeStyle = "rgba(255,255,255,0.7)";
    ctx.lineWidth = 4;
    ctx.strokeRect(6, 6, width - 12, height - 12);
  }, []);

  // Trigger Rose Petal & Gold Confetti Shower
  const triggerCelebration = () => {
    const colors = ["#E8A598", "#D4AF37", "#FF4081", "#880E4F", "#FFD700", "#FFF3E0"];

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors,
      shapes: ["circle"],
      scalar: 1.2,
    });

    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });
    }, 250);
  };

  // Check cleared percentage of foil
  const calculateClearedPercent = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      let transparentPixels = 0;
      const totalPixels = data.length / 4;

      for (let i = 3; i < data.length; i += 32) {
        if (data[i] === 0) {
          transparentPixels += 8;
        }
      }

      const percent = Math.min(100, Math.round((transparentPixels / totalPixels) * 100));
      setScratchPercent(percent);

      if (percent >= 38 && !isRevealed) {
        setIsRevealed(true);
        triggerCelebration();
      }
    } catch {
      // Fallback
    }
  };

  const getCanvasCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 45;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (lastPosRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPosRef.current.x * dpr, lastPosRef.current.y * dpr);
      ctx.lineTo(x * dpr, y * dpr);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x * dpr, y * dpr, 22 * dpr, 0, Math.PI * 2);
      ctx.fill();
    }

    lastPosRef.current = { x, y };
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDrawingRef.current = true;
    const { x, y } = getCanvasCoords(e);
    lastPosRef.current = { x, y };
    scratch(x, y);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawingRef.current) return;
    const { x, y } = getCanvasCoords(e);
    scratch(x, y);
    calculateClearedPercent();
  };

  const handleEnd = () => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
    calculateClearedPercent();
  };

  return (
    <section className="relative py-12 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* 1. REAL-TIME COUNTDOWN TIMER */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 text-xs font-semibold uppercase tracking-widest mb-3">
          <Clock className="w-3.5 h-3.5 text-amber-700" />
          <span>The Auspicious Countdown</span>
        </div>

        <h2 className="font-editorial text-2xl sm:text-4xl text-[#580B1E] font-bold">
          Until Two Souls Become One
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1">
          Counting every blessed second until the sacred wedding day
        </p>

        {/* 4-Box Countdown Units */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-md mx-auto mt-6">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              className="relative p-3 sm:p-4 rounded-xl bg-gradient-to-b from-[#FFFDF9] to-[#F5EAD4] border border-amber-500/40 shadow-lg text-center"
            >
              <div className="text-2xl sm:text-4xl font-bold font-royal text-[#580B1E]">
                {String(item.value).padStart(2, "0")}
              </div>
              <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-amber-800 mt-1">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 2. INTERACTIVE SCRATCH-TO-REVEAL CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-lg mx-auto bg-stone-900 p-3 sm:p-4 rounded-3xl shadow-2xl border-2 border-amber-500/60"
      >
        <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center select-none">
          {/* REVEALED CONTENT UNDER FOIL */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#580B1E] via-[#3A0512] to-[#20020A] p-6 flex flex-col items-center justify-between text-center text-amber-100 z-0">
            {/* Top Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[11px] font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Save The Date</span>
            </div>

            {/* Wedding Date Highlight */}
            <div className="my-auto space-y-1">
              <p className="font-editorial text-sm sm:text-base text-amber-300 tracking-wider">
                The Royal Wedding of Sajal & Aaradhya
              </p>
              <h3 className="font-royal text-3xl sm:text-4xl font-extrabold text-amber-200 tracking-wider drop-shadow-md">
                DECEMBER 14, 2026
              </h3>
              <p className="font-editorial text-sm sm:text-base text-stone-300 italic">
                Auspicious Muhurat: 06:00 PM • The Oberoi Udaivilas, Udaipur
              </p>
            </div>

            {/* Revealed status banner */}
            <div className="flex items-center gap-1.5 text-xs text-amber-300/90 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Auspicious Date Unveiled! Add to your calendar below</span>
            </div>
          </div>

          {/* INTERACTIVE FOIL CANVAS LAYER */}
          <canvas
            ref={canvasRef}
            style={{ touchAction: "none" }}
            className={`absolute inset-0 w-full h-full cursor-pointer z-10 transition-opacity duration-700 ${
              isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
          />
        </div>

        {/* Scratch Progress Helper */}
        {!isRevealed && (
          <div className="mt-3 flex items-center justify-between text-xs text-amber-300/80 px-2">
            <span className="flex items-center gap-1">
              <Hand className="w-3.5 h-3.5 text-amber-400" />
              <span>Scratch foil ({scratchPercent}%)</span>
            </span>
            <button
              onClick={() => {
                setIsRevealed(true);
                triggerCelebration();
              }}
              className="text-amber-400 hover:text-amber-200 underline text-xs font-semibold"
            >
              Reveal Instantly
            </button>
          </div>
        )}

        {/* 3. ADD TO CALENDAR BUTTONS */}
        <div className="mt-4 pt-3 border-t border-stone-800 flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <button
              onClick={() => setShowCalendarMenu(!showCalendarMenu)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-stone-950 font-royal font-bold text-xs sm:text-sm tracking-wider uppercase shadow-lg hover:shadow-amber-500/30 transition-all active:scale-98"
            >
              <Calendar className="w-4 h-4" />
              <span>Add to Calendar</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showCalendarMenu ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown for Calendar Options */}
            {showCalendarMenu && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-full left-0 right-0 mb-2 p-2 bg-stone-900 border border-amber-500/50 rounded-xl shadow-2xl z-20 space-y-1 text-xs"
              >
                <a
                  href={generateGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-stone-800 text-amber-200 hover:text-white transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>Google Calendar</span>
                </a>
                <a
                  href={generateOutlookCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-stone-800 text-amber-200 hover:text-white transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  <span>Outlook / Office 365</span>
                </a>
                <button
                  onClick={() => {
                    downloadIcsFile();
                    setShowCalendarMenu(false);
                  }}
                  className="w-full flex items-center gap-2 p-2.5 rounded-lg hover:bg-stone-800 text-amber-200 hover:text-white transition-colors text-left"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>Apple Calendar / Download .ICS</span>
                </button>
              </motion.div>
            )}
          </div>

          <button
            onClick={() => {
              downloadIcsFile();
              triggerCelebration();
            }}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-stone-800 border border-amber-500/40 text-amber-300 hover:bg-stone-700 hover:text-white text-xs sm:text-sm font-semibold tracking-wider transition-colors"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Save .ICS File</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
