"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Heart, Check, MessageCircle, Phone, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { WEDDING_DATA } from "@/lib/weddingData";

interface V2RsvpProps {
  initialGuestName?: string;
}

export default function V2RsvpSection({ initialGuestName = "" }: V2RsvpProps) {
  const { venue } = WEDDING_DATA;
  const [formData, setFormData] = useState({
    name: initialGuestName,
    phone: "",
    guests: "2",
    dietary: "Royal Vegetarian",
    attending: ["mehndi", "haldi", "sangeet", "wedding", "reception"],
    song: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleEvent = (id: string) => {
    if (formData.attending.includes(id)) {
      setFormData({ ...formData, attending: formData.attending.filter((e) => e !== id) });
    } else {
      setFormData({ ...formData, attending: [...formData.attending, id] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#E8A598", "#FF4081", "#FFA000", "#FFF8E1"],
    });
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Namaste! 🙏\n\nConfirming RSVP for the wedding of *Sajal & Aaradhya*:\n\n👤 *Guest Name:* ${formData.name || "Guest"}\n👥 *Total Guests:* ${formData.guests}\n🍽️ *Dietary:* ${formData.dietary}\n🎵 *Sangeet Song:* ${formData.song || "Surprise us!"}\n💌 *Blessings:* ${formData.message || "Heartiest congratulations!"}`
    );
    window.open(`https://wa.me/${venue.whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <section id="rsvp" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-14 space-y-2">
        <span className="text-[11px] font-bold font-royal uppercase tracking-widest text-amber-900 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-300">
          Be Our Guest
        </span>
        <h2 className="font-editorial text-3xl sm:text-5xl text-[#580B1E] font-bold">
          RSVP & Blessings
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
          Kindly confirm your presence by 1st December 2026 to help us make your royal stay memorable.
        </p>
        <div className="w-20 h-0.5 bg-amber-400 mx-auto mt-2" />
      </div>

      <div className="deckle-edge-card p-6 sm:p-10 rounded-3xl border-2 border-amber-400/80 shadow-2xl bg-[#FFFDF9] max-w-2xl mx-auto">
        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center border-2 border-emerald-500 shadow-md">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-royal text-2xl font-bold text-[#580B1E]">
              Thank You, {formData.name || "Dear Guest"}!
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto font-editorial italic">
              Your response has been warmly received. The Singhania & Sharma families eagerly look forward to welcoming you in Udaipur!
            </p>
            <div className="pt-3 flex justify-center gap-3">
              <button
                onClick={openWhatsApp}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 text-white text-xs font-semibold shadow hover:bg-emerald-700"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send WhatsApp Copy</span>
              </button>
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 rounded-full bg-stone-100 border border-stone-300 text-stone-800 text-xs font-semibold hover:bg-stone-200"
              >
                Edit Details
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-stone-800 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rajiv & Sunita Kapoor"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">WhatsApp Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-amber-600"
                />
              </div>
            </div>

            {/* Events Selection */}
            <div>
              <label className="block font-semibold text-stone-800 mb-2">Ceremonies You Will Attend:</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "mehndi", label: "Mehendi (12 Dec)" },
                  { id: "haldi", label: "Haldi (13 Dec)" },
                  { id: "sangeet", label: "Sangeet (13 Dec)" },
                  { id: "wedding", label: "Pheras (14 Dec)" },
                  { id: "reception", label: "Reception (14 Dec)" },
                ].map((ev) => {
                  const isChecked = formData.attending.includes(ev.id);
                  return (
                    <button
                      type="button"
                      key={ev.id}
                      onClick={() => toggleEvent(ev.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        isChecked
                          ? "bg-[#580B1E] text-amber-200 border border-amber-600 shadow-xs"
                          : "bg-stone-100 text-stone-700 border border-stone-300 hover:bg-stone-200"
                      }`}
                    >
                      {isChecked ? "✓ " : "+ "}
                      {ev.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-stone-800 mb-1">Number of Guests</label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 bg-white"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 Persons</option>
                  <option value="3">3 Persons</option>
                  <option value="4">4+ Persons (Family)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">Dietary Preference</label>
                <select
                  value={formData.dietary}
                  onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 bg-white"
                >
                  <option value="Royal Vegetarian">Royal Pure Vegetarian</option>
                  <option value="Jain Vegetarian">Strict Jain Vegetarian</option>
                  <option value="Multi-Cuisine">Global Multi-Cuisine</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-stone-800 mb-1">Sangeet Song Recommendation (Optional)</label>
              <input
                type="text"
                value={formData.song}
                onChange={(e) => setFormData({ ...formData, song: e.target.value })}
                placeholder="What song will get you on the dance floor?"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-800 mb-1">Your Heartfelt Blessings / Message</label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Leave your loving blessings for Sajal & Aaradhya..."
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-xs"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 py-3 px-6 rounded-xl bg-[#580B1E] text-amber-100 font-royal font-bold text-xs uppercase shadow hover:bg-[#430816] flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit RSVP</span>
              </button>

              <button
                type="button"
                onClick={openWhatsApp}
                className="py-3 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp 1-Click</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
