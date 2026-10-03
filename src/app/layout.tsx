import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Invitatum — Platform Undangan Digital Pernikahan & Pertunangan Elegan',
  description:
    'Buat dan bagikan undangan digital pernikahan dan pertunangan yang romantis, modern, dan berkelas. Dilengkapi buku tamu, RSVP real-time, amplop digital, dan QR check-in.',
  keywords: [
    'undangan digital',
    'undangan pernikahan',
    'undangan pertunangan',
    'wedding invitation',
    'engagement invitation',
    'invitatum',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} ${playfairDisplay.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#FAF7F2] text-[#242625] antialiased selection:bg-[#E8C5C8] selection:text-[#8C3B4A]">
        <AuthProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
