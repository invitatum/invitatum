'use client';

import React, { useState } from 'react';
import { CheckCircle2, UserCheck, AlertCircle } from 'lucide-react';
import { db } from '@/lib/db/dbAdapter';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { GuestItem } from '@/types';

interface RsvpSectionProps {
  invitationId: string;
  guest?: GuestItem;
  accentColor?: string;
}

export function RsvpSection({
  invitationId,
  guest,
  accentColor = '#8C6E2D',
}: RsvpSectionProps) {
  const { t } = useLanguage();
  const [name, setName] = useState(guest?.name || '');
  const [status, setStatus] = useState<'attending' | 'declined'>('attending');
  const [attendeesCount, setAttendeesCount] = useState(1);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setTimeout(() => {
      db.saveRsvp({
        id: `rsvp-${Date.now()}`,
        invitationId,
        guestId: guest?.id,
        guestName: name.trim(),
        status,
        attendeesCount: status === 'attending' ? attendeesCount : 0,
        notes: notes.trim(),
        createdAt: new Date().toISOString(),
      });
      setLoading(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E2D8] shadow-sm text-center">
        <div className="flex justify-center mb-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
          >
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#242625]">
          {t.invitationView.rsvpTitle}
        </h3>
        <p className="text-sm text-[#5A605B] mt-2 mb-8 leading-relaxed">
          {t.invitationView.rsvpSubtitle}
        </p>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-[#607755]/10 border border-[#607755]/30 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-[#607755] mx-auto" />
            <h4 className="font-serif text-lg font-bold text-[#242625]">
              Terima Kasih Atas Konfirmasinya
            </h4>
            <p className="text-xs text-[#5A605B]">
              Respon kehadiran Anda telah berhasil tercatat. Doa restu Anda sangat berarti bagi kami.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            <div>
              <label className="block text-xs font-semibold text-[#5A605B] uppercase tracking-wider mb-1.5">
                {t.invitationView.rsvpName}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E8E2D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#8C6E2D]/40 bg-[#FAF7F2]/50 text-[#242625]"
                placeholder="Masukkan nama lengkap Anda"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5A605B] uppercase tracking-wider mb-2">
                Konfirmasi Kehadiran
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setStatus('attending')}
                  className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-medium border text-center transition-all tap-target-44 ${
                    status === 'attending'
                      ? 'border-[#607755] bg-[#607755]/10 text-[#384732] font-semibold'
                      : 'border-[#E8E2D8] text-[#5A605B] hover:bg-[#FAF7F2]'
                  }`}
                >
                  {t.invitationView.rsvpAttending}
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('declined')}
                  className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-medium border text-center transition-all tap-target-44 ${
                    status === 'declined'
                      ? 'border-[#8C3B4A] bg-[#8C3B4A]/10 text-[#8C3B4A] font-semibold'
                      : 'border-[#E8E2D8] text-[#5A605B] hover:bg-[#FAF7F2]'
                  }`}
                >
                  {t.invitationView.rsvpDeclined}
                </button>
              </div>
            </div>

            {status === 'attending' && (
              <div>
                <label className="block text-xs font-semibold text-[#5A605B] uppercase tracking-wider mb-1.5">
                  {t.invitationView.rsvpGuestCount}
                </label>
                <select
                  value={attendeesCount}
                  onChange={(e) => setAttendeesCount(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E2D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#8C6E2D]/40 bg-[#FAF7F2]/50 text-[#242625]"
                >
                  <option value={1}>1 Orang</option>
                  <option value={2}>2 Orang (Bersama Pasangan / Pendamping)</option>
                  <option value={3}>3 Orang (Keluarga)</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#5A605B] uppercase tracking-wider mb-1.5">
                {t.invitationView.rsvpNotes}
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E8E2D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#8C6E2D]/40 bg-[#FAF7F2]/50 text-[#242625]"
                placeholder="Tuliskan ucapan atau catatan untuk mempelai..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full text-white font-medium text-sm transition-all shadow-sm hover:shadow-md tap-target-44 disabled:opacity-50"
              style={{ backgroundColor: accentColor }}
            >
              {loading ? 'Mengirim...' : t.invitationView.rsvpSubmit}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
