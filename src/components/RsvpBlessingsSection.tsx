"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Heart, Check, MessageSquare, Utensils, Music2, Users, Phone, MessageCircle } from "lucide-react";
import confetti from "canvas-confetti";
import { WEDDING_DATA } from "@/lib/weddingData";

interface Blessing {
  id: string;
  name: string;
  message: string;
  relation: string;
  date: string;
}

const INITIAL_BLESSINGS: Blessing[] = [
  {
    id: "1",
    name: "Dr. Vikram & Shweta Singhania",
    relation: "Family",
    message: "Wishing dearest Sajal and sweet Aaradhya an eternity of boundless joy, laughters, and divine togetherness! Counting down the days.",
    date: "2 days ago",
  },
  {
    id: "2",
    name: "Ananya Kapoor & Rohan",
    relation: "Friends",
    message: "So thrilled for you both! Can't wait to rock the dance floor at the Sangeet. Sajal, you found the most magical queen!",
    date: "1 day ago",
  },
  {
    id: "3",
    name: "Dadi & Dadaji (Sharma)",
    relation: "Grandparents",
    message: "सदा सुहागन रहो बिटिया। भगवान गणेश तुम दोनों के जीवन को सदैव प्रेम, आरोग्य और सुख-समृद्धि से परिपूर्ण रखें।",
    date: "Just now",
  },
];

interface RsvpProps {
  initialGuestName?: string;
}

