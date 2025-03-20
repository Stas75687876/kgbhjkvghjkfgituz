/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'example.com'],
  },
  // Aktiviere diese Option, wenn Render Static Build verwenden soll
  // output: 'export',
}

module.exports = nextConfig 