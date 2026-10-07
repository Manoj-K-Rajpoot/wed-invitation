"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Plane, Phone, Compass, ExternalLink } from "lucide-react";
import { WEDDING_DATA } from "@/lib/weddingData";

export default function V2VenueTravel() {
  const { venue } = WEDDING_DATA;

  return (
    <section id="venue" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-14 space-y-2">
        <span className="text-[11px] font-bold font-royal uppercase tracking-widest text-amber-900 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-300">
          The Destination
        </span>
        <h2 className="font-editorial text-3xl sm:text-5xl text-[#580B1E] font-bold">
          Venue & Travel Logistics
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
          Welcome to the Venice of the East — an opulent palace celebration by Lake Pichola.
        </p>
        <div className="w-20 h-0.5 bg-amber-400 mx-auto mt-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Venue & Concierge Info Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] border-2 border-amber-300/80 shadow-xl flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-royal uppercase font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                Royal Palace Sanctuary
              </span>
              <h3 className="font-royal text-2xl font-bold text-[#580B1E] mt-2">
                {venue.name}
              </h3>
              <p className="text-xs sm:text-sm text-amber-900 font-semibold font-editorial">
                {venue.city}
              </p>
            </div>

            <p className="text-xs text-stone-700 leading-relaxed">
              {venue.address}
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs flex items-start gap-3">
                <Plane className="w-5 h-5 text-amber-800 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900">Airport & Shuttle Service</strong>
                  <span className="text-stone-600 text-[11px]">{venue.airportInfo}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-800 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900">Hospitality Concierge Desk</strong>
                  <span className="text-stone-600 text-[11px]">{venue.conciergeContact}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row gap-3">
            <a
              href={venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-xl bg-[#580B1E] text-amber-100 text-xs font-royal font-bold uppercase shadow hover:bg-[#450716] flex items-center justify-center gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5 text-amber-300" />
              <span>Get Directions</span>
            </a>
            <a
              href={venue.appleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-white border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 flex items-center justify-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
              <span>Apple Maps</span>
            </a>
          </div>
        </motion.div>

        {/* Right Column: Embedded Map */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7 min-h-[360px] rounded-3xl overflow-hidden border-2 border-amber-300/80 shadow-xl bg-stone-100"
        >
          <iframe
            title="The Oberoi Udaivilas Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3628.163737299064!2d73.67123987622834!3d24.577905178116348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e5623253b30d%3A0x868128527a206a4b!2sThe%20Oberoi%20Udaivilas%2C%20Udaipur!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            className="w-full h-full min-h-[360px] border-0"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}