export default function RsvpBlessingsSection({ initialGuestName = "" }: RsvpProps) {
  const { venue } = WEDDING_DATA;
  const [blessings, setBlessings] = useState<Blessing[]>(INITIAL_BLESSINGS);
  const [formData, setFormData] = useState({
    name: initialGuestName,
    email: "",
    phone: "",
    guests: "2",
    dietary: "Royal Vegetarian",
    attendingEvents: ["mehndi", "haldi", "sangeet", "wedding", "reception"],
    songRequest: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"rsvp" | "wishes">("rsvp");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleEventSelection = (eventId: string) => {
    if (formData.attendingEvents.includes(eventId)) {
      setFormData({
        ...formData,
        attendingEvents: formData.attendingEvents.filter((id) => id !== eventId),
      });
    } else {
      setFormData({
        ...formData,
        attendingEvents: [...formData.attendingEvents, eventId],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    if (formData.message.trim()) {
      const newBlessing: Blessing = {
        id: Date.now().toString(),
        name: formData.name,
        relation: "Honored Guest",
        message: formData.message,
        date: "Just now",
      };
      setBlessings([newBlessing, ...blessings]);
    }

    setSubmitted(true);

    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#E8A598", "#FF4081", "#FFD700"],
    });
  };

  const openWhatsAppRsvp = () => {
    const text = encodeURIComponent(
      `Namaste! 🙏\n\nWe are delighted to confirm our RSVP for the royal wedding of *Sajal & Aaradhya* in Udaipur.\n\n👤 *Guest Name:* ${formData.name || "Family"}\n👥 *Total Guests:* ${formData.guests}\n🍽️ *Dietary:* ${formData.dietary}\n🎵 *Sangeet Song:* ${formData.songRequest || "Surprise Us!"}\n💌 *Blessings:* ${formData.message || "Heartiest congratulations to the wonderful couple!"}\n\nLooking forward to celebrating with you! 🎉`
    );
    window.open(`https://wa.me/${venue.whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 text-xs font-semibold uppercase tracking-widest mb-3">
          <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600" />
          <span>Grace Us With Your Presence</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-5xl text-[#580B1E] font-bold">
          RSVP & Guest Blessings
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto mt-2 font-sans">
          Please confirm your attendance so we may arrange the most comfortable royal hospitality for you and your family.
        </p>

        {/* Tab Toggle Buttons */}
        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={() => setActiveTab("rsvp")}
            className={`px-6 py-2.5 rounded-full text-xs font-royal font-bold uppercase tracking-wider transition-all ${
              activeTab === "rsvp"
                ? "bg-[#580B1E] text-amber-200 shadow-lg border border-amber-400/50 scale-105"
                : "bg-white/90 text-stone-700 hover:bg-amber-50 border border-stone-200"
            }`}
          >
            Confirm RSVP
          </button>
          <button
            onClick={() => setActiveTab("wishes")}
            className={`px-6 py-2.5 rounded-full text-xs font-royal font-bold uppercase tracking-wider transition-all ${
              activeTab === "wishes"
                ? "bg-[#580B1E] text-amber-200 shadow-lg border border-amber-400/50 scale-105"
                : "bg-white/90 text-stone-700 hover:bg-amber-50 border border-stone-200"
            }`}
          >
            Blessings Wall ({blessings.length})
          </button>
        </div>
      </div>

      {/* TAB CONTENT 1: RSVP FORM */}
      {activeTab === "rsvp" && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative deckle-edge-card p-6 sm:p-10 rounded-3xl border-2 border-amber-500/40 shadow-2xl max-w-2xl mx-auto"
        >
          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-12 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center border-2 border-emerald-500 shadow-lg">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="font-royal text-2xl font-bold text-[#580B1E]">
                Thank You, {formData.name || "Dear Guest"}!
              </h3>
              <p className="text-sm text-stone-700 max-w-md mx-auto font-editorial italic">
                Your RSVP & blessings have been warmly received. The Singhania & Sharma families look forward to welcoming you in Udaipur!
              </p>
              
              <div className="pt-3 flex justify-center gap-3">
                <button
                  onClick={openWhatsAppRsvp}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 text-white text-xs font-semibold shadow hover:bg-emerald-700"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </button>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-full bg-stone-800 text-amber-200 text-xs font-semibold hover:bg-stone-700"
                >
                  Edit Response
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Rahul & Priya Mehra"
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white/90 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white/90 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
                  />
                </div>
              </div>

              {/* Ceremony Attendance Checkboxes */}
              <div>
                <label className="block font-semibold text-stone-800 mb-2">
                  Functions You Will Attend:
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "mehndi", label: "Mehendi (12 Dec)" },
                    { id: "haldi", label: "Haldi (13 Dec)" },
                    { id: "sangeet", label: "Sangeet (13 Dec)" },
                    { id: "wedding", label: "Wedding Pheras (14 Dec)" },
                    { id: "reception", label: "Reception (14 Dec)" },
                  ].map((evt) => {
                    const isChecked = formData.attendingEvents.includes(evt.id);
                    return (
                      <button
                        type="button"
                        key={evt.id}
                        onClick={() => toggleEventSelection(evt.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          isChecked
                            ? "bg-amber-800 text-amber-100 border border-amber-600"
                            : "bg-stone-100 text-stone-600 border border-stone-300 hover:bg-stone-200"
                        }`}
                      >
                        {isChecked ? "✓ " : "+ "}
                        {evt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-800 mb-1 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-700" />
                    <span>Number of Guests Attending</span>
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white/90 focus:outline-none focus:border-amber-600"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 Persons</option>
                    <option value="3">3 Persons</option>
                    <option value="4">4+ Persons (Family)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1 flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-amber-700" />
                    <span>Dietary Preference</span>
                  </label>
                  <select
                    name="dietary"
                    value={formData.dietary}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white/90 focus:outline-none focus:border-amber-600"
                  >
                    <option value="Royal Vegetarian">Royal Pure Vegetarian</option>
                    <option value="Jain Vegetarian">Strict Jain Vegetarian</option>
                    <option value="Global Multi-Cuisine">Global Multi-Cuisine</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1 flex items-center gap-1.5">
                  <Music2 className="w-3.5 h-3.5 text-indigo-700" />
                  <span>Sangeet Song Recommendation (Optional)</span>
                </label>
                <input
                  type="text"
                  name="songRequest"
                  value={formData.songRequest}
                  onChange={handleInputChange}
                  placeholder="Which song will bring you to the dance floor?"
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white/90 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
                  <span>Your Heartfelt Blessings / Message for the Couple</span>
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Leave your warm wishes and blessings..."
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white/90 focus:outline-none focus:border-amber-600"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-stone-950 font-royal font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:shadow-amber-500/40 hover:scale-[1.01] active:scale-98 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit RSVP Online</span>
                </button>

                <button
                  type="button"
                  onClick={openWhatsAppRsvp}
                  className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm tracking-wider shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp 1-Click</span>
                </button>
              </div>

              {/* Concierge Hotline */}
              <div className="mt-4 pt-3 border-t border-stone-200 text-center text-stone-600 text-xs flex items-center justify-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-700" />
                <span>Need assistance with travel/stay? Call Hospitality Desk: </span>
                <a href={`tel:${venue.conciergeContact}`} className="font-bold text-amber-900 underline">
                  {venue.conciergeContact}
                </a>
              </div>
            </form>
          )}
        </motion.div>
      )}

      {/* TAB CONTENT 2: BLESSINGS WALL */}
      {activeTab === "wishes" && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 max-w-2xl mx-auto"
        >
          {blessings.map((blessing) => (
            <div
              key={blessing.id}
              className="deckle-edge-card p-5 rounded-2xl border border-amber-500/30 shadow-md flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-900 font-bold flex items-center justify-center text-xs">
                    {blessing.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs sm:text-sm">
                      {blessing.name}
                    </h4>
                    <span className="text-[10px] text-amber-800 font-medium">
                      {blessing.relation}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] text-stone-400">{blessing.date}</span>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 italic font-editorial leading-relaxed pl-10">
                “{blessing.message}”
              </p>
            </div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
