"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Menu, X, Calendar, MapPin, Heart, BookOpen, Clock } from "lucide-react";
import { WEDDING_DATA } from "@/lib/weddingData";

export default function RoyalNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Invitation", href: "#invitation", icon: Sparkles },
    { label: "Save Date", href: "#countdown", icon: Clock },
    { label: "Our Story", href: "#story", icon: BookOpen },
    { label: "Celebrations", href: "#itinerary", icon: Calendar },
    { label: "Venue", href: "#venue", icon: MapPin },
    { label: "RSVP", href: "#rsvp", icon: Heart },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-[#24030B]/90 backdrop-blur-md border-b border-amber-500/30 py-3 shadow-lg"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Monogram Brand Logo */}
        <a
          href="#invitation"
          className="flex items-center gap-2 text-amber-200 group"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 p-0.5 shadow-md">
            <div className="w-full h-full rounded-full bg-[#3A0512] flex items-center justify-center">
              <span className="font-decor text-amber-300 font-bold text-sm">
                S&A
              </span>
            </div>
          </div>
          <span className="font-royal text-sm sm:text-base font-bold tracking-wider text-amber-100 group-hover:text-amber-300 transition-colors">
            {WEDDING_DATA.couple.hashtag}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 rounded-full text-xs font-royal font-semibold tracking-wider text-amber-100/90 hover:text-white hover:bg-amber-500/20 transition-all"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#rsvp"
            className="ml-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-stone-950 font-royal font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            RSVP Now
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-9 h-9 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-200"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#24030B]/95 border-b border-amber-500/30 px-6 py-4 space-y-2 backdrop-blur-lg">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-2 text-sm font-royal text-amber-200 hover:text-white border-b border-amber-500/10"
              >
                <Icon className="w-4 h-4 text-amber-400" />
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
