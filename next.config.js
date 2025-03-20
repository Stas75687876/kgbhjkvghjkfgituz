/** @type {import('next').NextConfig} */
const nextConfig = {
  // Strikte React-Modus für bessere Entwicklung
  reactStrictMode: true,

  // SWC-Minifizierung aktivieren für bessere Performance
  swcMinify: true,

  // Bilder-Konfiguration für externe Domains
  images: {
    domains: ['cloudflare-ipfs.com', 'loremflickr.com', 'example.com', 'res.cloudinary.com'],
    unoptimized: true, // Wichtig für Render-Kompatibilität
  },

  // Asset-Präfix für konsistentes Laden von Ressourcen
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',

  // TypeScript- und ESLint-Fehler während des Builds ignorieren
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Standalone-Ausgabe für besseres Server-Side-Rendering
  output: 'standalone',

  // Powered-By-Header deaktivieren
  poweredByHeader: false,

  // Experimentelle Features (entfernt optimizeCss, da das critters-Modul fehlt)
  experimental: {
    optimizeServerReact: true,
  },
};

module.exports = nextConfig; 