'use client';

import React, { useState, useEffect } from 'react';
import { Users, Search, Gift, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { UserProfile, PackageTier } from '@/types';
import { db } from '@/lib/db/dbAdapter';

export function AdminUsersManager() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [grantTier, setGrantTier] = useState<PackageTier>('exclusive');
  const [grantReason, setGrantReason] = useState('');
  const [showGrantModal, setShowGrantModal] = useState(false);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  useEffect(() => {
    setUsers(db.getAllUsers());
  }, []);

  const handleGrantFreePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !grantReason.trim()) return;

    // Record audit log
    db.addAuditLog({
      adminId: 'admin-super-01',
      adminEmail: 'admin@invitatum.com',
      action: 'GRANT_FREE_PACKAGE',
      targetType: 'user',
      targetId: selectedUser.id,
      details: `Pemberian paket gratis (${grantTier.toUpperCase()}) kepada user "${selectedUser.displayName}" (${selectedUser.email}). Alasan: ${grantReason}`,
    });

    setSuccessNotice(`Paket gratis berhasil diberikan kepada ${selectedUser.displayName}.`);
    setShowGrantModal(false);
    setGrantReason('');
    setTimeout(() => setSuccessNotice(null), 3500);
  };

  const filteredUsers = users.filter(
    (u) =>
      u.displayName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#242625]">
            Manajemen Pengguna Platform
          </h2>
          <p className="text-xs text-[#5A605B]">
            Daftar seluruh akun terdaftar, riwayat paket, dan hak akses administratif.
          </p>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#5A605B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama atau email pengguna..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#E8E2D8] text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#8C6E2D]"
          />
        </div>
      </div>

      {successNotice && (
        <div className="p-3.5 rounded-2xl bg-[#607755]/10 border border-[#607755]/30 text-xs font-semibold text-[#607755] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successNotice}</span>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#FAF7F2] border-b border-[#E8E2D8] text-[#5A605B] uppercase font-semibold">
            <tr>
              <th className="py-3 px-4">Nama Pengguna</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">WhatsApp</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Terdaftar</th>
              <th className="py-3 px-4 text-center">Tindakan Admin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8E2D8]/60">
            {filteredUsers.map((u) => (
              <tr key={u.id} className="hover:bg-[#FAF7F2]/40 transition-colors">
                <td className="py-3.5 px-4 font-bold text-[#242625]">{u.displayName}</td>
                <td className="py-3.5 px-4 text-[#5A605B]">{u.email}</td>
                <td className="py-3.5 px-4 text-[#5A605B] font-mono">{u.whatsappNumber}</td>
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      u.role === 'admin'
                        ? 'bg-[#8C6E2D]/10 text-[#8C6E2D] border border-[#C5A059]'
                        : 'bg-[#FAF7F2] text-[#5A605B]'
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[#5A605B]">
                  {new Date(u.createdAt).toLocaleDateString('id-ID')}
                </td>
                <td className="py-3.5 px-4 text-center">
                  <button
                    onClick={() => {
                      setSelectedUser(u);
                      setShowGrantModal(true);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#FAF7F2] border border-[#C5A059] text-[11px] font-semibold text-[#8C6E2D] hover:bg-[#C5A059] hover:text-white transition-colors tap-target-44"
                  >
                    <Gift className="w-3.5 h-3.5" />
                    <span>Beri Paket Gratis</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Grant Free Package Modal */}
      {showGrantModal && selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E8E2D8] shadow-2xl space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#242625]">
              Pemberian Paket Gratis
            </h3>
            <p className="text-xs text-[#5A605B]">
              Berikan paket gratis atau upgrade kepada pengguna secara administratif. Seluruh tindakan dicatat di audit log.
            </p>

            <form onSubmit={handleGrantFreePackage} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#5A605B] mb-1">Pengguna Penerima</label>
                <input
                  type="text"
                  disabled
                  value={`${selectedUser.displayName} (${selectedUser.email})`}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8] bg-[#FAF7F2]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#5A605B] mb-1">Pilihan Paket</label>
                <select
                  value={grantTier}
                  onChange={(e) => setGrantTier(e.target.value as PackageTier)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8]"
                >
                  <option value="basic">Paket Basic (6 Bulan)</option>
                  <option value="premium">Paket Premium (1 Tahun)</option>
                  <option value="exclusive">Paket Exclusive (2 Tahun)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#5A605B] mb-1">
                  Alasan Pemberian (Wajib Dicatat) *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Misal: Kompensasi kendala teknis / Mitra promosi pernikahan..."
                  value={grantReason}
                  onChange={(e) => setGrantReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowGrantModal(false)}
                  className="px-4 py-2 rounded-full border border-[#E8E2D8] text-[#5A605B]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#8C6E2D] text-white font-medium shadow-xs"
                >
                  Konfirmasi Pemberian
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
