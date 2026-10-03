'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { db } from '@/lib/db/dbAdapter';
import { ChevronDown, MessageSquare } from 'lucide-react';

export default function FaqPage() {
  const faqs = db.getFaqs();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-12">
        <div className="text-center space-y-2">
          <span className="text-[11px] uppercase tracking-widest text-[#8C6E2D] font-bold">
            Pusat Bantuan
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#242625]">
            Pertanyaan yang Sering Diajukan
          </h1>
          <p className="text-xs sm:text-sm text-[#5A605B]">
            Jawaban lengkap seputar pembuatan, pembayaran, dan pengelolaan undangan digital Invitatum.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-3xl border border-[#E8E2D8] overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-bold text-[#242625] hover:text-[#8C6E2D] transition-colors tap-target-44"
                >
                  <span>{faq.question.id}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#5A605B] shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-[#5A605B] leading-relaxed border-t border-[#E8E2D8]/50 pt-4">
                    {faq.answer.id}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="p-8 rounded-3xl bg-white border border-[#E8E2D8] text-center space-y-3 shadow-xs">
          <MessageSquare className="w-8 h-8 text-[#8C6E2D] mx-auto" />
          <h3 className="font-serif text-lg font-bold text-[#242625]">Masih Memiliki Pertanyaan?</h3>
          <p className="text-xs text-[#5A605B] max-w-md mx-auto">
            Tim layanan pelanggan kami siap membantu Anda setiap hari dari pukul 08.00 hingga 21.00 WIB.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#607755] hover:bg-[#4E6244] text-white text-xs font-semibold shadow-xs tap-target-44"
            >
              Hubungi WhatsApp Bantuan
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
