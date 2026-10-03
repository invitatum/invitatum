'use client';

import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Heart,
  ExternalLink,
  Download,
  Share2,
  Video,
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

export function TheRoyalSageTemplate({ invitation, guest, isPreview = false }: TemplateProps) {
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
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#242625] font-sans selection:bg-[#607755]/20 selection:text-[#384732]">
      {/* Interactive Wax Seal Opener */}
      {!isOpen && (
        <WaxSealCover
          invitation={invitation}
          guest={guest}
          onOpen={() => setIsOpen(true)}
          accentColor="#607755"
          themeStyle="sage"
        />
      )}

      {/* Floating Background Music */}
      {music.isEnabled && (
        <FloatingMusicPlayer
          audioUrl={music.audioUrl}
          songTitle={music.title}
          artist={music.artist}
          autoPlayTrigger={isOpen}
        />
      )}

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-20 text-center overflow-hidden">
        {/* Decorative Arched Floral Frame */}
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#607755_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="relative z-10 max-w-xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#607755]/30 bg-white/80 text-xs uppercase tracking-widest text-[#384732]">
            <span>{invitation.category === 'wedding' ? 'The Wedding of' : 'The Engagement of'}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#242625] leading-tight">
            {couple.groomNickname} <br />
            <span className="font-normal text-3xl sm:text-4xl text-[#C5A059]">&</span> <br />
            {couple.brideNickname}
          </h1>

          {/* Arched Photo Frame (Wevitation Signature) */}
          <div className="relative mx-auto w-56 h-72 sm:w-64 sm:h-80 rounded-t-full rounded-b-3xl overflow-hidden border-4 border-white shadow-lg shadow-[#607755]/10 mt-6">
            <img
              src={couple.groomPhoto}
              alt="Mempelai"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border border-[#E8E2D8] rounded-t-full rounded-b-3xl pointer-events-none" />
          </div>

          <p className="text-xs uppercase tracking-widest text-[#5A605B] pt-4">
            {events[0]?.date} • {events[0]?.venueName}
          </p>
        </div>
      </section>

      {/* Sacred Quote */}
      {couple.quote && (
        <section className="py-16 px-4 bg-white/60 border-y border-[#E8E2D8]">
          <div className="max-w-xl mx-auto text-center space-y-4">
            <Heart className="w-6 h-6 text-[#607755] mx-auto opacity-70" />
            <blockquote className="font-serif italic text-base sm:text-lg text-[#242625] leading-relaxed">
              "{couple.quote}"
            </blockquote>
            <p className="text-xs font-semibold text-[#8C6E2D] uppercase tracking-wider">
              {couple.quoteSource}
            </p>
          </div>
        </section>
      )}

      {/* Couple Profiles */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-14 space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#607755] font-semibold">
            Pasangan Mempelai
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#242625]">
            Mempelai Pria & Wanita
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 items-center">
          {/* Groom */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-48 h-64 rounded-t-full rounded-b-2xl overflow-hidden border-4 border-white shadow-md">
              <img
                src={couple.groomPhoto}
                alt={couple.groomName}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#242625]">{couple.groomName}</h3>
            <div className="text-xs text-[#5A605B] leading-relaxed">
              <p>Putra dari:</p>
              <p className="font-medium text-[#242625]">{couple.groomFather}</p>
              <p>& {couple.groomMother}</p>
            </div>
            {couple.groomInstagram && (
              <a
                href={`https://instagram.com/${couple.groomInstagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E8E2D8] text-xs text-[#5A605B] hover:text-[#242625] hover:border-[#607755] transition-colors tap-target-44"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-[#607755]" />
                <span>@{couple.groomInstagram}</span>
              </a>
            )}
          </div>

          {/* Bride */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-48 h-64 rounded-t-full rounded-b-2xl overflow-hidden border-4 border-white shadow-md">
              <img
                src={couple.bridePhoto}
                alt={couple.brideName}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#242625]">{couple.brideName}</h3>
            <div className="text-xs text-[#5A605B] leading-relaxed">
              <p>Putri dari:</p>
              <p className="font-medium text-[#242625]">{couple.brideFather}</p>
              <p>& {couple.brideMother}</p>
            </div>
            {couple.brideInstagram && (
              <a
                href={`https://instagram.com/${couple.brideInstagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E8E2D8] text-xs text-[#5A605B] hover:text-[#242625] hover:border-[#607755] transition-colors tap-target-44"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-[#607755]" />
                <span>@{couple.brideInstagram}</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Countdown Timer */}
      {countdown.isEnabled && (
        <section className="py-14 px-4 bg-[#607755]/5 border-y border-[#E8E2D8]">
          <div className="max-w-xl mx-auto text-center">
            <span className="text-xs uppercase tracking-widest text-[#607755] font-semibold">
              Menghitung Hari
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#242625] mt-1">
              Menuju Momen Sakral Kami
            </h3>
            <CountdownTimer targetDate={countdown.targetDate} accentColor="#607755" />
          </div>
        </section>
      )}

      {/* Event Details (Multi-Event Support) */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-14 space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#607755] font-semibold">
            Rangkaian Acara
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#242625]">
            Jadwal & Lokasi Acara
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((ev, idx) => (
            <div
              key={ev.id}
              className="p-8 rounded-3xl bg-white border border-[#E8E2D8] shadow-sm flex flex-col justify-between text-center space-y-6"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#607755]/10 text-[#607755] flex items-center justify-center mx-auto">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#242625]">{ev.title}</h3>
                <div className="text-xs font-semibold text-[#8C6E2D] uppercase tracking-wider">
                  {ev.date} • {ev.startTime} - {ev.endTime} {ev.timezone}
                </div>
                <div className="text-xs text-[#5A605B] pt-2 space-y-1">
                  <p className="font-semibold text-[#242625] text-sm">{ev.venueName}</p>
                  <p className="leading-relaxed">{ev.venueAddress}</p>
                  {ev.dressCode && (
                    <p className="text-[#607755] font-medium pt-2">
                      Dresscode: {ev.dressCode}
                    </p>
                  )}
                  {ev.notes && <p className="italic text-[11px] text-[#5A605B]">{ev.notes}</p>}
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                {ev.googleMapsUrl && (
                  <a
                    href={ev.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#607755] text-white text-xs font-medium hover:bg-[#384732] transition-colors tap-target-44 w-full sm:w-auto justify-center"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Petunjuk Arah Google Maps</span>
                  </a>
                )}
                <button
                  onClick={() => handleDownloadIcs(idx)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#E8E2D8] text-[#242625] text-xs font-medium hover:bg-[#FAF7F2] transition-colors tap-target-44 w-full sm:w-auto justify-center"
                >
                  <Download className="w-3.5 h-3.5 text-[#5A605B]" />
                  <span>Simpan ke Kalender</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Stream Section */}
      {liveStream.isEnabled && (
        <section className="py-12 px-4 bg-white/80 border-y border-[#E8E2D8] text-center">
          <div className="max-w-md mx-auto space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#8C3B4A]/10 text-[#8C3B4A] flex items-center justify-center mx-auto">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#242625]">
              Siaran Langsung Acara
            </h3>
            <p className="text-xs text-[#5A605B] leading-relaxed">
              {liveStream.note || 'Bagi keluarga dan kerabat yang tidak dapat hadir secara langsung, silakan menyaksikan prosesi melalui siaran langsung.'}
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

      {/* Love Story Timeline */}
      {loveStory && loveStory.length > 0 && (
        <section className="py-20 px-4 max-w-3xl mx-auto">
          <div className="text-center mb-14 space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#607755] font-semibold">
              Kisah Kasih
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#242625]">
              Perjalanan Cerita Kami
            </h2>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:bg-[#E8E2D8] before:hidden sm:before:block">
            {loveStory.map((story, i) => (
              <div
                key={story.id}
                className={`relative flex flex-col sm:flex-row items-center gap-6 ${
                  i % 2 === 0 ? 'sm:flex-row-reverse' : ''
                }`}
              >
                <div className="w-full sm:w-1/2 p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-2 text-center sm:text-left">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#607755]/10 text-[#607755] text-xs font-bold font-mono">
                    {story.year}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-[#242625]">{story.title}</h4>
                  <p className="text-xs text-[#5A605B] leading-relaxed">{story.description}</p>
                </div>

                <div className="w-6 h-6 rounded-full bg-[#FAF7F2] border-4 border-[#607755] z-10 hidden sm:block" />

                <div className="w-full sm:w-1/2 flex justify-center">
                  {story.photoUrl && (
                    <img
                      src={story.photoUrl}
                      alt={story.title}
                      className="w-36 h-36 rounded-2xl object-cover shadow-sm border-2 border-white"
                    />
                  )}
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
            <span className="text-xs uppercase tracking-widest text-[#607755] font-semibold">
              Dokumentasi Momen
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#242625]">
              Galeri Kenangan
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {gallery.photos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedImage(photo.url)}
                className="group relative h-48 sm:h-64 rounded-2xl overflow-hidden cursor-pointer shadow-xs border border-[#E8E2D8]"
              >
                <img
                  src={photo.url}
                  alt={photo.caption || 'Foto Galeri'}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {photo.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-[11px] text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    {photo.caption}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative max-w-3xl max-h-[90vh]">
                <img
                  src={selectedImage}
                  alt="Enlarged"
                  className="w-full h-full object-contain rounded-2xl"
                />
              </div>
            </div>
          )}
        </section>
      )}

      {/* QR Check-in Desk Badge (If Guest Personalized) */}
      {qrCheckIn.isEnabled && guest && (
        <section className="py-8 px-4 bg-white/60 border-t border-[#E8E2D8]">
          <QrCheckInBadge guest={guest} accentColor="#607755" />
        </section>
      )}

      {/* RSVP Section */}
      <section className="bg-white/40 border-t border-[#E8E2D8]">
        <RsvpSection invitationId={invitation.id} guest={guest} accentColor="#607755" />
      </section>

      {/* Guestbook & Wishes */}
      <section className="border-t border-[#E8E2D8]">
        <WishesSection invitationId={invitation.id} guest={guest} accentColor="#607755" />
      </section>

      {/* Digital Gift */}
      {digitalGift.isEnabled && (
        <section className="bg-white/40 border-t border-[#E8E2D8]">
          <DigitalGiftSection
            accounts={digitalGift.accounts}
            shippingAddress={digitalGift.shippingAddress}
            accentColor="#607755"
          />
        </section>
      )}

      {/* Invitation Footer */}
      <footer className="py-16 px-4 text-center border-t border-[#E8E2D8] bg-[#FAF7F2] space-y-4">
        <div className="w-12 h-12 rounded-full border border-[#607755] flex items-center justify-center mx-auto text-[#607755]">
          <Heart className="w-5 h-5 fill-[#607755]/20" />
        </div>
        <div className="font-serif text-2xl font-bold text-[#242625]">
          {couple.groomNickname} & {couple.brideNickname}
        </div>
        <p className="text-xs text-[#5A605B]">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.
        </p>
        <div className="pt-4 text-[10px] uppercase tracking-widest text-[#5A605B]">
          Created with Invitatum Digital Platform
        </div>
      </footer>
    </div>
  );
}
