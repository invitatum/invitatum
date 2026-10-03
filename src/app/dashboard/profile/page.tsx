'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { User, Phone, Mail, Save, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [whatsapp, setWhatsapp] = useState(user?.whatsappNumber || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#242625]">Profil Pengguna</h2>
        <p className="text-xs text-[#5A605B]">
          Perbarui informasi kontak dan pengaturan privasi akun Anda.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-2xl bg-[#607755]/10 border border-[#607755]/30 text-xs font-semibold text-[#607755] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Profil berhasil diperbarui.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="p-8 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-[#5A605B] mb-1">Nama Lengkap</label>
          <div className="relative">
            <User className="w-4 h-4 text-[#5A605B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E8E2D8]"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-[#5A605B] mb-1">Alamat Email</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#5A605B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              disabled
              value={user?.email || 'user@invitatum.com'}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E8E2D8] bg-[#FAF7F2] text-[#5A605B]"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-[#5A605B] mb-1">Nomor WhatsApp</label>
          <div className="relative">
            <Phone className="w-4 h-4 text-[#5A605B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E8E2D8]"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#8C6E2D] hover:bg-[#735A24] text-white font-medium text-xs shadow-xs tap-target-44"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan Profil</span>
          </button>
        </div>
      </form>

      {/* Account Deletion Notice */}
      <div className="p-6 rounded-3xl bg-red-50/60 border border-red-200 space-y-2 text-xs">
        <div className="flex items-center gap-2 text-red-700 font-bold">
          <AlertTriangle className="w-4 h-4" />
          <span>Zona Penghapusan Akun</span>
        </div>
        <p className="text-[#5A605B] leading-relaxed">
          Sesuai kebijakan privasi, saat akun dihapus, data undangan akan dipindahkan ke masa retensi selama 30 hari sebelum dihapus permanen.
        </p>
      </div>
    </div>
  );
}
