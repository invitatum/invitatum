'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { ShieldCheck, CheckCircle2, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { db } from '@/lib/db/dbAdapter';
import { useAuth } from '@/lib/auth/AuthContext';
import { PackagePlan, PackageTier } from '@/types';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const tierParam = (searchParams.get('tier') || 'premium') as PackageTier;
  const invIdParam = searchParams.get('invitation_id') || 'demo-invitation-alya-budi';

  const [selectedPlan, setSelectedPlan] = useState<PackagePlan | null>(null);
  const [name, setName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.whatsappNumber || '');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const pkg = db.getPackageById(`package-${tierParam}`);
    if (pkg) {
      setSelectedPlan(pkg);
    } else {
      setSelectedPlan(db.getPackages()[1]);
    }
  }, [tierParam]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setErrorMsg('Mohon setujui Syarat & Ketentuan serta Kebijakan Privasi terlebih dahulu.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/checkout/create-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invitationId: invIdParam,
          packageTier: selectedPlan?.tier || 'premium',
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          userId: user?.id,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal memproses pembayaran');
      }

      if (data.redirectUrl) {
        router.push(data.redirectUrl);
      } else {
        router.push(`/dashboard/invitations?payment=success`);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan sistem.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-16 w-full">
        <div className="text-center mb-10 space-y-2">
          <span className="text-[11px] uppercase tracking-widest text-[#8C6E2D] font-bold">
            Checkout Aman Midtrans
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#242625]">
            Aktivasi Paket Undangan
          </h1>
          <p className="text-xs text-[#5A605B]">
            Selesaikan pembayaran untuk mengaktifkan subdomain dan fitur lengkap undangan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Package Summary Card */}
          <div className="md:col-span-1 p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FAF7F2] text-[#8C6E2D] border border-[#C5A059]">
              Ringkasan Paket
            </span>

            <div>
              <h3 className="font-serif text-2xl font-bold text-[#242625]">
                {selectedPlan?.name || 'Paket Premium'}
              </h3>
              <div className="font-serif text-3xl font-bold text-[#8C6E2D] mt-1">
                Rp{(selectedPlan?.price || 45000).toLocaleString('id-ID')}
              </div>
              <p className="text-[11px] text-[#5A605B] mt-1">
                Masa aktif {selectedPlan?.activeMonths} bulan • Bayar 1x
              </p>
            </div>

            <div className="pt-4 border-t border-[#E8E2D8] space-y-2 text-xs">
              <p className="font-semibold text-[#242625]">Fitur yang Diaktifkan:</p>
              <ul className="space-y-1.5 text-[#5A605B]">
                {selectedPlan?.features.slice(0, 6).map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#607755] shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Customer & Payment Form */}
          <div className="md:col-span-2 p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#242625]">
              Data Pembeli & Tagihan
            </h3>

            {errorMsg && (
              <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleCheckout} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#5A605B] mb-1">
                  Nama Lengkap Pemesan *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Pratama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D8]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#5A605B] mb-1">
                    Alamat Email (Untuk Tanda Terima) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@anda.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D8]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#5A605B] mb-1">
                    Nomor WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+62812xxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D8]"
                  />
                </div>
              </div>

              {/* Agreement */}
              <div className="pt-2 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="agreeCheck"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 rounded text-[#8C6E2D] mt-0.5"
                />
                <label htmlFor="agreeCheck" className="text-[11px] text-[#5A605B] leading-relaxed">
                  Saya menyetujui{' '}
                  <Link href="/terms" target="_blank" className="text-[#8C6E2D] underline">
                    Syarat & Ketentuan
                  </Link>{' '}
                  serta{' '}
                  <Link href="/privacy" target="_blank" className="text-[#8C6E2D] underline">
                    Kebijakan Privasi
                  </Link>{' '}
                  Invitatum. Pembayaran bersifat final dan langsung mengaktifkan masa aktif paket.
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-[#8C6E2D] hover:bg-[#735A24] text-white font-medium text-sm transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 tap-target-44 disabled:opacity-50 mt-4"
              >
                <Lock className="w-4 h-4" />
                <span>{loading ? 'Memproses Transaksi...' : 'Lanjutkan ke Pembayaran Midtrans'}</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#5A605B] pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#607755]" />
                <span>Transaksi dienkripsi 256-bit dan diproses oleh Midtrans resmi.</span>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-[#5A605B]">Memuat checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
