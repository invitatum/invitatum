'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { db } from '@/lib/db/dbAdapter';
import { TemplateRenderer } from '@/components/templates/TemplateRenderer';
import { Heart, Clock, Lock, AlertCircle, Home } from 'lucide-react';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function InvitationPublicPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const invitation = db.getInvitationBySlug(slug) || db.getInvitationById(slug);

  if (!invitation) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-[#E8E2D8] shadow-lg text-center space-y-4">
          <Heart className="w-10 h-10 text-[#C5A059] mx-auto opacity-40" />
          <h2 className="font-serif text-2xl font-bold text-[#242625]">
            Undangan Tidak Ditemukan
          </h2>
          <p className="text-xs text-[#5A605B]">
            Tautan undangan yang Anda tuju mungkin salah ketik atau telah dipindahkan. Silakan hubungi kedua mempelai untuk memastikan tautan yang tepat.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#8C6E2D] text-white text-xs font-semibold"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Kembali ke Beranda</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Handle Expired State (Section 33)
  if (invitation.status === 'expired') {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-[#E8E2D8] shadow-lg text-center space-y-4">
          <Clock className="w-10 h-10 text-[#8C3B4A] mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-[#242625]">
            Masa Aktif Undangan Telah Berakhir
          </h2>
          <p className="text-xs text-[#5A605B] leading-relaxed">
            Terima kasih atas perhatian dan doa restu Anda. Masa aktif undangan digital ini telah selesai sesuai ketentuan platform.
          </p>
          <p className="text-[11px] text-[#5A605B] pt-2">
            Pemilik undangan dapat memperpanjang masa aktif melalui dashboard akun Invitatum.
          </p>
        </div>
      </div>
    );
  }

  // Handle Unpublished State (Section 33)
  if (invitation.status === 'unpublished') {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-[#E8E2D8] shadow-lg text-center space-y-4">
          <Lock className="w-10 h-10 text-[#C5A059] mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-[#242625]">
            Undangan Sedang Tidak Tersedia
          </h2>
          <p className="text-xs text-[#5A605B] leading-relaxed">
            Halaman undangan ini sedang dinonaktifkan sementara oleh pemilik acara untuk pembaruan informasi. Silakan cek kembali nanti.
          </p>
        </div>
      </div>
    );
  }

  // Render Live Template
  return <TemplateRenderer invitation={invitation} />;
}
