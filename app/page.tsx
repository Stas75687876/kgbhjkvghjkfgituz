import Hero from '@/components/Hero';
import VideoSection from '@/components/VideoSection';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Shop from '@/components/Shop';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <VideoSection />
      <Services />
      <Portfolio />
      <Shop />
      <Contact />
    </main>
  );
} 