"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: "What is the dress code for each ceremony?",
    a: "We invite you to celebrate in vibrant Indian traditional wear! Mehendi features bright florals & henna greens, Haldi embraces cheerful sunny yellows and pastels, Sangeet is black-tie glitz and shimmering lehengas, and the Wedding Pheras calls for royal traditional silks (Ivory, Gold & Deep Crimson).",
  },
  {
    q: "How do I arrange airport transfers from Udaipur Airport?",
    a: "Maharana Pratap Airport (UDR) is approximately 45 minutes from The Oberoi Udaivilas. Dedicated chauffeured wedding coaches and luxury cars will be stationed at the airport on 12th & 13th December to receive all guests. Please share your flight details with our hospitality desk.",
  },
  {
    q: "What will the weather be like in Udaipur in December?",
    a: "December in Udaipur is pleasant and sunny during the daytime (approx. 24°C / 75°F) and pleasantly crisp by the lakeside at night (approx. 12°C / 54°F). We recommend a light shawl, pashmina, or jacket for evening lakeside functions.",
  },
  {
    q: "Are children welcome at the celebrations?",
    a: "Absolutely! We would be delighted to have your entire family and children join in the fun. Dedicated kid-friendly activities, games, and culinary stations will be available.",
  },
  {
    q: "What is the policy regarding wedding gifts?",
    a: "Your presence, warm laughters, and divine blessings are the greatest gift to us as we begin our new journey. We kindly request no boxed gifts (केवल आपका शुभाशीर्वाद एवं स्नेह).",
  },
];

export default function V2FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faqs" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-14 space-y-2">
        <span className="text-[11px] font-bold font-royal uppercase tracking-widest text-amber-900 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-300">
          Guest Information
        </span>
        <h2 className="font-editorial text-3xl sm:text-5xl text-[#580B1E] font-bold">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
          Everything you need to know about celebrations, hospitality, and your royal stay in Udaipur.
        </p>
        <div className="w-20 h-0.5 bg-amber-400 mx-auto mt-2" />
      </div>

      {/* Accordion List (WordPress / Elementor Accordion Pattern) */}
      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="rounded-2xl border-2 border-amber-300/70 bg-[#FFFDF9] overflow-hidden shadow-xs"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-royal font-bold text-xs sm:text-sm text-[#580B1E] hover:bg-amber-50/50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-amber-800 transition-transform duration-300 flex-shrink-0 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-5 text-xs sm:text-sm text-stone-700 leading-relaxed font-sans border-t border-amber-100"
                  >
                    <p className="pt-2">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
