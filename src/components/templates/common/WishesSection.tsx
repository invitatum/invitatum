'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquareHeart, Send, User } from 'lucide-react';
import { db } from '@/lib/db/dbAdapter';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { WishItem, GuestItem } from '@/types';

interface WishesSectionProps {
  invitationId: string;
  guest?: GuestItem;
  accentColor?: string;
}

export function WishesSection({
  invitationId,
  guest,
  accentColor = '#8C6E2D',
}: WishesSectionProps) {
  const { t } = useLanguage();
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [name, setName] = useState(guest?.name || '');
  const [relationship, setRelationship] = useState(guest?.group || '');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setWishes(db.getWishes(invitationId, true));
  }, [invitationId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitting(true);
    setTimeout(() => {
      const newWish: WishItem = {
        id: `wish-${Date.now()}`,
        invitationId,
        guestName: name.trim(),
        relationship: relationship.trim() || 'Sahabat',
        message: message.trim(),
        isApproved: true,
        isSpam: false,
        createdAt: new Date().toISOString(),
      };

      db.saveWish(newWish);
      setWishes((prev) => [newWish, ...prev]);
      setMessage('');
      setSubmitting(false);
    }, 300);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-2">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
          >
            <MessageSquareHeart className="w-6 h-6" />
          </div>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#242625]">
          {t.invitationView.wishesTitle}
        </h3>
        <p className="text-sm text-[#5A605B] mt-2">
          {t.invitationView.wishesSubtitle}
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D8] shadow-xs mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#5A605B] uppercase tracking-wider mb-1">
                Nama Anda
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#8C6E2D]/40 bg-[#FAF7F2]/50 text-[#242625]"
                placeholder="Nama Anda"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#5A605B] uppercase tracking-wider mb-1">
                Hubungan / Kerabat
              </label>
              <input
                type="text"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#8C6E2D]/40 bg-[#FAF7F2]/50 text-[#242625]"
                placeholder="Misal: Sahabat Kampus, Saudara"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#5A605B] uppercase tracking-wider mb-1">
              Doa & Pesan
            </label>
            <textarea
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#8C6E2D]/40 bg-[#FAF7F2]/50 text-[#242625]"
              placeholder={t.invitationView.wishesPlaceholder}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-white font-medium text-sm transition-all shadow-xs hover:shadow-md tap-target-44 disabled:opacity-50"
              style={{ backgroundColor: accentColor }}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? 'Mengirim...' : t.invitationView.wishesSubmit}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Wishes List */}
      <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
        {wishes.length === 0 ? (
          <p className="text-center text-xs text-[#5A605B] py-6">
            Belum ada ucapan. Jadilah yang pertama memberikan doa restu!
          </p>
        ) : (
          wishes.map((w) => (
            <div
              key={w.id}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E8E2D8] shadow-2xs space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#FAF7F2] border border-[#E8E2D8] flex items-center justify-center text-[#5A605B]">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-serif text-sm font-bold text-[#242625]">{w.guestName}</h5>
                    {w.relationship && (
                      <span className="text-[10px] text-[#8C6E2D] font-medium tracking-wide">
                        {w.relationship}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-[10px] text-[#5A605B]">
                  {new Date(w.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#5A605B] leading-relaxed pt-1">
                {w.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
