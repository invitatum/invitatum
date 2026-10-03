'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CreditCard, CheckCircle, Clock, XCircle, ArrowRight } from 'lucide-react';
import { db } from '@/lib/db/dbAdapter';

function SimulatedPaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('order_id') || '';
  const [status, setStatus] = useState<'pending' | 'success' | 'failed'>('pending');

  const handleSimulateResult = (simulatedStatus: 'settlement' | 'cancel') => {
    if (!orderId) return;

    // Simulate webhook effect
    db.updateTransactionStatus(orderId, simulatedStatus);

    if (simulatedStatus === 'settlement') {
      setStatus('success');
      setTimeout(() => {
        router.push('/dashboard/invitations?payment=success');
      }, 2000);
    } else {
      setStatus('failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-[#E8E2D8] shadow-xl text-center space-y-6">
        <div className="w-14 h-14 rounded-full bg-[#FAF7F2] border border-[#C5A059] flex items-center justify-center mx-auto text-[#8C6E2D]">
          <CreditCard className="w-7 h-7" />
        </div>

        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            Midtrans Sandbox Simulator
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#242625] pt-2">
            Simulasi Pembayaran
          </h2>
          <p className="text-xs text-[#5A605B] font-mono">Order ID: {orderId}</p>
        </div>

        {status === 'pending' && (
          <div className="space-y-3 pt-2">
            <p className="text-xs text-[#5A605B]">
              Ini adalah mode simulasi sandbox untuk menguji alur pembayaran tanpa kartu kredit riil.
            </p>

            <button
              onClick={() => handleSimulateResult('settlement')}
              className="w-full py-3.5 rounded-full bg-[#607755] hover:bg-[#4E6244] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 tap-target-44"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Simulasikan Pembayaran Sukses (Settlement)</span>
            </button>

            <button
              onClick={() => handleSimulateResult('cancel')}
              className="w-full py-3 rounded-full border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition-all tap-target-44"
            >
              Simulasikan Pembayaran Gagal / Dibatalkan
            </button>
          </div>
        )}

        {status === 'success' && (
          <div className="p-6 rounded-2xl bg-[#607755]/10 border border-[#607755]/30 space-y-2">
            <CheckCircle className="w-10 h-10 text-[#607755] mx-auto" />
            <h4 className="font-serif text-lg font-bold text-[#242625]">Pembayaran Berhasil!</h4>
            <p className="text-xs text-[#5A605B]">
              Paket undangan Anda telah aktif. Mengalihkan ke dashboard...
            </p>
          </div>
        )}

        {status === 'failed' && (
          <div className="p-6 rounded-2xl bg-red-50 border border-red-200 space-y-3">
            <XCircle className="w-10 h-10 text-red-600 mx-auto" />
            <h4 className="font-serif text-lg font-bold text-red-900">Pembayaran Dibatalkan</h4>
            <button
              onClick={() => router.push('/pricing')}
              className="px-4 py-2 rounded-full bg-white border border-[#E8E2D8] text-xs font-medium text-[#242625]"
            >
              Kembali ke Pilihan Paket
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SimulatedPaymentPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-[#5A605B]">Memuat simulator...</div>}>
      <SimulatedPaymentContent />
    </Suspense>
  );
}
