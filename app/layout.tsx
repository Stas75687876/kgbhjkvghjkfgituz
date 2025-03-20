import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import NavBar from '@/components/NavBar';
import { Toaster } from '@/components/ui/toaster';

// Schriftarten laden
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Meine Website | Kreatives Webdesign',
  description: 'Kreative Webdesign-Lösungen für Ihr Unternehmen',
  keywords: 'webdesign, website entwicklung, responsive design',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={`scroll-smooth ${inter.variable} ${poppins.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans bg-neutral-50 text-neutral-900">
        <NavBar />
        {children}
        <footer className="bg-neutral-900 text-neutral-100 py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Meine Website</h3>
                <p className="text-neutral-300 mb-4">
                  Kreative Lösungen für moderne Webpräsenzen
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Kontakt</h3>
                <p className="text-neutral-300">Email: info@meinewebsite.de</p>
                <p className="text-neutral-300">Telefon: +49 123 456789</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Links</h3>
                <ul className="space-y-2">
                  <li><a href="/#services" className="text-neutral-300 hover:text-primary-400 transition-colors">Leistungen</a></li>
                  <li><a href="/#portfolio" className="text-neutral-300 hover:text-primary-400 transition-colors">Portfolio</a></li>
                  <li><a href="/#shop" className="text-neutral-300 hover:text-primary-400 transition-colors">Shop</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-400">
              <p>© {new Date().getFullYear()} MeineWebsite. Alle Rechte vorbehalten.</p>
            </div>
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
} 