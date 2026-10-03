'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX, Disc } from 'lucide-react';

interface FloatingMusicPlayerProps {
  audioUrl?: string;
  songTitle?: string;
  artist?: string;
  autoPlayTrigger?: boolean;
}

export function FloatingMusicPlayer({
  audioUrl,
  songTitle = 'Romantic Song',
  artist = 'Invitatum Romance',
  autoPlayTrigger = false,
}: FloatingMusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioUrl) return;

    const audio = new Audio(audioUrl);
    audio.loop = true;
    audioRef.current = audio;

    if (autoPlayTrigger) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay blocked by browser policy until user interaction
          setIsPlaying(false);
        });
    }

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [audioUrl, autoPlayTrigger]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  if (!audioUrl) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
      <button
        onClick={togglePlay}
        className={`w-12 h-12 rounded-full shadow-lg border border-[#E8E2D8] flex items-center justify-center transition-transform hover:scale-105 tap-target-44 ${
          isPlaying
            ? 'bg-[#8C6E2D] text-white animate-spin-slow'
            : 'bg-white text-[#5A605B]'
        }`}
        style={{ animationDuration: '8s' }}
        title={isPlaying ? `Pause: ${songTitle}` : `Play: ${songTitle}`}
        aria-label="Kontrol Musik Latar"
      >
        <Disc className={`w-6 h-6 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
      </button>
    </div>
  );
}
