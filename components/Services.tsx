"use client";

import { useRef } from 'react';
import Image from 'next/image';

const services = [
  {
    title: "Webdesign",
    description: "Kreative, responsive Websites, die Ihr Unternehmen perfekt repräsentieren und Conversions steigern.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: "E-Commerce",
    description: "Maßgeschneiderte Online-Shops mit intuitiver Benutzerführung und sicheren Zahlungsabwicklungen.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    )
  },
  {
    title: "SEO Optimierung",
    description: "Steigern Sie Ihre Sichtbarkeit in Suchmaschinen mit unseren bewährten SEO-Strategien.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
      </svg>
    )
  },
  {
    title: "Content Creation",
    description: "Ansprechende Inhalte, die Ihre Zielgruppe begeistern und Ihre Marke stärken.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    )
  }
];

export default function Services() {
  return (
    <section id="services" className="bg-white py-20 relative">
      {/* Hintergrund-Akzent */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-br from-primary-50 to-transparent opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-tl from-accent-50 to-transparent opacity-70"></div>
      
      <div className="container-custom relative z-10">
        {/* Sektions-Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Unsere <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">Leistungen</span>
          </h2>
          <p className="text-neutral-700 text-lg">
            Professionelle Lösungen für Ihr digitales Wachstum. Wir helfen Ihnen, Ihre Online-Präsenz zu stärken und Ihre Ziele zu erreichen.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-soft p-6 transition-all hover:shadow-md hover:translate-y-[-5px]"
            >
              <div className="mb-4 p-3 bg-primary-50 rounded-lg inline-block">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-neutral-600">{service.description}</p>
            </div>
          ))}
        </div>
        
        {/* Extra Info Box */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl shadow-soft overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-10 text-white">
              <h3 className="text-2xl font-bold mb-4">Maßgeschneiderte Lösungen</h3>
              <p className="mb-6 text-white/90">
                Wir bieten individuelle Lösungen, die genau auf Ihre Bedürfnisse und Ziele zugeschnitten sind. 
                Unsere Experten arbeiten eng mit Ihnen zusammen, um Ihre Vision zu verwirklichen.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Persönliche Beratung
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Flexible Anpassungen
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Kontinuierliche Unterstützung
                </li>
              </ul>
            </div>
            <div className="relative min-h-[300px] md:min-h-full">
              <Image 
                src="/images/services-image.jpg" 
                alt="Unsere Services" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 