'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/db/dbAdapter';
import { useAuth } from '@/lib/auth/AuthContext';
import { TransactionRecord } from '@/types';
import { CreditCard, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function TransactionsPage() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);

  useEffect(() => {
    const list = db.getTransactions(user?.id);
    if (list.length === 0) {
      // Sample mock transaction for clear overview
      const sampleTx: TransactionRecord = {
        id: 'tx-sample-01',
        orderId: 'INV-2026-0301-4921',
        userId: user?.id || 'user-demo',
        invitationId: 'demo-invitation-alya-budi',
        packageTier: 'exclusive',
        type: 'initial_package',
        amount: 69000,
        status: 'settlement',
        paymentType: 'qris',
        createdAt: '2026-03-01T10:00:00Z',
        settledAt: '2026-03-01T10:05:00Z',
      };
      setTransactions([sampleTx]);
    } else {
      setTransactions(list);
    }
  }, [user]);

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#242625]">
          Riwayat Transaksi Pembayaran
        </h2>
        <p className="text-xs text-[#5A605B]">
          Daftar seluruh pembayaran paket dan perpanjangan masa aktif undangan Anda.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F2] border-b border-[#E8E2D8] text-[#5A605B] uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Paket</th>
                <th className="py-3 px-4">Nominal</th>
                <th className="py-3 px-4">Metode</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E2D8]/60">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#FAF7F2]/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#242625]">
                    {tx.orderId}
                  </td>
                  <td className="py-3.5 px-4 uppercase text-[#8C6E2D] font-bold">
                    {tx.packageTier}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#242625]">
                    Rp{tx.amount.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3.5 px-4 uppercase text-[#5A605B]">
                    {tx.paymentType || 'Midtrans'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        tx.status === 'settlement'
                          ? 'bg-[#607755]/10 text-[#607755]'
                          : tx.status === 'pending'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-red-50 text-red-600'
                      }`}
                    >
                      {tx.status === 'settlement' && <CheckCircle2 className="w-3 h-3" />}
                      {tx.status === 'pending' && <Clock className="w-3 h-3" />}
                      <span>{tx.status}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#5A605B]">
                    {new Date(tx.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
