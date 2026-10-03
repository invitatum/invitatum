'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { db } from '@/lib/db/dbAdapter';
import {
  Heart,
  Sparkles,
  Calendar,
  CheckCircle2,
  Users,
  MessageCircle,
  QrCode,
  Music,
  ArrowRight,
  ChevronDown,
  Gift,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';

export default function HomePage() {
  const { t } = useLanguage();
  const templates = db.getTemplates();
  const packages = db.getPackages();
  const faqs = db.getFaqs();

  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden text-center">
          <div className="max-w-4xl mx-auto space-y-6 relative z-10">
            {/* Romantic Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#C5A059] shadow-xs">
              <Heart className="w-3.5 h-3.5 text-[#C5A059] fill-[#C5A059]/20" />
              <span className="text-xs font-semibold text-[#8C6E2D] tracking-wide">
                {t.hero.badge}
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#242625] leading-[1.15]">
              {t.hero.title}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[#5A605B] max-w-2xl mx-auto leading-relaxed">
              {t.hero.description}
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/templates"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#8C6E2D] hover:bg-[#735A24] text-white text-sm font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 tap-target-44"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.hero.ctaCreate}</span>
              </Link>
              <Link
                href="/templates"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white border border-[#E8E2D8] hover:border-[#8C6E2D] text-[#242625] text-sm font-medium transition-all shadow-xs tap-target-44 flex items-center justify-center gap-2"
              >
                <span>{t.hero.ctaBrowse}</span>
                <ArrowRight className="w-4 h-4 text-[#5A605B]" />
              </Link>
            </div>

            {/* Value Highlights */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#5A605B]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#607755]" />
                <span>{t.hero.feature1}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#607755]" />
                <span>{t.hero.feature2}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#607755]" />
                <span>{t.hero.feature3}</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Mockup Preview */}
          <div className="max-w-5xl mx-auto mt-14 relative px-4">
            <div className="p-3 sm:p-4 rounded-[32px] sm:rounded-[44px] bg-white border border-[#E8E2D8] shadow-2xl">
              <div className="relative rounded-[24px] sm:rounded-[36px] overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-[#FAF7F2]">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80"
                  alt="Invitatum Wedding Mockup"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-10 text-white text-left">
                  <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">
                    Template Unggulan: The Royal Sage
                  </span>
                  <h3 className="font-serif text-xl sm:text-3xl font-bold mt-1">
                    Alya & Budi • 15 November 2026
                  </h3>
                  <p className="text-xs text-white/80 max-w-lg mt-1">
                    Terinspirasi sentuhan floral botanikal anggun dengan bingkai lengkung khas Wevitation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E8E2D8]">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#242625]">
              {t.categories.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#5A605B]">
              {t.categories.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Wedding Card */}
            <Link
              href="/wedding"
              className="group p-8 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-center gap-6"
            >
              <div className="w-24 h-24 rounded-2xl bg-[#607755]/10 border border-[#607755]/20 flex items-center justify-center text-[#607755] shrink-0 group-hover:scale-105 transition-transform">
                <Heart className="w-10 h-10 fill-[#607755]/20" />
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="font-serif text-xl font-bold text-[#242625] group-hover:text-[#8C6E2D] transition-colors">
                  {t.categories.wedding.title}
                </h3>
                <p className="text-xs text-[#5A605B] leading-relaxed">
                  {t.categories.wedding.desc}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#8C6E2D]">
                  <span>Lihat Template Wedding</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>

            {/* Engagement Card */}
            <Link
              href="/engagement"
              className="group p-8 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-center gap-6"
            >
              <div className="w-24 h-24 rounded-2xl bg-[#D99B9B]/15 border border-[#D99B9B]/30 flex items-center justify-center text-[#8C3B4A] shrink-0 group-hover:scale-105 transition-transform">
                <Sparkles className="w-10 h-10" />
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="font-serif text-xl font-bold text-[#242625] group-hover:text-[#8C6E2D] transition-colors">
                  {t.categories.engagement.title}
                </h3>
                <p className="text-xs text-[#5A605B] leading-relaxed">
                  {t.categories.engagement.desc}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#8C6E2D]">
                  <span>Lihat Template Engagement</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* Popular Templates Gallery */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#8C6E2D] font-bold">
                Koleksi Pilihan
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#242625] mt-1">
                Template Terpopuler Berdasarkan Pembelian
              </h2>
            </div>
            <Link
              href="/templates"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#8C6E2D] hover:text-[#735A24] transition-colors"
            >
              <span>Lihat Seluruh {templates.length} Template</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.slice(0, 3).map((tmpl) => (
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
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#8C6E2D] shadow-xs">
                        {tmpl.purchaseCount} Pengguna
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {tmpl.styleTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[10px] text-[#5A605B] border border-[#E8E2D8]"
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
                    Lihat Detail
                  </Link>

                  <Link
                    href={`/templates/${tmpl.id}?mode=demo`}
                    className="px-4 py-2 rounded-full bg-[#8C6E2D] hover:bg-[#735A24] text-white text-xs font-medium transition-colors tap-target-44"
                  >
                    Coba Demo
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Invitatum Advantages */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#E8E2D8]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#242625]">
                {t.features.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#5A605B]">
                {t.features.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#E8E2D8] flex items-center justify-center text-[#8C6E2D]">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#242625]">
                  {t.features.editor.title}
                </h3>
                <p className="text-xs text-[#5A605B] leading-relaxed">
                  {t.features.editor.desc}
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#E8E2D8] flex items-center justify-center text-[#607755]">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#242625]">
                  {t.features.rsvp.title}
                </h3>
                <p className="text-xs text-[#5A605B] leading-relaxed">
                  {t.features.rsvp.desc}
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#E8E2D8] flex items-center justify-center text-[#25D366]">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#242625]">
                  {t.features.whatsapp.title}
                </h3>
                <p className="text-xs text-[#5A605B] leading-relaxed">
                  {t.features.whatsapp.desc}
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#E8E2D8] flex items-center justify-center text-[#8C3B4A]">
                  <Gift className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#242625]">
                  {t.features.gift.title}
                </h3>
                <p className="text-xs text-[#5A605B] leading-relaxed">
                  {t.features.gift.desc}
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#E8E2D8] flex items-center justify-center text-[#C5A059]">
                  <QrCode className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#242625]">
                  {t.features.qr.title}
                </h3>
                <p className="text-xs text-[#5A605B] leading-relaxed">
                  {t.features.qr.desc}
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#E8E2D8] flex items-center justify-center text-[#8C6E2D]">
                  <Music className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#242625]">
                  {t.features.music.title}
                </h3>
                <p className="text-xs text-[#5A605B] leading-relaxed">
                  {t.features.music.desc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-[11px] uppercase tracking-widest text-[#8C6E2D] font-bold">
              Harga Jujur
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#242625]">
              {t.pricing.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#5A605B]">
              {t.pricing.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg) => {
              const isPopular = pkg.tier === 'premium';
              return (
                <div
                  key={pkg.id}
                  className={`rounded-3xl p-8 flex flex-col justify-between transition-all ${
                    isPopular
                      ? 'bg-white border-2 border-[#C5A059] shadow-xl relative'
                      : 'bg-white border border-[#E8E2D8] shadow-xs'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#8C6E2D] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      {t.pricing.popularTag}
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-[#242625] uppercase tracking-wide">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-[#5A605B] mt-1">{pkg.description}</p>
                    </div>

                    <div>
                      <div className="font-serif text-4xl font-bold text-[#8C6E2D]">
                        Rp{pkg.price.toLocaleString('id-ID')}
                      </div>
                      <span className="text-xs text-[#5A605B]">
                        Masa aktif {pkg.activeMonths} bulan • Sekali bayar
                      </span>
                    </div>

                    <div className="pt-4 border-t border-[#E8E2D8] space-y-2.5 text-xs text-[#5A605B]">
                      {pkg.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#607755] shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8">
                    <Link
                      href={`/checkout?tier=${pkg.tier}`}
                      className={`w-full py-3.5 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-2 tap-target-44 ${
                        isPopular
                          ? 'bg-[#8C6E2D] hover:bg-[#735A24] text-white shadow-md'
                          : 'bg-[#FAF7F2] hover:bg-[#E8E2D8] text-[#242625] border border-[#E8E2D8]'
                      }`}
                    >
                      <span>{t.pricing.selectPlan}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#E8E2D8]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#242625]">
                {t.howItWorks.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#5A605B]">
                {t.howItWorks.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-2">
                <span className="w-8 h-8 rounded-full bg-white border border-[#C5A059] flex items-center justify-center mx-auto text-xs font-bold text-[#8C6E2D]">
                  1
                </span>
                <h3 className="font-serif text-base font-bold text-[#242625]">{t.howItWorks.step1Title}</h3>
                <p className="text-xs text-[#5A605B]">{t.howItWorks.step1Desc}</p>
              </div>

              <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-2">
                <span className="w-8 h-8 rounded-full bg-white border border-[#C5A059] flex items-center justify-center mx-auto text-xs font-bold text-[#8C6E2D]">
                  2
                </span>
                <h3 className="font-serif text-base font-bold text-[#242625]">{t.howItWorks.step2Title}</h3>
                <p className="text-xs text-[#5A605B]">{t.howItWorks.step2Desc}</p>
              </div>

              <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-2">
                <span className="w-8 h-8 rounded-full bg-white border border-[#C5A059] flex items-center justify-center mx-auto text-xs font-bold text-[#8C6E2D]">
                  3
                </span>
                <h3 className="font-serif text-base font-bold text-[#242625]">{t.howItWorks.step3Title}</h3>
                <p className="text-xs text-[#5A605B]">{t.howItWorks.step3Desc}</p>
              </div>

              <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-2">
                <span className="w-8 h-8 rounded-full bg-white border border-[#C5A059] flex items-center justify-center mx-auto text-xs font-bold text-[#8C6E2D]">
                  4
                </span>
                <h3 className="font-serif text-base font-bold text-[#242625]">{t.howItWorks.step4Title}</h3>
                <p className="text-xs text-[#5A605B]">{t.howItWorks.step4Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <div className="text-center mb-14 space-y-2">
            <span className="text-[11px] uppercase tracking-widest text-[#8C6E2D] font-bold">
              Bantuan
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#242625]">
              {t.faq.title}
            </h2>
            <p className="text-xs text-[#5A605B]">{t.faq.subtitle}</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-white border border-[#E8E2D8] overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-sm sm:text-base text-[#242625] hover:text-[#8C6E2D] transition-colors tap-target-44"
                  >
                    <span>{faq.question.id}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#5A605B] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#5A605B] leading-relaxed border-t border-[#E8E2D8]/50 pt-3">
                      {faq.answer.id}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
