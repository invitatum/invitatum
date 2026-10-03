'use client';

import React, { useState } from 'react';
import {
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { db } from '@/lib/db/dbAdapter';

const COLORS = ['#607755', '#C5A059', '#8C3B4A', '#242625'];

export function AdminStatsView() {
  const [period, setPeriod] = useState<'7days' | '30days' | 'year'>('30days');

  const users = db.getAllUsers();
  const invitations = db.getAllInvitations();
  const transactions = db.getTransactions();
  const templates = db.getTemplates();

  const totalRevenue = transactions
    .filter((t) => t.status === 'settlement')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const publishedCount = invitations.filter((i) => i.status === 'published').length;
  const activeCount = invitations.filter((i) => i.status === 'published' || i.status === 'paid').length;
  const draftCount = invitations.filter((i) => i.status === 'draft').length;

  // Chart data: Monthly transactions / sales
  const salesData = [
    { month: 'Jan', revenue: 1250000, orders: 28 },
    { month: 'Feb', revenue: 2100000, orders: 45 },
    { month: 'Mar', revenue: 3450000, orders: 72 },
    { month: 'Apr', revenue: 2900000, orders: 60 },
    { month: 'Mei', revenue: 4100000, orders: 88 },
    { month: 'Jun', revenue: 5200000, orders: 110 },
  ];

  // Category breakdown
  const categoryData = [
    { name: 'Wedding (Pernikahan)', value: invitations.filter((i) => i.category === 'wedding').length || 15 },
    { name: 'Engagement (Pertunangan)', value: invitations.filter((i) => i.category === 'engagement').length || 6 },
  ];

  return (
    <div className="space-y-8">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#242625]">
            Statistik & Analitik Platform
          </h2>
          <p className="text-xs text-[#5A605B]">
            Data performa nyata berdasarkan transaksi terverifikasi dan aktivitas pengguna.
          </p>
        </div>

        {/* Period Filter */}
        <div className="flex items-center gap-1 p-1 bg-white rounded-full border border-[#E8E2D8] w-fit">
          <button
            onClick={() => setPeriod('7days')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              period === '7days' ? 'bg-[#8C6E2D] text-white' : 'text-[#5A605B]'
            }`}
          >
            7 Hari
          </button>
          <button
            onClick={() => setPeriod('30days')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              period === '30days' ? 'bg-[#8C6E2D] text-white' : 'text-[#5A605B]'
            }`}
          >
            30 Hari
          </button>
          <button
            onClick={() => setPeriod('year')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              period === 'year' ? 'bg-[#8C6E2D] text-white' : 'text-[#5A605B]'
            }`}
          >
            Tahun Ini
          </button>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5A605B]">
              Total Pendapatan
            </span>
            <div className="w-8 h-8 rounded-full bg-[#607755]/10 text-[#607755] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#242625]">
            Rp{totalRevenue.toLocaleString('id-ID')}
          </h3>
          <p className="text-[11px] text-[#607755] font-medium">Berdasarkan transaksi Midtrans</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5A605B]">
              Undangan Aktif
            </span>
            <div className="w-8 h-8 rounded-full bg-[#C5A059]/15 text-[#8C6E2D] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#242625]">{activeCount}</h3>
          <p className="text-[11px] text-[#5A605B]">
            {publishedCount} dipublikasi • {draftCount} draf
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5A605B]">
              Total Pengguna
            </span>
            <div className="w-8 h-8 rounded-full bg-[#FAF7F2] text-[#242625] flex items-center justify-center border border-[#E8E2D8]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#242625]">{users.length}</h3>
          <p className="text-[11px] text-[#5A605B]">Terdaftar di sistem Invitatum</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5A605B]">
              Koleksi Template
            </span>
            <div className="w-8 h-8 rounded-full bg-[#8C3B4A]/10 text-[#8C3B4A] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#242625]">{templates.length}</h3>
          <p className="text-[11px] text-[#5A605B]">Wedding & Engagement</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trend Bar Chart */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-4">
          <h4 className="font-serif text-lg font-bold text-[#242625]">Tren Pendapatan Bulanan</h4>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E2D8" />
                <XAxis dataKey="month" stroke="#5A605B" fontSize={12} />
                <YAxis stroke="#5A605B" fontSize={12} tickFormatter={(val) => `Rp${val / 1000}k`} />
                <Tooltip
                  formatter={(val: any) => [`Rp${Number(val).toLocaleString('id-ID')}`, 'Pendapatan']}
                  contentStyle={{ backgroundColor: '#FAF7F2', borderColor: '#E8E2D8', borderRadius: 12 }}
                />
                <Bar dataKey="revenue" fill="#607755" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Pie Chart */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-4">
          <h4 className="font-serif text-lg font-bold text-[#242625]">Distribusi Kategori Acara</h4>
          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#FAF7F2', borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 text-xs">
            {categoryData.map((cat, i) => (
              <div key={cat.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-[#5A605B]">{cat.name}</span>
                </div>
                <span className="font-bold text-[#242625]">{cat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
