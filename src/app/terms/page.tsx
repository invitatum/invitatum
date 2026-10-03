'use client';

import React from 'react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-8">
        <div className="space-y-2">
          <span className="text-[11px] uppercase tracking-widest text-[#8C6E2D] font-bold">
            Ketentuan Layanan
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#242625]">
            Syarat & Ketentuan Penggunaan
          </h1>
          <p className="text-xs text-[#5A605B]">Terakhir diperbarui: 3 Oktober 2026</p>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E8E2D8] shadow-xs space-y-6 text-xs sm:text-sm text-[#5A605B] leading-relaxed">
          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-[#242625]">1. Ketentuan Umum</h3>
            <p>
              Dengan mendaftar, mengakses, atau menggunakan layanan platform Invitatum, Anda menyetujui untuk terikat secara hukum dengan seluruh syarat dan ketentuan ini. Apabila Anda tidak menyetujui ketentuan ini, mohon untuk tidak melanjutkan penggunaan layanan.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-[#242625]">2. Model Pembayaran & Pengembalian Dana (Refund)</h3>
            <p>
              Setiap pembelian paket bersifat satu kali bayar (one-time payment) untuk masa aktif yang telah ditentukan (Basic 6 bulan, Premium 1 tahun, Exclusive 2 tahun).
            </p>
            <p>
              Pembayaran yang telah berhasil diverifikasi oleh payment gateway Midtrans bersifat final dan tidak dapat dibatalkan atau dikembalikan, kecuali apabila terjadi kendala teknis dari pihak Invitatum yang menyebabkan layanan tidak dapat digunakan sama sekali.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-[#242625]">3. Penggantian Template & Perubahan Subdomain</h3>
            <p>
              Pengguna berhak mengganti template dan mengubah subdomain sebanyak 1 (satu) kali setelah publikasi dengan biaya administrasi yang berlaku. Data teks dan foto Anda akan dipertahankan dengan penyesuaian tata letak template baru.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-[#242625]">4. Hak Cipta & Kepemilikan Konten</h3>
            <p>
              Pengguna bertanggung jawab penuh atas seluruh teks, foto, video, dan berkas audio yang diunggah ke dalam undangan. Pengguna menjamin bahwa konten tersebut tidak melanggar hak cipta, norma kesusilaan, atau hukum yang berlaku di Republik Indonesia.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-[#242625]">5. Kebijakan Kedaluwarsa & Retensi Data</h3>
            <p>
              Setelah masa aktif berakhir, halaman publik undangan akan dinonaktifkan sementara. Data undangan akan disimpan selama 90 hari setelah kedaluwarsa untuk memberikan kesempatan perpanjangan. Setelah periode tersebut, data dapat dihapus permanen.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
