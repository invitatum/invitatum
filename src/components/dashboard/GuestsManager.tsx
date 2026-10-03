'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  Share2,
  Copy,
  Trash2,
  Check,
  Search,
  Download,
  Upload,
  MessageCircle,
} from 'lucide-react';
import { GuestItem, InvitationData } from '@/types';
import { db } from '@/lib/db/dbAdapter';

interface GuestsManagerProps {
  invitation: InvitationData;
}

export function GuestsManager({ invitation }: GuestsManagerProps) {
  const [guests, setGuests] = useState<GuestItem[]>([]);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New guest form
  const [name, setName] = useState('');
  const [group, setGroup] = useState('Sahabat');
  const [customGreeting, setCustomGreeting] = useState('Kepada Yth. Bapak/Ibu/Saudara/i:');

  useEffect(() => {
    setGuests(db.getGuests(invitation.id));
  }, [invitation.id]);

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const newGuest: GuestItem = {
      id: `guest-${Date.now()}`,
      invitationId: invitation.id,
      name: name.trim(),
      slug: `${slug}-${Math.floor(Math.random() * 1000)}`,
      group: group.trim() || 'Umum',
      customGreeting: customGreeting.trim(),
      qrToken: `QR-${invitation.slug.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      isSent: false,
      rsvpStatus: 'pending',
      attendeesCount: 1,
      isCheckedIn: false,
      createdAt: new Date().toISOString(),
    };

    db.saveGuest(newGuest);
    setGuests([newGuest, ...guests]);
    setName('');
    setShowAddModal(false);
  };

  const handleDeleteGuest = (id: string) => {
    if (confirm('Hapus tamu ini dari daftar?')) {
      db.deleteGuest(id);
      setGuests(guests.filter((g) => g.id !== id));
    }
  };

  const getPersonalizedUrl = (guestSlug: string) => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/invitation/${invitation.slug}/untuk/${guestSlug}`;
    }
    return `https://${invitation.slug}.invitatum.com/untuk/${guestSlug}`;
  };

  const generateWaMessage = (guest: GuestItem) => {
    const link = getPersonalizedUrl(guest.slug);
    const text = `Assalamu'alaikum Wr. Wb. / Salam Sejahtera\n\n${guest.customGreeting}\n*${guest.name}*\n\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:\n\n*${invitation.title}*\n\nInfo lengkap dan konfirmasi kehadiran dapat dilihat melalui tautan undangan berikut:\n${link}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.\n\nTerima kasih.\n\nSalam hangat,\n*${invitation.couple.groomNickname} & ${invitation.couple.brideNickname}*`;
    return encodeURIComponent(text);
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportCsv = () => {
    const headers = ['Nama Tamu', 'Kategori/Grup', 'Status RSVP', 'Jumlah Hadir', 'Status Check-in', 'Tautan Undangan'];
    const rows = guests.map((g) => [
      `"${g.name}"`,
      `"${g.group}"`,
      `"${g.rsvpStatus}"`,
      g.attendeesCount,
      g.isCheckedIn ? 'Hadir (Check-in)' : 'Belum Check-in',
      `"${getPersonalizedUrl(g.slug)}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `daftar-tamu-${invitation.slug}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredGuests = guests.filter(
    (g) =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.group.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#242625]">Kelola Buku Tamu</h2>
          <p className="text-xs text-[#5A605B]">
            Buat tautan personal per tamu, bagikan via WhatsApp, dan pantau kehadiran.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E8E2D8] bg-white text-xs font-medium text-[#242625] hover:bg-[#FAF7F2] transition-colors tap-target-44"
          >
            <Download className="w-3.5 h-3.5 text-[#5A605B]" />
            <span>Ekspor CSV</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#8C6E2D] hover:bg-[#735A24] text-white text-xs font-medium shadow-xs transition-all tap-target-44"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Tambah Tamu</span>
          </button>
        </div>
      </div>

      {/* Search & Counter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E8E2D8]">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#5A605B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama atau grup tamu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#E8E2D8] text-xs bg-[#FAF7F2]/50 text-[#242625] focus:outline-none focus:ring-1 focus:ring-[#8C6E2D]"
          />
        </div>

        <div className="flex items-center gap-6 text-xs text-[#5A605B]">
          <div>
            Total Tamu: <span className="font-bold text-[#242625]">{guests.length}</span>
          </div>
          <div>
            Konfirmasi Hadir:{' '}
            <span className="font-bold text-[#607755]">
              {guests.filter((g) => g.rsvpStatus === 'attending').length}
            </span>
          </div>
          <div>
            Sudah Check-in:{' '}
            <span className="font-bold text-[#8C6E2D]">
              {guests.filter((g) => g.isCheckedIn).length}
            </span>
          </div>
        </div>
      </div>

      {/* Guests Table */}
      <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F2] border-b border-[#E8E2D8] text-[#5A605B] uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Nama Tamu</th>
                <th className="py-3 px-4">Grup</th>
                <th className="py-3 px-4">Status RSVP</th>
                <th className="py-3 px-4">Check-in</th>
                <th className="py-3 px-4 text-right">Tautan & WhatsApp</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E2D8]/60">
              {filteredGuests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#5A605B]">
                    Tidak ada data tamu yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredGuests.map((g) => (
                  <tr key={g.id} className="hover:bg-[#FAF7F2]/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#242625]">{g.name}</div>
                      <div className="text-[10px] text-[#5A605B] font-mono">{g.qrToken}</div>
                    </td>
                    <td className="py-3.5 px-4 text-[#5A605B]">{g.group}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          g.rsvpStatus === 'attending'
                            ? 'bg-[#607755]/10 text-[#607755]'
                            : g.rsvpStatus === 'declined'
                            ? 'bg-red-50 text-red-600'
                            : 'bg-yellow-50 text-yellow-700'
                        }`}
                      >
                        {g.rsvpStatus === 'attending'
                          ? `Hadir (${g.attendeesCount} org)`
                          : g.rsvpStatus === 'declined'
                          ? 'Tidak Hadir'
                          : 'Belum Konfirmasi'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {g.isCheckedIn ? (
                        <span className="text-[#607755] font-semibold text-[11px]">✓ Hadir</span>
                      ) : (
                        <span className="text-[#5A605B] text-[11px]">-</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => copyToClipboard(g.id, getPersonalizedUrl(g.slug))}
                          className="p-1.5 rounded-lg border border-[#E8E2D8] hover:bg-[#FAF7F2] text-[#5A605B] tap-target-44 flex items-center gap-1"
                          title="Salin Tautan Personal"
                        >
                          {copiedId === g.id ? (
                            <Check className="w-3.5 h-3.5 text-[#607755]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span className="text-[10px]">Tautan</span>
                        </button>

                        <a
                          href={`https://wa.me/?text=${generateWaMessage(g)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#25D366] text-white text-[10px] font-semibold hover:bg-[#1EBE5D] transition-colors tap-target-44"
                          title="Kirim Pesan WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleDeleteGuest(g.id)}
                        className="p-1.5 text-[#5A605B] hover:text-red-600 rounded-lg tap-target-44"
                        title="Hapus Tamu"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Guest */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E8E2D8] shadow-xl space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#242625]">Tambah Tamu Undangan</h3>
            <form onSubmit={handleAddGuest} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#5A605B] mb-1">Nama Tamu *</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Budi Santoso & Keluarga"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#5A605B] mb-1">Grup / Kategori</label>
                <input
                  type="text"
                  placeholder="Sahabat / Keluarga / Rekan Kerja"
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#5A605B] mb-1">Sapaan Hormat</label>
                <input
                  type="text"
                  value={customGreeting}
                  onChange={(e) => setCustomGreeting(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-full border border-[#E8E2D8] text-[#5A605B]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#8C6E2D] text-white font-medium shadow-xs"
                >
                  Simpan Tamu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
