'use client';

import React from 'react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-8">
        <div className="space-y-2">
          <span className="text-[11px] uppercase tracking-widest text-[#8C6E2D] font-bold">
            Privasi & Keamanan
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#242625]">
            Kebijakan Privasi
          </h1>
          <p className="text-xs text-[#5A605B]">Terakhir diperbarui: 3 Oktober 2026</p>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E8E2D8] shadow-xs space-y-6 text-xs sm:text-sm text-[#5A605B] leading-relaxed">
          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-[#242625]">1. Komitmen Privasi Data</h3>
            <p>
              Invitatum sangat menghargai privasi Anda dan para tamu undangan Anda. Kami berkomitmen untuk menerapkan prinsip minimisasi data (data minimization) dan tidak akan pernah menjual atau menyewakan informasi pribadi Anda maupun data tamu Anda kepada pihak ketiga mana pun.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-[#242625]">2. Informasi yang Kami Kumpulkan</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Data Akun: Nama lengkap, alamat email, dan nomor WhatsApp.</li>
              <li>Data Undangan: Nama mempelai, keluarga, lokasi acara, foto, video, dan rekening amplop digital.</li>
              <li>Data Tamu & RSVP: Nama tamu, status konfirmasi kehadiran, jumlah pendamping, ucapan doa, serta catatan check-in.</li>
              <li>Data Transaksi: Riwayat order ID, nominal pembayaran, dan status transaksi Midtrans.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-[#242625]">3. Penggunaan Data Tamu Undangan</h3>
            <p>
              Data nama tamu dan nomor kontak yang dimasukkan oleh pemilik undangan hanya digunakan semata-mata untuk memfasilitasi pembuatan tautan personal (/untuk/nama-tamu) dan pengiriman pesan WhatsApp oleh pemilik acara. Kami tidak menghubungi tamu Anda untuk kepentingan pemasaran.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-[#242625]">4. Keamanan Pembayaran & Rekening</h3>
            <p>
              Seluruh transaksi pembayaran diproses melalui payment gateway berlisensi Midtrans dengan enkripsi standar industri. Kami tidak menyimpan nomor kartu kredit atau detail perbankan sensitif pada server kami.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-[#242625]">5. Hak Penghapusan & Pertanyaan Privasi</h3>
            <p>
              Anda berhak menghapus akun Anda dan seluruh data undangan terkait kapan saja melalui pengaturan dashboard. Apabila Anda memiliki pertanyaan seputar perlindungan data, silakan hubungi tim kami di bantuan@invitatum.com.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
