'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { db } from '@/lib/db/dbAdapter';
import { TemplateRenderer } from '@/components/templates/TemplateRenderer';
import { Heart, Home } from 'lucide-react';

interface PageProps {
  params: Promise<{
    slug: string;
    guestSlug: string;
  }>;
}

export default function PersonalizedInvitationPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { slug, guestSlug } = resolvedParams;

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
            Tautan undangan tidak valid. Silakan periksa kembali tautan yang Anda terima.
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

  // Find guest
  const guest = db.getGuestBySlug(invitation.id, guestSlug);

  // Render with personalized guest
  return <TemplateRenderer invitation={invitation} guest={guest} />;
}
