'use client';

import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Heart,
  ExternalLink,
  Download,
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

export function MinimalistChampagneTemplate({ invitation, guest, isPreview = false }: TemplateProps) {
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
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#242625] font-sans selection:bg-[#C5A059]/20 selection:text-[#8C6E2D]">
      {/* Wax Seal Opener */}
      {!isOpen && (
        <WaxSealCover
          invitation={invitation}
          guest={guest}
          onOpen={() => setIsOpen(true)}
          accentColor="#C5A059"
          themeStyle="champagne"
        />
      )}

      {/* Floating Music Player */}
      {music.isEnabled && (
        <FloatingMusicPlayer
          audioUrl={music.audioUrl}
          songTitle={music.title}
          artist={music.artist}
          autoPlayTrigger={isOpen}
        />
      )}

      {/* Hero Section (nvi.id Editorial Typography) */}
      <section className="relative min-h-[92vh] flex flex-col justify-between px-6 py-16 text-center border-b border-[#E8E2D8]">
        <div className="text-[11px] uppercase tracking-[0.3em] text-[#8C6E2D] font-semibold">
          {invitation.category === 'wedding' ? 'Wedding Invitation' : 'Engagement Invitation'}
        </div>

        <div className="max-w-2xl mx-auto my-auto space-y-6">
          <h1 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-[#242625] uppercase leading-none">
            {couple.groomNickname} <br />
            <span className="text-3xl sm:text-4xl font-light text-[#C5A059] italic lowercase font-sans">&</span> <br />
            {couple.brideNickname}
          </h1>

          <div className="w-16 h-[1px] bg-[#C5A059] mx-auto" />

          <p className="text-xs uppercase tracking-[0.25em] text-[#5A605B]">
            {events[0]?.date} • Jakarta, Indonesia
          </p>
        </div>

        {/* Featured Photography */}
        <div className="max-w-md mx-auto w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border border-[#E8E2D8] mb-6">
          <img src={couple.groomPhoto} alt="Couple" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Sacred Quote */}
      {couple.quote && (
        <section className="py-20 px-6 max-w-xl mx-auto text-center space-y-4">
          <span className="text-[10px] uppercase tracking-widest text-[#8C6E2D]">
            The Holy Blessing
          </span>
          <blockquote className="font-serif text-lg sm:text-xl text-[#242625] leading-relaxed italic">
            "{couple.quote}"
          </blockquote>
          <p className="text-xs text-[#5A605B] font-mono tracking-wider">
            {couple.quoteSource}
          </p>
        </section>
      )}

      {/* Couple Profiles */}
      <section className="py-20 px-6 max-w-4xl mx-auto border-t border-[#E8E2D8]">
        <div className="text-center mb-16 space-y-1">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C6E2D] font-semibold">
            Honored Couple
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#242625]">
            The Groom & The Bride
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Groom */}
          <div className="space-y-4 text-center md:text-left">
            <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden border border-[#E8E2D8] shadow-xs">
              <img src={couple.groomPhoto} alt={couple.groomName} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#242625]">{couple.groomName}</h3>
            <div className="text-xs text-[#5A605B] leading-relaxed">
              <p className="text-[10px] uppercase tracking-wider text-[#8C6E2D]">Son of:</p>
              <p className="font-medium text-[#242625]">{couple.groomFather}</p>
              <p>& {couple.groomMother}</p>
            </div>
            {couple.groomInstagram && (
              <a
                href={`https://instagram.com/${couple.groomInstagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E8E2D8] text-xs text-[#5A605B] hover:text-[#242625] hover:border-[#C5A059] transition-colors tap-target-44"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>@{couple.groomInstagram}</span>
              </a>
            )}
          </div>

          {/* Bride */}
          <div className="space-y-4 text-center md:text-left">
            <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden border border-[#E8E2D8] shadow-xs">
              <img src={couple.bridePhoto} alt={couple.brideName} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#242625]">{couple.brideName}</h3>
            <div className="text-xs text-[#5A605B] leading-relaxed">
              <p className="text-[10px] uppercase tracking-wider text-[#8C6E2D]">Daughter of:</p>
              <p className="font-medium text-[#242625]">{couple.brideFather}</p>
              <p>& {couple.brideMother}</p>
            </div>
            {couple.brideInstagram && (
              <a
                href={`https://instagram.com/${couple.brideInstagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E8E2D8] text-xs text-[#5A605B] hover:text-[#242625] hover:border-[#C5A059] transition-colors tap-target-44"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>@{couple.brideInstagram}</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Countdown */}
      {countdown.isEnabled && (
        <section className="py-16 px-6 bg-white border-y border-[#E8E2D8] text-center">
          <div className="max-w-xl mx-auto">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C6E2D] font-semibold">
              Save The Date
            </span>
            <CountdownTimer targetDate={countdown.targetDate} accentColor="#8C6E2D" />
          </div>
        </section>
      )}

      {/* Events */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-1">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C6E2D] font-semibold">
            Order of Events
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#242625]">
            Celebration Schedule
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((ev, idx) => (
            <div
              key={ev.id}
              className="p-8 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs flex flex-col justify-between text-left space-y-6"
            >
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-[#8C6E2D] font-bold">
                  0{idx + 1}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#242625]">{ev.title}</h3>
                <p className="text-xs font-semibold text-[#5A605B]">
                  {ev.date} • {ev.startTime} - {ev.endTime} {ev.timezone}
                </p>
                <div className="text-xs text-[#5A605B] pt-2 space-y-1">
                  <p className="font-semibold text-[#242625] text-sm">{ev.venueName}</p>
                  <p>{ev.venueAddress}</p>
                  {ev.dressCode && (
                    <p className="text-[#8C6E2D] font-medium pt-1">
                      Attire: {ev.dressCode}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                {ev.googleMapsUrl && (
                  <a
                    href={ev.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#242625] text-white text-xs font-medium hover:bg-black transition-colors tap-target-44 w-full sm:w-auto justify-center"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Google Maps</span>
                  </a>
                )}
                <button
                  onClick={() => handleDownloadIcs(idx)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#E8E2D8] text-[#242625] text-xs font-medium hover:bg-[#FAF7F2] transition-colors tap-target-44 w-full sm:w-auto justify-center"
                >
                  <Download className="w-3.5 h-3.5 text-[#5A605B]" />
                  <span>Add to Calendar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Stream */}
      {liveStream.isEnabled && (
        <section className="py-12 px-6 bg-white border-y border-[#E8E2D8] text-center">
          <div className="max-w-md mx-auto space-y-3">
            <h3 className="font-serif text-2xl font-bold text-[#242625]">
              Virtual Celebration
            </h3>
            <p className="text-xs text-[#5A605B]">{liveStream.note}</p>
            <div className="pt-2">
              <a
                href={liveStream.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#242625] text-white text-xs font-medium hover:bg-black transition-colors tap-target-44"
              >
                <ExternalLink className="w-4 h-4 text-[#C5A059]" />
                <span>Join Stream</span>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Love Story */}
      {loveStory && loveStory.length > 0 && (
        <section className="py-20 px-6 max-w-3xl mx-auto border-t border-[#E8E2D8]">
          <div className="text-center mb-16 space-y-1">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C6E2D] font-semibold">
              Our Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#242625]">
              Milestones of Love
            </h2>
          </div>

          <div className="space-y-6">
            {loveStory.map((story) => (
              <div
                key={story.id}
                className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs flex flex-col sm:flex-row items-center gap-6"
              >
                {story.photoUrl && (
                  <img
                    src={story.photoUrl}
                    alt={story.title}
                    className="w-28 h-28 rounded-2xl object-cover shrink-0"
                  />
                )}
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-xs font-mono font-bold text-[#8C6E2D]">{story.year}</span>
                  <h4 className="font-serif text-lg font-bold text-[#242625]">{story.title}</h4>
                  <p className="text-xs text-[#5A605B] leading-relaxed">{story.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gallery */}
      {gallery.photos.length > 0 && (
        <section className="py-20 px-6 max-w-5xl mx-auto border-t border-[#E8E2D8]">
          <div className="text-center mb-16 space-y-1">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C6E2D] font-semibold">
              Memories
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#242625]">
              Visual Anthology
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
              </div>
            ))}
          </div>

          {selectedImage && (
            <div
              className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-xs"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative max-w-3xl max-h-[90vh]">
                <img src={selectedImage} alt="Enlarged" className="w-full h-full object-contain rounded-2xl" />
              </div>
            </div>
          )}
        </section>
      )}

      {/* QR Check-in */}
      {qrCheckIn.isEnabled && guest && (
        <section className="py-8 px-6 bg-white border-t border-[#E8E2D8]">
          <QrCheckInBadge guest={guest} accentColor="#C5A059" />
        </section>
      )}

      {/* RSVP */}
      <section className="border-t border-[#E8E2D8] bg-white">
        <RsvpSection invitationId={invitation.id} guest={guest} accentColor="#8C6E2D" />
      </section>

      {/* Wishes */}
      <section className="border-t border-[#E8E2D8]">
        <WishesSection invitationId={invitation.id} guest={guest} accentColor="#8C6E2D" />
      </section>

      {/* Digital Gift */}
      {digitalGift.isEnabled && (
        <section className="border-t border-[#E8E2D8] bg-white">
          <DigitalGiftSection
            accounts={digitalGift.accounts}
            shippingAddress={digitalGift.shippingAddress}
            accentColor="#8C6E2D"
          />
        </section>
      )}

      {/* Footer */}
      <footer className="py-16 px-6 text-center border-t border-[#E8E2D8] bg-[#FAF7F2] space-y-4">
        <div className="font-serif text-2xl font-bold tracking-wider text-[#242625] uppercase">
          {couple.groomNickname} & {couple.brideNickname}
        </div>
        <p className="text-xs text-[#5A605B]">Thank you for being part of our cherished celebration.</p>
        <div className="pt-4 text-[10px] uppercase tracking-[0.25em] text-[#5A605B]">
          Powered by Invitatum
        </div>
      </footer>
    </div>
  );
}
