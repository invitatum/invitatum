'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useAuth } from '@/lib/auth/AuthContext';
import { Heart, Menu, X, Sparkles, Globe, User, ShieldCheck } from 'lucide-react';

export function Navbar() {
  const { t, locale, setLocale } = useLanguage();
  const { user, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLocale(locale === 'id' ? 'en' : 'id');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E2D8] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#C5A059] flex items-center justify-center text-[#C5A059] shadow-sm group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-[#C5A059]/20" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-wide text-[#242625] group-hover:text-[#8C6E2D] transition-colors">
                Invitatum
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#5A605B]">
                Digital Invitation
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-[#242625] hover:text-[#8C6E2D] transition-colors py-2"
            >
              {t.nav.home}
            </Link>
            <Link
              href="/wedding"
              className="text-sm font-medium text-[#242625] hover:text-[#8C6E2D] transition-colors py-2"
            >
              {t.nav.wedding}
            </Link>
            <Link
              href="/engagement"
              className="text-sm font-medium text-[#242625] hover:text-[#8C6E2D] transition-colors py-2"
            >
              {t.nav.engagement}
            </Link>
            <Link
              href="/templates"
              className="text-sm font-medium text-[#242625] hover:text-[#8C6E2D] transition-colors py-2"
            >
              {t.nav.templates}
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-[#242625] hover:text-[#8C6E2D] transition-colors py-2"
            >
              {t.nav.pricing}
            </Link>
            <Link
              href="/faq"
              className="text-sm font-medium text-[#242625] hover:text-[#8C6E2D] transition-colors py-2"
            >
              {t.nav.faq}
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E8E2D8] text-xs font-semibold text-[#5A605B] hover:text-[#242625] hover:border-[#C5A059] transition-all tap-target-44"
              title="Ganti Bahasa / Switch Language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{locale.toUpperCase()}</span>
            </button>

            {/* Dashboard / Admin / Login */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E8E2D8] text-sm font-medium text-[#242625] hover:border-[#607755] hover:text-[#607755] transition-all shadow-xs tap-target-44"
                >
                  <User className="w-4 h-4 text-[#607755]" />
                  <span>{t.nav.dashboard}</span>
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#FAF7F2] border border-[#C5A059] text-xs font-medium text-[#8C6E2D] hover:bg-[#C5A059] hover:text-white transition-all tap-target-44"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Admin</span>
                  </Link>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="text-sm font-medium text-[#5A605B] hover:text-[#242625] px-3 py-2 transition-colors tap-target-44 flex items-center"
              >
                {t.nav.login}
              </Link>
            )}

            {/* Primary Action Button */}
            <Link
              href="/templates"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8C6E2D] hover:bg-[#735A24] text-white text-sm font-medium shadow-sm transition-all hover:shadow-md tap-target-44"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.nav.createInvitation}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-full border border-[#E8E2D8] text-xs font-semibold text-[#5A605B]"
            >
              {locale.toUpperCase()}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-[#242625] hover:bg-[#E8E2D8]/50 tap-target-44"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E8E2D8] bg-[#FAF7F2] px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-[#242625] hover:bg-white"
          >
            {t.nav.home}
          </Link>
          <Link
            href="/wedding"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-[#242625] hover:bg-white"
          >
            {t.nav.wedding}
          </Link>
          <Link
            href="/engagement"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-[#242625] hover:bg-white"
          >
            {t.nav.engagement}
          </Link>
          <Link
            href="/templates"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-[#242625] hover:bg-white"
          >
            {t.nav.templates}
          </Link>
          <Link
            href="/pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-[#242625] hover:bg-white"
          >
            {t.nav.pricing}
          </Link>
          <Link
            href="/faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-[#242625] hover:bg-white"
          >
            {t.nav.faq}
          </Link>

          <div className="pt-4 border-t border-[#E8E2D8] space-y-2">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-3 rounded-full bg-white border border-[#E8E2D8] text-sm font-medium text-[#242625]"
                >
                  {t.nav.dashboard}
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-3 rounded-full bg-[#FAF7F2] border border-[#C5A059] text-sm font-medium text-[#8C6E2D]"
                  >
                    Super Admin Dashboard
                  </Link>
                )}
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-3 rounded-full bg-white border border-[#E8E2D8] text-sm font-medium text-[#242625]"
              >
                {t.nav.login}
              </Link>
            )}

            <Link
              href="/templates"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center px-5 py-3 rounded-full bg-[#8C6E2D] text-white text-sm font-medium shadow-sm"
            >
              {t.nav.createInvitation}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
