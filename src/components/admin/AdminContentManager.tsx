'use client';

import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, Plus, Trash2 } from 'lucide-react';
import { FaqItem, SystemSettings } from '@/types';
import { db } from '@/lib/db/dbAdapter';

export function AdminContentManager() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [settings, setSettings] = useState<SystemSettings>(db.getSettings());
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [newCategory, setNewCategory] = useState('Umum');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setFaqs(db.getFaqs());
  }, []);

  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) return;

    const newFaq: FaqItem = {
      id: `faq-${Date.now()}`,
      question: { id: newQuestion.trim(), en: newQuestion.trim() },
      answer: { id: newAnswer.trim(), en: newAnswer.trim() },
      category: newCategory,
    };

    db.saveFaq(newFaq);
    setFaqs([...faqs, newFaq]);
    setNewQuestion('');
    setNewAnswer('');
  };

  const handleDeleteFaq = (id: string) => {
    db.deleteFaq(id);
    setFaqs(faqs.filter((f) => f.id !== id));
  };

  const handleSaveSettings = () => {
    db.updateSettings(settings);
    db.addAuditLog({
      adminId: 'admin-super-01',
      adminEmail: 'admin@invitatum.com',
      action: 'SYSTEM_SETTINGS_UPDATED',
      targetType: 'settings',
      targetId: 'support-and-cms',
      details: 'Super Admin memperbarui informasi kontak layanan pelanggan dan CMS.',
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#242625]">
          Manajemen Konten & CMS Platform
        </h2>
        <p className="text-xs text-[#5A605B]">
          Kelola FAQ, informasi kontak layanan pelanggan, dan teks informasi resmi.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-2xl bg-[#607755]/10 border border-[#607755]/30 text-xs font-semibold text-[#607755] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Pengaturan konten berhasil disimpan.</span>
        </div>
      )}

      {/* Support Contacts */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-4">
        <h3 className="font-serif text-lg font-bold text-[#242625]">Kontak Layanan Pelanggan</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-[#5A605B] mb-1">Email Dukungan</label>
            <input
              type="email"
              value={settings.supportEmail}
              onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8]"
            />
          </div>
          <div>
            <label className="block font-semibold text-[#5A605B] mb-1">Nomor WhatsApp Bantuan</label>
            <input
              type="text"
              value={settings.supportWhatsapp}
              onChange={(e) => setSettings({ ...settings, supportWhatsapp: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8]"
            />
          </div>
        </div>

        <button
          onClick={handleSaveSettings}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#8C6E2D] text-white text-xs font-semibold shadow-xs tap-target-44"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Simpan Kontak</span>
        </button>
      </div>

      {/* FAQ Management */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-6">
        <h3 className="font-serif text-lg font-bold text-[#242625]">
          Kelola Daftar Pertanyaan Umum (FAQ)
        </h3>

        {/* Add FAQ form */}
        <form onSubmit={handleAddFaq} className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-3 text-xs">
          <div className="font-bold text-[#8C6E2D]">+ Tambah FAQ Baru</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <input
                type="text"
                required
                placeholder="Pertanyaan..."
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8] bg-white"
              />
            </div>
            <div>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8] bg-white"
              >
                <option value="Umum">Umum</option>
                <option value="Pembayaran">Pembayaran</option>
                <option value="Masa Aktif">Masa Aktif</option>
                <option value="Fitur">Fitur</option>
              </select>
            </div>
          </div>
          <textarea
            rows={2}
            required
            placeholder="Jawaban lengkap..."
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8] bg-white"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-1.5 rounded-full bg-[#8C6E2D] text-white font-medium text-xs shadow-xs"
            >
              Tambahkan FAQ
            </button>
          </div>
        </form>

        {/* Existing FAQ items */}
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="p-4 rounded-2xl bg-white border border-[#E8E2D8] flex items-start justify-between gap-4 text-xs"
            >
              <div className="space-y-1">
                <span className="inline-block px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[10px] text-[#8C6E2D] font-semibold border border-[#E8E2D8]">
                  {faq.category}
                </span>
                <h4 className="font-bold text-[#242625] text-sm">{faq.question.id}</h4>
                <p className="text-[#5A605B] leading-relaxed">{faq.answer.id}</p>
              </div>
              <button
                onClick={() => handleDeleteFaq(faq.id)}
                className="p-2 text-[#5A605B] hover:text-red-600 rounded-lg shrink-0 tap-target-44"
                title="Hapus FAQ"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
