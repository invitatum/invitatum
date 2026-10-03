'use client';

import React, { useState, useEffect } from 'react';
import {
  QrCode,
  CheckCircle2,
  AlertTriangle,
  Search,
  UserCheck,
  RotateCcw,
} from 'lucide-react';
import { InvitationData, GuestItem } from '@/types';
import { db } from '@/lib/db/dbAdapter';

interface QrCheckInDeskProps {
  invitation: InvitationData;
}

export function QrCheckInDesk({ invitation }: QrCheckInDeskProps) {
  const [qrInput, setQrInput] = useState('');
  const [operatorName, setOperatorName] = useState('Meja Resepsionis Utama');
  const [guests, setGuests] = useState<GuestItem[]>([]);
  const [lastCheckInResult, setLastCheckInResult] = useState<{
    success: boolean;
    message: string;
    guest?: GuestItem;
    alreadyCheckedIn?: boolean;
  } | null>(null);

  useEffect(() => {
    setGuests(db.getGuests(invitation.id));
  }, [invitation.id]);

  const handleManualCheckIn = (qrTokenToVerify: string) => {
    if (!qrTokenToVerify.trim()) return;

    const res = db.checkInGuest(invitation.id, qrTokenToVerify.trim(), operatorName);
    setLastCheckInResult(res);
    setQrInput('');
    // Refresh guests
    setGuests(db.getGuests(invitation.id));
  };

  const checkedInCount = guests.filter((g) => g.isCheckedIn).length;
  const totalGuests = guests.length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#242625]">
          Meja Resepsionis & Verifikasi QR Tamu
        </h2>
        <p className="text-xs text-[#5A605B]">
          Pindai kode QR tiket tamu atau cari nama secara manual untuk mencatat kehadiran.
        </p>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] text-center shadow-xs">
          <span className="text-xs font-semibold text-[#5A605B] uppercase tracking-wider">
            Total Tamu Terdaftar
          </span>
          <h3 className="font-serif text-3xl font-bold text-[#242625] mt-1">{totalGuests}</h3>
        </div>
        <div className="p-6 rounded-3xl bg-[#607755]/10 border border-[#607755]/30 text-center shadow-xs">
          <span className="text-xs font-semibold text-[#384732] uppercase tracking-wider">
            Sudah Check-In
          </span>
          <h3 className="font-serif text-3xl font-bold text-[#384732] mt-1">{checkedInCount}</h3>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] text-center shadow-xs">
          <span className="text-xs font-semibold text-[#5A605B] uppercase tracking-wider">
            Belum Hadir
          </span>
          <h3 className="font-serif text-3xl font-bold text-[#8C6E2D] mt-1">
            {totalGuests - checkedInCount}
          </h3>
        </div>
      </div>

      {/* QR Input & Verification Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E2D8] shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FAF7F2] border border-[#C5A059] flex items-center justify-center text-[#8C6E2D]">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif text-lg font-bold text-[#242625]">Input Token / Pindai QR</h4>
            <p className="text-xs text-[#5A605B]">
              Arahkan scanner ke kode QR tamu atau ketik kode QR (misal: QR-ALYA-BUDI-001)
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleManualCheckIn(qrInput);
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="text"
            placeholder="Masukkan Kode QR Tamu..."
            value={qrInput}
            onChange={(e) => setQrInput(e.target.value)}
            className="flex-1 px-4 py-3 rounded-2xl border border-[#E8E2D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#8C6E2D]/40 font-mono"
            autoFocus
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-[#8C6E2D] text-white text-xs font-semibold hover:bg-[#735A24] transition-colors shadow-xs tap-target-44"
          >
            Verifikasi Check-In
          </button>
        </form>

        {/* Verification Alert Banner */}
        {lastCheckInResult && (
          <div
            className={`p-4 rounded-2xl border flex items-start gap-3 ${
              lastCheckInResult.success
                ? 'bg-[#607755]/10 border-[#607755]/40 text-[#242625]'
                : lastCheckInResult.alreadyCheckedIn
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : 'bg-red-50 border-red-300 text-red-900'
            }`}
          >
            {lastCheckInResult.success ? (
              <CheckCircle2 className="w-6 h-6 text-[#607755] shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div>
              <h5 className="font-serif text-sm font-bold">
                {lastCheckInResult.success
                  ? 'CHECK-IN BERHASIL'
                  : lastCheckInResult.alreadyCheckedIn
                  ? 'PERINGATAN: KODE SUDAH DIGUNAKAN'
                  : 'GAGAL VERIFIKASI'}
              </h5>
              <p className="text-xs mt-0.5">{lastCheckInResult.message}</p>
            </div>
          </div>
        )}
      </div>

      {/* Guest List for Quick Fallback Check-in */}
      <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-xs p-6 space-y-4">
        <h4 className="font-serif text-lg font-bold text-[#242625]">
          Pencarian Cepat Nama Tamu
        </h4>
        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {guests.map((g) => (
            <div
              key={g.id}
              className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] flex items-center justify-between gap-4"
            >
              <div>
                <p className="font-bold text-xs text-[#242625]">{g.name}</p>
                <p className="text-[10px] text-[#5A605B]">
                  {g.group} • {g.qrToken}
                </p>
              </div>

              {g.isCheckedIn ? (
                <span className="px-3 py-1 rounded-full bg-[#607755]/20 text-[#384732] text-[10px] font-semibold">
                  ✓ Sudah Check-In
                </span>
              ) : (
                <button
                  onClick={() => handleManualCheckIn(g.qrToken)}
                  className="px-3 py-1.5 rounded-full bg-[#8C6E2D] text-white text-[10px] font-semibold hover:bg-[#735A24] tap-target-44"
                >
                  Tandai Hadir
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
