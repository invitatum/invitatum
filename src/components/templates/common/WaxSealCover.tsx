'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen, Calendar, MapPin, Sparkles } from 'lucide-react';
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
  accentColor = '#607755',
  themeStyle = 'sage',
}: WaxSealCoverProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isSealCracked, setIsSealCracked] = useState(false);

  const firstEvent = invitation.events[0];
  const isEngagement = invitation.category === 'engagement';

  // Monogram initials
  const groomInitial = invitation.couple.groomNickname ? invitation.couple.groomNickname[0].toUpperCase() : 'W';
  const brideInitial = invitation.couple.brideNickname ? invitation.couple.brideNickname[0].toUpperCase() : 'E';

  // Palette settings per theme
  const getThemeConfig = () => {
    switch (themeStyle) {
      case 'rose':
        return {
          envelopeBg: '#FAF4F4',
          envelopeBorder: '#E8D5D5',
          waxPrimary: '#8C3B4A',
          waxSecondary: '#6E2835',
          waxGold: '#D4AF37',
          accentText: '#8C3B4A',
          ribbonColor: '#E2B8B8',
          tagBg: '#FFFFFF',
        };
      case 'champagne':
        return {
          envelopeBg: '#FAF7F0',
          envelopeBorder: '#E5DCB8',
          waxPrimary: '#9E7B34',
          waxSecondary: '#7A5E24',
          waxGold: '#F3E5AB',
          accentText: '#8C6E2D',
          ribbonColor: '#D8C38E',
          tagBg: '#FFFFFF',
        };
      case 'nusantara':
        return {
          envelopeBg: '#F5EEDB',
          envelopeBorder: '#D8C38E',
          waxPrimary: '#8C6E2D',
          waxSecondary: '#684F1B',
          waxGold: '#F8D168',
          accentText: '#8C6E2D',
          ribbonColor: '#CBB279',
          tagBg: '#FFFDF9',
        };
      default:
        // Sage
        return {
          envelopeBg: '#F5F7F4',
          envelopeBorder: '#D2DDD4',
          waxPrimary: '#465B4D',
          waxSecondary: '#324237',
          waxGold: '#C5A059',
          accentText: '#465B4D',
          ribbonColor: '#B6CBB9',
          tagBg: '#FFFFFF',
        };
    }
  };

  const theme = getThemeConfig();

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsSealCracked(true);
    setIsOpening(true);

    // Give time for envelope flap 3D unfold and card slide up
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpenClick();
    }
  };

  return (
    <AnimatePresence>
      {!isOpening && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#FAF7F2] select-none overflow-hidden"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 45%, rgba(255,255,255,0.9) 0%, rgba(250,247,242,0.97) 100%)`,
          }}
        >
          {/* Subtle Ambient Decorative Vignette Frame */}
          <div className="absolute inset-4 sm:inset-8 border border-[#E8E2D8] pointer-events-none rounded-3xl flex flex-col justify-between p-6">
            <div className="flex justify-between items-center text-[11px] tracking-widest text-[#57534E] uppercase">
              <span className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3 h-3 text-[#C5A059]" />
                {isEngagement ? 'The Engagement' : 'The Wedding'}
              </span>
              <span>{firstEvent?.date || 'Undangan Resmi'}</span>
            </div>
            <div className="flex justify-between text-[11px] tracking-widest text-[#57534E] uppercase">
              <span>Invitatum Digital</span>
              <span>Private Invitation</span>
            </div>
          </div>

          {/* 3D Envelope Perspective Stage */}
          <div className="relative z-10 w-full max-w-[420px]" style={{ perspective: 1200 }}>
            {/* The Physical Envelope Body */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl shadow-2xl border overflow-hidden p-6 sm:p-8 text-center"
              style={{
                backgroundColor: theme.envelopeBg,
                borderColor: theme.envelopeBorder,
                boxShadow: '0 25px 50px -12px rgba(44, 38, 30, 0.18)',
              }}
            >
              {/* Decorative Envelope Flap (3D Flip Top) */}
              <motion.div
                initial={false}
                animate={
                  isOpening
                    ? { rotateX: -160, opacity: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
                    : { rotateX: 0, opacity: 1 }
                }
                style={{
                  transformOrigin: 'top center',
                  transformStyle: 'preserve-3d',
                }}
                className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-20 flex justify-center"
              >
                {/* SVG Triangular Envelope Flap */}
                <svg
                  className="w-full h-full drop-shadow-md"
                  viewBox="0 0 420 120"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 0 L420 0 L210 115 Z"
                    fill={theme.envelopeBg}
                    stroke={theme.envelopeBorder}
                    strokeWidth="1.5"
                  />
                  {/* Subtle Gold Thread on Flap Edge */}
                  <path
                    d="M10 2 L210 110 L410 2"
                    stroke="#C5A059"
                    strokeWidth="1"
                    strokeDasharray="4 3"
                    opacity="0.6"
                  />
                </svg>
              </motion.div>

              {/* The Inner Card Content (Slides Up On Open) */}
              <motion.div
                animate={
                  isOpening
                    ? { y: -80, opacity: 0.4, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
                    : { y: 0, opacity: 1 }
                }
                className="relative z-10 space-y-6 pt-10 pb-4"
              >
                {/* Monogram Seal Display */}
                <div className="flex justify-center">
                  <div
                    className="w-16 h-16 rounded-full border-2 flex items-center justify-center shadow-xs bg-white/90"
                    style={{ borderColor: theme.waxGold }}
                  >
                    <span className="font-serif text-xl font-bold tracking-wider" style={{ color: theme.accentText }}>
                      {groomInitial} & {brideInitial}
                    </span>
                  </div>
                </div>

                {/* Subtitle & Invitation Type */}
                <div className="space-y-1">
                  <p className="text-[11px] tracking-[0.25em] uppercase text-[#78716C] font-medium">
                    {isEngagement ? 'Undangan Pertunangan' : 'Undangan Pernikahan'}
                  </p>
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] leading-tight">
                    {invitation.couple.groomNickname}
                    <span className="block text-2xl font-normal my-0.5 text-[#C5A059]">&</span>
                    {invitation.couple.brideNickname}
                  </h1>
                </div>

                {/* Personalized Cotton Paper Guest Nameplate */}
                <div
                  className="rounded-2xl p-4 border shadow-xs space-y-1.5 mx-auto max-w-[340px]"
                  style={{
                    backgroundColor: theme.tagBg,
                    borderColor: theme.envelopeBorder,
                  }}
                >
                  <p className="text-[11px] uppercase tracking-wider text-[#78716C]">
                    {guest?.customGreeting || 'Kepada Yth. Bapak/Ibu/Saudara/i:'}
                  </p>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] px-2 py-0.5 rounded-lg">
                    {guest?.name || 'Tamu Undangan Istimewa'}
                  </h2>
                  <p className="text-[11px] text-[#78716C]">
                    {guest ? 'di Tempat' : 'di Tempat / Bersama Pendamping'}
                  </p>
                </div>

                {/* Event Date & Location Preview */}
                {firstEvent && (
                  <div className="flex flex-col items-center gap-1.5 text-xs text-[#57534E]">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span className="font-medium">{firstEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span className="truncate max-w-[260px]">{firstEvent.venueName}</span>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* The Handcrafted 3D Wax Seal (Interactive Button) */}
              <div className="relative z-30 pt-2 flex flex-col items-center gap-3">
                <motion.button
                  onClick={handleOpenClick}
                  onKeyDown={handleKeyDown}
                  tabIndex={0}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  animate={
                    isSealCracked
                      ? { scale: [1, 1.25, 0], rotate: [0, 8, -12], opacity: [1, 0.8, 0] }
                      : { scale: [1, 1.03, 1] }
                  }
                  transition={
                    isSealCracked
                      ? { duration: 0.5, ease: 'easeOut' }
                      : { repeat: Infinity, duration: 3, ease: 'easeInOut' }
                  }
                  className="relative group w-20 h-20 rounded-full flex items-center justify-center cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#C5A059]/40 tap-target-44"
                  style={{
                    backgroundColor: theme.waxPrimary,
                    boxShadow: `
                      0 8px 24px rgba(0, 0, 0, 0.28),
                      inset 0 3px 6px rgba(255, 255, 255, 0.3),
                      inset 0 -4px 8px rgba(0, 0, 0, 0.4)
                    `,
                  }}
                  aria-label="Buka Undangan Resmi"
                >
                  {/* Organic Deckled Wax Outer Rim */}
                  <div
                    className="absolute inset-1 rounded-full border border-white/20 opacity-80 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.25) 0%, transparent 60%)`,
                    }}
                  />

                  {/* Wax Inner Seal Monogram */}
                  <div
                    className="w-14 h-14 rounded-full border border-[#D4AF37]/50 flex flex-col items-center justify-center shadow-inner"
                    style={{ backgroundColor: theme.waxSecondary }}
                  >
                    <span className="font-serif text-lg font-bold text-[#F3E5AB] tracking-widest drop-shadow-xs">
                      {groomInitial}♥{brideInitial}
                    </span>
                  </div>

                  {/* Pulsing Light Ring around Seal */}
                  <div className="absolute inset-0 rounded-full border-2 border-[#C5A059]/30 animate-ping pointer-events-none" />
                </motion.button>

                {/* Clear UX Action Button & Instructions */}
                <div className="space-y-1.5">
                  <button
                    onClick={handleOpenClick}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-white font-medium text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 tap-target-44"
                    style={{ backgroundColor: theme.waxPrimary }}
                  >
                    <MailOpen className="w-3.5 h-3.5" />
                    <span>Buka Undangan</span>
                  </button>
                  <p className="text-[11px] text-[#78716C]">
                    Sentuh segel lilin atau tombol untuk membuka dan memutar musik
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
