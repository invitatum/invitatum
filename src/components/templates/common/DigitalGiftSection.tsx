'use client';

import React, { useState } from 'react';
import { Gift, Copy, Check, CreditCard, MapPin } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { BankAccountGift } from '@/types';

interface DigitalGiftSectionProps {
  accounts: BankAccountGift[];
  shippingAddress?: string;
  accentColor?: string;
}

export function DigitalGiftSection({
  accounts,
  shippingAddress,
  accentColor = '#8C6E2D',
}: DigitalGiftSectionProps) {
  const { t } = useLanguage();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  if (!accounts || accounts.length === 0) return null;

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-2">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
          >
            <Gift className="w-6 h-6" />
          </div>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#242625]">
          {t.invitationView.digitalGiftTitle}
        </h3>
        <p className="text-xs sm:text-sm text-[#5A605B] mt-2 max-w-md mx-auto leading-relaxed">
          {t.invitationView.digitalGiftSubtitle}
        </p>
      </div>

      <div className="space-y-4">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] flex items-center justify-center text-[#8C6E2D]">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#8C6E2D] uppercase tracking-wider">
                  {acc.bankName}
                </p>
                <h4 className="font-mono text-lg font-bold text-[#242625] tracking-wider">
                  {acc.accountNumber}
                </h4>
                <p className="text-xs text-[#5A605B]">a.n. {acc.accountHolder}</p>
              </div>
            </div>

            <button
              onClick={() => handleCopy(acc.id, acc.accountNumber)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E8E2D8] text-xs font-medium text-[#242625] hover:bg-[#FAF7F2] transition-colors tap-target-44 w-full sm:w-auto justify-center"
            >
              {copiedId === acc.id ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#607755]" />
                  <span className="text-[#607755] font-semibold">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#5A605B]" />
                  <span>Salin No. Rek</span>
                </>
              )}
            </button>
          </div>
        ))}

        {shippingAddress && (
          <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs text-left space-y-2 mt-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8C6E2D] uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Kirim Kado Fisik</span>
            </div>
            <p className="text-xs sm:text-sm text-[#5A605B] leading-relaxed">
              {shippingAddress}
            </p>
            <button
              onClick={() => handleCopy('shipping-addr', shippingAddress)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E8E2D8] text-xs text-[#242625] hover:bg-[#FAF7F2] tap-target-44"
            >
              {copiedId === 'shipping-addr' ? (
                <>
                  <Check className="w-3 h-3 text-[#607755]" />
                  <span className="text-[#607755]">Alamat Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-[#5A605B]" />
                  <span>Salin Alamat</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
