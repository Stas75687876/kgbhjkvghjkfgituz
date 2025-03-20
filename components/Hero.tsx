"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { Button } from './ui/button';

export default function Hero() {
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Video autoplay starten
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Autoplay wurde verhindert:", error);
      });
    }

    // GSAP Animationen
    const timeline = gsap.timeline();
    
    timeline
      .from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      })
      .from(buttonRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5");

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video-Hintergrund */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          ref={videoRef}
          className="absolute inset-0 object-cover w-full h-full"
          src="https://player.vimeo.com/video/1067507561?h=48d027512" 
          autoPlay 
          muted 
          loop 
          playsInline
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
      </div>

      {/* Hero-Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8"
        >
          Wir erstellen krasse Websites!
        </h1>
        <Button 
          ref={buttonRef}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 hover:scale-105"
        >
          <Link href="#kontakt">Jetzt Angebot anfordern</Link>
        </Button>
      </div>
    </section>
  );
} 