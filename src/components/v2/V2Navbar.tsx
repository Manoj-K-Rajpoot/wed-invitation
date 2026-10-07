"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Menu, X, Heart, Calendar, Clock, MapPin, HelpCircle } from "lucide-react";
import { WEDDING_DATA } from "@/lib/weddingData";

export default function V2Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Invitation", href: "#invitation" },
    { label: "Events", href: "#events" },
    { label: "Our Story", href: "#story" },
    { label: "Gallery", href: "#gallery" },
    { label: "Venue & Stay", href: "#venue" },
    { label: "Guest FAQs", href: "#faqs" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FFFDF9]/95 backdrop-blur-md shadow-sm border-b border-amber-200/60 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Monogram Brand */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 p-0.5 shadow-sm border border-amber-400">
            <div className="w-full h-full rounded-full bg-[#FFFDF9] flex items-center justify-center">
              <span className="font-decor text-[#580B1E] font-bold text-xs">S&A</span>
            </div>
          </div>
          <span className="font-royal text-sm font-bold tracking-wider text-[#580B1E]">
            {WEDDING_DATA.couple.groom.name} & {WEDDING_DATA.couple.bride.name}
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs font-royal font-semibold text-stone-700 hover:text-[#580B1E] px-3 py-1.5 rounded-full hover:bg-amber-50 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#rsvp"
            className="ml-2 px-5 py-2 rounded-full bg-[#580B1E] text-amber-100 font-royal font-bold text-xs uppercase tracking-wider shadow-sm hover:bg-[#450716] hover:scale-105 transition-all"
          >
            RSVP
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-9 h-9 rounded-full bg-white border border-amber-300 flex items-center justify-center text-[#580B1E]"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFDF9] border-b border-amber-200 px-6 py-4 space-y-2 shadow-lg">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-royal font-semibold text-stone-800 hover:text-[#580B1E] border-b border-stone-100"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#rsvp"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center mt-3 py-2.5 rounded-xl bg-[#580B1E] text-amber-100 font-royal font-bold text-xs uppercase"
          >
            RSVP Now
          </a>
        </div>
      )}
    </header>
  );
}
