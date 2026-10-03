'use client';

import React, { use } from 'react';
import { db } from '@/lib/db/dbAdapter';
import { defaultDemoInvitation } from '@/lib/data/defaultData';
import { InvitationEditor } from '@/components/editor/InvitationEditor';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditorRoutePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const invitation =
    db.getInvitationById(id) ||
    db.getInvitationBySlug(id) ||
    (id.includes('demo') ? defaultDemoInvitation : { ...defaultDemoInvitation, id });

  return <InvitationEditor initialInvitation={invitation} isDemoMode={id.includes('demo')} />;
}
