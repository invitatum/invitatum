'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Heart, Mail, Phone, MessageSquare } from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#FAF7F2] border-t border-[#E8E2D8] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#C5A059] flex items-center justify-center text-[#C5A059]">
                <Heart className="w-4 h-4 fill-[#C5A059]/20" />
              </div>
              <span className="font-serif text-2xl font-bold text-[#242625]">Invitatum</span>
            </div>
            <p className="text-sm text-[#5A605B] leading-relaxed">
              {t.footer.aboutDesc}
            </p>
            <div className="pt-2 text-xs text-[#5A605B]">
              Ivory, Dusty Pink, Sage Green & Champagne Gold.
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#8C6E2D]">
              Kategori Acara
            </h4>
            <ul className="space-y-2 text-sm text-[#5A605B]">
              <li>
                <Link href="/wedding" className="hover:text-[#242625] transition-colors">
                  {t.categories.wedding.title}
                </Link>
              </li>
              <li>
                <Link href="/engagement" className="hover:text-[#242625] transition-colors">
                  {t.categories.engagement.title}
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-[#242625] transition-colors">
                  {t.nav.templates}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#242625] transition-colors">
                  {t.nav.pricing}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Guides */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#8C6E2D]">
              Bantuan & Kebijakan
            </h4>
            <ul className="space-y-2 text-sm text-[#5A605B]">
              <li>
                <Link href="/faq" className="hover:text-[#242625] transition-colors">
                  {t.nav.faq}
                </Link>
              </li>
              <li>
                <Link href="/guide" className="hover:text-[#242625] transition-colors">
                  {t.footer.guide}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#242625] transition-colors">
                  {t.footer.terms}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#242625] transition-colors">
                  {t.footer.privacy}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#8C6E2D]">
              {t.footer.contact}
            </h4>
            <div className="space-y-2.5 text-sm text-[#5A605B]">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#607755] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#607755]" />
                <span>+62 812-3456-7890 (WhatsApp)</span>
              </a>
              <a
                href="mailto:bantuan@invitatum.com"
                className="flex items-center gap-2 hover:text-[#8C6E2D] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#8C6E2D]" />
                <span>bantuan@invitatum.com</span>
              </a>
              <div className="flex items-center gap-2 pt-1 text-xs text-[#5A605B]">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Layanan Aktif: 08.00 - 21.00 WIB</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#E8E2D8] flex flex-col sm:flex-row items-center justify-between text-xs text-[#5A605B] gap-4">
          <p>© {new Date().getFullYear()} Invitatum. {t.footer.copyright}</p>
          <p className="flex items-center gap-1">
            Dirancang dengan cinta dan keanggunan.
          </p>
        </div>
      </div>
    </footer>
  );
}
