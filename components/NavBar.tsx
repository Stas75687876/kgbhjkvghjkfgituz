"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useCartStore } from '@/store/cart';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-soft py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link href="/" className={`font-heading font-bold text-xl ${scrolled ? 'text-neutral-900' : 'text-white'}`}>
          <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">Meine</span>Website
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="/" active={pathname === '/'} scrolled={scrolled}>Home</NavLink>
          <NavLink href="/#services" active={pathname === '/#services'} scrolled={scrolled}>Leistungen</NavLink>
          <NavLink href="/#portfolio" active={pathname === '/#portfolio'} scrolled={scrolled}>Portfolio</NavLink>
          <NavLink href="/#shop" active={pathname === '/#shop'} scrolled={scrolled}>Shop</NavLink>
          <NavLink href="/#kontakt" active={pathname === '/#kontakt'} scrolled={scrolled}>Kontakt</NavLink>
          
          <Link href="/cart" className="relative ml-4">
            <Button 
              variant="ghost" 
              className={`p-2 rounded-full ${scrolled ? 'text-neutral-700 hover:bg-neutral-100' : 'text-white hover:bg-white/20'}`}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Button>
          </Link>
        </div>
        
        {/* Mobile Menu Toggle */}
        <div className="flex items-center md:hidden">
          <Link href="/cart" className="relative mr-4">
            <Button 
              variant="ghost" 
              className={`p-2 rounded-full ${scrolled ? 'text-neutral-700 hover:bg-neutral-100' : 'text-white hover:bg-white/20'}`}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            className={`p-2 rounded-full ${scrolled ? 'text-neutral-700 hover:bg-neutral-100' : 'text-white hover:bg-white/20'}`}
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md py-4 px-4 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-4">
            <MobileNavLink href="/" active={pathname === '/'} onClick={() => setMobileMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink href="/#services" active={pathname === '/#services'} onClick={() => setMobileMenuOpen(false)}>Leistungen</MobileNavLink>
            <MobileNavLink href="/#portfolio" active={pathname === '/#portfolio'} onClick={() => setMobileMenuOpen(false)}>Portfolio</MobileNavLink>
            <MobileNavLink href="/#shop" active={pathname === '/#shop'} onClick={() => setMobileMenuOpen(false)}>Shop</MobileNavLink>
            <MobileNavLink href="/#kontakt" active={pathname === '/#kontakt'} onClick={() => setMobileMenuOpen(false)}>Kontakt</MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, active, scrolled, children }) {
  return (
    <Link
      href={href}
      className={`text-sm font-medium hover:text-primary-600 transition-colors ${
        scrolled 
          ? active ? 'text-primary-600' : 'text-neutral-700' 
          : active ? 'text-white font-semibold' : 'text-white'
      }`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, active, onClick, children }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`text-base py-2 px-4 rounded-md ${
        active 
          ? 'bg-primary-50 text-primary-600 font-medium' 
          : 'text-neutral-700 hover:bg-neutral-50'
      }`}
    >
      {children}
    </Link>
  );
} 