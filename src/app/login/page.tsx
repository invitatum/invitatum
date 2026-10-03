'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { useAuth } from '@/lib/auth/AuthContext';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Heart, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { loginWithGoogle, loginWithEmail, switchUserRoleForTesting } = useAuth();
  const { t } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    await loginWithEmail(email, password);
    setLoading(false);
    if (email.toLowerCase().includes('admin')) {
      router.push('/admin');
    } else {
      router.push('/dashboard/invitations');
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    await loginWithGoogle();
    setLoading(false);
    router.push('/dashboard/invitations');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-10 max-w-md w-full border border-[#E8E2D8] shadow-lg space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#C5A059] flex items-center justify-center mx-auto text-[#8C6E2D]">
              <Heart className="w-6 h-6 fill-[#C5A059]/20" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#242625]">
              {t.auth.loginTitle}
            </h1>
            <p className="text-xs text-[#5A605B]">{t.auth.loginSubtitle}</p>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full py-3 px-4 rounded-full border border-[#E8E2D8] bg-[#FAF7F2]/50 hover:bg-white text-xs font-semibold text-[#242625] transition-all flex items-center justify-center gap-3 tap-target-44 shadow-xs"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{t.auth.btnGoogle}</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#E8E2D8] w-full" />
            <span className="bg-white px-3 text-[11px] text-[#5A605B] uppercase tracking-wider absolute">
              {t.auth.orDivider}
            </span>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#5A605B] mb-1">
                {t.auth.email}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#5A605B] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@invitatum.com atau email Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E8E2D8] focus:ring-1 focus:ring-[#8C6E2D]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block font-semibold text-[#5A605B]">
                  {t.auth.password}
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] text-[#8C6E2D] hover:underline"
                >
                  {t.auth.forgotPassword}
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#5A605B] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E8E2D8] focus:ring-1 focus:ring-[#8C6E2D]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-[#8C6E2D] hover:bg-[#735A24] text-white font-medium text-xs shadow-xs transition-all flex items-center justify-center gap-2 tap-target-44 disabled:opacity-50"
            >
              <span>{loading ? 'Memproses...' : t.auth.btnLogin}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Sandbox Role Toggles for Fast Testing */}
          <div className="pt-3 border-t border-[#E8E2D8]/60 space-y-2 text-center">
            <span className="text-[10px] text-[#5A605B] uppercase tracking-wider">
              Akses Cepat Pengujian:
            </span>
            <div className="flex justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  switchUserRoleForTesting('admin');
                  router.push('/admin');
                }}
                className="px-3 py-1 rounded-full border border-[#C5A059] bg-[#FAF7F2] text-[10px] font-bold text-[#8C6E2D]"
              >
                Masuk sbg Super Admin
              </button>
              <button
                type="button"
                onClick={() => {
                  switchUserRoleForTesting('user');
                  router.push('/dashboard/invitations');
                }}
                className="px-3 py-1 rounded-full border border-[#607755] bg-[#FAF7F2] text-[10px] font-bold text-[#607755]"
              >
                Masuk sbg Pengguna (Alya & Budi)
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-[#5A605B]">
            {t.auth.noAccount}{' '}
            <Link href="/register" className="font-semibold text-[#8C6E2D] hover:underline">
              {t.auth.btnRegister}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
