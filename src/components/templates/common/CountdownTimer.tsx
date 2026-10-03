'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface CountdownTimerProps {
  targetDate: string;
  accentColor?: string;
}

export function CountdownTimer({ targetDate, accentColor = '#8C6E2D' }: CountdownTimerProps) {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 my-8">
      <div className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white border border-[#E8E2D8] shadow-xs min-w-[70px] sm:min-w-[85px]">
        <span className="font-serif text-2xl sm:text-3xl font-bold" style={{ color: accentColor }}>
          {String(timeLeft.days).padStart(2, '0')}
        </span>
        <span className="text-[11px] sm:text-xs text-[#5A605B] uppercase tracking-wider font-medium">
          {t.invitationView.days}
        </span>
      </div>

      <span className="text-xl font-bold text-[#C5A059]">:</span>

      <div className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white border border-[#E8E2D8] shadow-xs min-w-[70px] sm:min-w-[85px]">
        <span className="font-serif text-2xl sm:text-3xl font-bold" style={{ color: accentColor }}>
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        <span className="text-[11px] sm:text-xs text-[#5A605B] uppercase tracking-wider font-medium">
          {t.invitationView.hours}
        </span>
      </div>

      <span className="text-xl font-bold text-[#C5A059]">:</span>

      <div className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white border border-[#E8E2D8] shadow-xs min-w-[70px] sm:min-w-[85px]">
        <span className="font-serif text-2xl sm:text-3xl font-bold" style={{ color: accentColor }}>
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span className="text-[11px] sm:text-xs text-[#5A605B] uppercase tracking-wider font-medium">
          {t.invitationView.minutes}
        </span>
      </div>

      <span className="text-xl font-bold text-[#C5A059]">:</span>

      <div className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white border border-[#E8E2D8] shadow-xs min-w-[70px] sm:min-w-[85px]">
        <span className="font-serif text-2xl sm:text-3xl font-bold" style={{ color: accentColor }}>
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
        <span className="text-[11px] sm:text-xs text-[#5A605B] uppercase tracking-wider font-medium">
          {t.invitationView.seconds}
        </span>
      </div>
    </div>
  );
}
