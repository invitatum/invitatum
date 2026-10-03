'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/db/dbAdapter';
import {
  Sparkles,
  ArrowRight,
  Eye,
  Send,
  MessageCircle,
  Star,
  CheckCircle2,
  ChevronDown,
  Gift,
  MapPin,
  Clock,
  Music,
  Users,
  QrCode,
  Calendar,
  X,
  Smartphone,
  ShieldCheck,
  ChevronRight,
  Play,
  Heart,
} from 'lucide-react';

export default function HomePage() {
  // Category state
  const [selectedCategory, setSelectedCategory] = useState<'khitanan' | 'pernikahan' | 'aqiqah' | 'ulang-tahun' | 'wisuda' | 'semua'>('khitanan');
  
  // Rotating text in hero
  const rotatingWords = ['Khitanan', 'Aqiqah', 'Pernikahan', 'Ulang Tahun', 'Wisuda', 'Peresmian', 'Semuanya'];
  const [rotatingIndex, setRotatingIndex] = useState(0);

  // Phone Mockup Image Slider
  const mockupImages = [
    'https://indoinvite.com/landing-page/images/sampul/1.webp',
    'https://indoinvite.com/landing-page/images/sampul/2.webp',
    'https://indoinvite.com/landing-page/images/sampul/3.webp',
    'https://indoinvite.com/landing-page/images/sampul/4.webp',
    'https://indoinvite.com/landing-page/images/sampul/5.webp',
  ];
  const [mockupIndex, setMockupIndex] = useState(0);

  // Modal States
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Create Modal Form
  const [formEventType, setFormEventType] = useState('Khitanan');
  const [formPhone, setFormPhone] = useState('');
  const [formDate, setFormDate] = useState('2026-11-15');

  // FAQ Accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Rotate hero words every 2.5s
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setRotatingIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(wordInterval);
  }, [rotatingWords.length]);

  // Rotate mockup images every 3.5s
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setMockupIndex((prev) => (prev + 1) % mockupImages.length);
    }, 3500);
    return () => clearInterval(imageInterval);
  }, [mockupImages.length]);

  // Template Data based on Indoinvite
  const templates = [
    {
      id: 'tmpl-blue-flowers',
      name: 'Blue-Flowers',
      category: 'khitanan',
      price: 'Rp.39.000',
      rating: 5,
      previewUrl: '/invitation/afnan-atma-purnama',
      thumbnail: 'https://sin1.contabostorage.com/2db3bf1e16cd47a08843bb881e39cce7:indoinvite-staging/indoinvite-staging/indoinvite-staging/nikah/upload/media/1728779243.webp',
      badge: 'Terpopuler Khitanan',
    },
    {
      id: 'tmpl-white-arabic',
      name: 'White-Arabic',
      category: 'khitanan',
      price: 'Rp.39.000',
      rating: 5,
      previewUrl: '/invitation/afnan-atma-purnama',
      thumbnail: 'https://sin1.contabostorage.com/2db3bf1e16cd47a08843bb881e39cce7:indoinvite-staging/indoinvite-staging/indoinvite-staging/nikah/upload/media/1728779953.webp',
      badge: 'Nuansa Islami',
    },
    {
      id: 'tmpl-super-classic',
      name: 'Super-Classic',
      category: 'khitanan',
      price: 'Rp.39.000',
      rating: 5,
      previewUrl: '/invitation/afnan-atma-purnama',
      thumbnail: 'https://sin1.contabostorage.com/2db3bf1e16cd47a08843bb881e39cce7:indoinvite-staging/indoinvite-staging/indoinvite-staging/nikah/upload/media/1728780140.webp',
      badge: 'Klasik Elegan',
    },
    {
      id: 'tmpl-elegan-grey',
      name: 'Elegan-Grey',
      category: 'pernikahan',
      price: 'Rp.39.000',
      rating: 5,
      previewUrl: '/invitation/alyadanbudi',
      thumbnail: 'https://sin1.contabostorage.com/2db3bf1e16cd47a08843bb881e39cce7:indoinvite-staging/indoinvite-staging/indoinvite-staging/nikah/upload/media/1729581765.webp',
      badge: 'Best Seller',
    },
    {
      id: 'tmpl-black-java',
      name: 'Black-Java',
      category: 'pernikahan',
      price: 'Rp.39.000',
      rating: 5,
      previewUrl: '/invitation/alyadanbudi',
      thumbnail: 'https://sin1.contabostorage.com/2db3bf1e16cd47a08843bb881e39cce7:indoinvite-staging/indoinvite-staging/indoinvite-staging/nikah/upload/media/1729581804.webp',
      badge: 'Adat Jawa',
    },
    {
      id: 'tmpl-elegan-gold',
      name: 'Elegan-Gold',
      category: 'pernikahan',
      price: 'Rp.39.000',
      rating: 5,
      previewUrl: '/invitation/alyadanbudi',
      thumbnail: 'https://sin1.contabostorage.com/2db3bf1e16cd47a08843bb881e39cce7:indoinvite-staging/indoinvite-staging/indoinvite-staging/nikah/upload/media/1728779034.webp',
      badge: 'Mewah',
    },
    {
      id: 'tmpl-luxury-silver',
      name: 'Luxury-Silver',
      category: 'pernikahan',
      price: 'Rp.39.000',
      rating: 5,
      previewUrl: '/invitation/alyadanbudi',
      thumbnail: 'https://sin1.contabostorage.com/2db3bf1e16cd47a08843bb881e39cce7:indoinvite-staging/indoinvite-staging/indoinvite-staging/nikah/upload/media/1729581784.webp',
      badge: 'Premium',
    },
    {
      id: 'tmpl-elegan-nature',
      name: 'Elegan-Nature',
      category: 'pernikahan',
      price: 'Rp.39.000',
      rating: 5,
      previewUrl: '/invitation/alyadanbudi',
      thumbnail: 'https://sin1.contabostorage.com/2db3bf1e16cd47a08843bb881e39cce7:indoinvite-staging/indoinvite-staging/indoinvite-staging/nikah/upload/media/1728778827.webp',
      badge: 'Botanikal',
    },
    {
      id: 'tmpl-aesthetic-romance',
      name: 'Aesthetic-Romance',
      category: 'pernikahan',
      price: 'Rp.39.000',
      rating: 5,
      previewUrl: '/invitation/alyadanbudi',
      thumbnail: 'https://sin1.contabostorage.com/2db3bf1e16cd47a08843bb881e39cce7:indoinvite-staging/indoinvite-staging/indoinvite-staging/nikah/upload/media/1728778656.webp',
      badge: 'Romantis',
    },
  ];

  const filteredTemplates = templates.filter((t) => {
    if (selectedCategory === 'semua') return true;
    if (selectedCategory === 'khitanan' || selectedCategory === 'aqiqah') {
      return t.category === 'khitanan';
    }
    return t.category === selectedCategory;
  });

  const categories = [
    { id: 'khitanan', label: 'Khitanan', icon: '👦' },
    { id: 'pernikahan', label: 'Pernikahan', icon: '💍' },
    { id: 'aqiqah', label: 'Aqiqah', icon: '👶' },
    { id: 'ulang-tahun', label: 'Ulang Tahun', icon: '🎂' },
    { id: 'wisuda', label: 'Wisuda', icon: '🎓' },
    { id: 'semua', label: 'Semua Tema', icon: '✨' },
  ];

  const reviews = [
    {
      name: 'Maya Anggraini',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
      rating: 5,
      text: 'Bagus banget hasilnya, minta dibuatin admin gak sampe 1 jam udah jadi dan rapih banget! Tamu undangan banyak yang muji lagunya enak dan fotonya jernih.',
      event: 'Khitanan Ananda Rayyan',
      date: '2 hari yang lalu',
    },
    {
      name: 'Bpk. Hendra Pratama',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      rating: 5,
      text: 'Sangat praktis buat khitanan anak. Desain Blue Flowers-nya elegan, fiturnya lengkap dari doa, amplop digital, sampai peta Google Maps presisi.',
      event: 'Walimatul Khitan',
      date: '5 hari yang lalu',
    },
    {
      name: 'Siti Rahmawati, S.Pd',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      rating: 5,
      text: 'Fitur titip kado dan buku tamunya sangat membantu keluarga yang berhalangan hadir dari luar kota. Harganya murah meriah cuma 39rb kualitas bintang lima!',
      event: 'Aqiqah Putri Pertama',
      date: '1 minggu yang lalu',
    },
  ];

  const faqs = [
    {
      q: 'Apakah bisa dibuatkan langsung oleh admin?',
      a: 'Bisa banget! Cukup klik tombol "Dibuatin Admin Aja", kirimkan data acara ke WhatsApp kami. Tim kami akan membuatkan undangan Anda sampai jadi dan rapi. Anda bayar HANYA jika sudah puas dengan hasilnya!',
    },
    {
      q: 'Berapa biaya pembuatan undangan di Invitatum?',
      a: 'Harga mulai dari Rp39.000 sekali bayar untuk paket lengkap tanpa masa aktif tersembunyi. Tidak ada biaya langganan bulanan.',
    },
    {
      q: 'Berapa lama proses pengerjaan jika dibuatkan admin?',
      a: 'Proses kilat hanya memakan waktu 1 hingga 3 jam di jam operasional setelah data acara Anda kirimkan lengkap.',
    },
    {
      q: 'Apakah undangan bisa disebar berkali-kali tanpa batas?',
      a: 'Ya! Bebas disebar ke ribuan tamu tanpa batas via WhatsApp, Instagram, Facebook, maupun SMS.',
    },
    {
      q: 'Apakah nama tamu bisa diganti secara otomatis di link undangan?',
      a: 'Bisa. Tersedia generator nama tamu otomatis sehingga setiap undangan dapat memuat nama tamu personal seperti "Kepada Yth. Bapak Budi".',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#212529] font-sans antialiased overflow-x-hidden">
      {/* ========================================================================= */}
      {/* 1. NAVBAR (Indoinvite Style) */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#ECEEF1] shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#005189] to-[#2276b1] flex items-center justify-center text-white shadow-sm font-serif font-bold text-xl">
              I
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#005189]">
                Invitatum
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#70757A] -mt-1 font-medium">
                Platform Undangan Digital
              </span>
            </div>
          </Link>

          {/* Center Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#4D5156]">
            <Link href="/" className="text-[#005189] font-semibold hover:text-[#005189]">
              Home
            </Link>
            <Link href="/pricing" className="hover:text-[#005189] transition-colors">
              Harga
            </Link>
            <Link href="/templates" className="hover:text-[#005189] transition-colors">
              Contoh Tema
            </Link>
            <Link href="/wedding" className="hover:text-[#005189] transition-colors">
              Pernikahan
            </Link>
            <Link href="/faq" className="hover:text-[#005189] transition-colors">
              FAQ
            </Link>
            <Link href="/guide" className="hover:text-[#005189] transition-colors">
              Tutorial
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs sm:text-sm font-semibold text-[#4D5156] hover:text-[#005189] px-3 py-2 transition-colors"
            >
              Login
            </Link>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-[#005189] hover:bg-[#003C66] text-white text-xs sm:text-sm font-semibold shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Mulai Gratis
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION (Indoinvite Style with Rotating Word & Phone Mockup) */}
      {/* ========================================================================= */}
      <section className="pt-10 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#1A1A1A] leading-[1.2]">
              Buat Undangan <br className="hidden sm:inline" />
              Digital Gratis <br className="hidden sm:inline" />
              Untuk{' '}
              <span className="text-[#005189] inline-block min-w-[200px] transition-all duration-300 font-serif">
                {rotatingWords[rotatingIndex]}
              </span>
              <br />
              Tanpa Ribet!
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[#5F6368] max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Coba sekarang dan buat undangan digital uji coba{' '}
              <strong className="text-[#005189]">GRATIS</strong> untuk segala acara dalam waktu{' '}
              <strong className="text-[#005189]">5 menit</strong>. Gak mau ribet? Minta{' '}
              <strong className="text-[#005189]">dibuatin admin</strong> uji coba Gratis, bayar setelah jadi!
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-lg bg-[#005189] hover:bg-[#003C66] text-white text-base font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                <span>Buat Undangan Gratis</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="https://wa.me/6281234567890?text=Halo%20Admin%20Invitatum%2C%20saya%20mau%20minta%20tolong%20dibuatkan%20undangan%20digital%20dong"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white text-base font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5"
              >
                <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                <span>Dibuatin Admin Aja</span>
              </a>
            </div>

            {/* Guarantee Tagline */}
            <div className="pt-2">
              <p className="text-xs sm:text-sm text-[#4D5156] italic">
                <span className="font-bold text-red-600 animate-pulse mr-1">Anti Rugi!</span>{' '}
                Dibuatin Admin Dulu, Bayar Pas Sudah Jadi, Bayar Hanya Kalau Suka Hasilnya, Proses Kilat!
              </p>
            </div>
          </div>

          {/* Right Smartphone Carousel Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-[280px] sm:w-[320px] aspect-[9/18] rounded-[42px] p-3.5 bg-gradient-to-b from-[#2E3138] to-[#121418] shadow-2xl border-4 border-[#3E424B]">
              {/* Speaker Notch */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#121418] rounded-full z-20" />

              {/* Screen Area */}
              <div className="w-full h-full rounded-[32px] overflow-hidden relative bg-[#FAF7F2]">
                <img
                  src={mockupImages[mockupIndex]}
                  alt="Indoinvite Mockup Slide"
                  className="w-full h-full object-cover transition-opacity duration-700"
                />

                {/* Floating Preview Pill */}
                <div className="absolute bottom-5 left-4 right-4 z-10 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white text-center">
                  <span className="text-[10px] uppercase font-bold text-[#005189] tracking-wider block">
                    Demo Terpopuler: Blue-Flowers
                  </span>
                  <Link
                    href="/invitation/afnan-atma-purnama"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#005189] hover:underline mt-0.5"
                  >
                    <span>Buka Contoh Undangan</span>
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CATEGORY SCROLLBAR (Indoinvite Style) */}
      {/* ========================================================================= */}
      <section className="py-6 border-y border-[#ECEEF1] bg-[#FAFBFD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start sm:justify-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all shadow-xs ${
                  selectedCategory === cat.id
                    ? 'bg-[#005189] text-white shadow-md scale-105'
                    : 'bg-white text-[#4D5156] border border-[#DADCE0] hover:border-[#005189]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. TEMPLATE GALLERY GRID (With Live Preview to Blue Flowers & others) */}
      {/* ========================================================================= */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[#005189]">
            Pilihan Tema Terbaik
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
            Katalog Desain Undangan Digital
          </h2>
          <p className="text-xs sm:text-sm text-[#70757A]">
            Bebas coba dan preview semua tema premium tanpa dipungut biaya sebelum aktivasi.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredTemplates.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-[#ECEEF1] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-3/4 overflow-hidden bg-[#E8EAED]">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#005189] text-white shadow-xs">
                  {item.badge}
                </span>
              </div>

              {/* Details & Actions */}
              <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#70757A]">{item.price}</span>
                    <div className="flex items-center gap-0.5 text-amber-500 text-[11px] font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>5.0</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-[#1A1A1A] mt-0.5">
                    {item.name}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href={item.previewUrl}
                    className="py-2 rounded-lg border border-[#005189] text-[#005189] hover:bg-[#005189]/5 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </Link>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="py-2 rounded-lg bg-[#005189] hover:bg-[#003C66] text-white text-xs font-semibold flex items-center justify-center gap-1 shadow-xs transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Gunakan</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#005189] hover:bg-[#003C66] text-white text-sm font-semibold shadow-md transition-all"
          >
            <span>Tampilkan 400+ Tema Lainnya</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. GOOGLE & PLAY STORE REVIEWS SECTION */}
      {/* ========================================================================= */}
      <section className="py-16 bg-[#FAFBFD] border-t border-[#ECEEF1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
            Ulasan Pelanggan Invitatum
          </h2>

          {/* Rating Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#DADCE0] bg-white shadow-2xs hover:border-[#1A73E8] text-xs sm:text-sm font-semibold text-[#3C4043]"
            >
              <strong className="text-base text-[#202124]">5,0</strong>
              <div className="flex text-amber-500">
                ★★★★★
              </div>
              <span className="text-[#5F6368]">2.800+ ulasan Google</span>
            </a>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#DADCE0] bg-white shadow-2xs text-xs sm:text-sm font-semibold text-[#3C4043]">
              <strong className="text-base text-[#202124]">4,9</strong>
              <div className="flex text-amber-500">
                ★★★★★
              </div>
              <span className="text-[#5F6368]">500rb+ pengguna aktif</span>
            </div>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left pt-6 max-w-5xl mx-auto">
            {reviews.map((rev, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-[#ECEEF1] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-11 h-11 rounded-full object-cover border border-[#ECEEF1]"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-[#202124]">{rev.name}</h4>
                      <p className="text-[11px] text-[#70757A]">{rev.event}</p>
                    </div>
                  </div>
                  <div className="text-amber-500 text-xs">★★★★★</div>
                  <p className="text-xs sm:text-sm text-[#4D5156] leading-relaxed italic">
                    “{rev.text}”
                  </p>
                </div>
                <span className="text-[10px] text-[#9AA0A6] block border-t border-[#F1F3F4] pt-2">
                  Terverifikasi • {rev.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FEATURES SHOWCASE ("Kenapa Memilih Kami?") */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[#005189]">
            Fitur Terlengkap
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
            Semua yang Anda Butuhkan dalam Satu Link
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl border border-[#ECEEF1] bg-white shadow-2xs space-y-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#005189] flex items-center justify-center mx-auto">
              <Gift className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-[#202124]">Titip Kado & Amplop</h4>
            <p className="text-xs text-[#70757A]">Dukung transfer bank & QRIS langsung dengan tombol salin.</p>
          </div>

          <div className="p-5 rounded-2xl border border-[#ECEEF1] bg-white shadow-2xs space-y-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#005189] flex items-center justify-center mx-auto">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-[#202124]">Buku Tamu & Doa</h4>
            <p className="text-xs text-[#70757A]">Tamu dapat memberikan ucapan dan doa secara real-time.</p>
          </div>

          <div className="p-5 rounded-2xl border border-[#ECEEF1] bg-white shadow-2xs space-y-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#005189] flex items-center justify-center mx-auto">
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-[#202124]">Peta Google Maps</h4>
            <p className="text-xs text-[#70757A]">Navigasi presisi ke lokasi acara dengan satu kali klik.</p>
          </div>

          <div className="p-5 rounded-2xl border border-[#ECEEF1] bg-white shadow-2xs space-y-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#005189] flex items-center justify-center mx-auto">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-[#202124]">Hitung Mundur Acara</h4>
            <p className="text-xs text-[#70757A]">Countdown otomatis detik demi detik menuju hari bahagia.</p>
          </div>

          <div className="p-5 rounded-2xl border border-[#ECEEF1] bg-white shadow-2xs space-y-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#005189] flex items-center justify-center mx-auto">
              <Music className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-[#202124]">Musik Latar Bebas</h4>
            <p className="text-xs text-[#70757A]">Pilih lagu favorit atau gunakan musik syahdu bawaan.</p>
          </div>

          <div className="p-5 rounded-2xl border border-[#ECEEF1] bg-white shadow-2xs space-y-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#005189] flex items-center justify-center mx-auto">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-[#202124]">Nama Tamu Personal</h4>
            <p className="text-xs text-[#70757A]">Buat ribuan link nama tamu otomatis tanpa ketik ulang.</p>
          </div>

          <div className="p-5 rounded-2xl border border-[#ECEEF1] bg-white shadow-2xs space-y-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#005189] flex items-center justify-center mx-auto">
              <QrCode className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-[#202124]">QR Code Check-in</h4>
            <p className="text-xs text-[#70757A]">Scan kehadiran tamu di meja penerima tamu anti duplikat.</p>
          </div>

          <div className="p-5 rounded-2xl border border-[#ECEEF1] bg-white shadow-2xs space-y-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#005189] flex items-center justify-center mx-auto">
              <Calendar className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-[#202124]">Simpan ke Kalender</h4>
            <p className="text-xs text-[#70757A]">Sinkronisasi jadwal acara langsung ke Google / Apple Calendar.</p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. PRICING PACKAGES SECTION */}
      {/* ========================================================================= */}
      <section className="py-16 bg-[#FAFBFD] border-t border-[#ECEEF1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#005189]">
              Harga Transparan
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
              Paket Fleksibel Sekali Bayar
            </h2>
            <p className="text-xs sm:text-sm text-[#70757A]">
              Bayar pas sudah jadi dan puas dengan hasilnya. Tidak ada biaya langganan bulanan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Package */}
            <div className="p-6 rounded-2xl bg-white border border-[#DADCE0] shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-gray-100 text-[#4D5156]">
                  Paket Hemat
                </span>
                <h3 className="text-xl font-bold text-[#202124]">Basic</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-[#005189]">Rp 39.000</span>
                  <span className="text-xs text-[#70757A]">/ undangan</span>
                </div>
                <ul className="space-y-2.5 text-xs text-[#4D5156] pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Masa Aktif 6 Bulan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Galeri Foto Hingga 10 Foto</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Petunjuk Lokasi Google Maps</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Hitung Mundur & Musik Latar</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full py-3 rounded-lg border border-[#005189] text-[#005189] hover:bg-[#005189]/5 text-xs font-bold transition-colors"
              >
                Pilih Basic
              </button>
            </div>

            {/* Premium Package (Highlighted) */}
            <div className="p-6 rounded-2xl bg-white border-2 border-[#005189] shadow-xl relative flex flex-col justify-between space-y-6 transform md:-translate-y-2">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#005189] text-white text-[11px] font-bold shadow-xs">
                Paling Diminati
              </span>
              <div className="space-y-4">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 text-[#005189]">
                  Fitur Favorit
                </span>
                <h3 className="text-xl font-bold text-[#202124]">Premium</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-[#005189]">Rp 49.000</span>
                  <span className="text-xs text-[#70757A]">/ undangan</span>
                </div>
                <ul className="space-y-2.5 text-xs text-[#4D5156] pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Masa Aktif 1 Tahun Penuh</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Galeri 20 Foto + Video Teaser</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Buku Tamu & Doa Restu Online</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Titip Kado / Amplop Digital & QRIS</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Nama Tamu Personal Tanpa Batas</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full py-3 rounded-lg bg-[#005189] hover:bg-[#003C66] text-white text-xs font-bold shadow-md transition-colors"
              >
                Pilih Premium
              </button>
            </div>

            {/* Exclusive Package */}
            <div className="p-6 rounded-2xl bg-white border border-[#DADCE0] shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-purple-50 text-purple-700">
                  Semua Fitur Terbuka
                </span>
                <h3 className="text-xl font-bold text-[#202124]">Exclusive</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-[#005189]">Rp 69.000</span>
                  <span className="text-xs text-[#70757A]">/ undangan</span>
                </div>
                <ul className="space-y-2.5 text-xs text-[#4D5156] pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Masa Aktif 2 Tahun</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Sistem QR Code & Meja Check-in</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Mendukung Multi-Acara Terpisah</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Live Streaming URL Integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Prioritas Bantuan CS WhatsApp</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full py-3 rounded-lg border border-[#005189] text-[#005189] hover:bg-[#005189]/5 text-xs font-bold transition-colors"
              >
                Pilih Exclusive
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FAQ ACCORDION SECTION */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[#005189]">
            Pertanyaan Umum
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-[#ECEEF1] rounded-xl overflow-hidden bg-white shadow-2xs"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-5 py-4 text-left flex items-center justify-between text-sm sm:text-base font-semibold text-[#202124] hover:bg-[#FAFBFD] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#70757A] transition-transform duration-300 ${
                    openFaq === idx ? 'rotate-180 text-[#005189]' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-4 text-xs sm:text-sm text-[#5F6368] leading-relaxed border-t border-[#F1F3F4] pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. FOOTER (Indoinvite Style) */}
      {/* ========================================================================= */}
      <footer className="bg-[#1F2937] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h4 className="font-serif text-2xl font-bold text-white">Invitatum</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Platform pembuatan undangan digital website modern, cepat, romantis, dan praktis untuk pernikahan, khitanan, aqiqah, dan segala acara.
            </p>
          </div>
          <div>
            <h5 className="font-semibold text-sm mb-3 text-white">Layanan</h5>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link href="/templates" className="hover:text-white">Undangan Khitanan</Link></li>
              <li><Link href="/wedding" className="hover:text-white">Undangan Pernikahan</Link></li>
              <li><Link href="/templates" className="hover:text-white">Undangan Aqiqah</Link></li>
              <li><Link href="/pricing" className="hover:text-white">Daftar Harga</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-sm mb-3 text-white">Bantuan & Legal</h5>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link href="/guide" className="hover:text-white">Panduan Pengguna</Link></li>
              <li><Link href="/terms" className="hover:text-white">Syarat & Ketentuan</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Kebijakan Privasi</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-sm mb-3 text-white">Customer Support</h5>
            <p className="text-xs text-gray-400 mb-2">Bantuan teknis & permintaan pembuatan via WhatsApp:</p>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] text-white text-xs font-bold shadow-sm hover:bg-[#1EBE5D] transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
              <span>WhatsApp CS (0812-3456-7890)</span>
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-gray-700 mt-8 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Invitatum. Hak Cipta Dilindungi.
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 10. FLOATING WHATSAPP BUTTON (Indoinvite Style) */}
      {/* ========================================================================= */}
      <a
        href="https://wa.me/6281234567890?text=Halo%20Admin%20Invitatum%2C%20saya%20mau%20minta%20tolong%20dibuatkan%20undangan%20digital%20dong"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-2xl font-bold text-xs sm:text-sm transition-all transform hover:scale-105 active:scale-95 border-2 border-white"
      >
        <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
        <span>Dibuatin Admin Aja</span>
      </a>

      {/* ========================================================================= */}
      {/* 11. MODAL: BUAT ACARA LANGSUNG (Indoinvite Style) */}
      {/* ========================================================================= */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-[#DADCE0] space-y-4">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 text-[#70757A] hover:text-black p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-[#202124]">
                Buat Undangan Gratis Hanya 5 Menit
              </h3>
              <p className="text-xs text-[#5F6368]">
                Bebas pilih semua tema premium. Semua data bisa dirubah lagi nanti!
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowCreateModal(false);
                window.location.href = `/dashboard/invitations/new?type=${formEventType.toLowerCase()}`;
              }}
              className="space-y-3.5"
            >
              <div>
                <label className="block text-xs font-semibold text-[#3C4043] mb-1">
                  Jenis Acara
                </label>
                <select
                  value={formEventType}
                  onChange={(e) => setFormEventType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DADCE0] text-xs font-medium focus:ring-2 focus:ring-[#005189] focus:outline-hidden bg-white"
                >
                  <option value="Khitanan">Khitanan</option>
                  <option value="Pernikahan">Pernikahan</option>
                  <option value="Aqiqah">Aqiqah</option>
                  <option value="Ulang Tahun">Ulang Tahun</option>
                  <option value="Wisuda">Acara Wisuda</option>
                  <option value="Acara Custom">Acara Custom Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3C4043] mb-1">
                  Nomor WhatsApp Pemilik Acara
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 081234567890"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DADCE0] text-xs focus:ring-2 focus:ring-[#005189] focus:outline-hidden"
                />
                <p className="text-[10px] text-[#70757A] mt-1">
                  *Nomor ini tidak akan terlihat oleh tamu undangan, hanya untuk notifikasi kehadiran & support.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3C4043] mb-1">
                  Tanggal Acara
                </label>
                <input
                  type="date"
                  required
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DADCE0] text-xs focus:ring-2 focus:ring-[#005189] focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-[#005189] hover:bg-[#003C66] text-white text-xs font-bold shadow-md transition-colors"
              >
                Lanjutkan Pembuatan Undangan
              </button>

              {/* Indoinvite WhatsApp Support Banner */}
              <div className="pt-2 border-t border-[#ECEEF1]">
                <a
                  href="https://wa.me/6281234567890?text=Halo%20Admin%2C%20saya%20minta%20tolong%20dibuatkan%20undangan%20digital%20dong"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-[#DADCE0] hover:border-[#25D366] bg-[#F8FFF9] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#25D366] flex items-center justify-center text-white shrink-0">
                    <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#202124]">
                      Gak Mau RIBET Minta Dibuatin Admin?
                    </h5>
                    <p className="text-[10px] text-[#5F6368] leading-tight">
                      Terima beres langsung bagus, bayar pas sudah jadi!
                    </p>
                  </div>
                </a>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
