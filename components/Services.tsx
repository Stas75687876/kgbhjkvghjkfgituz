"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Layers, Code, LineChart } from 'lucide-react';

const services = [
  {
    title: "Webdesign",
    description: "Kreative und moderne Designs, die deine Marke perfekt repräsentieren und deine Besucher beeindrucken.",
    icon: <Layers className="h-12 w-12 text-purple-500" />,
    delay: 0
  },
  {
    title: "Webentwicklung",
    description: "Technisch einwandfreie und responsive Websites mit den neuesten Technologien für optimale Performance.",
    icon: <Code className="h-12 w-12 text-blue-500" />,
    delay: 0.2
  },
  {
    title: "SEO & Marketing",
    description: "Optimierung für Suchmaschinen und digitale Marketingstrategien, um deine Online-Präsenz zu stärken.",
    icon: <LineChart className="h-12 w-12 text-green-500" />,
    delay: 0.4
  }
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="services" className="py-20 bg-gray-900" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Unsere Leistungen
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Wir bieten professionelle Dienstleistungen, um dein Unternehmen online erfolgreich zu machen
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px] hover:bg-gradient-to-br hover:from-gray-800 hover:to-gray-900 border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: service.delay }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="mb-6 flex justify-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">
                {service.title}
              </h3>
              <p className="text-gray-300 text-center">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <p className="text-xl text-white mb-4">
            <span className="text-3xl font-bold text-purple-500">98%</span> zufriedene Kunden
          </p>
          <p className="text-xl text-white mb-4">
            <span className="text-3xl font-bold text-blue-500">+50</span> erfolgreiche Projekte
          </p>
          <p className="text-xl text-white">
            <span className="text-3xl font-bold text-green-500">24/7</span> Support
          </p>
        </motion.div>
      </div>
    </section>
  );
} 