'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus,
  Edit,
  Users,
  Eye,
  Trash2,
  Copy,
  Calendar,
  Sparkles,
  ExternalLink,
  QrCode,
  Share2,
} from 'lucide-react';
import { InvitationData } from '@/types';
import { db } from '@/lib/db/dbAdapter';
import { useAuth } from '@/lib/auth/AuthContext';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function InvitationsList() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [invitations, setInvitations] = useState<InvitationData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const list = db.getUserInvitations(user.id);
      // If user has no invitations yet, also show demo invitation for test convenience
      if (list.length === 0) {
        const demoInv = db.getInvitationById('demo-invitation-alya-budi');
        if (demoInv) {
          setInvitations([demoInv]);
        }
      } else {
        setInvitations(list);
      }
    } else {
      const demoInv = db.getInvitationById('demo-invitation-alya-budi');
      if (demoInv) {
        setInvitations([demoInv]);
      }
    }
    setLoading(false);
  }, [user]);

  const handleDuplicate = (inv: InvitationData) => {
    const duplicated: InvitationData = {
      ...inv,
      id: `inv-${Date.now()}`,
      slug: `${inv.slug}-copy-${Math.floor(Math.random() * 1000)}`,
      title: `${inv.title} (Salinan)`,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      templateChangeUsed: false,
      slugChangeUsed: false,
    };
    db.saveInvitation(duplicated);
    setInvitations([duplicated, ...invitations]);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin memindahkan undangan ini ke tempat sampah?')) {
      db.softDeleteInvitation(id);
      setInvitations(invitations.filter((i) => i.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#242625]">Daftar Undangan Saya</h2>
          <p className="text-xs text-[#5A605B]">
            Kelola isi konten, pantau konfirmasi tamu, dan atur publikasi undangan Anda.
          </p>
        </div>

        <Link
          href="/templates"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8C6E2D] hover:bg-[#735A24] text-white text-xs font-medium shadow-xs transition-all tap-target-44 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Undangan Baru</span>
        </Link>
      </div>

      {/* Invitations Grid */}
      {loading ? (
        <div className="p-12 text-center text-xs text-[#5A605B]">Memuat daftar undangan...</div>
      ) : invitations.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white border border-[#E8E2D8] text-center space-y-4">
          <Sparkles className="w-10 h-10 text-[#C5A059] mx-auto" />
          <h3 className="font-serif text-lg font-bold text-[#242625]">Belum Ada Undangan</h3>
          <p className="text-xs text-[#5A605B] max-w-sm mx-auto">
            Mulai langkah bahagia Anda dengan memilih template favorit dan sesuaikan dengan cerita cinta Anda.
          </p>
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#8C6E2D] text-white text-xs font-medium"
          >
            Pilih Template
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {invitations.map((inv) => (
            <div
              key={inv.id}
              className="bg-white rounded-3xl border border-[#E8E2D8] shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            >
              {/* Card Header & Preview Image */}
              <div>
                <div className="relative h-48 bg-[#FAF7F2] overflow-hidden">
                  <img
                    src={inv.couple.groomPhoto}
                    alt={inv.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        inv.status === 'published'
                          ? 'bg-[#607755] text-white'
                          : 'bg-white/90 text-[#8C6E2D] border border-[#C5A059]'
                      }`}
                    >
                      {inv.status}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 text-[#242625]">
                      {inv.packageTier}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#8C6E2D] font-semibold uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{inv.events[0]?.date || 'Belum diatur'}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#242625] truncate">
                    {inv.title}
                  </h3>
                  <p className="text-xs text-[#5A605B] truncate font-mono">
                    subdomain: {inv.slug}.invitatum.com
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 border-t border-[#E8E2D8]/60 mt-4 space-y-2">
                <div className="grid grid-cols-2 gap-2 pt-3">
                  <Link
                    href={`/dashboard/invitations/${inv.id}/editor`}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#FAF7F2] hover:bg-[#E8E2D8]/50 text-xs font-medium text-[#242625] transition-colors tap-target-44"
                  >
                    <Edit className="w-3.5 h-3.5 text-[#8C6E2D]" />
                    <span>Buka Editor</span>
                  </Link>

                  <Link
                    href={`/dashboard/invitations/${inv.id}/guests`}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#FAF7F2] hover:bg-[#E8E2D8]/50 text-xs font-medium text-[#242625] transition-colors tap-target-44"
                  >
                    <Users className="w-3.5 h-3.5 text-[#607755]" />
                    <span>Buku Tamu</span>
                  </Link>
                </div>

                <div className="flex items-center justify-between pt-2 text-xs text-[#5A605B]">
                  <Link
                    href={`/invitation/${inv.slug}`}
                    target="_blank"
                    className="flex items-center gap-1 hover:text-[#8C6E2D]"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Lihat Halaman</span>
                  </Link>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDuplicate(inv)}
                      className="p-1.5 hover:text-[#8C6E2D] rounded-lg"
                      title="Duplikasi Undangan"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(inv.id)}
                      className="p-1.5 hover:text-red-600 rounded-lg"
                      title="Hapus Undangan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
