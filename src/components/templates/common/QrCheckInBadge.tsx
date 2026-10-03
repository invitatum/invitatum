'use client';

import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { QrCode, CheckCircle } from 'lucide-react';
import { GuestItem } from '@/types';

interface QrCheckInBadgeProps {
  guest: GuestItem;
  accentColor?: string;
}

export function QrCheckInBadge({ guest, accentColor = '#8C6E2D' }: QrCheckInBadgeProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    if (guest.qrToken) {
      QRCode.toDataURL(guest.qrToken, {
        width: 200,
        margin: 1,
        color: {
          dark: '#242625',
          light: '#FFFFFF',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch(() => {});
    }
  }, [guest.qrToken]);

  return (
    <div className="max-w-sm mx-auto px-4 py-8 text-center">
      <div className="bg-white rounded-3xl p-6 border-2 border-dashed border-[#C5A059] shadow-sm space-y-4">
        <div className="flex justify-center">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
          >
            <QrCode className="w-5 h-5" />
          </div>
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#5A605B]">
            Tiket Masuk & QR Kehadiran
          </span>
          <h4 className="font-serif text-lg font-bold text-[#242625]">{guest.name}</h4>
          <span className="text-xs text-[#8C6E2D] font-mono">{guest.qrToken}</span>
        </div>

        {/* QR Code Canvas */}
        <div className="flex justify-center p-3 bg-white rounded-2xl border border-[#E8E2D8] w-48 h-48 mx-auto items-center">
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="QR Code Tamu" className="w-full h-full object-contain" />
          ) : (
            <div className="text-xs text-[#5A605B]">Menyiapkan QR...</div>
          )}
        </div>

        {guest.isCheckedIn ? (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#607755]/10 text-[#607755] text-xs font-semibold">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Tamu Sudah Terverifikasi Check-in</span>
          </div>
        ) : (
          <p className="text-[11px] text-[#5A605B] leading-normal">
            Tunjukkan kode QR ini kepada petugas resepsionis saat tiba di lokasi acara.
          </p>
        )}
      </div>
    </div>
  );
}
