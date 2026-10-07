"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import V2Navbar from "@/components/v2/V2Navbar";
import V2Hero from "@/components/v2/V2Hero";
import V2InvitationLetter from "@/components/v2/V2InvitationLetter";
import V2EventsGrid from "@/components/v2/V2EventsGrid";
import V2StoryTimeline from "@/components/v2/V2StoryTimeline";
import V2PhotoGallery from "@/components/v2/V2PhotoGallery";
import V2VenueTravel from "@/components/v2/V2VenueTravel";
import V2FaqAccordion from "@/components/v2/V2FaqAccordion";
import V2RsvpSection from "@/components/v2/V2RsvpSection";
import V2Footer from "@/components/v2/V2Footer";
import FloatingAudioPetals from "@/components/FloatingAudioPetals";

function Version2Content() {
  const searchParams = useSearchParams();
  const guestParam = searchParams.get("to") || searchParams.get("guest") || "";
  const guestName = guestParam ? guestParam.replace(/\+/g, " ") : undefined;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#3A0512] font-sans selection:bg-amber-200 selection:text-stone-950 overflow-x-hidden">
      {/* 1. STICKY MODULAR NAVBAR */}
      <V2Navbar />

      {/* 2. FLOATING BACKGROUND AUDIO & PETAL CONTROLS */}
      <FloatingAudioPetals />

      {/* 3. HERO & COUNTDOWN BLOCK */}
      <V2Hero guestName={guestName} />

      {/* 4. SACRED INVITATION LETTER & PATRIKA BLOCK */}
      <V2InvitationLetter />

      {/* 5. MULTI-EVENT CELEBRATIONS GRID (ELEMENTOR 3-COLUMN LAYOUT) */}
      <V2EventsGrid />

      {/* 6. OUR LOVE STORY TIMELINE BLOCK */}
      <V2StoryTimeline />

      {/* 7. PRE-WEDDING PHOTO MOMENTS GALLERY BLOCK */}
      <V2PhotoGallery />

      {/* 8. VENUE & TRAVEL CONCIERGE BLOCK */}
      <V2VenueTravel />

      {/* 9. GUEST INFORMATION FAQ ACCORDION BLOCK */}
      <V2FaqAccordion />

      {/* 10. RSVP & WHATSAPP CONFIRMATION BLOCK */}
      <V2RsvpSection initialGuestName={guestName} />

      {/* 11. FOOTER & ROYAL MONOGRAM BLOCK */}
      <V2Footer />
    </div>
  );
}

export default function Version2Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center text-[#580B1E] font-royal">Loading Royal Wedding Experience...</div>}>
      <Version2Content />
    </Suspense>
  );
}
