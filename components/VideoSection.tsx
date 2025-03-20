"use client";

import { useRef, useEffect } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

export default function VideoSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <section 
      ref={containerRef}
      className="py-20 bg-gradient-to-b from-black to-gray-900"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Entdecke was wir können
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Innovative Webdesigns und maßgeschneiderte Lösungen für dein Unternehmen
          </p>
        </motion.div>

        <motion.div 
          className="relative rounded-xl overflow-hidden shadow-2xl max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://player.vimeo.com/video/1067508106?h=343f245390&autoplay=0&title=0&byline=0&portrait=0"
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>

        <motion.div 
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-xl text-white mb-6">
            Lass deine Website von uns erstellen!
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 hover:scale-105"
          >
            <Link href="#kontakt">Jetzt Angebot holen</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
} 