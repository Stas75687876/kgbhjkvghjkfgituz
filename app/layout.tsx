import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from '@/components/NavBar';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MeineWebsite - Professionelles Webdesign & Entwicklung',
  description: 'Wir erstellen hochwertige Websites mit modernem Design und fortschrittlicher Technologie für Unternehmen und Privatpersonen.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white`}>
        <NavBar />
        {children}
        <footer className="bg-black py-8 border-t border-gray-800">
          <div className="container mx-auto px-4 text-center text-gray-400">
            <p>© {new Date().getFullYear()} MeineWebsite. Alle Rechte vorbehalten.</p>
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
} 