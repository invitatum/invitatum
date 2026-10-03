'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { db } from '@/lib/db/dbAdapter';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export default function PricingPage() {
  const packages = db.getPackages();

  const comparisonFeatures = [
    { name: 'Masa Aktif Undangan', basic: '6 Bulan', premium: '1 Tahun', exclusive: '2 Tahun' },
    { name: 'Batas Galeri Foto', basic: '10 Foto', premium: '20 Foto', exclusive: '40 Foto' },
    { name: 'Batas Galeri Video', basic: 'Tanpa Video', premium: '2 Video', exclusive: '5 Video' },
    { name: 'Hitung Mundur (Countdown)', basic: true, premium: true, exclusive: true },
    { name: 'Petunjuk Arah Google Maps', basic: true, premium: true, exclusive: true },
    { name: 'Musik Latar Romantis Pilihan', basic: true, premium: true, exclusive: true },
    { name: 'Buku Tamu & Ucapan Doa', basic: false, premium: true, exclusive: true },
    { name: 'Konfirmasi Kehadiran (RSVP Online)', basic: false, premium: true, exclusive: true },
    { name: 'Amplop Digital & Rekening Bank', basic: false, premium: true, exclusive: true },
    { name: 'Kisah Kasih (Love Story Timeline)', basic: false, premium: true, exclusive: true },
    { name: 'Nama Tamu Personal (/untuk/nama)', basic: false, premium: true, exclusive: true },
    { name: 'Sistem QR Code & Meja Check-In', basic: false, premium: false, exclusive: true },
    { name: 'Mendukung Multi-Acara (Akad & Resepsi Terpisah)', basic: false, premium: false, exclusive: true },
    { name: 'Tautan Siaran Langsung (Live Stream)', basic: false, premium: false, exclusive: true },
    { name: 'Visual Canvas & Kustomisasi Tingkat Lanjut', basic: false, premium: false, exclusive: true },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-[11px] uppercase tracking-widest text-[#8C6E2D] font-bold">
            Pilihan Paket Transparan
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#242625]">
            Investasi Terjangkau untuk Hari Istimewa
          </h1>
          <p className="text-xs sm:text-sm text-[#5A605B]">
            Sekali bayar per undangan tanpa biaya bulanan tersembunyi.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg) => {
            const isPopular = pkg.tier === 'premium';
            return (
              <div
                key={pkg.id}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all ${
                  isPopular
                    ? 'bg-white border-2 border-[#C5A059] shadow-xl relative'
                    : 'bg-white border border-[#E8E2D8] shadow-xs'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#8C6E2D] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    Paling Diminati
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#242625] uppercase tracking-wide">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-[#5A605B] mt-1">{pkg.description}</p>
                  </div>

                  <div>
                    <div className="font-serif text-4xl font-bold text-[#8C6E2D]">
                      Rp{pkg.price.toLocaleString('id-ID')}
                    </div>
                    <span className="text-xs text-[#5A605B]">
                      Masa aktif {pkg.activeMonths} bulan • Bayar 1x
                    </span>
                  </div>

                  <div className="pt-4 border-t border-[#E8E2D8] space-y-2 text-xs text-[#5A605B]">
                    {pkg.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#607755] shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    href={`/checkout?tier=${pkg.tier}`}
                    className={`w-full py-3.5 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-2 tap-target-44 ${
                      isPopular
                        ? 'bg-[#8C6E2D] hover:bg-[#735A24] text-white shadow-md'
                        : 'bg-[#FAF7F2] hover:bg-[#E8E2D8] text-[#242625] border border-[#E8E2D8]'
                    }`}
                  >
                    <span>Pilih Paket {pkg.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Comparison Table */}
        <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-xs p-6 sm:p-8 space-y-6">
          <h3 className="font-serif text-2xl font-bold text-[#242625] text-center">
            Perbandingan Detail Fitur
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#E8E2D8] text-[#5A605B] uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">Fitur Undangan</th>
                  <th className="py-3 px-4 text-center">Basic (Rp25rb)</th>
                  <th className="py-3 px-4 text-center">Premium (Rp45rb)</th>
                  <th className="py-3 px-4 text-center">Exclusive (Rp69rb)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2D8]/60">
                {comparisonFeatures.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF7F2]/40 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-[#242625]">{row.name}</td>
                    <td className="py-3.5 px-4 text-center text-[#5A605B]">
                      {typeof row.basic === 'boolean' ? (
                        row.basic ? '✓' : '-'
                      ) : (
                        row.basic
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center font-semibold text-[#8C6E2D]">
                      {typeof row.premium === 'boolean' ? (
                        row.premium ? '✓' : '-'
                      ) : (
                        row.premium
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-[#607755]">
                      {typeof row.exclusive === 'boolean' ? (
                        row.exclusive ? '✓' : '-'
                      ) : (
                        row.exclusive
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
