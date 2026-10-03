'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Save,
  Eye,
  Smartphone,
  Monitor,
  ArrowLeft,
  Sparkles,
  Heart,
  Calendar,
  Image as ImageIcon,
  Music,
  Gift,
  Palette,
  CheckCircle2,
  Clock,
  Undo2,
  Redo2,
  ExternalLink,
} from 'lucide-react';
import { InvitationData, PackageTier } from '@/types';
import { db } from '@/lib/db/dbAdapter';
import { TemplateRenderer } from '@/components/templates/TemplateRenderer';

interface InvitationEditorProps {
  initialInvitation: InvitationData;
  onSaveSuccess?: (updated: InvitationData) => void;
  isDemoMode?: boolean;
}

type EditorTab =
  | 'couple'
  | 'events'
  | 'countdown'
  | 'story'
  | 'gallery'
  | 'music'
  | 'gift'
  | 'theme';

export function InvitationEditor({
  initialInvitation,
  onSaveSuccess,
  isDemoMode = false,
}: InvitationEditorProps) {
  const [invitation, setInvitation] = useState<InvitationData>(initialInvitation);
  const [history, setHistory] = useState<InvitationData[]>([initialInvitation]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const [activeTab, setActiveTab] = useState<EditorTab>('couple');
  const [previewMode, setPreviewMode] = useState<'mobile' | 'desktop'>('mobile');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Autosave simulation
  useEffect(() => {
    if (saveStatus === 'unsaved') {
      const timer = setTimeout(() => {
        handleSave();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [saveStatus, invitation]);

  const updateInvitationState = (updated: InvitationData) => {
    setInvitation(updated);
    setSaveStatus('unsaved');

    // Update history for undo/redo
    const newHist = history.slice(0, historyIndex + 1);
    newHist.push(updated);
    setHistory(newHist);
    setHistoryIndex(newHist.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setInvitation(prev);
      setSaveStatus('unsaved');
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setInvitation(next);
      setSaveStatus('unsaved');
    }
  };

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      db.saveInvitation(invitation);
      if (isDemoMode) {
        localStorage.setItem('invitatum_pending_demo_invitation', JSON.stringify(invitation));
      }
      setSaveStatus('saved');
      showToast('Perubahan berhasil disimpan');
      if (onSaveSuccess) onSaveSuccess(invitation);
    }, 400);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="flex flex-col h-screen bg-[#FAF7F2] overflow-hidden">
      {/* Editor Header */}
      <header className="h-16 bg-white border-b border-[#E8E2D8] px-4 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-3">
          <Link
            href={isDemoMode ? '/' : '/dashboard/invitations'}
            className="p-2 rounded-xl text-[#5A605B] hover:text-[#242625] hover:bg-[#FAF7F2] transition-colors tap-target-44"
            title="Kembali"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-serif text-lg font-bold text-[#242625] truncate max-w-[200px] sm:max-w-xs">
              {invitation.title}
            </h1>
            <div className="flex items-center gap-2 text-xs text-[#5A605B]">
              <span className="capitalize">{invitation.category}</span>
              <span>•</span>
              <span className="uppercase text-[#8C6E2D] font-semibold">{invitation.packageTier}</span>
            </div>
          </div>
        </div>

        {/* Center: Preview device toggle */}
        <div className="hidden md:flex items-center gap-1 p-1 bg-[#FAF7F2] rounded-full border border-[#E8E2D8]">
          <button
            onClick={() => setPreviewMode('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
              previewMode === 'mobile'
                ? 'bg-white text-[#8C6E2D] shadow-xs'
                : 'text-[#5A605B] hover:text-[#242625]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
          <button
            onClick={() => setPreviewMode('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
              previewMode === 'desktop'
                ? 'bg-white text-[#8C6E2D] shadow-xs'
                : 'text-[#5A605B] hover:text-[#242625]'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Undo / Redo */}
          <div className="hidden sm:flex items-center gap-1">
            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="p-2 text-[#5A605B] hover:text-[#242625] disabled:opacity-30 tap-target-44"
              title="Undo (Kembalikan)"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="p-2 text-[#5A605B] hover:text-[#242625] disabled:opacity-30 tap-target-44"
              title="Redo (Ulangi)"
            >
              <Redo2 className="w-4 h-4" />
            </button>
          </div>

          {/* Autosave Indicator */}
          <div className="hidden lg:flex items-center gap-1 text-xs text-[#5A605B] px-2">
            {saveStatus === 'saved' && (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#607755]" />
                <span>Tersimpan</span>
              </>
            )}
            {saveStatus === 'saving' && (
              <>
                <Clock className="w-3.5 h-3.5 text-[#C5A059] animate-spin" />
                <span>Menyimpan...</span>
              </>
            )}
            {saveStatus === 'unsaved' && <span>Menyimpan otomatis...</span>}
          </div>

          {/* Manual Save Button */}
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#8C6E2D] hover:bg-[#735A24] text-white text-xs font-medium shadow-xs transition-all tap-target-44"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan</span>
          </button>

          {isDemoMode ? (
            <Link
              href="/register"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#607755] hover:bg-[#4E6244] text-white text-xs font-medium shadow-xs transition-all tap-target-44"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simpan ke Akun</span>
            </Link>
          ) : (
            <Link
              href={`/invitation/${invitation.slug}`}
              target="_blank"
              className="p-2 rounded-full border border-[#E8E2D8] text-[#5A605B] hover:text-[#242625] transition-colors tap-target-44"
              title="Buka Tautan Langsung"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          )}
        </div>
      </header>

      {/* Editor Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar / Form Controls */}
        <div className="w-full md:w-[420px] lg:w-[460px] bg-white border-r border-[#E8E2D8] flex flex-col shrink-0 z-20 overflow-hidden">
          {/* Section Navigation Tabs */}
          <div className="flex overflow-x-auto border-b border-[#E8E2D8] p-2 gap-1 bg-[#FAF7F2]/60 no-scrollbar">
            <button
              onClick={() => setActiveTab('couple')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors tap-target-44 ${
                activeTab === 'couple'
                  ? 'bg-white text-[#8C6E2D] shadow-xs font-semibold'
                  : 'text-[#5A605B] hover:text-[#242625]'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Mempelai</span>
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors tap-target-44 ${
                activeTab === 'events'
                  ? 'bg-white text-[#8C6E2D] shadow-xs font-semibold'
                  : 'text-[#5A605B] hover:text-[#242625]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Acara</span>
            </button>
            <button
              onClick={() => setActiveTab('countdown')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors tap-target-44 ${
                activeTab === 'countdown'
                  ? 'bg-white text-[#8C6E2D] shadow-xs font-semibold'
                  : 'text-[#5A605B] hover:text-[#242625]'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Countdown</span>
            </button>
            <button
              onClick={() => setActiveTab('story')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors tap-target-44 ${
                activeTab === 'story'
                  ? 'bg-white text-[#8C6E2D] shadow-xs font-semibold'
                  : 'text-[#5A605B] hover:text-[#242625]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cerita</span>
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors tap-target-44 ${
                activeTab === 'gallery'
                  ? 'bg-white text-[#8C6E2D] shadow-xs font-semibold'
                  : 'text-[#5A605B] hover:text-[#242625]'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Galeri</span>
            </button>
            <button
              onClick={() => setActiveTab('music')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors tap-target-44 ${
                activeTab === 'music'
                  ? 'bg-white text-[#8C6E2D] shadow-xs font-semibold'
                  : 'text-[#5A605B] hover:text-[#242625]'
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              <span>Musik</span>
            </button>
            <button
              onClick={() => setActiveTab('gift')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors tap-target-44 ${
                activeTab === 'gift'
                  ? 'bg-white text-[#8C6E2D] shadow-xs font-semibold'
                  : 'text-[#5A605B] hover:text-[#242625]'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Amplop</span>
            </button>
            <button
              onClick={() => setActiveTab('theme')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors tap-target-44 ${
                activeTab === 'theme'
                  ? 'bg-white text-[#8C6E2D] shadow-xs font-semibold'
                  : 'text-[#5A605B] hover:text-[#242625]'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Tema</span>
            </button>
          </div>

          {/* Form Content Scrollable */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Tab: Couple */}
            {activeTab === 'couple' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#242625]">Profil Mempelai Pria</h3>
                  <div className="space-y-3 mt-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#5A605B] mb-1">
                        Nama Lengkap & Gelar
                      </label>
                      <input
                        type="text"
                        value={invitation.couple.groomName}
                        onChange={(e) =>
                          updateInvitationState({
                            ...invitation,
                            couple: { ...invitation.couple, groomName: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8] text-xs focus:ring-1 focus:ring-[#8C6E2D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#5A605B] mb-1">
                        Nama Panggilan
                      </label>
                      <input
                        type="text"
                        value={invitation.couple.groomNickname}
                        onChange={(e) =>
                          updateInvitationState({
                            ...invitation,
                            couple: { ...invitation.couple, groomNickname: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8] text-xs focus:ring-1 focus:ring-[#8C6E2D]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-semibold text-[#5A605B] mb-1">
                          Nama Ayah
                        </label>
                        <input
                          type="text"
                          value={invitation.couple.groomFather}
                          onChange={(e) =>
                            updateInvitationState({
                              ...invitation,
                              couple: { ...invitation.couple, groomFather: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8] text-xs focus:ring-1 focus:ring-[#8C6E2D]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#5A605B] mb-1">
                          Nama Ibu
                        </label>
                        <input
                          type="text"
                          value={invitation.couple.groomMother}
                          onChange={(e) =>
                            updateInvitationState({
                              ...invitation,
                              couple: { ...invitation.couple, groomMother: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8] text-xs focus:ring-1 focus:ring-[#8C6E2D]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#5A605B] mb-1">
                        URL Foto Mempelai Pria
                      </label>
                      <input
                        type="text"
                        value={invitation.couple.groomPhoto}
                        onChange={(e) =>
                          updateInvitationState({
                            ...invitation,
                            couple: { ...invitation.couple, groomPhoto: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8] text-xs focus:ring-1 focus:ring-[#8C6E2D]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8E2D8]">
                  <h3 className="font-serif text-lg font-bold text-[#242625]">Profil Mempelai Wanita</h3>
                  <div className="space-y-3 mt-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#5A605B] mb-1">
                        Nama Lengkap & Gelar
                      </label>
                      <input
                        type="text"
                        value={invitation.couple.brideName}
                        onChange={(e) =>
                          updateInvitationState({
                            ...invitation,
                            couple: { ...invitation.couple, brideName: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8] text-xs focus:ring-1 focus:ring-[#8C6E2D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#5A605B] mb-1">
                        Nama Panggilan
                      </label>
                      <input
                        type="text"
                        value={invitation.couple.brideNickname}
                        onChange={(e) =>
                          updateInvitationState({
                            ...invitation,
                            couple: { ...invitation.couple, brideNickname: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8] text-xs focus:ring-1 focus:ring-[#8C6E2D]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-semibold text-[#5A605B] mb-1">
                          Nama Ayah
                        </label>
                        <input
                          type="text"
                          value={invitation.couple.brideFather}
                          onChange={(e) =>
                            updateInvitationState({
                              ...invitation,
                              couple: { ...invitation.couple, brideFather: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8] text-xs focus:ring-1 focus:ring-[#8C6E2D]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#5A605B] mb-1">
                          Nama Ibu
                        </label>
                        <input
                          type="text"
                          value={invitation.couple.brideMother}
                          onChange={(e) =>
                            updateInvitationState({
                              ...invitation,
                              couple: { ...invitation.couple, brideMother: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8] text-xs focus:ring-1 focus:ring-[#8C6E2D]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#5A605B] mb-1">
                        URL Foto Mempelai Wanita
                      </label>
                      <input
                        type="text"
                        value={invitation.couple.bridePhoto}
                        onChange={(e) =>
                          updateInvitationState({
                            ...invitation,
                            couple: { ...invitation.couple, bridePhoto: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8] text-xs focus:ring-1 focus:ring-[#8C6E2D]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8E2D8]">
                  <h3 className="font-serif text-lg font-bold text-[#242625]">Kutipan & Doa Suci</h3>
                  <div className="space-y-3 mt-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#5A605B] mb-1">
                        Isi Kutipan
                      </label>
                      <textarea
                        rows={3}
                        value={invitation.couple.quote}
                        onChange={(e) =>
                          updateInvitationState({
                            ...invitation,
                            couple: { ...invitation.couple, quote: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8] text-xs focus:ring-1 focus:ring-[#8C6E2D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#5A605B] mb-1">
                        Sumber Kutipan (Ayat / Kitab / Tokoh)
                      </label>
                      <input
                        type="text"
                        value={invitation.couple.quoteSource}
                        onChange={(e) =>
                          updateInvitationState({
                            ...invitation,
                            couple: { ...invitation.couple, quoteSource: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8] text-xs focus:ring-1 focus:ring-[#8C6E2D]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Events */}
            {activeTab === 'events' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-[#242625]">Daftar Acara</h3>
                  {invitation.packageTier === 'exclusive' && (
                    <button
                      type="button"
                      onClick={() => {
                        const newEv = {
                          id: `event-${Date.now()}`,
                          title: 'Acara Tambahan',
                          date: '2026-11-15',
                          startTime: '19:00',
                          endTime: '21:00',
                          timezone: 'WIB',
                          venueName: 'Nama Tempat',
                          venueAddress: 'Alamat Lengkap',
                          googleMapsUrl: '',
                        };
                        updateInvitationState({
                          ...invitation,
                          events: [...invitation.events, newEv],
                        });
                      }}
                      className="px-3 py-1 rounded-full border border-[#8C6E2D] text-[#8C6E2D] text-xs hover:bg-[#FAF7F2]"
                    >
                      + Tambah Acara
                    </button>
                  )}
                </div>

                {invitation.events.map((ev, i) => (
                  <div key={ev.id} className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#8C6E2D]">Acara #{i + 1}</span>
                      {invitation.events.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            updateInvitationState({
                              ...invitation,
                              events: invitation.events.filter((item) => item.id !== ev.id),
                            });
                          }}
                          className="text-[11px] text-red-600 hover:underline"
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#5A605B] mb-1">
                        Nama Acara (Akad Nikah / Resepsi)
                      </label>
                      <input
                        type="text"
                        value={ev.title}
                        onChange={(e) => {
                          const updatedEvents = [...invitation.events];
                          updatedEvents[i].title = e.target.value;
                          updateInvitationState({ ...invitation, events: updatedEvents });
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8] text-xs bg-white"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#5A605B] mb-1">
                          Tanggal
                        </label>
                        <input
                          type="date"
                          value={ev.date}
                          onChange={(e) => {
                            const updatedEvents = [...invitation.events];
                            updatedEvents[i].date = e.target.value;
                            updateInvitationState({ ...invitation, events: updatedEvents });
                          }}
                          className="w-full px-2 py-1.5 rounded-xl border border-[#E8E2D8] text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#5A605B] mb-1">
                          Mulai
                        </label>
                        <input
                          type="time"
                          value={ev.startTime}
                          onChange={(e) => {
                            const updatedEvents = [...invitation.events];
                            updatedEvents[i].startTime = e.target.value;
                            updateInvitationState({ ...invitation, events: updatedEvents });
                          }}
                          className="w-full px-2 py-1.5 rounded-xl border border-[#E8E2D8] text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#5A605B] mb-1">
                          Selesai
                        </label>
                        <input
                          type="time"
                          value={ev.endTime}
                          onChange={(e) => {
                            const updatedEvents = [...invitation.events];
                            updatedEvents[i].endTime = e.target.value;
                            updateInvitationState({ ...invitation, events: updatedEvents });
                          }}
                          className="w-full px-2 py-1.5 rounded-xl border border-[#E8E2D8] text-xs bg-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#5A605B] mb-1">
                        Nama Gedung / Tempat
                      </label>
                      <input
                        type="text"
                        value={ev.venueName}
                        onChange={(e) => {
                          const updatedEvents = [...invitation.events];
                          updatedEvents[i].venueName = e.target.value;
                          updateInvitationState({ ...invitation, events: updatedEvents });
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8] text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#5A605B] mb-1">
                        Alamat Lengkap
                      </label>
                      <textarea
                        rows={2}
                        value={ev.venueAddress}
                        onChange={(e) => {
                          const updatedEvents = [...invitation.events];
                          updatedEvents[i].venueAddress = e.target.value;
                          updateInvitationState({ ...invitation, events: updatedEvents });
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8] text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#5A605B] mb-1">
                        Tautan Google Maps
                      </label>
                      <input
                        type="url"
                        value={ev.googleMapsUrl}
                        onChange={(e) => {
                          const updatedEvents = [...invitation.events];
                          updatedEvents[i].googleMapsUrl = e.target.value;
                          updateInvitationState({ ...invitation, events: updatedEvents });
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8] text-xs bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Countdown */}
            {activeTab === 'countdown' && (
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#242625]">Hitung Mundur (Countdown)</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="countdownToggle"
                    checked={invitation.countdown.isEnabled}
                    onChange={(e) =>
                      updateInvitationState({
                        ...invitation,
                        countdown: { ...invitation.countdown, isEnabled: e.target.checked },
                      })
                    }
                    className="w-4 h-4 text-[#8C6E2D] rounded"
                  />
                  <label htmlFor="countdownToggle" className="text-xs font-medium text-[#242625]">
                    Aktifkan Fitur Hitung Mundur
                  </label>
                </div>
                {invitation.countdown.isEnabled && (
                  <div>
                    <label className="block text-xs font-semibold text-[#5A605B] mb-1">
                      Target Tanggal & Jam
                    </label>
                    <input
                      type="datetime-local"
                      value={invitation.countdown.targetDate}
                      onChange={(e) =>
                        updateInvitationState({
                          ...invitation,
                          countdown: { ...invitation.countdown, targetDate: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8] text-xs"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Tab: Music */}
            {activeTab === 'music' && (
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#242625]">Musik Latar Romantis</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="musicToggle"
                    checked={invitation.music.isEnabled}
                    onChange={(e) =>
                      updateInvitationState({
                        ...invitation,
                        music: { ...invitation.music, isEnabled: e.target.checked },
                      })
                    }
                    className="w-4 h-4 text-[#8C6E2D] rounded"
                  />
                  <label htmlFor="musicToggle" className="text-xs font-medium text-[#242625]">
                    Putar Musik Latar
                  </label>
                </div>
                {invitation.music.isEnabled && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#5A605B] mb-1">
                        Judul Lagu
                      </label>
                      <input
                        type="text"
                        value={invitation.music.title}
                        onChange={(e) =>
                          updateInvitationState({
                            ...invitation,
                            music: { ...invitation.music, title: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8] text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#5A605B] mb-1">
                        URL Berkas Audio (MP3)
                      </label>
                      <input
                        type="text"
                        value={invitation.music.audioUrl}
                        onChange={(e) =>
                          updateInvitationState({
                            ...invitation,
                            music: { ...invitation.music, audioUrl: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8] text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab: Digital Gift */}
            {activeTab === 'gift' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-[#242625]">Amplop Digital</h3>
                  <button
                    type="button"
                    onClick={() => {
                      const newAcc = {
                        id: `bank-${Date.now()}`,
                        bankName: 'BCA',
                        accountNumber: '',
                        accountHolder: invitation.couple.groomName,
                      };
                      updateInvitationState({
                        ...invitation,
                        digitalGift: {
                          ...invitation.digitalGift,
                          accounts: [...invitation.digitalGift.accounts, newAcc],
                        },
                      });
                    }}
                    className="px-3 py-1 rounded-full border border-[#8C6E2D] text-[#8C6E2D] text-xs"
                  >
                    + Rekening
                  </button>
                </div>

                {invitation.digitalGift.accounts.map((acc, idx) => (
                  <div key={acc.id} className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-2">
                    <div className="flex justify-between text-xs font-bold text-[#8C6E2D]">
                      <span>Rekening #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          updateInvitationState({
                            ...invitation,
                            digitalGift: {
                              ...invitation.digitalGift,
                              accounts: invitation.digitalGift.accounts.filter((a) => a.id !== acc.id),
                            },
                          });
                        }}
                        className="text-red-600 hover:underline"
                      >
                        Hapus
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Nama Bank (BCA / Mandiri / BRI)"
                        value={acc.bankName}
                        onChange={(e) => {
                          const accounts = [...invitation.digitalGift.accounts];
                          accounts[idx].bankName = e.target.value;
                          updateInvitationState({
                            ...invitation,
                            digitalGift: { ...invitation.digitalGift, accounts },
                          });
                        }}
                        className="px-3 py-1.5 rounded-xl border border-[#E8E2D8] text-xs bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Nomor Rekening"
                        value={acc.accountNumber}
                        onChange={(e) => {
                          const accounts = [...invitation.digitalGift.accounts];
                          accounts[idx].accountNumber = e.target.value;
                          updateInvitationState({
                            ...invitation,
                            digitalGift: { ...invitation.digitalGift, accounts },
                          });
                        }}
                        className="px-3 py-1.5 rounded-xl border border-[#E8E2D8] text-xs bg-white"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Atas Nama (Pemilik Rekening)"
                      value={acc.accountHolder}
                      onChange={(e) => {
                        const accounts = [...invitation.digitalGift.accounts];
                        accounts[idx].accountHolder = e.target.value;
                        updateInvitationState({
                          ...invitation,
                          digitalGift: { ...invitation.digitalGift, accounts },
                        });
                      }}
                      className="w-full px-3 py-1.5 rounded-xl border border-[#E8E2D8] text-xs bg-white"
                    />
                  </div>
                ))}

                <div className="pt-2">
                  <label className="block text-xs font-semibold text-[#5A605B] mb-1">
                    Alamat Pengiriman Kado Fisik (Opsional)
                  </label>
                  <textarea
                    rows={2}
                    value={invitation.digitalGift.shippingAddress || ''}
                    onChange={(e) =>
                      updateInvitationState({
                        ...invitation,
                        digitalGift: { ...invitation.digitalGift, shippingAddress: e.target.value },
                      })
                    }
                    placeholder="Contoh: Jl. Kemang Raya No. 12, Jakarta Selatan..."
                    className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8] text-xs"
                  />
                </div>
              </div>
            )}

            {/* Tab: Theme */}
            {activeTab === 'theme' && (
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#242625]">Kustomisasi Tampilan</h3>
                <div>
                  <label className="block text-xs font-semibold text-[#5A605B] mb-1">
                    Pilihan Template
                  </label>
                  <select
                    value={invitation.templateId}
                    onChange={(e) =>
                      updateInvitationState({ ...invitation, templateId: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#E8E2D8] text-xs"
                  >
                    <option value="tmpl-royal-sage">The Royal Sage (Wevitation Style)</option>
                    <option value="tmpl-rose-romance">Rose Gold & Wax Seal (Indoinvite Style)</option>
                    <option value="tmpl-minimalist-champagne">Champagne Editorial (nvi.id Style)</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Canvas / Live Preview */}
        <div className="flex-1 bg-[#242625]/5 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          <div
            className={`transition-all duration-300 shadow-2xl overflow-y-auto bg-white ${
              previewMode === 'mobile'
                ? 'w-[375px] h-[720px] rounded-[40px] border-[10px] border-[#242625] relative'
                : 'w-full h-full rounded-2xl border border-[#E8E2D8]'
            }`}
          >
            {/* Mobile Notch / Speaker Header */}
            {previewMode === 'mobile' && (
              <div className="sticky top-0 z-30 h-6 bg-[#FAF7F2] flex items-center justify-center">
                <div className="w-20 h-3 bg-[#242625]/10 rounded-full" />
              </div>
            )}

            {/* The Live Rendered Invitation */}
            <TemplateRenderer invitation={invitation} isPreview={true} />
          </div>
        </div>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#242625] text-white px-4 py-2.5 rounded-full shadow-lg text-xs font-medium flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#607755]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
