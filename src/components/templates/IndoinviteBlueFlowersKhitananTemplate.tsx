'use client';

import React, { useState, useEffect, useRef } from 'react';
import { InvitationData, GuestItem } from '@/types';
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Send,
  ExternalLink,
  Gift,
  Home,
  Users,
  Image as ImageIcon,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

interface Props {
  invitation: InvitationData;
  guest?: GuestItem;
  isPreview?: boolean;
}

export function IndoinviteBlueFlowersKhitananTemplate({ invitation, guest, isPreview = false }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [wishesList, setWishesList] = useState([
    {
      id: 'w-1',
      name: 'Bapak H. Sukardi & Keluarga',
      status: 'Hadir',
      message: 'Selamat dikhitan ananda Afnan Atma Purnama. Semoga menjadi anak yang sholeh, berbakti kepada orang tua, agama, dan nusa bangsa. Aamiin ya rabbal alamin.',
      time: '1 jam yang lalu',
    },
    {
      id: 'w-2',
      name: 'Tante Rina & Om Doni',
      status: 'Hadir',
      message: 'Barakallah ananda ganteng Afnan! Cepat pulih ya jagoan kecil, makin pintar dan berani!',
      time: '3 jam yang lalu',
    },
    {
      id: 'w-3',
      name: 'Keluarga Besar Bpk. Hendrawan',
      status: 'Hadir',
      message: 'Selamat atas khitanan ananda Afnan. Semoga senantiasa dalam limpahan berkah dan lindungan Allah SWT.',
      time: 'Kemarin',
    },
  ]);

  const [rsvpName, setRsvpName] = useState(guest?.name || '');
  const [rsvpStatus, setRsvpStatus] = useState('Hadir');
  const [rsvpGuests, setRsvpGuests] = useState('2');
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [submittedRsvp, setSubmittedRsvp] = useState(false);

  // Audio ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 8,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.log('Audio autoplay blocked:', e);
      });
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(id);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim() || !rsvpMessage.trim()) return;

    const newWish = {
      id: `w-${Date.now()}`,
      name: rsvpName,
      status: rsvpStatus,
      message: rsvpMessage,
      time: 'Baru saja',
    };

    setWishesList([newWish, ...wishesList]);
    setSubmittedRsvp(true);
    setRsvpMessage('');
    setTimeout(() => setSubmittedRsvp(false), 4000);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Recipient personalized name
  const guestName = guest?.name || 'Bapak Budi';

  return (
    <div className="relative min-h-screen bg-[#F4F7FB] text-[#2C3E50] font-sans overflow-x-hidden selection:bg-[#005189]/20 selection:text-[#005189]">
      {/* Background audio */}
      <audio
        ref={audioRef}
        loop
        src="https://media.indoinvite.com/2db3bf1e16cd47a08843bb881e39cce7:indoinvite-staging/indoinvite-staging/indoinvite-staging/nikah/theme/music/1659167827.mp3"
      />

      {/* Floating Music Control Button */}
      {isOpen && (
        <button
          onClick={toggleMusic}
          className={`fixed bottom-20 left-4 z-40 w-12 h-12 rounded-full bg-[#005189] text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 border-2 border-white ${
            isPlaying ? 'animate-spin' : ''
          }`}
          style={{ animationDuration: '6s' }}
          title={isPlaying ? 'Matikan Musik' : 'Putar Musik'}
          aria-label="Kontrol Musik Latar"
        >
          {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
      )}

      {/* ========================================================================= */}
      {/* 1. COVER OVERLAY (Indoinvite Fullscreen Opening Gate) */}
      {/* ========================================================================= */}
      {!isOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center px-4 bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: `url('https://indoinvite.com/nikah/template/flowers-template/blue-flowers/BFL-Background.webp')`,
            backgroundColor: '#ffffff',
          }}
        >
          {/* Top Floral Ornament */}
          <img
            src="https://indoinvite.com/nikah/template/flowers-template/blue-flowers/BFL-ATS.webp"
            alt="Ornament Atas"
            className="w-48 sm:w-64 max-w-full mb-2 animate-pulse"
            style={{ animationDuration: '3s' }}
          />

          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#005189] mb-1">
            Undangan Khitanan & Tasyakuran
          </span>

          {/* Child Photo Frame */}
          <div className="relative my-4">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 border-4 border-[#005189]/40 shadow-xl overflow-hidden bg-white mx-auto">
              <img
                src="https://media.indoinvite.com/2db3bf1e16cd47a08843bb881e39cce7:indoinvite-staging/indoinvite-staging/indoinvite-staging/nikah/upload/27302/1677251719foto_berdua.jpeg"
                alt="Afnan Atma Purnama"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          <h1
            className="text-4xl sm:text-5xl font-bold text-[#005189] tracking-tight mb-2"
            style={{ fontFamily: "'Great Vibes', cursive, 'Playfair Display', serif" }}
          >
            Afnan Atma Purnama
          </h1>

          <p className="text-xs sm:text-sm text-[#005189]/80 font-medium mb-6">
            Putra tercinta dari Bapak Purnama & Ibu Atma
          </p>

          {/* Guest Card Box */}
          <div className="bg-white/90 backdrop-blur-xs border border-[#005189]/25 rounded-2xl px-6 py-4 shadow-lg max-w-xs w-full mb-6">
            <p className="text-[11px] text-[#5A6E7F] uppercase tracking-wider mb-1">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            <p className="text-base font-bold text-[#005189] truncate">
              {guestName}
            </p>
            <p className="text-[10px] text-[#7A8E9F] mt-0.5 italic">
              Di Tempat
            </p>
          </div>

          {/* Open Invitation Button */}
          <button
            onClick={handleOpenInvitation}
            className="group px-8 py-3.5 rounded-full bg-[#005189] hover:bg-[#003C66] text-white text-sm font-semibold tracking-wide shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 border-2 border-white"
          >
            <Sparkles className="w-4 h-4 text-sky-200 group-hover:rotate-12 transition-transform" />
            <span>Buka Undangan</span>
          </button>

          {/* Bottom Floral Ornament */}
          <img
            src="https://indoinvite.com/nikah/template/flowers-template/blue-flowers/BFL-BWH.webp"
            alt="Ornament Bawah"
            className="w-48 sm:w-64 max-w-full mt-4"
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. MAIN INVITATION CONTENT (Mobile First Width Max 540px centered) */}
      {/* ========================================================================= */}
      <div
        id="home"
        className="max-w-[520px] mx-auto min-h-screen bg-white shadow-2xl relative border-x border-[#E1E8F0] pb-24"
      >
        {/* Top Header Banner */}
        <section
          className="relative pt-10 pb-12 px-6 text-center bg-contain bg-top bg-no-repeat"
          style={{
            backgroundImage: `url('https://indoinvite.com/nikah/template/flowers-template/blue-flowers/BFL-ATS.webp')`,
          }}
        >
          <div className="pt-8">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#005189]">
              Walimatul Khitan
            </span>
            <h2
              className="text-4xl sm:text-5xl font-bold text-[#005189] mt-2 mb-1"
              style={{ fontFamily: "'Great Vibes', cursive, 'Playfair Display', serif" }}
            >
              Afnan Atma Purnama
            </h2>
            <p className="text-xs text-[#5A6E7F]">
              Minggu, 15 November 2026 • Jakarta
            </p>
          </div>
        </section>

        {/* Bismillah & Opening Prayer Section */}
        <section className="px-6 py-8 text-center space-y-4">
          <div className="text-xl sm:text-2xl font-serif text-[#005189] tracking-wider">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </div>
          <h3 className="text-sm font-semibold text-[#005189]">
            Assalamu’alaikum Warahmatullahi Wabarakatuh
          </h3>
          <p className="text-xs leading-relaxed text-[#4A5E6F]">
            Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta’ala, kami mengundang Bapak/Ibu/Saudara/i untuk berkenan hadir pada acara syukuran khitanan putra kami:
          </p>

          {/* Child Card Frame */}
          <div
            className="p-6 rounded-3xl bg-contain bg-center bg-no-repeat border border-[#D0DFEF] shadow-md my-4 space-y-4"
            style={{
              backgroundImage: `url('https://indoinvite.com/nikah/template/flowers-template/blue-flowers/BFL-BGA.webp')`,
              backgroundColor: '#FAFCFF',
            }}
          >
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto border-4 border-[#005189]/30 shadow-md">
              <img
                src="https://media.indoinvite.com/2db3bf1e16cd47a08843bb881e39cce7:indoinvite-staging/indoinvite-staging/indoinvite-staging/nikah/upload/27302/1677251719foto_berdua.jpeg"
                alt="Afnan Atma Purnama"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4
                className="text-3xl font-bold text-[#005189]"
                style={{ fontFamily: "'Great Vibes', cursive, 'Playfair Display', serif" }}
              >
                Afnan Atma Purnama
              </h4>
              <p className="text-xs text-[#5A6E7F] mt-1">
                Putra kedua dari pasangan:
              </p>
              <p className="text-sm font-semibold text-[#005189] mt-0.5">
                Bapak Purnama & Ibu Atma
              </p>
            </div>
          </div>

          <p className="text-xs italic text-[#5A6E7F] px-4 leading-relaxed">
            “Semoga Allah SWT memberkahi khitanan ini dan menjadikan ananda anak yang sholeh, berbakti kepada kedua orang tua, berguna bagi agama, nusa, dan bangsa.”
          </p>
        </section>

        {/* Countdown Timer Section */}
        <section className="px-6 py-6 text-center bg-[#F0F6FC] border-y border-[#DCE7F3]">
          <span className="text-[11px] uppercase tracking-widest text-[#005189] font-bold">
            Menuju Hari Bahagia
          </span>
          <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto mt-4">
            <div className="bg-[#005189] text-white p-2.5 rounded-2xl shadow-sm text-center">
              <div className="text-lg font-bold">{timeLeft.days}</div>
              <div className="text-[10px] uppercase tracking-wider text-sky-200">Hari</div>
            </div>
            <div className="bg-[#005189] text-white p-2.5 rounded-2xl shadow-sm text-center">
              <div className="text-lg font-bold">{timeLeft.hours}</div>
              <div className="text-[10px] uppercase tracking-wider text-sky-200">Jam</div>
            </div>
            <div className="bg-[#005189] text-white p-2.5 rounded-2xl shadow-sm text-center">
              <div className="text-lg font-bold">{timeLeft.minutes}</div>
              <div className="text-[10px] uppercase tracking-wider text-sky-200">Menit</div>
            </div>
            <div className="bg-[#005189] text-white p-2.5 rounded-2xl shadow-sm text-center">
              <div className="text-lg font-bold">{timeLeft.seconds}</div>
              <div className="text-[10px] uppercase tracking-wider text-sky-200">Detik</div>
            </div>
          </div>
        </section>

        {/* Rangkaian Acara (Event Schedule) */}
        <section id="acara" className="px-6 py-10 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[11px] uppercase tracking-widest text-[#005189] font-bold">
              Agenda Acara
            </span>
            <h3
              className="text-3xl font-bold text-[#005189]"
              style={{ fontFamily: "'Great Vibes', cursive, 'Playfair Display', serif" }}
            >
              Waktu & Tempat
            </h3>
          </div>

          {/* Acara 1: Syukuran & Doa */}
          <div className="p-6 rounded-2xl border border-[#DCE7F3] bg-white shadow-sm space-y-3 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F0FA] text-[#005189] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Syukuran & Doa Bersama</span>
            </div>
            <div className="space-y-1.5 text-xs text-[#4A5E6F]">
              <div className="flex items-center justify-center gap-2 font-medium">
                <Calendar className="w-4 h-4 text-[#005189]" />
                <span>Minggu, 15 November 2026</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-[#005189]" />
                <span>09:00 - 11:00 WIB</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-[#005189]" />
                <span>Kediaman Mempelai / Rumah Utama</span>
              </div>
            </div>
          </div>

          {/* Acara 2: Walimatul Khitan */}
          <div className="p-6 rounded-2xl border border-[#005189]/30 bg-[#F7FAFD] shadow-md space-y-3 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#005189] text-white text-xs font-semibold">
              <Heart className="w-3.5 h-3.5 fill-white/20" />
              <span>Walimatul Khitan & Ramah Tamah</span>
            </div>
            <div className="space-y-1.5 text-xs text-[#4A5E6F]">
              <div className="flex items-center justify-center gap-2 font-medium">
                <Calendar className="w-4 h-4 text-[#005189]" />
                <span>Minggu, 15 November 2026</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-[#005189]" />
                <span>11:00 WIB - Selesai</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-[#005189]" />
                <span>Gedung Serbaguna Puri Indah, Jl. Boulevard Raya No. 45, Jakarta</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#005189] hover:bg-[#003C66] text-white text-xs font-semibold shadow-md transition-all hover:scale-105"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Buka Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-sky-200" />
              </a>
            </div>
          </div>
        </section>

        {/* Galeri Foto Section */}
        <section id="galeri" className="px-6 py-10 bg-[#FAFCFF] border-t border-[#DCE7F3] text-center space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-widest text-[#005189] font-bold">
              Galeri Kenangan
            </span>
            <h3
              className="text-3xl font-bold text-[#005189]"
              style={{ fontFamily: "'Great Vibes', cursive, 'Playfair Display', serif" }}
            >
              Potret Ceria Afnan
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl overflow-hidden shadow-sm aspect-4/5 border-2 border-white">
              <img
                src="https://media.indoinvite.com/2db3bf1e16cd47a08843bb881e39cce7:indoinvite-staging/indoinvite-staging/indoinvite-staging/nikah/upload/27302/1677251719foto_berdua.jpeg"
                alt="Galeri Afnan 1"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-sm aspect-4/5 border-2 border-white">
              <img
                src="https://media.indoinvite.com/2db3bf1e16cd47a08843bb881e39cce7:indoinvite-staging/indoinvite-staging/indoinvite-staging/nikah/upload/galery/1676701648.jpeg"
                alt="Galeri Afnan 2"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </section>

        {/* Titip Kado / Amplop Digital Section */}
        <section id="hadiah" className="px-6 py-10 text-center space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-widest text-[#005189] font-bold">
              Tanda Kasih
            </span>
            <h3
              className="text-3xl font-bold text-[#005189]"
              style={{ fontFamily: "'Great Vibes', cursive, 'Playfair Display', serif" }}
            >
              Titip Kado / Amplop Digital
            </h3>
            <p className="text-xs text-[#5A6E7F] max-w-xs mx-auto">
              Doa restu Anda merupakan karunia terindah bagi kami. Namun apabila ingin memberikan tanda kasih secara digital, dapat melalui rekening berikut:
            </p>
          </div>

          {/* Bank Cards */}
          <div className="space-y-3 max-w-sm mx-auto">
            {/* BCA Card */}
            <div className="p-4 rounded-2xl border border-[#DCE7F3] bg-white shadow-xs text-left flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#005189]">Bank BCA</span>
                <p className="text-sm font-mono font-bold text-[#2C3E50] tracking-wider mt-0.5">
                  1234567890
                </p>
                <p className="text-[11px] text-[#7A8E9F]">a.n. Purnama</p>
              </div>
              <button
                onClick={() => handleCopy('1234567890', 'bca')}
                className="px-3 py-1.5 rounded-full bg-[#E6F0FA] hover:bg-[#D0DFEF] text-[#005189] text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copiedBank === 'bca' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin</span>
                  </>
                )}
              </button>
            </div>

            {/* Mandiri Card */}
            <div className="p-4 rounded-2xl border border-[#DCE7F3] bg-white shadow-xs text-left flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#005189]">Bank Mandiri</span>
                <p className="text-sm font-mono font-bold text-[#2C3E50] tracking-wider mt-0.5">
                  9876543210
                </p>
                <p className="text-[11px] text-[#7A8E9F]">a.n. Purnama</p>
              </div>
              <button
                onClick={() => handleCopy('9876543210', 'mandiri')}
                className="px-3 py-1.5 rounded-full bg-[#E6F0FA] hover:bg-[#D0DFEF] text-[#005189] text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copiedBank === 'mandiri' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Buku Tamu & RSVP Section */}
        <section id="ucapan" className="px-6 py-10 bg-[#FAFCFF] border-t border-[#DCE7F3] space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[11px] uppercase tracking-widest text-[#005189] font-bold">
              Konfirmasi & Doa Restu
            </span>
            <h3
              className="text-3xl font-bold text-[#005189]"
              style={{ fontFamily: "'Great Vibes', cursive, 'Playfair Display', serif" }}
            >
              Buku Tamu & Ucapan
            </h3>
            <p className="text-xs text-[#5A6E7F]">
              Kirimkan konfirmasi kehadiran dan doa restu Anda untuk ananda Afnan
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAddWish} className="p-5 rounded-2xl bg-white border border-[#DCE7F3] shadow-sm space-y-3.5">
            <div>
              <label className="block text-xs font-medium text-[#4A5E6F] mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={rsvpName}
                onChange={(e) => setRsvpName(e.target.value)}
                placeholder="Contoh: Bapak Budi & Keluarga"
                className="w-full px-3.5 py-2 rounded-xl border border-[#D0DFEF] text-xs focus:ring-2 focus:ring-[#005189] focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#4A5E6F] mb-1">
                  Kehadiran
                </label>
                <select
                  value={rsvpStatus}
                  onChange={(e) => setRsvpStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#D0DFEF] text-xs focus:ring-2 focus:ring-[#005189] focus:outline-hidden bg-white"
                >
                  <option value="Hadir">Hadir</option>
                  <option value="Tidak Hadir">Tidak Hadir</option>
                  <option value="Masih Ragu">Masih Ragu</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#4A5E6F] mb-1">
                  Jumlah Tamu
                </label>
                <select
                  value={rsvpGuests}
                  onChange={(e) => setRsvpGuests(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#D0DFEF] text-xs focus:ring-2 focus:ring-[#005189] focus:outline-hidden bg-white"
                >
                  <option value="1">1 Orang</option>
                  <option value="2">2 Orang</option>
                  <option value="3">3 Orang</option>
                  <option value="4">4 Orang atau lebih</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4A5E6F] mb-1">
                Ucapan & Doa Restu
              </label>
              <textarea
                required
                rows={3}
                value={rsvpMessage}
                onChange={(e) => setRsvpMessage(e.target.value)}
                placeholder="Tuliskan ucapan selamat dan doa Anda..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#D0DFEF] text-xs focus:ring-2 focus:ring-[#005189] focus:outline-hidden resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#005189] hover:bg-[#003C66] text-white text-xs font-semibold shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim Konfirmasi & Ucapan</span>
            </button>

            {submittedRsvp && (
              <p className="text-[11px] text-center font-medium text-emerald-600 bg-emerald-50 py-1.5 rounded-lg">
                Alhamdulillah! Ucapan dan konfirmasi Anda telah tersimpan.
              </p>
            )}
          </form>

          {/* Wishes List */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold text-[#005189]">
              Ucapan ({wishesList.length})
            </span>
            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {wishesList.map((w) => (
                <div key={w.id} className="p-3.5 rounded-xl bg-white border border-[#E1E8F0] shadow-2xs text-left space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2C3E50]">{w.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E6F0FA] text-[#005189] font-medium">
                      {w.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#4A5E6F] leading-relaxed">
                    {w.message}
                  </p>
                  <span className="text-[10px] text-[#8A9EAF] block">
                    {w.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer & Watermark */}
        <footer className="py-10 px-6 text-center border-t border-[#DCE7F3] space-y-3">
          <p className="text-xs font-semibold text-[#005189]">
            Kami yang berbahagia,
          </p>
          <p
            className="text-2xl font-bold text-[#005189]"
            style={{ fontFamily: "'Great Vibes', cursive, 'Playfair Display', serif" }}
          >
            Keluarga Besar Bapak Purnama & Ibu Atma
          </p>
          <div className="pt-4 text-[11px] text-[#8A9EAF]">
            Digital Invitation by{' '}
            <span className="font-semibold text-[#005189]">Invitatum</span>
          </div>
        </footer>

        {/* ========================================================================= */}
        {/* 3. FIXED BOTTOM NAVIGATION BAR (Indoinvite Style) */}
        {/* ========================================================================= */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#DCE7F3] shadow-lg max-w-[520px] mx-auto">
          <div className="flex items-center justify-around py-2 px-1">
            <button
              onClick={() => scrollTo('home')}
              className="flex flex-col items-center gap-0.5 text-[#5A6E7F] hover:text-[#005189] text-[10px] transition-colors py-1 px-2"
            >
              <Home className="w-4 h-4" />
              <span>Cover</span>
            </button>
            <button
              onClick={() => scrollTo('acara')}
              className="flex flex-col items-center gap-0.5 text-[#5A6E7F] hover:text-[#005189] text-[10px] transition-colors py-1 px-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Acara</span>
            </button>
            <button
              onClick={() => scrollTo('galeri')}
              className="flex flex-col items-center gap-0.5 text-[#5A6E7F] hover:text-[#005189] text-[10px] transition-colors py-1 px-2"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Galeri</span>
            </button>
            <button
              onClick={() => scrollTo('hadiah')}
              className="flex flex-col items-center gap-0.5 text-[#5A6E7F] hover:text-[#005189] text-[10px] transition-colors py-1 px-2"
            >
              <Gift className="w-4 h-4" />
              <span>Hadiah</span>
            </button>
            <button
              onClick={() => scrollTo('ucapan')}
              className="flex flex-col items-center gap-0.5 text-[#5A6E7F] hover:text-[#005189] text-[10px] transition-colors py-1 px-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ucapan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
