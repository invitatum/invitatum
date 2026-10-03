'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { Mail, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-10 max-w-md w-full border border-[#E8E2D8] shadow-lg space-y-6">
          <div className="text-center space-y-2">
            <h1 className="font-serif text-2xl font-bold text-[#242625]">
              Pemulihan Kata Sandi
            </h1>
            <p className="text-xs text-[#5A605B]">
              Masukkan alamat email Anda untuk menerima tautan atur ulang kata sandi.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-[#607755]/10 border border-[#607755]/30 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#607755] mx-auto" />
              <h4 className="font-serif text-base font-bold text-[#242625]">Tautan Terkirim</h4>
              <p className="text-xs text-[#5A605B]">
                Instruksi pemulihan kata sandi telah dikirimkan ke <strong>{email}</strong>. Silakan periksa kotak masuk atau spam email Anda.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#5A605B] mb-1">
                  Alamat Email Terdaftar
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#5A605B] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="email@anda.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E8E2D8]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#8C6E2D] hover:bg-[#735A24] text-white font-medium text-xs shadow-xs transition-all tap-target-44"
              >
                Kirim Tautan Pemulihan
              </button>
            </form>
          )}

          <div className="text-center pt-2">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs text-[#8C6E2D] font-semibold hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Halaman Masuk</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
