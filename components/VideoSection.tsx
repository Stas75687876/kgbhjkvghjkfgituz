"use client";

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from './ui/button';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

export default function VideoSection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  useEffect(() => {
    // GSAP ScrollTrigger registrieren
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    // Video abspielen
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Videoautoplay verhindert:", e));
    }
    
    // Animation für Text
    const textAnimation = gsap.fromTo(
      textRef.current,
      { 
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 70%",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    return () => {
      if (textAnimation) textAnimation.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 overflow-hidden bg-neutral-100">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div ref={textRef} className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Unsere <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">Kreativität</span> in Bewegung
            </h2>
            <p className="text-neutral-700 text-lg mb-8 leading-relaxed">
              Wir bringen Ihre Marke durch innovative Videoinhalte zum Leben. 
              Hochwertige Produktionen, die Ihre Botschaft kraftvoll vermitteln und 
              Ihre Zielgruppe emotional ansprechen.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-primary-100 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-neutral-800 font-medium">Professionelle Videoproduktion</p>
              </div>
              <div className="flex items-center">
                <div className="bg-primary-100 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-neutral-800 font-medium">Kreative Storylines</p>
              </div>
              <div className="flex items-center">
                <div className="bg-primary-100 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-neutral-800 font-medium">Optimiert für alle Plattformen</p>
              </div>
            </div>
          </div>
          
          {/* Video */}
          <div className="order-1 lg:order-2 rounded-xl shadow-soft overflow-hidden">
            <video 
              ref={videoRef}
              className="w-full h-auto rounded-xl"
              src="https://player.vimeo.com/video/1067507561?h=48d027512" 
              muted 
              loop 
              playsInline
              poster="/images/video-poster.jpg"
            />
          </div>
        </div>
      </div>
    </section>
  );
} 