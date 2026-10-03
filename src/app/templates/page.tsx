'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { Search, Filter, Sparkles, Heart, ArrowRight } from 'lucide-react';
import { db } from '@/lib/db/dbAdapter';
import { TemplateStyleTag, EventCategory } from '@/types';

const ALL_STYLE_TAGS: TemplateStyleTag[] = [
  'floral',
  'minimalist',
  'classic',
  'luxury',
  'modern',
  'elegant',
  'traditional',
  'botanical',
  'romantic',
  'contemporary',
];

export default function TemplatesGalleryPage() {
  const allTemplates = db.getTemplates();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');
  const [selectedTag, setSelectedTag] = useState<TemplateStyleTag | 'all'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'newest'>('popular');

  const filteredTemplates = allTemplates
    .filter((tmpl) => {
      const matchSearch =
        tmpl.name.toLowerCase().includes(search.toLowerCase()) ||
        tmpl.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory = selectedCategory === 'all' || tmpl.category === selectedCategory;
      const matchTag = selectedTag === 'all' || tmpl.styleTags.includes(selectedTag);
      return matchSearch && matchCategory && matchTag;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') return b.purchaseCount - a.purchaseCount;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] uppercase tracking-widest text-[#8C6E2D] font-bold">
            Galeri Desain
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#242625]">
            Koleksi Template Undangan Digital
          </h1>
          <p className="text-xs sm:text-sm text-[#5A605B]">
            Setiap desain dirancang secara mendalam dengan tipografi anggun, tata letak mobile-first, dan interaktivitas buku tamu lengkap.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white p-6 rounded-3xl border border-[#E8E2D8] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#5A605B] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nama atau tema template..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E8E2D8] text-xs bg-[#FAF7F2]/50 text-[#242625] focus:outline-none focus:ring-1 focus:ring-[#8C6E2D]"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              {/* Category Pills */}
              <div className="flex p-1 bg-[#FAF7F2] rounded-full border border-[#E8E2D8] text-xs">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1 rounded-full font-medium transition-all ${
                    selectedCategory === 'all' ? 'bg-white text-[#8C6E2D] shadow-xs' : 'text-[#5A605B]'
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setSelectedCategory('wedding')}
                  className={`px-3 py-1 rounded-full font-medium transition-all ${
                    selectedCategory === 'wedding' ? 'bg-white text-[#8C6E2D] shadow-xs' : 'text-[#5A605B]'
                  }`}
                >
                  Pernikahan
                </button>
                <button
                  onClick={() => setSelectedCategory('engagement')}
                  className={`px-3 py-1 rounded-full font-medium transition-all ${
                    selectedCategory === 'engagement' ? 'bg-white text-[#8C6E2D] shadow-xs' : 'text-[#5A605B]'
                  }`}
                >
                  Pertunangan
                </button>
              </div>

              {/* Sort selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 rounded-full border border-[#E8E2D8] text-xs text-[#5A605B] bg-white"
              >
                <option value="popular">Terpopuler</option>
                <option value="newest">Terbaru</option>
              </select>
            </div>
          </div>

          {/* Style Tags Filter Bar */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#E8E2D8]/60 text-xs">
            <span className="text-[#5A605B] mr-1 text-[11px] font-semibold">Gaya:</span>
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-2.5 py-1 rounded-full border text-[10px] font-medium transition-all ${
                selectedTag === 'all'
                  ? 'border-[#8C6E2D] bg-[#8C6E2D] text-white'
                  : 'border-[#E8E2D8] text-[#5A605B] hover:bg-[#FAF7F2]'
              }`}
            >
              Semua Gaya
            </button>
            {ALL_STYLE_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-2.5 py-1 rounded-full border text-[10px] capitalize font-medium transition-all ${
                  selectedTag === tag
                    ? 'border-[#8C6E2D] bg-[#8C6E2D] text-white'
                    : 'border-[#E8E2D8] text-[#5A605B] hover:bg-[#FAF7F2]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.length === 0 ? (
            <div className="col-span-full py-16 text-center text-xs text-[#5A605B]">
              Tidak ada template yang cocok dengan kriteria pencarian Anda.
            </div>
          ) : (
            filteredTemplates.map((tmpl) => (
              <div
                key={tmpl.id}
                className="group bg-white rounded-3xl border border-[#E8E2D8] overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] bg-[#FAF7F2] overflow-hidden">
                    <img
                      src={tmpl.thumbnail}
                      alt={tmpl.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#8C6E2D] shadow-xs">
                        {tmpl.purchaseCount} Pengguna
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#607755] shadow-xs capitalize">
                        {tmpl.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {tmpl.styleTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[10px] text-[#5A605B] border border-[#E8E2D8]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#242625]">{tmpl.name}</h3>
                    <p className="text-xs text-[#5A605B] leading-relaxed line-clamp-2">
                      {tmpl.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#E8E2D8]/60 mt-4 flex items-center justify-between">
                  <Link
                    href={`/templates/${tmpl.id}`}
                    className="text-xs font-semibold text-[#5A605B] hover:text-[#242625]"
                  >
                    Detail Desain
                  </Link>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/templates/${tmpl.id}?mode=demo`}
                      className="px-3 py-1.5 rounded-full border border-[#E8E2D8] hover:bg-[#FAF7F2] text-xs font-medium text-[#242625] transition-colors tap-target-44"
                    >
                      Coba Demo
                    </Link>
                    <Link
                      href={`/dashboard/invitations/new?templateId=${tmpl.id}`}
                      className="px-4 py-1.5 rounded-full bg-[#8C6E2D] hover:bg-[#735A24] text-white text-xs font-semibold transition-colors shadow-xs tap-target-44"
                    >
                      Gunakan
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
