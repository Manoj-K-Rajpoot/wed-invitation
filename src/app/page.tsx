"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ThreeGateScene from "@/components/ThreeGateScene";
import RoyalNavbar from "@/components/RoyalNavbar";
import TraditionalCard from "@/components/TraditionalCard";
import ScratchCardCountdown from "@/components/ScratchCardCountdown";
import ThreeAashirwaadDiya from "@/components/ThreeAashirwaadDiya";
import FamilyLineageBlessings from "@/components/FamilyLineageBlessings";
import OurStory from "@/components/OurStory";
import ItinerarySection from "@/components/ItinerarySection";
import SangeetJukebox from "@/components/SangeetJukebox";
import VenueSection from "@/components/VenueSection";
import RsvpBlessingsSection from "@/components/RsvpBlessingsSection";
import RoyalFooter from "@/components/RoyalFooter";
import FloatingAudioPetals from "@/components/FloatingAudioPetals";

function WeddingContent() {
  const [isGateOpen, setIsGateOpen] = useState(false);
  const searchParams = useSearchParams();
  const [guestName, setGuestName] = useState<string>("");

  useEffect(() => {
    const toParam = searchParams.get("to") || searchParams.get("guest") || "";
    if (toParam) {
      setGuestName(toParam.replace(/\+/g, " "));
    }
  }, [searchParams]);

  return (
    <main className="relative min-h-screen bg-[#FAF6EE] text-[#3A0512] overflow-x-hidden bg-mandala-pattern selection:bg-amber-300 selection:text-stone-950">
      {/* 1. THREE.JS 3D ROYAL WEBGL GATEWAY & FLOATING PETALS */}
      <ThreeGateScene isOpen={isGateOpen} onOpen={() => setIsGateOpen(true)} guestName={guestName} />

      {/* 2. ROYAL NAVIGATION BAR */}
      <RoyalNavbar />

      {/* 3. AMBIENT AUDIO & PETALS CONTROLLER */}
      <FloatingAudioPetals />

      {/* HERO BANNER SECTION (Revealed Mandap / Festive Palace View) */}
      <div className="relative pt-24 pb-10 text-center px-4 overflow-hidden">
        {/* Subtle Palace Arch Glow */}
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-amber-600/15 via-rose-950/10 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Sacred Vedic Inscription */}
          <p className="font-hindi text-sm sm:text-base font-bold tracking-widest text-amber-900 mb-2">
            ॥ ॐ श्री गणेशाय नमः ॥
          </p>

          <h1 className="font-script fluid-couple-name text-[#580B1E] font-bold tracking-tight drop-shadow-sm">
            Sajal & Aaradhya
          </h1>

          <div className="flex items-center justify-center gap-3 my-3">
            <div className="w-16 h-px bg-amber-500/60" />
            <span className="font-royal text-xs sm:text-sm font-bold tracking-widest text-amber-900 uppercase">
              14 December 2026 • Udaipur
            </span>
            <div className="w-16 h-px bg-amber-500/60" />
          </div>

          <p className="font-editorial text-base sm:text-xl text-stone-700 italic max-w-xl mx-auto mt-2">
            “Two lives, two hearts, joined together in friendship, united forever in sacred love.”
          </p>
        </div>
      </div>

      {/* 4. TRADITIONAL INVITATION CARD SECTION (Bilingual Hindi Patrika / English Letter) */}
      <div id="invitation">
        <TraditionalCard guestName={guestName} />
      </div>

      {/* 5. SACRED ANCESTRAL LINEAGE & CHOGHADIYA MUHURAT */}
      <FamilyLineageBlessings />

      {/* 6. THREE.JS 3D VIRTUAL DIYA & AKSHAT BLESSING CEREMONY */}
      <ThreeAashirwaadDiya />

      {/* 7. LIVE COUNTDOWN & SCRATCH-TO-REVEAL CARD */}
      <div id="countdown">
        <ScratchCardCountdown />
      </div>

      {/* 8. 'OUR STORY' TIMELINE SECTION */}
      <div id="story">
        <OurStory />
      </div>

      {/* 9. 'THE CELEBRATIONS' ITINERARY CARDS (With Attire Swatches & Lookbook) */}
      <div id="itinerary">
        <ItinerarySection />
      </div>

      {/* 10. SANGEET & MANDAP INSTRUMENTAL JUKEBOX */}
      <SangeetJukebox />

      {/* 11. VENUE & LOCATION SECTION */}
      <div id="venue">
        <VenueSection />
      </div>

      {/* 12. RSVP & BLESSINGS WALL (With WhatsApp 1-Click) */}
      <div id="rsvp">
        <RsvpBlessingsSection initialGuestName={guestName} />
      </div>

      {/* 13. ROYAL FOOTER WITH MONOGRAM */}
      <RoyalFooter />
    </main>
  );
}

export default function WeddingInvitationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#120206] flex items-center justify-center text-amber-300 font-royal">Loading Royal Patrika...</div>}>
      <WeddingContent />
    </Suspense>
  );
}
