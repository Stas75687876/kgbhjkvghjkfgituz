"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { Button } from './ui/button';

export default function Hero() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
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
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      })
      .from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6")
      .from(buttonRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6");

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
      </div>

      {/* Hero-Content */}
      <div className="relative z-20 container-custom text-center px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Kreative <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Webdesign</span> Lösungen
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Wir erstellen moderne, responsive und benutzerfreundliche Websites, die Ihr Unternehmen perfekt repräsentieren.
          </p>
          
          <div ref={buttonRef} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-8 py-3 rounded-lg shadow-soft hover:shadow-glow transition-all"
            >
              <Link href="#kontakt">Angebot anfordern</Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 font-medium px-8 py-3 rounded-lg transition-all"
            >
              <Link href="#portfolio">Portfolio ansehen</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll-Down-Indikator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center">
          <div className="w-1.5 h-3 bg-white/80 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
} 