'use client';

import React, { useState } from 'react';
import { Heart, MailOpen, Calendar, MapPin } from 'lucide-react';
import { InvitationData, GuestItem } from '@/types';

interface WaxSealCoverProps {
  invitation: InvitationData;
  guest?: GuestItem;
  onOpen: () => void;
  accentColor?: string;
  themeStyle?: 'sage' | 'rose' | 'champagne' | 'nusantara' | 'garden';
}

export function WaxSealCover({
  invitation,
  guest,
  onOpen,
  accentColor = '#C5A059',
  themeStyle = 'sage',
}: WaxSealCoverProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 700);
  };

  const firstEvent = invitation.events[0];

  // Dynamic styling based on theme
  const getThemeBadge = () => {
    switch (themeStyle) {
      case 'rose':
        return 'border-[#D99B9B] text-[#8C3B4A] bg-[#FAF7F2]';
      case 'champagne':
        return 'border-[#C5A059] text-[#8C6E2D] bg-[#242625] text-white';
      case 'nusantara':
        return 'border-[#8C6E2D] text-[#8C6E2D] bg-[#F5EEDB]';
      case 'garden':
        return 'border-[#607755] text-[#384732] bg-[#FAF7F2]';
      default:
        return 'border-[#607755] text-[#384732] bg-[#FAF7F2]';
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#FAF7F2] transition-all duration-700 ${
        isOpening ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, rgba(250,247,242,0.95) 100%)`,
      }}
    >
      {/* Decorative Floral Background Border */}
      <div className="absolute inset-4 sm:inset-8 border border-[#E8E2D8] pointer-events-none rounded-2xl flex flex-col justify-between p-6">
        <div className="flex justify-between text-xs tracking-widest text-[#5A605B] uppercase">
          <span>{invitation.category === 'wedding' ? 'The Wedding Celebration' : 'The Engagement'}</span>
          <span>{firstEvent?.date}</span>
        </div>
        <div className="flex justify-between text-xs tracking-widest text-[#5A605B]">
          <span>Invitatum Digital</span>
          <span>Official Invitation</span>
        </div>
      </div>

      {/* Main Cover Card */}
      <div className="relative z-10 max-w-md w-full mx-4 px-8 py-12 bg-white/95 rounded-3xl shadow-xl border border-[#E8E2D8] text-center space-y-6">
        {/* Monogram / Header Crest */}
        <div className="flex justify-center">
          <div
            className="w-16 h-16 rounded-full border-2 flex items-center justify-center shadow-xs"
            style={{ borderColor: accentColor }}
          >
            <span className="font-serif text-xl font-bold" style={{ color: accentColor }}>
              {invitation.couple.groomNickname[0]} & {invitation.couple.brideNickname[0]}
            </span>
          </div>
        </div>

        {/* Salutation / Personalized Guest Name */}
        <div className="space-y-1.5 pt-2">
          <p className="text-xs uppercase tracking-widest text-[#5A605B]">
            {guest?.customGreeting || 'Kepada Yth. Bapak/Ibu/Saudara/i:'}
          </p>
          <h3 className="font-serif text-2xl font-bold text-[#242625] px-2 py-1 bg-[#FAF7F2] rounded-xl border border-[#E8E2D8]">
            {guest?.name || 'Tamu Undangan Istimewa'}
          </h3>
          {guest && (
            <p className="text-xs text-[#5A605B]">di Tempat / Bersama Pasangan</p>
          )}
        </div>

        {/* Couple Names */}
        <div className="space-y-2 pt-2">
          <p className="text-xs tracking-wider uppercase text-[#8C6E2D]">
            {invitation.category === 'wedding' ? 'Undangan Pernikahan' : 'Undangan Pertunangan'}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#242625] leading-tight">
            {invitation.couple.groomNickname} <br />
            <span className="text-2xl font-normal text-[#C5A059]">&</span> <br />
            {invitation.couple.brideNickname}
          </h1>
        </div>

        {/* Date & Location Preview */}
        {firstEvent && (
          <div className="pt-2 flex flex-col items-center gap-1 text-xs text-[#5A605B]">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#8C6E2D]" />
              <span>{firstEvent.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#8C6E2D]" />
              <span className="truncate max-w-[260px]">{firstEvent.venueName}</span>
            </div>
          </div>
        )}

        {/* Wax Seal Open Button */}
        <div className="pt-4 flex flex-col items-center gap-3">
          <button
            onClick={handleOpenClick}
            className="group relative flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-medium text-sm transition-all shadow-md hover:shadow-lg tap-target-44 animate-seal-pulse"
            style={{ backgroundColor: accentColor }}
            aria-label="Buka Undangan Resmi"
          >
            <MailOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Buka Undangan</span>
          </button>
          <p className="text-[11px] text-[#5A605B]">
            Sentuh tombol untuk membuka dan memutar musik latar
          </p>
        </div>
      </div>
    </div>
  );
}
