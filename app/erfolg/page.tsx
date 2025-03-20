"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useCartStore } from '@/store/cart';

export default function ErfolgPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);
  
  // Session-ID aus der URL
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Warenkorb leeren nach erfolgreicher Bestellung
    if (sessionId) {
      clearCart();
    }
  }, [sessionId, clearCart]);

  // Wenn keine Session-ID vorhanden ist, zurück zur Startseite
  if (!sessionId) {
    useEffect(() => {
      router.push('/');
    }, [router]);
    
    return null;
  }

  return (
    <div className="min-h-screen py-20 px-4 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-10 max-w-lg w-full text-center shadow-2xl">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-20 w-20 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">Bestellung erfolgreich!</h1>
        
        <p className="text-gray-300 mb-6">
          Vielen Dank für deine Bestellung. Wir haben eine Bestätigung an deine E-Mail-Adresse gesendet.
        </p>
        
        <p className="text-gray-400 mb-8 text-sm">
          Bestellnummer: {sessionId.substring(0, 8)}...
        </p>
        
        <div className="space-y-4">
          <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
            <Link href="/">
              Zurück zur Startseite
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="w-full">
            <Link href="/#shop">
              Weitershoppen
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 