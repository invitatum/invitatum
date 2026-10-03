'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShieldCheck,
  BarChart3,
  Layers,
  Users,
  CreditCard,
  FileText,
  Clock,
  Home,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isAdmin } = useAuth();

  const adminNav = [
    { name: 'Statistik & Ringkasan', href: '/admin', icon: BarChart3, exact: true },
    { name: 'Template Undangan', href: '/admin/templates', icon: Layers },
    { name: 'Pengguna & Paket Gratis', href: '/admin/users', icon: Users },
    { name: 'Harga & Paket', href: '/admin/packages', icon: CreditCard },
    { name: 'Konten & FAQ (CMS)', href: '/admin/content', icon: FileText },
    { name: 'Audit Log', href: '/admin/audit-logs', icon: Clock },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FAF7F2]">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-[#E8E2D8] flex flex-col justify-between shrink-0 p-6 space-y-6">
        <div className="space-y-6">
          {/* Logo */}
          <Link href="/admin" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-[#8C6E2D] flex items-center justify-center text-white shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-[#242625]">Super Admin</span>
              <span className="block text-[10px] text-[#8C6E2D] font-bold tracking-wider uppercase">
                Invitatum Core
              </span>
            </div>
          </Link>

          {/* Admin Navigation */}
          <nav className="space-y-1 text-xs">
            {adminNav.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);

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
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="space-y-2 pt-4 border-t border-[#E8E2D8] text-xs">
          <Link
            href="/dashboard/invitations"
            className="flex items-center gap-2 text-[#5A605B] hover:text-[#242625] px-3 py-2 tap-target-44"
          >
            <Sparkles className="w-4 h-4 text-[#8C6E2D]" />
            <span>Ke User Dashboard</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-[#5A605B] hover:text-[#242625] px-3 py-2 tap-target-44"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
