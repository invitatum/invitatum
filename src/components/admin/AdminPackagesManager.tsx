'use client';

import React, { useState, useEffect } from 'react';
import { PackagePlan } from '@/types';
import { db } from '@/lib/db/dbAdapter';
import { Save, CheckCircle2 } from 'lucide-react';

export function AdminPackagesManager() {
  const [packages, setPackages] = useState<PackagePlan[]>([]);
  const [templateChangeFee, setTemplateChangeFee] = useState<number>(15000);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setPackages(db.getPackages());
    setTemplateChangeFee(db.getSettings().templateChangeFee);
  }, []);

  const handleUpdatePrice = (id: string, newPrice: number) => {
    setPackages(packages.map((p) => (p.id === id ? { ...p, price: newPrice } : p)));
  };

  const handleUpdateMonths = (id: string, newMonths: number) => {
    setPackages(packages.map((p) => (p.id === id ? { ...p, activeMonths: newMonths } : p)));
  };

  const handleSaveAll = () => {
    packages.forEach((p) => db.savePackage(p));
    db.updateSettings({ templateChangeFee });

    db.addAuditLog({
      adminId: 'admin-super-01',
      adminEmail: 'admin@invitatum.com',
      action: 'PACKAGE_PRICING_UPDATED',
      targetType: 'packages',
      targetId: 'all-tiers',
      details: `Paket harga dan masa aktif berhasil diperbarui oleh Super Admin.`,
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#242625]">
            Pengaturan Paket & Harga
          </h2>
          <p className="text-xs text-[#5A605B]">
            Sesuaikan harga, masa aktif, dan kuota media untuk setiap paket undangan.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#8C6E2D] hover:bg-[#735A24] text-white text-xs font-semibold shadow-xs tap-target-44 w-fit"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Perubahan</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-2xl bg-[#607755]/10 border border-[#607755]/30 text-xs font-semibold text-[#607755] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Pengaturan paket dan harga berhasil diperbarui dan dicatat dalam audit log.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#242625] uppercase tracking-wide">
                {pkg.name}
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#8C6E2D] border border-[#C5A059]">
                {pkg.tier}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#5A605B] mb-1">
                  Harga Pembelian (IDR)
                </label>
                <input
                  type="number"
                  value={pkg.price}
                  onChange={(e) => handleUpdatePrice(pkg.id, Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8] font-bold text-[#242625]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#5A605B] mb-1">
                  Masa Aktif (Bulan)
                </label>
                <input
                  type="number"
                  value={pkg.activeMonths}
                  onChange={(e) => handleUpdateMonths(pkg.id, Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-[#5A605B] mb-1">Maks. Foto</label>
                  <input
                    type="number"
                    value={pkg.maxPhotos}
                    disabled
                    className="w-full px-2 py-1.5 rounded-xl border border-[#E8E2D8] bg-[#FAF7F2]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#5A605B] mb-1">Maks. Video</label>
                  <input
                    type="number"
                    value={pkg.maxVideos}
                    disabled
                    className="w-full px-2 py-1.5 rounded-xl border border-[#E8E2D8] bg-[#FAF7F2]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#5A605B] mb-1">Fitur Utama</label>
                <ul className="list-disc pl-4 text-[11px] text-[#5A605B] space-y-0.5">
                  {pkg.features.slice(0, 4).map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-3">
        <h4 className="font-serif text-base font-bold text-[#242625]">
          Biaya Penggantian Template Setelah Publikasi
        </h4>
        <p className="text-xs text-[#5A605B]">
          Sesuai aturan bisnis, pengguna hanya dapat mengganti template 1 (satu) kali setelah publikasi dengan biaya administrasi.
        </p>
        <div className="w-64">
          <input
            type="number"
            value={templateChangeFee}
            onChange={(e) => setTemplateChangeFee(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8] text-xs font-bold"
          />
        </div>
      </div>
    </div>
  );
}
