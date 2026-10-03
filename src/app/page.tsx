'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
  MailOpen,
  HelpCircle,
  PhoneCall,
  Check,
} from 'lucide-react';

export default function HomePage() {
  // Category state for templates filter
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'wedding' | 'engagement' | 'sage' | 'rose' | 'champagne' | 'nusantara'>('all');

  // Rotating words in hero section
  const rotatingWords = [
    'Pernikahan Elegan',
    'Pertunangan Intim',
    'Akad Nikah Sakral',
    'Resepsi Penuh Pesona',
    'Momen Janji Suci',
  ];
  const [rotatingIndex, setRotatingIndex] = useState(0);

  // Phone Mockup Image Slider
  const mockupSlides = [
    {
      title: 'The Royal Sage',
      subtitle: 'Pernikahan Botanikal & Emas',
      category: 'Wedding',
      url: '/invitation/alyadanbudi',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80',
      badge: 'Terfavorit Calon Pengantin',
    },
    {
      title: 'Rose Gold Romance',
      subtitle: 'Nuansa Mawar & Segel Lilin 3D',
      category: 'Wedding',
      url: '/invitation/kevin-dan-amanda',
      image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=700&q=80',
      badge: 'Desain Romantis Mewah',
    },
    {
      title: 'Champagne Editorial',
      subtitle: 'Modern Minimalist Architecture',
      category: 'Wedding',
      url: '/invitation/rama-dan-shinta',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=700&q=80',
      badge: 'Gaya Editorial Kontemporer',
    },
    {
      title: 'Pastel Garden Engagement',
      subtitle: 'Momen Lamaran & Pertunangan',
      category: 'Engagement',
      url: '/invitation/arya-dan-nabila',
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=700&q=80',
      badge: 'Spesial Pertunangan',
    },
  ];
  const [mockupIndex, setMockupIndex] = useState(0);

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDemoSelectorModal, setShowDemoSelectorModal] = useState(false);

  // Quick Order Form
  const [formEventType, setFormEventType] = useState('Pernikahan (Wedding)');
  const [formCoupleNames, setFormCoupleNames] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formDate, setFormDate] = useState('2026-11-15');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Rotate hero words every 2.5s
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setRotatingIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2600);
    return () => clearInterval(wordInterval);
  }, [rotatingWords.length]);

  // Rotate mockup slides every 3.8s
  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setMockupIndex((prev) => (prev + 1) % mockupSlides.length);
    }, 3800);
    return () => clearInterval(sliderInterval);
  }, [mockupSlides.length]);

  // Template Catalog Data
  const templates = [
    {
      id: 'tmpl-royal-sage',
      name: 'The Royal Sage',
      category: 'wedding',
      styleTag: 'sage',
      price: 'Rp.49.000',
      rating: 5,
      previewUrl: '/invitation/alyadanbudi',
      thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
      badge: 'Best Seller Wedding',
      description: 'Bingkai lengkung botanikal berkelas dengan aksen hijau sage, kaligrafi anggun, dan wax seal monogram.',
      dominantColors: ['#587060', '#C5A059', '#FAF7F2'],
    },
    {
      id: 'tmpl-rose-romance',
      name: 'Rose Gold & Wax Seal',
      category: 'wedding',
      styleTag: 'rose',
      price: 'Rp.49.000',
      rating: 5,
      previewUrl: '/invitation/kevin-dan-amanda',
      thumbnail: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=600&q=80',
      badge: 'Paling Romantis',
      description: 'Sentuhan warna dusty pink lembut dengan ornamen mawar klasik dan amplop lipat 3D interaktif.',
      dominantColors: ['#B76E79', '#8C3B4A', '#FAF4F4'],
    },
    {
      id: 'tmpl-minimalist-champagne',
      name: 'Champagne Editorial',
      category: 'wedding',
      styleTag: 'champagne',
      price: 'Rp.49.000',
      rating: 5,
      previewUrl: '/invitation/rama-dan-shinta',
      thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
      badge: 'Minimalist Luxury',
      description: 'Tipografi modern editorial yang mewah dengan aksen champagne gold dan komposisi whitespace yang lega.',
      dominantColors: ['#C5A059', '#1C1917', '#FAF7F0'],
    },
    {
      id: 'tmpl-botanical-engagement',
      name: 'Pastel Garden Engagement',
      category: 'engagement',
      styleTag: 'sage',
      price: 'Rp.49.000',
      rating: 5,
      previewUrl: '/invitation/arya-dan-nabila',
      thumbnail: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80',
      badge: 'Spesial Lamaran',
      description: 'Desain manis dan intim khusus acara pertunangan dan lamaran dengan linimasa kisah pertemuan dan doa restu.',
      dominantColors: ['#7D9D8B', '#D4A3A3', '#FAF7F2'],
    },
    {
      id: 'tmpl-nusantara-heritage',
      name: 'Nusantara Royal Gold',
      category: 'wedding',
      styleTag: 'nusantara',
      price: 'Rp.49.000',
      rating: 5,
      previewUrl: '/invitation/alyadanbudi',
      thumbnail: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
      badge: 'Kemegahan Tradisi',
      description: 'Sentuhan keagungan adat nusantara dengan ornamen batik emas berkelas, sangat pas untuk pakaian adat.',
      dominantColors: ['#8C6E2D', '#242625', '#F5EEDB'],
    },
    {
      id: 'tmpl-blue-flowers',
      name: 'Blue-Flowers Classic',
      category: 'wedding',
      styleTag: 'sage',
      price: 'Rp.39.000',
      rating: 5,
      previewUrl: '/invitation/afnan-atma-purnama',
      thumbnail: 'https://sin1.contabostorage.com/2db3bf1e16cd47a08843bb881e39cce7:indoinvite-staging/indoinvite-staging/indoinvite-staging/nikah/upload/media/1728779243.webp',
      badge: 'Pilihan Keluarga',
      description: 'Ornamen bunga biru syahdu dengan pembuka gerbang anggun, cocok untuk tasyakuran keluarga dan khitanan.',
      dominantColors: ['#005189', '#2276b1', '#FFFFFF'],
    },
  ];

  // Filter logic
  const filteredTemplates = templates.filter((t) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'wedding') return t.category === 'wedding';
    if (selectedCategory === 'engagement') return t.category === 'engagement';
    return t.styleTag === selectedCategory;
  });

  const categoryTabs = [
    { id: 'all', label: 'Semua Koleksi' },
    { id: 'wedding', label: 'Pernikahan (Wedding)' },
    { id: 'engagement', label: 'Pertunangan (Engagement)' },
    { id: 'sage', label: 'Botanical Sage' },
    { id: 'rose', label: 'Rose Gold Romance' },
    { id: 'champagne', label: 'Champagne Editorial' },
    { id: 'nusantara', label: 'Adat Nusantara' },
  ];

  // Testimonials from real couples
  const reviews = [
    {
      names: 'Dimas & Kirana',
      avatar: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=140&q=80',
      rating: 5,
      event: 'Resepsi di Plataran Dharmawangsa, Jakarta',
      text: 'Animasi buka segel lilin wax seal-nya bener-bener bikin kagum semua tamu! Banyak saudara dan teman kantor yang langsung memuji undangannya mewah banget padahal harganya sangat terjangkau.',
      highlight: 'Wax Seal 3D Sangat Mewah',
    },
    {
      names: 'Kevin & Amanda',
      avatar: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=140&q=80',
      rating: 5,
      event: 'Wedding Celebration di Grand Hyatt, Jakarta',
      text: 'Fitur amplop digital dan RSVP online-nya ngebantu banget. Tamu dari luar kota bisa langsung kirim kado via QRIS dan transfer. Dashboard-nya rapi dan gampang dipantau kapan saja.',
      highlight: 'RSVP & Kado Digital Praktis',
    },
    {
      names: 'Arya & Nabila',
      avatar: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=140&q=80',
      rating: 5,
      event: 'Acara Lamaran & Pertunangan di Bandung',
      text: 'Kami pakai untuk acara lamaran keluarga besar. Musik latarnya menyentuh hati dan timeline cerita cintanya manis sekali. Pelayanan admin juga cepat dan ramah.',
      highlight: 'Sempurna untuk Momen Lamaran',
    },
  ];

  // FAQ Accordion Data
  const faqs = [
    {
      q: 'Bagaimana cara mencoba membuat undangan di Invitatum?',
      a: 'Sangat mudah! Anda dapat mencoba live editor langsung tanpa harus login atau membayar terlebih dahulu. Pilih tema favorit Anda, isi detail acara, dan lihat hasilnya secara seketika.',
    },
    {
      q: 'Apakah saya bisa minta dibuatkan langsung oleh tim desainer?',
      a: 'Tentu saja! Anda cukup mengklik tombol "Dibuatin Admin Aja" atau mengirimkan data acara ke WhatsApp kami. Tim kami akan menyusunkan foto, musik, dan detail acara Anda hingga sempurna.',
    },
    {
      q: 'Bagaimana sensasi animasi buka undangan Wax Seal 3D?',
      a: 'Undangan digital Invitatum dilengkapi pembuka amplop fisik virtual interaktif. Tamu akan melihat nama mereka di amplop katun, lalu ketika menyentuh segel lilin (wax seal), amplop terbuka elegan dengan efek 3D dan musik latar romantis mulai mengalun.',
    },
    {
      q: 'Apakah nama tamu bisa dipersonalisasi pada setiap tautan undangan?',
      a: 'Ya! Anda bisa membuat tautan khusus untuk setiap tamu secara otomatis, seperti domain.com/untuk/bapak-budi. Setiap tamu akan merasa diistimewakan saat menerima undangan personal.',
    },
    {
      q: 'Bagaimana sistem Amplop Digital dan QRIS bekerja?',
      a: 'Anda dapat mencantumkan nomor rekening bank (BCA, Mandiri, BNI, BSI, dll) serta gambar QRIS. Tamu cukup menekan 1 tombol untuk menyalin nomor rekening atau scan QRIS langsung dari smartphone mereka.',
    },
    {
      q: 'Apakah data acara masih bisa diubah setelah undangan aktif?',
      a: 'Bisa! Anda memiliki akses penuh ke Dashboard Invitatum untuk mengubah jadwal, menambah foto galeri, mengganti musik, maupun mengunduh daftar konfirmasi RSVP kapan saja selama masa aktif.',
    },
  ];

  const currentSlide = mockupSlides[mockupIndex];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#242625] font-sans antialiased selection:bg-[#C5A059]/25 selection:text-[#8C6E2D] overflow-x-hidden">
      {/* ========================================================================= */}
      {/* 1. TOP PROMO BANNER */}
      {/* ========================================================================= */}
      <aside aria-label="Pengumuman Promo" className="bg-[#587060] text-white py-2 px-4 text-xs font-medium text-center relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 bg-[#465B4D] px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-[#F3E5AB]">
            <Sparkles className="w-3 h-3" /> Musim Pernikahan 2026
          </span>
          <span>Dapatkan Promo Spesial Diskon 50% Paket Exclusive + Konsultasi Desain Gratis</span>
          <a
            href="https://wa.me/6281234567890?text=Halo%20Admin%20Invitatum,%20saya%20tertarik%20dengan%20promo%20undangan%20pernikahan"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-bold text-[#F3E5AB] hover:text-white transition-colors"
          >
            Klaim Diskon via WhatsApp
          </a>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. NAVBAR */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E2D8] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#587060] to-[#384732] flex items-center justify-center text-[#F3E5AB] shadow-md border border-[#C5A059]/40 group-hover:scale-105 transition-transform">
              <span className="font-serif text-2xl font-bold">I</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#242625] leading-none">
                Invitatum
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#8C6E2D] font-semibold mt-1">
                Wedding & Engagement
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#5A605B]">
            <a href="#katalog" className="hover:text-[#587060] transition-colors">
              Pernikahan
            </a>
            <a href="#katalog" className="hover:text-[#587060] transition-colors">
              Pertunangan
            </a>
            <a href="#fitur" className="hover:text-[#587060] transition-colors">
              Fitur Mewah
            </a>
            <a href="#harga" className="hover:text-[#587060] transition-colors">
              Paket Harga
            </a>
            <a href="#faq" className="hover:text-[#587060] transition-colors">
              Tanya Jawab
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-semibold text-[#587060] hover:text-[#384732] px-3.5 py-2 rounded-xl transition-colors tap-target-44 flex items-center"
            >
              Masuk
            </Link>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 bg-[#587060] hover:bg-[#465B4D] text-white px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide shadow-sm hover:shadow-md transition-all tap-target-44"
            >
              <Heart className="w-3.5 h-3.5 fill-[#F3E5AB] text-[#F3E5AB]" />
              <span>Buat Undangan</span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. HERO SECTION (Amati, Tiru, Modifikasi) */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-20 md:py-24 overflow-hidden border-b border-[#E8E2D8]/70">
        {/* Subtle Ambient Glow and Paper Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#587060_0.75px,transparent_0.75px)] [background-size:28px_28px]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-br from-[#D99B9B]/15 via-[#C5A059]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E8E2D8] shadow-xs text-xs font-medium text-[#5A605B]">
                <div className="flex items-center text-[#C5A059]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-[#242625]">5.0 Rating Kepuasan</span>
                <span className="text-[#8C6E2D]">• Dipercaya 1.200+ Pasangan</span>
              </div>

              {/* Dynamic Rotating Headline */}
              <div className="space-y-2">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#242625] leading-[1.15]">
                  Undangan Digital <br />
                  <span className="text-[#587060] transition-all duration-300">
                    {rotatingWords[rotatingIndex]}
                  </span>
                </h1>
                <p className="font-serif italic text-lg sm:text-xl text-[#8C6E2D]">
                  Anggun, Modern, & Berkesan untuk Hari Bahagia Anda
                </p>
              </div>

              {/* Product Subtitle */}
              <p className="text-sm sm:text-base text-[#5A605B] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Platform undangan pernikahan dan pertunangan digital premium dengan sensasi animasi buka amplop segel lilin wax seal 3D, konfirmasi kehadiran RSVP instan, amplop digital QRIS, serta iringan melodi romantis pilihan.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="#katalog"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#587060] hover:bg-[#465B4D] text-white px-8 py-3.5 rounded-full font-medium text-sm shadow-md hover:shadow-lg transition-all tap-target-44"
                >
                  <span>Pilih Tema Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setShowDemoSelectorModal(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F5F2EB] text-[#242625] px-7 py-3.5 rounded-full font-medium text-sm border border-[#E8E2D8] shadow-xs hover:shadow-sm transition-all tap-target-44"
                >
                  <Eye className="w-4 h-4 text-[#C5A059]" />
                  <span>Lihat Demo Undangan</span>
                </button>
              </div>

              {/* Key Highlights Bullet points */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-[#5A605B] border-t border-[#E8E2D8]/80 max-w-lg mx-auto lg:mx-0">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#587060]" />
                  <span>Animasi Wax Seal 3D</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#587060]" />
                  <span>RSVP & Buku Tamu</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#587060]" />
                  <span>Kado Digital & QRIS</span>
                </div>
              </div>
            </div>

            {/* Right Column: Smartphone Mockup Slider Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[340px]">
                {/* Decorative Frame Glow */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#587060]/20 via-[#C5A059]/20 to-transparent blur-2xl rounded-[50px] -z-10" />

                {/* Smartphone Chassis */}
                <div className="relative bg-[#1C1917] p-3 rounded-[46px] shadow-2xl border-[6px] border-[#292524]">
                  {/* Phone Speaker & Camera Notch */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#1C1917] rounded-full z-30 flex items-center justify-center">
                    <div className="w-12 h-1.5 bg-[#44403C] rounded-full" />
                  </div>

                  {/* Phone Screen Window */}
                  <div className="relative rounded-[36px] overflow-hidden bg-white aspect-[9/18.5] flex flex-col">
                    {/* Slide Image Background */}
                    <div className="relative flex-1 overflow-hidden">
                      <img
                        src={currentSlide.image}
                        alt={currentSlide.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                      {/* Monogram Seal on Screen */}
                      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[#FAF7F2]/90 border border-[#C5A059] flex items-center justify-center shadow-lg">
                        <MailOpen className="w-6 h-6 text-[#587060]" />
                      </div>

                      {/* Screen Content Info */}
                      <div className="absolute bottom-6 left-4 right-4 text-center text-white space-y-2">
                        <span className="inline-block px-3 py-1 rounded-full bg-[#587060]/80 backdrop-blur-sm text-[10px] font-semibold uppercase tracking-wider text-[#F3E5AB]">
                          {currentSlide.badge}
                        </span>
                        <h2 className="font-serif text-xl font-bold leading-tight">
                          {currentSlide.title}
                        </h2>
                        <p className="text-xs text-white/80 line-clamp-1">
                          {currentSlide.subtitle}
                        </p>
                        <div className="pt-2">
                          <Link
                            href={currentSlide.url}
                            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#C5A059] text-white text-xs font-semibold hover:bg-[#B38E46] transition-colors shadow-md tap-target-44"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>Buka Preview Demo</span>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Mockup Dot Indicators */}
                    <div className="h-9 bg-[#1C1917] flex items-center justify-center gap-2">
                      {mockupSlides.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setMockupIndex(idx)}
                          className={`h-2 rounded-full transition-all tap-target-44 ${
                            idx === mockupIndex ? 'w-6 bg-[#C5A059]' : 'w-2 bg-[#57534E]'
                          }`}
                          aria-label={`Lihat preview slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. TEMPLATE CATALOG SECTION (Pernikahan & Pertunangan) */}
      {/* ========================================================================= */}
      <section id="katalog" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8C6E2D]">
            Katalog Desain Eksklusif
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#242625]">
            Pilihan Tema Mewah & Estetik
          </h2>
          <p className="text-sm text-[#5A605B]">
            Setiap desain dirancang penuh ketelitian dengan tipografi editorial, ornamen elegan, dan fitur interaktif yang memudahkan tamu undangan Anda.
          </p>
        </div>

        {/* Category Tabs Filter */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categoryTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id as typeof selectedCategory)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-semibold transition-all tap-target-44 ${
                selectedCategory === tab.id
                  ? 'bg-[#587060] text-white shadow-sm'
                  : 'bg-white text-[#5A605B] border border-[#E8E2D8] hover:bg-[#F5F2EB]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="group bg-white rounded-3xl overflow-hidden border border-[#E8E2D8] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Image Area */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F2EB]">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[11px] font-bold text-[#587060] shadow-xs">
                    {template.badge}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-[#F3E5AB] px-2.5 py-1 rounded-full text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>5.0</span>
                </div>
              </div>

              {/* Card Content Area */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#8C6E2D] font-medium">
                    <span className="uppercase tracking-wider">
                      {template.category === 'wedding' ? 'Pernikahan' : 'Pertunangan'}
                    </span>
                    <div className="flex items-center gap-1">
                      {template.dominantColors.map((color, idx) => (
                        <div
                          key={idx}
                          className="w-3 h-3 rounded-full border border-black/10"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#242625]">
                    {template.name}
                  </h3>
                  <p className="text-xs text-[#5A605B] leading-relaxed line-clamp-2">
                    {template.description}
                  </p>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-[#E8E2D8] flex items-center gap-3">
                  <Link
                    href={template.previewUrl}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full border border-[#587060] text-[#587060] hover:bg-[#587060] hover:text-white text-xs font-semibold transition-all tap-target-44"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Lihat Demo</span>
                  </Link>

                  <button
                    onClick={() => {
                      setFormEventType(template.category === 'wedding' ? 'Pernikahan (Wedding)' : 'Pertunangan (Engagement)');
                      setShowCreateModal(true);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#587060] text-white hover:bg-[#465B4D] text-xs font-semibold shadow-xs transition-all tap-target-44"
                  >
                    <Heart className="w-3.5 h-3.5 fill-[#F3E5AB] text-[#F3E5AB]" />
                    <span>Pilih Desain</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. LUXURY FEATURES SECTION */}
      {/* ========================================================================= */}
      <section id="fitur" className="py-20 bg-white border-y border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8C6E2D]">
              Keistimewaan Invitatum
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#242625]">
              Dirancang untuk Kemudahan & Kesan Mendalam
            </h2>
            <p className="text-sm text-[#5A605B]">
              Semua fitur yang Anda butuhkan untuk menyambut keluarga, sahabat, dan kerabat hadir dalam satu tautan undangan yang menawan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-4 hover:border-[#C5A059] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#587060] flex items-center justify-center text-[#F3E5AB] shadow-sm">
                <MailOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#242625]">
                Sensasi Segel Lilin Wax Seal 3D
              </h3>
              <p className="text-xs sm:text-sm text-[#5A605B] leading-relaxed">
                Pengalaman membuka amplop virtual fisik dengan animasi 3D, amplop katun berlabel nama tamu personal, dan segel lilin berukir monogram.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-4 hover:border-[#C5A059] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#587060] flex items-center justify-center text-[#F3E5AB] shadow-sm">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#242625]">
                Buku Tamu & RSVP Realtime
              </h3>
              <p className="text-xs sm:text-sm text-[#5A605B] leading-relaxed">
                Tamu dapat mengonfirmasi kehadiran serta menyampaikan doa restu yang langsung tertera dan tersimpan di database dashboard Anda.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-4 hover:border-[#C5A059] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#587060] flex items-center justify-center text-[#F3E5AB] shadow-sm">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#242625]">
                Amplop Digital & QRIS Bank
              </h3>
              <p className="text-xs sm:text-sm text-[#5A605B] leading-relaxed">
                Memudahkan pemberian tanda kasih secara cashless melalui nomor rekening bank serta kode QRIS dengan fitur 1-klik salin rekening.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-4 hover:border-[#C5A059] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#587060] flex items-center justify-center text-[#F3E5AB] shadow-sm">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#242625]">
                Kisah Cinta & Hitung Mundur
              </h3>
              <p className="text-xs sm:text-sm text-[#5A605B] leading-relaxed">
                Abadikan linimasa momen pertemuan hingga lamaran bersama galeri foto beresolusi tinggi dan penghitung waktu mundur otomatis.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-4 hover:border-[#C5A059] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#587060] flex items-center justify-center text-[#F3E5AB] shadow-sm">
                <Music className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#242625]">
                Alunan Musik Romantis Pilihan
              </h3>
              <p className="text-xs sm:text-sm text-[#5A605B] leading-relaxed">
                Musik latar syahdu yang langsung mengalun saat undangan dibuka, dilengkapi tombol kontrol audio floating yang mudah diakses.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-4 hover:border-[#C5A059] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#587060] flex items-center justify-center text-[#F3E5AB] shadow-sm">
                <Send className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#242625]">
                Sebar Tautan via WhatsApp
              </h3>
              <p className="text-xs sm:text-sm text-[#5A605B] leading-relaxed">
                Generator salam pembuka dan nama tamu otomatis memudahkan Anda menyebarkan undangan ke ribuan kontak tanpa batasan kuota.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. VERIFIED COUPLE TESTIMONIALS */}
      {/* ========================================================================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8C6E2D]">
            Ulasan Asli Pengantin
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#242625]">
            Dipercaya pada Momen Paling Berharga
          </h2>
          <p className="text-sm text-[#5A605B]">
            Cerita kepuasan nyata dari pasangan pengantin yang telah memercayakan undangan digital mereka bersama Invitatum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#C5A059]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <h3 className="font-serif font-bold text-base text-[#242625]">
                  "{rev.highlight}"
                </h3>
                <p className="text-xs sm:text-sm text-[#5A605B] leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E2D8] flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.names}
                  className="w-11 h-11 rounded-full object-cover border border-[#C5A059]"
                />
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#242625]">
                    {rev.names}
                  </h4>
                  <p className="text-[11px] text-[#8C6E2D] line-clamp-1">
                    {rev.event}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. TRANSPARENT PRICING SECTION */}
      {/* ========================================================================= */}
      <section id="harga" className="py-20 bg-white border-y border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8C6E2D]">
              Paket Harga Transparan
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#242625]">
              Satu Kali Bayar, Tanpa Biaya Tersembunyi
            </h2>
            <p className="text-sm text-[#5A605B]">
              Pilih paket yang paling sesuai dengan kebutuhan perhelatan pernikahan maupun pertunangan Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Basic Tier */}
            <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#E8E2D8] flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-white text-xs font-bold text-[#5A605B] border border-[#E8E2D8]">
                  Paket Basic
                </span>
                <div>
                  <span className="font-serif text-4xl font-bold text-[#242625]">Rp 49.000</span>
                  <span className="text-xs text-[#5A605B]"> / sekali bayar</span>
                </div>
                <p className="text-xs text-[#5A605B]">
                  Pilihan hemat dan lengkap untuk perayaan intim dengan tampilan yang tetap anggun.
                </p>
                <div className="pt-4 space-y-2.5 text-xs text-[#5A605B]">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#587060]" />
                    <span>Masa Aktif 6 Bulan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#587060]" />
                    <span>Galeri hingga 10 Foto</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#587060]" />
                    <span>Musik Latar Romantis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#587060]" />
                    <span>Hitung Mundur & Google Maps</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#587060]" />
                    <span>Sebar Tautan WhatsApp Unlimited</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full py-3 rounded-full border border-[#587060] text-[#587060] hover:bg-[#587060] hover:text-white text-xs font-semibold transition-all tap-target-44"
              >
                Pilih Paket Basic
              </button>
            </div>

            {/* Premium Tier (Featured) */}
            <div className="relative p-8 rounded-3xl bg-[#FAF7F2] border-2 border-[#C5A059] shadow-xl flex flex-col justify-between space-y-8 scale-105 z-10">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#C5A059] text-white text-[11px] font-bold tracking-wider uppercase">
                Paling Diminati Pengantin
              </div>

              <div className="space-y-4 pt-2">
                <span className="px-3 py-1 rounded-full bg-[#587060] text-xs font-bold text-white">
                  Paket Premium
                </span>
                <div>
                  <span className="font-serif text-4xl font-bold text-[#242625]">Rp 99.000</span>
                  <span className="text-xs text-[#5A605B]"> / sekali bayar</span>
                </div>
                <p className="text-xs text-[#5A605B]">
                  Pilihan terfavorit dengan buku tamu interaktif, RSVP online, dan amplop digital QRIS.
                </p>
                <div className="pt-4 space-y-2.5 text-xs text-[#242625] font-medium">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C5A059]" />
                    <span>Semua fitur Paket Basic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C5A059]" />
                    <span>Masa Aktif 12 Bulan (1 Tahun)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C5A059]" />
                    <span>Animasi Wax Seal Monogram 3D</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C5A059]" />
                    <span>Buku Tamu & RSVP Online Realtime</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C5A059]" />
                    <span>Amplop Digital Rekening & QRIS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C5A059]" />
                    <span>Galeri 20 Foto + Video Teaser</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full py-3.5 rounded-full bg-[#587060] hover:bg-[#465B4D] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all tap-target-44"
              >
                Pilih Paket Premium
              </button>
            </div>

            {/* Exclusive Tier */}
            <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#E8E2D8] flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-white text-xs font-bold text-[#8C6E2D] border border-[#E8E2D8]">
                  Paket Exclusive
                </span>
                <div>
                  <span className="font-serif text-4xl font-bold text-[#242625]">Rp 149.000</span>
                  <span className="text-xs text-[#5A605B]"> / sekali bayar</span>
                </div>
                <p className="text-xs text-[#5A605B]">
                  Solusi paripurna untuk perhelatan akbar dengan meja check-in QR Code dan integrasi siaran langsung.
                </p>
                <div className="pt-4 space-y-2.5 text-xs text-[#5A605B]">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#587060]" />
                    <span>Semua fitur Paket Premium</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#587060]" />
                    <span>Masa Aktif 24 Bulan (2 Tahun)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#587060]" />
                    <span>Sistem Meja Check-in & Scanner QR</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#587060]" />
                    <span>Integrasi Live Streaming YouTube</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#587060]" />
                    <span>Prioritas Bantuan CS WhatsApp 24/7</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full py-3 rounded-full border border-[#587060] text-[#587060] hover:bg-[#587060] hover:text-white text-xs font-semibold transition-all tap-target-44"
              >
                Pilih Paket Exclusive
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FAQ ACCORDION */}
      {/* ========================================================================= */}
      <section id="faq" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8C6E2D]">
            Pertanyaan Umum
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#242625]">
            Segala Hal yang Perlu Anda Ketahui
          </h2>
          <p className="text-sm text-[#5A605B]">
            Jawaban lengkap seputar pembuatan, pengeditan, dan pembayaran undangan digital di Invitatum.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-[#E8E2D8] overflow-hidden transition-all shadow-xs"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif font-bold text-base text-[#242625] hover:text-[#587060] transition-colors tap-target-44"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#8C6E2D] shrink-0 transition-transform duration-300 ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === index && (
                <div className="px-6 pb-6 text-xs sm:text-sm text-[#5A605B] leading-relaxed border-t border-[#FAF7F2] pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. FOOTER */}
      {/* ========================================================================= */}
      <footer className="bg-[#1C1917] text-[#FAF7F2] pt-16 pb-12 border-t border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#292524]">
            {/* Col 1: Brand Info */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#587060] to-[#384732] flex items-center justify-center text-[#F3E5AB] font-serif font-bold text-lg border border-[#C5A059]">
                  I
                </div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  Invitatum
                </span>
              </div>
              <p className="text-xs text-[#A8A29E] leading-relaxed">
                Platform undangan pernikahan dan pertunangan digital premium Indonesia. Ciptakan kenangan terindah pada hari istimewa Anda.
              </p>
            </div>

            {/* Col 2: Kategori Acara */}
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-sm text-[#C5A059] uppercase tracking-wider">
                Kategori Utama
              </h3>
              <ul className="space-y-2 text-xs text-[#D6D3D1]">
                <li>
                  <a href="#katalog" className="hover:text-white transition-colors">
                    Undangan Pernikahan (Wedding)
                  </a>
                </li>
                <li>
                  <a href="#katalog" className="hover:text-white transition-colors">
                    Undangan Pertunangan (Engagement)
                  </a>
                </li>
                <li>
                  <a href="#katalog" className="hover:text-white transition-colors">
                    Tema Botanical Sage & Gold
                  </a>
                </li>
                <li>
                  <a href="#katalog" className="hover:text-white transition-colors">
                    Tema Rose Gold Romance
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Navigasi Cepat */}
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-sm text-[#C5A059] uppercase tracking-wider">
                Bantuan & Panduan
              </h3>
              <ul className="space-y-2 text-xs text-[#D6D3D1]">
                <li>
                  <Link href="/guide" className="hover:text-white transition-colors">
                    Panduan Membuat Undangan
                  </Link>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white transition-colors">
                    Pertanyaan yang Sering Diajukan
                  </a>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Syarat & Ketentuan Layanan
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Kebijakan Privasi
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Layanan WhatsApp Concierge */}
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-sm text-[#C5A059] uppercase tracking-wider">
                Layanan Khusus Calon Pengantin
              </h3>
              <p className="text-xs text-[#A8A29E] leading-relaxed">
                Ingin dibuatkan undangan langsung oleh desainer Invitatum? Hubungi kami via WhatsApp:
              </p>
              <a
                href="https://wa.me/6281234567890?text=Halo%20Admin%20Invitatum,%20saya%20ingin%20konsultasi%20pembuatan%20undangan%20pernikahan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#587060] text-white text-xs font-semibold hover:bg-[#465B4D] transition-colors tap-target-44"
              >
                <MessageCircle className="w-4 h-4 text-[#F3E5AB]" />
                <span>Chat Admin WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="pt-8 text-center text-xs text-[#78716C]">
            <p>© {new Date().getFullYear()} Invitatum Digital. Hak Cipta Dilindungi.</p>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 10. FLOATING WHATSAPP CONCIERGE BUTTON */}
      {/* ========================================================================= */}
      <aside aria-label="Bantuan WhatsApp" className="fixed bottom-6 right-6 z-40">
        <a
          href="https://wa.me/6281234567890?text=Halo%20Admin%20Invitatum,%20saya%20mau%20minta%20dibuatkan%20undangan%20pernikahan"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 bg-[#587060] hover:bg-[#465B4D] text-white pl-4 pr-5 py-3 rounded-full shadow-2xl border-2 border-[#C5A059]/50 hover:scale-105 transition-all tap-target-44"
          aria-label="Hubungi Admin WhatsApp"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 text-[#F3E5AB]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-[#F3E5AB] font-bold uppercase tracking-wider leading-none">
              Butuh Bantuan?
            </span>
            <span className="text-xs font-bold leading-tight mt-0.5">
              Dibuatin Admin Aja
            </span>
          </div>
        </a>
      </aside>

      {/* ========================================================================= */}
      {/* 11. QUICK CREATE INVITATION MODAL */}
      {/* ========================================================================= */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E8E2D8] space-y-6">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white border border-[#E8E2D8] flex items-center justify-center text-[#5A605B] hover:text-[#242625] transition-colors tap-target-44"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="text-xs uppercase font-bold text-[#8C6E2D] tracking-wider">
                Mulai Tanpa Komitmen
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#242625]">
                Buat Undangan Digital Anda
              </h3>
              <p className="text-xs text-[#5A605B]">
                Coba editor langsung secara gratis. Anda dapat memilih tema dan mengisi detail acara sekarang.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#242625] mb-1.5">
                  Jenis Acara
                </label>
                <select
                  value={formEventType}
                  onChange={(e) => setFormEventType(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-[#E8E2D8] rounded-xl text-xs font-medium focus:outline-none focus:border-[#587060]"
                >
                  <option>Pernikahan (Wedding)</option>
                  <option>Pertunangan (Engagement)</option>
                  <option>Akad Nikah Intim</option>
                  <option>Tasyakuran Keluarga</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#242625] mb-1.5">
                  Nama Panggilan Mempelai
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Dimas & Kirana"
                  value={formCoupleNames}
                  onChange={(e) => setFormCoupleNames(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-[#E8E2D8] rounded-xl text-xs font-medium focus:outline-none focus:border-[#587060]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#242625] mb-1.5">
                    Nomor WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="0812xxxxxxx"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-[#E8E2D8] rounded-xl text-xs font-medium focus:outline-none focus:border-[#587060]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#242625] mb-1.5">
                    Tanggal Rencana
                  </label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-[#E8E2D8] rounded-xl text-xs font-medium focus:outline-none focus:border-[#587060]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/dashboard/invitations/demo-invitation-wedding-01/editor"
                className="w-full py-3.5 rounded-full bg-[#587060] hover:bg-[#465B4D] text-white text-xs font-bold text-center shadow-md transition-all tap-target-44"
              >
                Mulai Isi Data di Editor
              </Link>

              <a
                href={`https://wa.me/6281234567890?text=Halo%20Admin%20Invitatum,%20saya%20mau%20buat%20undangan%20${encodeURIComponent(
                  formEventType
                )}%20untuk%20${encodeURIComponent(formCoupleNames || 'kami')}%20tanggal%20${encodeURIComponent(formDate)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full border border-[#587060] text-[#587060] hover:bg-[#FAF7F2] text-xs font-semibold text-center transition-all tap-target-44"
              >
                Kirim Data via WhatsApp (Dibuatkan Admin)
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 12. DEMO SELECTOR MODAL */}
      {/* ========================================================================= */}
      {showDemoSelectorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E8E2D8] space-y-6">
            <button
              onClick={() => setShowDemoSelectorModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white border border-[#E8E2D8] flex items-center justify-center text-[#5A605B] hover:text-[#242625] transition-colors tap-target-44"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="text-xs uppercase font-bold text-[#8C6E2D] tracking-wider">
                Live Preview Interaktif
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#242625]">
                Pilih Contoh Demo Undangan
              </h3>
              <p className="text-xs text-[#5A605B]">
                Rasakan langsung sensasi animasi segel lilin wax seal, musik latar romantis, dan fitur amplop digital.
              </p>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {/* Demo Item 1 */}
              <Link
                href="/invitation/alyadanbudi"
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-white border border-[#E8E2D8] hover:border-[#587060] hover:shadow-md transition-all group"
              >
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=120&q=80"
                  alt="The Royal Sage"
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif font-bold text-sm text-[#242625] group-hover:text-[#587060] transition-colors">
                      The Royal Sage (Dimas & Kirana)
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-[#FAF7F2] border border-[#E8E2D8] text-[10px] font-semibold text-[#587060]">
                      Wedding
                    </span>
                  </div>
                  <p className="text-xs text-[#5A605B] line-clamp-1">
                    Nuansa hijau sage botanikal dengan wax seal monogram emas.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#8C6E2D] group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Demo Item 2 */}
              <Link
                href="/invitation/kevin-dan-amanda"
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-white border border-[#E8E2D8] hover:border-[#587060] hover:shadow-md transition-all group"
              >
                <img
                  src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=120&q=80"
                  alt="Rose Gold Romance"
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif font-bold text-sm text-[#242625] group-hover:text-[#587060] transition-colors">
                      Rose Gold Romance (Kevin & Amanda)
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-[#FAF7F2] border border-[#E8E2D8] text-[10px] font-semibold text-[#8C3B4A]">
                      Wedding
                    </span>
                  </div>
                  <p className="text-xs text-[#5A605B] line-clamp-1">
                    Sentuhan dusty rose manis dengan segel lilin burgundy wine.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#8C6E2D] group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Demo Item 3 */}
              <Link
                href="/invitation/rama-dan-shinta"
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-white border border-[#E8E2D8] hover:border-[#587060] hover:shadow-md transition-all group"
              >
                <img
                  src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=120&q=80"
                  alt="Champagne Editorial"
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif font-bold text-sm text-[#242625] group-hover:text-[#587060] transition-colors">
                      Champagne Editorial (Rama & Shinta)
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-[#FAF7F2] border border-[#E8E2D8] text-[10px] font-semibold text-[#8C6E2D]">
                      Wedding
                    </span>
                  </div>
                  <p className="text-xs text-[#5A605B] line-clamp-1">
                    Minimalist luxury editorial dengan champagne gold metallic.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#8C6E2D] group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Demo Item 4 */}
              <Link
                href="/invitation/arya-dan-nabila"
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-white border border-[#E8E2D8] hover:border-[#587060] hover:shadow-md transition-all group"
              >
                <img
                  src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=120&q=80"
                  alt="Pastel Garden Engagement"
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif font-bold text-sm text-[#242625] group-hover:text-[#587060] transition-colors">
                      Pastel Garden Engagement (Arya & Nabila)
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-[#FAF7F2] border border-[#E8E2D8] text-[10px] font-semibold text-[#587060]">
                      Engagement
                    </span>
                  </div>
                  <p className="text-xs text-[#5A605B] line-clamp-1">
                    Spesial momen lamaran dengan linimasa cinta dan RSVP intim.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#8C6E2D] group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Demo Item 5 */}
              <Link
                href="/invitation/afnan-atma-purnama"
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-white border border-[#E8E2D8] hover:border-[#587060] hover:shadow-md transition-all group"
              >
                <img
                  src="https://sin1.contabostorage.com/2db3bf1e16cd47a08843bb881e39cce7:indoinvite-staging/indoinvite-staging/indoinvite-staging/nikah/upload/media/1728779243.webp"
                  alt="Blue-Flowers Khitanan"
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif font-bold text-sm text-[#242625] group-hover:text-[#587060] transition-colors">
                      Blue-Flowers (Afnan Atma Purnama)
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-[#FAF7F2] border border-[#E8E2D8] text-[10px] font-semibold text-[#005189]">
                      Khitanan
                    </span>
                  </div>
                  <p className="text-xs text-[#5A605B] line-clamp-1">
                    Tema bunga biru syahdu dengan pembuka gerbang anggun.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#8C6E2D] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
