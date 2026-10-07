"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";
import { audioEngine } from "@/lib/audioEngine";

interface PetalItem {
  id: number;
  left: string;
  duration: number;
  delay: number;
  size: number;
  isMarigold: boolean;
  rotation: number;
}

export default function FloatingAudioPetals() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPetals, setShowPetals] = useState(true);
  const [petals, setPetals] = useState<PetalItem[]>([]);

  useEffect(() => {
    // Generate deterministic/safe petal coordinates client-side
    const initialPetals: PetalItem[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${(i * 5.5 + 2) % 94}%`,
      duration: 8 + (i % 5) * 2,
      delay: (i % 6) * 1.5,
      size: 14 + (i % 4) * 4,
      isMarigold: i % 3 === 0,
      rotation: (i * 47) % 360,
    }));
    setPetals(initialPetals);
  }, []);

  useEffect(() => {
    if (!audioEngine) return;
    const unsubscribe = audioEngine.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => unsubscribe();
  }, []);

  const toggleAudio = () => {
    if (audioEngine) {
      const state = audioEngine.toggle();
      setIsPlaying(state);
    }
  };

  return (
    <>
      {/* 1. FLOATING ROSE & MARIGOLD PETALS BACKGROUND ANIMATION */}
      {showPetals && petals.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
          {petals.map((p) => (
            <div
              key={p.id}
              className="absolute -top-10 opacity-70 animate-float"
              style={{
                left: p.left,
                animation: `fallDown ${p.duration}s infinite linear`,
                animationDelay: `${p.delay}s`,
              }}
            >
              {/* SVG Petal */}
              <svg
                width={p.size}
                height={p.size * 1.4}
                viewBox="0 0 30 42"
                className={p.isMarigold ? "text-amber-500 fill-current" : "text-rose-400 fill-current"}
                style={{
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
                  transform: `rotate(${p.rotation}deg)`,
                }}
              >
                <path d="M15 0 C25 10 30 25 15 42 C0 25 5 10 15 0 Z" />
              </svg>
            </div>
          ))}
        </div>
      )}

      {/* 2. FLOATING CONTROL BUTTONS (BOTTOM-RIGHT / TOP-RIGHT) */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        {/* Petal Toggle Button */}
        <button
          onClick={() => setShowPetals(!showPetals)}
          title={showPetals ? "Pause Falling Petals" : "Enable Falling Petals"}
          className={`w-10 h-10 rounded-full border border-amber-500/40 backdrop-blur-md shadow-xl flex items-center justify-center transition-all ${
            showPetals
              ? "bg-stone-900/85 text-amber-300 hover:bg-stone-800"
              : "bg-white/80 text-stone-600 hover:bg-stone-100"
          }`}
        >
          <Sparkles className="w-4 h-4" />
        </button>

        {/* Music Player Button with Visualizer */}
        <button
          onClick={toggleAudio}
          title={isPlaying ? "Mute Royal Ambient Music" : "Play Royal Ambient Music"}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-stone-950/90 text-amber-200 border-2 border-amber-500/60 shadow-2xl backdrop-blur-md hover:bg-stone-900 hover:scale-105 active:scale-95 transition-all"
        >
          {isPlaying ? (
            <>
              {/* Animated Sound Equalizer Bars */}
              <div className="flex items-end gap-0.5 h-3.5 w-4">
                <span className="w-1 bg-amber-400 rounded-full animate-pulse h-full" style={{ animationDuration: "0.6s" }} />
                <span className="w-1 bg-amber-300 rounded-full animate-pulse h-2/3" style={{ animationDuration: "0.4s" }} />
                <span className="w-1 bg-amber-400 rounded-full animate-pulse h-4/5" style={{ animationDuration: "0.8s" }} />
              </div>
              <span className="text-[11px] font-royal font-semibold tracking-wider text-amber-300 hidden sm:inline">
                Music Playing
              </span>
              <Volume2 className="w-4 h-4 text-amber-400" />
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-stone-400" />
              <span className="text-[11px] font-royal font-semibold tracking-wider text-stone-300 hidden sm:inline">
                Play Music
              </span>
            </>
          )}
        </button>
      </div>

      <style jsx global>{`
        @keyframes fallDown {
          0% {
            transform: translateY(-50px) rotate(0deg) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(105vh) rotate(360deg) translateX(50px);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
