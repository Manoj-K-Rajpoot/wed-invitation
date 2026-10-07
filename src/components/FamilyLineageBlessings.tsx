"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Moon, Sun, Heart, Crown } from "lucide-react";
import { WEDDING_DATA } from "@/lib/weddingData";

export default function FamilyLineageBlessings() {
  const { couple } = WEDDING_DATA;

  return (
    <section className="relative py-14 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 text-xs font-semibold uppercase tracking-widest mb-3">
          <Crown className="w-3.5 h-3.5 text-amber-700" />
          <span>कुल एवं परिवार परंपरा</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-4xl text-[#580B1E] font-bold">
          Ancestral Blessings & Auspicious Muhurat
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto mt-1 font-sans">
          Stepping into sacred matrimony with the divine grace and blessings of our beloved elders.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Groom Family Lineage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="deckle-edge-card p-6 rounded-3xl border border-amber-500/40 shadow-xl space-y-4"
        >
          <div className="flex items-center gap-2 pb-3 border-b border-amber-200">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
            <h3 className="font-royal text-base sm:text-lg font-bold text-[#580B1E]">
              Singhania Parivar (वर पक्ष)
            </h3>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-stone-700 font-sans">
            <div>
              <p className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                दादीहाल (Paternal Grandparents):
              </p>
              <p className="font-medium text-stone-800">
                {couple.groom.grandsonOf}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                माता-पिता (Parents):
              </p>
              <p className="font-medium text-stone-800">
                {couple.groom.sonOf}
              </p>
            </div>

            <div className="pt-2 border-t border-stone-200/60 text-xs italic font-editorial text-stone-600">
              “May the sacred rituals shower eternal happiness upon Sajal & Aaradhya.”
            </div>
          </div>
        </motion.div>

        {/* Bride Family Lineage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="deckle-edge-card p-6 rounded-3xl border border-amber-500/40 shadow-xl space-y-4"
        >
          <div className="flex items-center gap-2 pb-3 border-b border-amber-200">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
            <h3 className="font-royal text-base sm:text-lg font-bold text-[#580B1E]">
              Sharma Parivar (वधू पक्ष)
            </h3>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-stone-700 font-sans">
            <div>
              <p className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                दादीहाल (Paternal Grandparents):
              </p>
              <p className="font-medium text-stone-800">
                {couple.bride.granddaughterOf}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                माता-पिता (Parents):
              </p>
              <p className="font-medium text-stone-800">
                {couple.bride.daughterOf}
              </p>
            </div>

            <div className="pt-2 border-t border-stone-200/60 text-xs italic font-editorial text-stone-600">
              “Our dearest daughter embarks on her new home with love and our lifelong blessings.”
            </div>
          </div>
        </motion.div>
      </div>

      {/* Auspicious Vedic Muhurat Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-amber-950 via-[#3D0614] to-amber-950 text-amber-100 border border-amber-400/50 shadow-xl"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Sun className="w-6 h-6 animate-spin" style={{ animationDuration: "20s" }} />
            </div>
            <div>
              <h4 className="font-royal text-sm sm:text-base font-bold text-amber-200">
                शुभ विवाह लग्न एवं चौघड़िया (Auspicious Timing)
              </h4>
              <p className="text-xs text-stone-300 font-hindi">
                गोघूलि वेला • अमृत चौघड़िया मुहूर्त • रोहिणी नक्षत्र
              </p>
            </div>
          </div>

          <div className="px-4 py-2 rounded-xl bg-black/40 border border-amber-400/30 text-xs font-serif text-amber-300">
            <span>सांस्कृतिक पावन वेला: शाम ०६:०० बजे</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
