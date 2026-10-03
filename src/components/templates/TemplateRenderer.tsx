'use client';

import React from 'react';
import { InvitationData, GuestItem } from '@/types';
import { TheRoyalSageTemplate } from './TheRoyalSageTemplate';
import { RoseRomanceTemplate } from './RoseRomanceTemplate';
import { MinimalistChampagneTemplate } from './MinimalistChampagneTemplate';
import { IndoinviteBlueFlowersKhitananTemplate } from './IndoinviteBlueFlowersKhitananTemplate';

interface TemplateRendererProps {
  invitation: InvitationData;
  guest?: GuestItem;
  isPreview?: boolean;
}

export function TemplateRenderer({ invitation, guest, isPreview = false }: TemplateRendererProps) {
  const templateId = invitation.templateId.toLowerCase();
  const category = (invitation.category || '').toLowerCase();

  if (
    templateId.includes('blue-flowers') ||
    templateId.includes('khitanan') ||
    templateId.includes('aqiqah') ||
    category === 'khitanan' ||
    category === 'aqiqah'
  ) {
    return <IndoinviteBlueFlowersKhitananTemplate invitation={invitation} guest={guest} isPreview={isPreview} />;
  }

  if (templateId.includes('rose') || templateId.includes('indoinvite')) {
    return <RoseRomanceTemplate invitation={invitation} guest={guest} isPreview={isPreview} />;
  }

  if (templateId.includes('champagne') || templateId.includes('minimalist') || templateId.includes('nvi')) {
    return <MinimalistChampagneTemplate invitation={invitation} guest={guest} isPreview={isPreview} />;
  }

  // Default to The Royal Sage (Wevitation inspired)
  return <TheRoyalSageTemplate invitation={invitation} guest={guest} isPreview={isPreview} />;
}
