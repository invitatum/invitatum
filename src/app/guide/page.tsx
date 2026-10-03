'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';

export default function GuidePage() {
  const steps = [
    {
      num: '01',
      title: 'Memilih Template & Kategori',
      desc: 'Buka menu Galeri Template. Pilih kategori Wedding atau Engagement. Klik "Coba Demo" untuk melihat tampilan interaktif atau klik "Gunakan" untuk mulai mengedit.',
    },
    {
      num: '02',
      title: 'Mengisi Data Mempelai & Acara',
      desc: 'Pada layar editor, lengkapi nama lengkap, panggilan, nama orang tua, foto profil, tanggal dan waktu prosesi, serta alamat gedung dengan tautan Google Maps.',
    },
    {
      num: '03',
      title: 'Menambahkan Fitur Pendukung',
      desc: 'Aktifkan hitung mundur (countdown), tambahkan foto kenangan di galeri, pilih musik latar, dan masukkan rekening bank untuk amplop digital.',
    },
    {
      num: '04',
      title: 'Aktivasi Paket & Publikasi',
      desc: 'Klik Simpan dan lakukan pembayaran aman via Midtrans. Setelah status pembayaran terverifikasi, tentukan subdomain unik Anda lalu tekan tombol Publikasikan.',
    },
    {
      num: '05',
      title: 'Mengelola Tamu & Membagikan WhatsApp',
      desc: 'Masuk ke menu Buku Tamu di dashboard. Masukkan nama tamu untuk menghasilkan tautan personal khusus (/untuk/nama-tamu) dan bagikan pesan WhatsApp dengan sekali klik.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-12">
        <div className="text-center space-y-2">
          <span className="text-[11px] uppercase tracking-widest text-[#8C6E2D] font-bold">
            Dokumentasi
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#242625]">
            Panduan Lengkap Pengguna
          </h1>
          <p className="text-xs sm:text-sm text-[#5A605B]">
            Petunjuk langkah demi langkah membuat dan menyebarkan undangan digital pernikahan Anda.
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((st) => (
            <div
              key={st.num}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs flex flex-col sm:flex-row items-start gap-6"
            >
              <span className="font-serif text-3xl font-bold text-[#8C6E2D] shrink-0 font-mono">
                {st.num}
              </span>
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-[#242625]">{st.title}</h3>
                <p className="text-xs sm:text-sm text-[#5A605B] leading-relaxed">{st.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 rounded-3xl bg-white border border-[#E8E2D8] text-center space-y-4 shadow-xs">
          <h3 className="font-serif text-xl font-bold text-[#242625]">
            Siap Memulai Undangan Digital Anda?
          </h3>
          <p className="text-xs text-[#5A605B] max-w-md mx-auto">
            Coba editor langsung sekarang tanpa perlu mendaftar terlebih dahulu.
          </p>
          <div className="pt-2">
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#8C6E2D] text-white text-xs font-semibold shadow-md hover:bg-[#735A24] tap-target-44"
            >
              <span>Mulai Buat Undangan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
