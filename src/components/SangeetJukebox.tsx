"use client";

import React, { useState } from "react";
import { Music, Play, Pause, Disc, Volume2, Sparkles } from "lucide-react";
import { audioEngine } from "@/lib/audioEngine";

const TRACKS = [
  {
    id: "yaman",
    title: "Raag Yaman (Mandap Serenity)",
    instrument: "Bansuri Flute & Tanpura",
    duration: "Instrumental Raga",
    vibe: "Sacred & Peaceful",
  },
  {
    id: "shehnai",
    title: "Auspicious Shehnai Symphony",
    instrument: "Shehnai & Dholak",
    duration: "Vedic Chants",
    vibe: "Joyous & Auspicious",
  },
  {
    id: "sitar",
    title: "Royal Lake Palace Sitar Echoes",
    instrument: "Sitar & Santoor",
    duration: "Palace Ensemble",
    vibe: "Regal & Romantic",
  },
];

export default function SangeetJukebox() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(0);

  const togglePlayback = (idx: number) => {
    setSelectedTrack(idx);
    if (audioEngine) {
      if (!isPlaying || selectedTrack !== idx) {
        audioEngine.start();
        setIsPlaying(true);
      } else {
        audioEngine.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section className="relative py-12 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="deckle-edge-card p-6 sm:p-8 rounded-3xl border-2 border-amber-500/40 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-amber-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#580B1E] text-amber-300 flex items-center justify-center shadow-lg">
              <Disc className={`w-6 h-6 ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "5s" }} />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-widest">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>Wedding Melody Experience</span>
              </div>
              <h3 className="font-royal text-xl font-bold text-[#580B1E]">
                Royal Sangeet & Mandap Ragas
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-900">
            <Volume2 className="w-4 h-4 text-amber-700" />
            <span>Harmonic Audio Synthesizer Active</span>
          </div>
        </div>

        {/* Track List */}
        <div className="mt-6 space-y-3">
          {TRACKS.map((track, idx) => {
            const isCurrent = selectedTrack === idx && isPlaying;

            return (
              <div
                key={track.id}
                onClick={() => togglePlayback(idx)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  isCurrent
                    ? "bg-[#580B1E] text-white border-amber-400 shadow-md scale-[1.01]"
                    : "bg-white/80 hover:bg-amber-50/80 text-stone-800 border-stone-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    className={`w-9 h-9 rounded-full flex items-center justify-center ${
                      isCurrent
                        ? "bg-amber-400 text-stone-950"
                        : "bg-amber-100 text-amber-900"
                    }`}
                  >
                    {isCurrent ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>

                  <div>
                    <h4 className="font-royal font-bold text-xs sm:text-sm">
                      {track.title}
                    </h4>
                    <p className={`text-[11px] ${isCurrent ? "text-amber-200" : "text-stone-500"}`}>
                      {track.instrument} • {track.vibe}
                    </p>
                  </div>
                </div>

                <span className={`text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full ${
                  isCurrent ? "bg-amber-400/20 text-amber-300 border border-amber-400/40" : "bg-stone-100 text-stone-600"
                }`}>
                  {track.duration}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
