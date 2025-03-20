"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { useCartStore } from '@/store/cart';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const cartItems = useCartStore((state) => state.items);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/80 backdrop-blur-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="text-white font-bold text-xl">
          MeineWebsite
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="/" active={pathname === '/'}>Home</NavLink>
          <NavLink href="/#services" active={pathname === '/#services'}>Unsere Leistungen</NavLink>
          <NavLink href="/#portfolio" active={pathname === '/#portfolio'}>Portfolio</NavLink>
          <NavLink href="/#shop" active={pathname === '/#shop'}>Shop</NavLink>
          <NavLink href="/#kontakt" active={pathname === '/#kontakt'}>Kontakt</NavLink>
        </div>
        
        <Link href="/cart" className="relative">
          <ShoppingCart className="text-white h-6 w-6" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

function NavLink({ href, active, children }) {
  return (
    <Link
      href={href}
      className={`text-sm text-white hover:text-purple-300 transition-colors ${
        active ? 'border-b-2 border-purple-500' : ''
      }`}
    >
      {children}
    </Link>
  );
} 