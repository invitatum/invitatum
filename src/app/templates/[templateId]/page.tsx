'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { db } from '@/lib/db/dbAdapter';
import { defaultDemoInvitation } from '@/lib/data/defaultData';
import { TemplateRenderer } from '@/components/templates/TemplateRenderer';
import {
  Sparkles,
  Smartphone,
  Monitor,
  Heart,
  CheckCircle2,
  ArrowRight,
  Edit,
  Eye,
} from 'lucide-react';

interface PageProps {
  params: Promise<{
    templateId: string;
  }>;
}

export default function TemplateDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const templateId = resolvedParams.templateId;

  const template = db.getTemplateById(templateId) || db.getTemplateBySlug(templateId);
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');

  if (!template) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="p-8 bg-white rounded-3xl border border-[#E8E2D8] text-center space-y-4">
            <h2 className="font-serif text-xl font-bold">Template Tidak Ditemukan</h2>
            <Link
              href="/templates"
              className="px-5 py-2.5 rounded-full bg-[#8C6E2D] text-white text-xs font-semibold"
            >
              Kembali ke Galeri
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Construct preview invitation based on this template
  const previewInvitation = {
    ...defaultDemoInvitation,
    templateId: template.id,
    title: `Preview: ${template.name}`,
  };

  const handleUseTemplate = () => {
    const newInvId = `inv-${Date.now()}`;
    const newInv = {
      ...defaultDemoInvitation,
      id: newInvId,
      templateId: template.id,
      title: `Undangan ${template.name}`,
      status: 'draft' as const,
    };
    db.saveInvitation(newInv);
    router.push(`/dashboard/invitations/${newInvId}/editor`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-10">
        {/* Template Overview Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-8 rounded-3xl border border-[#E8E2D8] shadow-xs">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FAF7F2] text-[#8C6E2D] border border-[#C5A059]">
                {template.category}
              </span>
              <span className="text-xs text-[#5A605B]">
                {template.purchaseCount} Pasangan Menggunakan Desain Ini
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#242625]">
              {template.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#5A605B] leading-relaxed">
              {template.description}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {template.styleTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[10px] text-[#5A605B] border border-[#E8E2D8] capitalize"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={handleUseTemplate}
              className="px-8 py-3.5 rounded-full bg-[#8C6E2D] hover:bg-[#735A24] text-white text-xs font-semibold shadow-md flex items-center justify-center gap-2 tap-target-44"
            >
              <Sparkles className="w-4 h-4" />
              <span>Gunakan Template Ini</span>
            </button>

            <Link
              href={`/dashboard/invitations/demo-invitation-alya-budi/editor`}
              className="px-8 py-3 rounded-full border border-[#E8E2D8] bg-[#FAF7F2] hover:bg-white text-xs font-semibold text-[#242625] flex items-center justify-center gap-2 tap-target-44"
            >
              <Edit className="w-3.5 h-3.5 text-[#8C6E2D]" />
              <span>Coba Demo Editor</span>
            </Link>
          </div>
        </div>

        {/* Live Device Preview Canvas */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-[#242625]">
              Live Preview Desain
            </h3>

            {/* Device Switcher */}
            <div className="flex items-center gap-1 p-1 bg-white rounded-full border border-[#E8E2D8]">
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  previewDevice === 'mobile'
                    ? 'bg-[#8C6E2D] text-white shadow-xs'
                    : 'text-[#5A605B]'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile View</span>
              </button>
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  previewDevice === 'desktop'
                    ? 'bg-[#8C6E2D] text-white shadow-xs'
                    : 'text-[#5A605B]'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop View</span>
              </button>
            </div>
          </div>

          <div className="bg-[#242625]/5 rounded-3xl p-4 sm:p-8 flex items-center justify-center min-h-[700px] border border-[#E8E2D8]">
            <div
              className={`transition-all duration-300 shadow-2xl overflow-y-auto bg-white ${
                previewDevice === 'mobile'
                  ? 'w-[375px] h-[720px] rounded-[40px] border-[10px] border-[#242625] relative'
                  : 'w-full max-w-4xl h-[760px] rounded-2xl border border-[#E8E2D8]'
              }`}
            >
              {previewDevice === 'mobile' && (
                <div className="sticky top-0 z-30 h-6 bg-[#FAF7F2] flex items-center justify-center">
                  <div className="w-20 h-3 bg-[#242625]/10 rounded-full" />
                </div>
              )}
              <TemplateRenderer invitation={previewInvitation} isPreview={true} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
