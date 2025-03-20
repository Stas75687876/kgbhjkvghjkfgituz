// Modul-Deklarationen
declare module 'react';
declare module 'lucide-react';
declare module 'framer-motion';

// JSX-Namespace-Erweiterung
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
} 