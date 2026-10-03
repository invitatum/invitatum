'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { db } from '@/lib/db/dbAdapter';
import { defaultDemoInvitation } from '@/lib/data/defaultData';
import { GuestsManager } from '@/components/dashboard/GuestsManager';
import { ArrowLeft, QrCode } from 'lucide-react';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function InvitationGuestsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const invitation =
    db.getInvitationById(id) ||
    db.getInvitationBySlug(id) ||
    defaultDemoInvitation;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/invitations"
          className="inline-flex items-center gap-1.5 text-xs text-[#5A605B] hover:text-[#242625] tap-target-44"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Undangan</span>
        </Link>

        {invitation.packageTier === 'exclusive' && (
          <Link
            href={`/dashboard/invitations/${invitation.id}/check-in`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#C5A059] bg-white text-xs font-semibold text-[#8C6E2D] hover:bg-[#FAF7F2] tap-target-44"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Buka Meja Check-In Resepsionis</span>
          </Link>
        )}
      </div>

      <GuestsManager invitation={invitation} />
    </div>
  );
}
