"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Plane, Phone, Compass, ExternalLink } from "lucide-react";
import { WEDDING_DATA } from "@/lib/weddingData";

export default function VenueSection() {
  const { venue } = WEDDING_DATA;

  return (
    <section className="relative py-16 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 text-xs font-semibold uppercase tracking-widest mb-3">
          <Compass className="w-3.5 h-3.5 text-amber-700" />
          <span>The Royal Destination</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-5xl text-[#580B1E] font-bold">
          Venue & Location
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto mt-2 font-sans">
          A timeless palatial sanctuary on the banks of historic Lake Pichola, setting the stage for an unforgettable celebration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Venue Details Card */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#FFFDF9] via-[#FAF3E6] to-[#F5E8D0] border-2 border-amber-500/40 shadow-xl"
        >
          <div>
            {/* Title & Badge */}
            <div className="flex items-center gap-2 text-amber-700 text-xs font-bold uppercase tracking-widest mb-2">
              <MapPin className="w-4 h-4 text-red-600" />
              <span>Palace of Dreams</span>
            </div>

            <h3 className="font-royal text-2xl sm:text-3xl font-bold text-[#580B1E]">
              {venue.name}
            </h3>
            <p className="text-sm font-editorial text-amber-900 font-semibold mt-1">
              {venue.city}
            </p>

            <p className="text-xs sm:text-sm text-stone-700 mt-4 leading-relaxed font-sans">
              {venue.address}
            </p>

            {/* Travel Assistance Notes */}
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                <Plane className="w-5 h-5 text-amber-800 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-stone-900">Airport & Transfers</p>
                  <p className="text-stone-600 mt-0.5">{venue.airportInfo}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                <Phone className="w-5 h-5 text-amber-800 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-stone-900">Hospitality Concierge</p>
                  <p className="text-stone-600 mt-0.5">{venue.conciergeContact}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 pt-6 border-t border-amber-200 flex flex-col sm:flex-row gap-3">
            <a
              href={venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-stone-950 font-royal font-bold text-xs sm:text-sm tracking-wider uppercase shadow-lg hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-98 transition-all"
            >
              <Navigation className="w-4 h-4 fill-stone-950" />
              <span>Get Directions</span>
            </a>

            <a
              href={venue.appleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-white border border-stone-300 text-stone-800 hover:bg-amber-50 text-xs sm:text-sm font-semibold tracking-wider transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-stone-600" />
              <span>Apple Maps</span>
            </a>
          </div>
        </motion.div>

        {/* Right Column: Interactive Map Embed with Luxury Overlay */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 relative min-h-[350px] sm:min-h-[420px] rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-2xl bg-stone-900"
        >
          {/* Embedded Google Map iframe */}
          <iframe
            title="The Oberoi Udaivilas Wedding Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3628.163737299064!2d73.67123987622834!3d24.577905178116348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e5623253b30d%3A0x868128527a206a4b!2sThe%20Oberoi%20Udaivilas%2C%20Udaipur!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            className="w-full h-full min-h-[380px] border-0 filter saturate-110 contrast-105"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Floating Venue Tag on Map */}
          <div className="absolute top-4 left-4 p-3 rounded-2xl bg-stone-950/85 backdrop-blur-md border border-amber-400/40 text-amber-200 text-xs shadow-xl pointer-events-none flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
            <div>
              <p className="font-bold font-royal text-white">The Oberoi Udaivilas</p>
              <p className="text-[10px] text-amber-300/80">Lake Pichola, Udaipur</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
