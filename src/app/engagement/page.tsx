'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';
import { db } from '@/lib/db/dbAdapter';

export default function EngagementPage() {
  const engagementTemplates = db.getTemplates().filter((t) => t.category === 'engagement');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#D99B9B]">
            <Sparkles className="w-3.5 h-3.5 text-[#8C3B4A]" />
            <span className="text-xs font-semibold text-[#8C3B4A] uppercase tracking-wide">
              Kategori Pertunangan (Engagement)
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#242625] leading-tight">
            Rayakan Janji Cinta Pertama Anda
          </h1>

          <p className="text-xs sm:text-base text-[#5A605B] leading-relaxed">
            Momen lamaran dan pertunangan adalah awal dari perjalanan seumur hidup. Hadirkan undangan digital yang hangat, intim, dan personal untuk keluarga serta sahabat terdekat.
          </p>

          <div className="pt-2 flex justify-center gap-4">
            <Link
              href="/templates?category=engagement"
              className="px-8 py-3 rounded-full bg-[#8C6E2D] text-white text-xs font-semibold shadow-md hover:bg-[#735A24] tap-target-44"
            >
              Pilih Desain Engagement
            </Link>
          </div>
        </div>

        {/* Engagement Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {engagementTemplates.map((tmpl) => (
            <div
              key={tmpl.id}
              className="bg-white rounded-3xl border border-[#E8E2D8] overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] bg-[#FAF7F2] overflow-hidden">
                  <img src={tmpl.thumbnail} alt={tmpl.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="font-serif text-xl font-bold text-[#242625]">{tmpl.name}</h3>
                  <p className="text-xs text-[#5A605B] line-clamp-2">{tmpl.description}</p>
                </div>
              </div>
              <div className="p-6 pt-0 border-t border-[#E8E2D8]/60 mt-4 flex items-center justify-between">
                <Link href={`/templates/${tmpl.id}`} className="text-xs font-semibold text-[#5A605B]">
                  Detail
                </Link>
                <Link
                  href={`/templates/${tmpl.id}?mode=demo`}
                  className="px-4 py-2 rounded-full bg-[#8C6E2D] text-white text-xs font-semibold"
                >
                  Coba Demo
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
