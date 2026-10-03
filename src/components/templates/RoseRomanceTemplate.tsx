'use client';

import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Heart,
  ExternalLink,
  Download,
  Video,
  Sparkles,
} from 'lucide-react';
import { InstagramIcon } from '@/components/common/Icons';
import { InvitationData, GuestItem } from '@/types';
import { WaxSealCover } from './common/WaxSealCover';
import { FloatingMusicPlayer } from './common/FloatingMusicPlayer';
import { CountdownTimer } from './common/CountdownTimer';
import { RsvpSection } from './common/RsvpSection';
import { WishesSection } from './common/WishesSection';
import { DigitalGiftSection } from './common/DigitalGiftSection';
import { QrCheckInBadge } from './common/QrCheckInBadge';

interface TemplateProps {
  invitation: InvitationData;
  guest?: GuestItem;
  isPreview?: boolean;
}

export function RoseRomanceTemplate({ invitation, guest, isPreview = false }: TemplateProps) {
  const [isOpen, setIsOpen] = useState(isPreview);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { couple, events, countdown, loveStory, gallery, music, digitalGift, liveStream, qrCheckIn } =
    invitation;

  const handleDownloadIcs = (eventIndex = 0) => {
    const ev = events[eventIndex];
    if (!ev) return;
    const cleanDate = ev.date.replace(/-/g, '');
    const cleanStart = ev.startTime.replace(/:/g, '') + '00';
    const cleanEnd = ev.endTime.replace(/:/g, '') + '00';

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `SUMMARY:${invitation.title} - ${ev.title}`,
      `DESCRIPTION:${ev.notes || ''} Lokasi: ${ev.venueName}, ${ev.venueAddress}`,
      `LOCATION:${ev.venueName}, ${ev.venueAddress}`,
      `DTSTART:${cleanDate}T${cleanStart}`,
      `DTEND:${cleanDate}T${cleanEnd}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${invitation.slug}-${ev.title}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative min-h-screen bg-[#FFFBFB] text-[#242625] font-sans selection:bg-[#D99B9B]/30 selection:text-[#8C3B4A]">
      {/* Wax Seal Opener */}
      {!isOpen && (
        <WaxSealCover
          invitation={invitation}
          guest={guest}
          onOpen={() => setIsOpen(true)}
          accentColor="#8C3B4A"
          themeStyle="rose"
        />
      )}

      {/* Music Player */}
      {music.isEnabled && (
        <FloatingMusicPlayer
          audioUrl={music.audioUrl}
          songTitle={music.title}
          artist={music.artist}
          autoPlayTrigger={isOpen}
        />
      )}

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-20 text-center overflow-hidden bg-gradient-to-b from-[#FFF5F5] to-[#FFFBFB]">
        <div className="relative z-10 max-w-xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D99B9B] bg-white text-xs uppercase tracking-widest text-[#8C3B4A]">
            <Sparkles className="w-3.5 h-3.5 text-[#D99B9B]" />
            <span>{invitation.category === 'wedding' ? 'Undangan Pernikahan' : 'Pertunangan'}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#8C3B4A] leading-tight">
            {couple.groomNickname} <br />
            <span className="font-normal text-3xl sm:text-4xl text-[#D99B9B]">&</span> <br />
            {couple.brideNickname}
          </h1>

          {/* Double Photo Frame (Indoinvite Romance Style) */}
          <div className="flex justify-center items-center gap-3 sm:gap-6 mt-6">
            <div className="w-36 h-48 sm:w-44 sm:h-60 rounded-3xl overflow-hidden border-4 border-white shadow-md rotate-[-2deg] hover:rotate-0 transition-transform">
              <img
                src={couple.groomPhoto}
                alt={couple.groomNickname}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-36 h-48 sm:w-44 sm:h-60 rounded-3xl overflow-hidden border-4 border-white shadow-md rotate-[2deg] hover:rotate-0 transition-transform">
              <img
                src={couple.bridePhoto}
                alt={couple.brideNickname}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <p className="text-xs uppercase tracking-widest text-[#5A605B] pt-4">
            {events[0]?.date} • {events[0]?.venueName}
          </p>
        </div>
      </section>

      {/* Sacred Quote */}
      {couple.quote && (
        <section className="py-16 px-4 bg-white border-y border-[#F2E6E6]">
          <div className="max-w-xl mx-auto text-center space-y-4">
            <Heart className="w-6 h-6 text-[#8C3B4A] mx-auto fill-[#D99B9B]/20" />
            <blockquote className="font-serif italic text-base sm:text-lg text-[#242625] leading-relaxed">
              "{couple.quote}"
            </blockquote>
            <p className="text-xs font-semibold text-[#8C3B4A] uppercase tracking-wider">
              {couple.quoteSource}
            </p>
          </div>
        </section>
      )}

      {/* Couple Section */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-14 space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#8C3B4A] font-semibold">
            Kedua Mempelai
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#8C3B4A]">
            Profil Mempelai
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 items-center">
          {/* Groom */}
          <div className="p-8 rounded-3xl bg-white border border-[#F2E6E6] shadow-xs text-center space-y-4">
            <div className="w-36 h-36 rounded-full mx-auto overflow-hidden border-4 border-[#D99B9B] shadow-sm">
              <img src={couple.groomPhoto} alt={couple.groomName} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#242625]">{couple.groomName}</h3>
            <div className="text-xs text-[#5A605B] leading-relaxed">
              <p>Putra tercinta dari:</p>
              <p className="font-semibold text-[#242625]">{couple.groomFather}</p>
              <p>& {couple.groomMother}</p>
            </div>
            {couple.groomInstagram && (
              <a
                href={`https://instagram.com/${couple.groomInstagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#D99B9B] text-xs text-[#8C3B4A] hover:bg-[#FFF5F5] transition-colors tap-target-44"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>@{couple.groomInstagram}</span>
              </a>
            )}
          </div>

          {/* Bride */}
          <div className="p-8 rounded-3xl bg-white border border-[#F2E6E6] shadow-xs text-center space-y-4">
            <div className="w-36 h-36 rounded-full mx-auto overflow-hidden border-4 border-[#D99B9B] shadow-sm">
              <img src={couple.bridePhoto} alt={couple.brideName} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#242625]">{couple.brideName}</h3>
            <div className="text-xs text-[#5A605B] leading-relaxed">
              <p>Putri tercinta dari:</p>
              <p className="font-semibold text-[#242625]">{couple.brideFather}</p>
              <p>& {couple.brideMother}</p>
            </div>
            {couple.brideInstagram && (
              <a
                href={`https://instagram.com/${couple.brideInstagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#D99B9B] text-xs text-[#8C3B4A] hover:bg-[#FFF5F5] transition-colors tap-target-44"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>@{couple.brideInstagram}</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Countdown Timer */}
      {countdown.isEnabled && (
        <section className="py-14 px-4 bg-[#FFF5F5] border-y border-[#F2E6E6]">
          <div className="max-w-xl mx-auto text-center">
            <span className="text-xs uppercase tracking-widest text-[#8C3B4A] font-semibold">
              Hari Bahagia
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#242625] mt-1">
              Menghitung Waktu Bersama
            </h3>
            <CountdownTimer targetDate={countdown.targetDate} accentColor="#8C3B4A" />
          </div>
        </section>
      )}

      {/* Events */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-14 space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#8C3B4A] font-semibold">
            Agenda Acara
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#8C3B4A]">
            Waktu & Tempat Pelaksanaan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((ev, idx) => (
            <div
              key={ev.id}
              className="p-8 rounded-3xl bg-white border border-[#F2E6E6] shadow-sm flex flex-col justify-between text-center space-y-6"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#FFF5F5] text-[#8C3B4A] flex items-center justify-center mx-auto border border-[#D99B9B]">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#242625]">{ev.title}</h3>
                <div className="text-xs font-semibold text-[#8C3B4A] uppercase tracking-wider">
                  {ev.date} • {ev.startTime} - {ev.endTime} {ev.timezone}
                </div>
                <div className="text-xs text-[#5A605B] pt-2 space-y-1">
                  <p className="font-semibold text-[#242625] text-sm">{ev.venueName}</p>
                  <p className="leading-relaxed">{ev.venueAddress}</p>
                  {ev.dressCode && (
                    <p className="text-[#8C3B4A] font-medium pt-2">
                      Dresscode: {ev.dressCode}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                {ev.googleMapsUrl && (
                  <a
                    href={ev.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#8C3B4A] text-white text-xs font-medium hover:bg-[#6D2E3A] transition-colors tap-target-44 w-full sm:w-auto justify-center"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Petunjuk Arah Google Maps</span>
                  </a>
                )}
                <button
                  onClick={() => handleDownloadIcs(idx)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#D99B9B] text-[#8C3B4A] text-xs font-medium hover:bg-[#FFF5F5] transition-colors tap-target-44 w-full sm:w-auto justify-center"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Simpan ke Kalender</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Stream */}
      {liveStream.isEnabled && (
        <section className="py-12 px-4 bg-[#FFF5F5] border-y border-[#F2E6E6] text-center">
          <div className="max-w-md mx-auto space-y-3">
            <div className="w-12 h-12 rounded-full bg-white text-[#8C3B4A] flex items-center justify-center mx-auto border border-[#D99B9B]">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#242625]">
              Siaran Langsung Acara
            </h3>
            <p className="text-xs text-[#5A605B]">
              {liveStream.note || 'Saksikan momen bahagia kami melalui tautan siaran langsung berikut.'}
            </p>
            <div className="pt-2">
              <a
                href={liveStream.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#8C3B4A] text-white text-xs font-medium hover:bg-[#6D2E3A] transition-colors tap-target-44"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Buka Siaran Langsung ({liveStream.platform.toUpperCase()})</span>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Love Story */}
      {loveStory && loveStory.length > 0 && (
        <section className="py-20 px-4 max-w-3xl mx-auto">
          <div className="text-center mb-14 space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#8C3B4A] font-semibold">
              Kisah Kasih
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#8C3B4A]">
              Kisah Cinta Kami
            </h2>
          </div>

          <div className="space-y-6">
            {loveStory.map((story) => (
              <div
                key={story.id}
                className="p-6 rounded-3xl bg-white border border-[#F2E6E6] shadow-xs flex flex-col sm:flex-row items-center gap-6"
              >
                {story.photoUrl && (
                  <img
                    src={story.photoUrl}
                    alt={story.title}
                    className="w-28 h-28 rounded-2xl object-cover shrink-0 border-2 border-[#D99B9B]/30"
                  />
                )}
                <div className="space-y-1 text-center sm:text-left">
                  <span className="inline-block px-3 py-0.5 rounded-full bg-[#FFF5F5] text-[#8C3B4A] text-xs font-bold font-mono">
                    {story.year}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-[#242625]">{story.title}</h4>
                  <p className="text-xs text-[#5A605B] leading-relaxed">{story.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Photo Gallery */}
      {gallery.photos.length > 0 && (
        <section className="py-20 px-4 max-w-5xl mx-auto">
          <div className="text-center mb-14 space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#8C3B4A] font-semibold">
              Galeri Kenangan
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#8C3B4A]">
              Momen Terindah
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {gallery.photos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedImage(photo.url)}
                className="group relative h-48 sm:h-64 rounded-2xl overflow-hidden cursor-pointer shadow-xs border border-[#F2E6E6]"
              >
                <img
                  src={photo.url}
                  alt={photo.caption || 'Foto Galeri'}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>

          {selectedImage && (
            <div
              className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative max-w-3xl max-h-[90vh]">
                <img src={selectedImage} alt="Enlarged" className="w-full h-full object-contain rounded-2xl" />
              </div>
            </div>
          )}
        </section>
      )}

      {/* QR Check-in Desk */}
      {qrCheckIn.isEnabled && guest && (
        <section className="py-8 px-4 bg-[#FFF5F5] border-t border-[#F2E6E6]">
          <QrCheckInBadge guest={guest} accentColor="#8C3B4A" />
        </section>
      )}

      {/* RSVP */}
      <section className="bg-white border-t border-[#F2E6E6]">
        <RsvpSection invitationId={invitation.id} guest={guest} accentColor="#8C3B4A" />
      </section>

      {/* Wishes */}
      <section className="border-t border-[#F2E6E6]">
        <WishesSection invitationId={invitation.id} guest={guest} accentColor="#8C3B4A" />
      </section>

      {/* Digital Gift */}
      {digitalGift.isEnabled && (
        <section className="bg-[#FFF5F5] border-t border-[#F2E6E6]">
          <DigitalGiftSection
            accounts={digitalGift.accounts}
            shippingAddress={digitalGift.shippingAddress}
            accentColor="#8C3B4A"
          />
        </section>
      )}

      {/* Footer */}
      <footer className="py-16 px-4 text-center border-t border-[#F2E6E6] bg-[#FFFBFB] space-y-4">
        <div className="w-12 h-12 rounded-full border border-[#D99B9B] flex items-center justify-center mx-auto text-[#8C3B4A]">
          <Heart className="w-5 h-5 fill-[#D99B9B]/20" />
        </div>
        <div className="font-serif text-2xl font-bold text-[#8C3B4A]">
          {couple.groomNickname} & {couple.brideNickname}
        </div>
        <p className="text-xs text-[#5A605B]">
          Doa restu Anda adalah anugerah terindah bagi pernikahan kami.
        </p>
        <div className="pt-4 text-[10px] uppercase tracking-widest text-[#5A605B]">
          Created with Invitatum Digital Platform
        </div>
      </footer>
    </div>
  );
}
