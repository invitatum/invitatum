'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { db } from '@/lib/db/dbAdapter';
import { defaultDemoInvitation } from '@/lib/data/defaultData';
import { QrCheckInDesk } from '@/components/dashboard/QrCheckInDesk';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CheckInRoutePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const invitation =
    db.getInvitationById(id) ||
    db.getInvitationBySlug(id) ||
    defaultDemoInvitation;

  return (
    <div className="space-y-6">
      <Link
        href={`/dashboard/invitations/${invitation.id}/guests`}
        className="inline-flex items-center gap-1.5 text-xs text-[#5A605B] hover:text-[#242625] tap-target-44"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Buku Tamu</span>
      </Link>

      <QrCheckInDesk invitation={invitation} />
    </div>
  );
}
