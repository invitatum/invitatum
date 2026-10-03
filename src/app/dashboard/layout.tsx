'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import {
  Heart,
  FileText,
  CreditCard,
  User,
  LogOut,
  Sparkles,
  ShieldCheck,
  Home,
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAdmin, logout } = useAuth();

  // If viewing the live editor, do not show sidebar
  if (pathname.includes('/editor')) {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const navLinks = [
    { name: 'Undangan Saya', href: '/dashboard/invitations', icon: FileText },
    { name: 'Riwayat Transaksi', href: '/dashboard/transactions', icon: CreditCard },
    { name: 'Profil Akun', href: '/dashboard/profile', icon: User },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FAF7F2]">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-[#E8E2D8] flex flex-col justify-between shrink-0 p-6 space-y-6">
        <div className="space-y-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#C5A059] flex items-center justify-center text-[#C5A059]">
              <Heart className="w-4 h-4 fill-[#C5A059]/20" />
            </div>
            <span className="font-serif text-xl font-bold text-[#242625]">Invitatum</span>
          </Link>

          {/* User Badge */}
          <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-1">
            <p className="text-[10px] text-[#5A605B] uppercase font-bold tracking-wider">
              Akun Aktif
            </p>
            <h4 className="font-serif text-sm font-bold text-[#242625] truncate">
              {user?.displayName || 'Pengguna Demo'}
            </h4>
            <p className="text-[11px] text-[#5A605B] truncate font-mono">
              {user?.email || 'demo@invitatum.com'}
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-medium transition-all tap-target-44 ${
                    isActive
                      ? 'bg-[#8C6E2D] text-white shadow-xs font-semibold'
                      : 'text-[#5A605B] hover:text-[#242625] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-semibold text-[#8C6E2D] bg-[#FAF7F2] border border-[#C5A059] transition-all tap-target-44 mt-4"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Super Admin Panel</span>
              </Link>
            )}
          </nav>
        </div>

        {/* Footer Sidebar Actions */}
        <div className="space-y-2 pt-4 border-t border-[#E8E2D8] text-xs">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#5A605B] hover:text-[#242625] px-3 py-2 tap-target-44"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 px-3 py-2 w-full text-left tap-target-44"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Akun</span>
          </button>
        </div>
      </aside>

      {/* Main Dashboard Content */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
