"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart';
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';

export default function CartPage() {
  const router = useRouter();
  const { toast } = useToast();
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    updateQuantity(id, quantity);
  };

  const handleCheckout = async () => {
    if (!email) {
      toast({
        title: "E-Mail erforderlich",
        description: "Bitte gib deine E-Mail-Adresse für die Bestellung ein.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Fehler beim Erstellen der Checkout-Session');
      }

      // Weiterleitung zur Stripe Checkout-Seite
      window.location.href = data.url;
    } catch (error: unknown) {
      console.error('Checkout-Fehler:', error);
      let errorMessage = "Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.";
      
      if (error instanceof Error) {
        errorMessage = error.message || errorMessage;
      }
      
      toast({
        title: "Fehler beim Checkout",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center py-20">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">Dein Warenkorb ist leer</h1>
            <p className="text-gray-400 mb-8">Füge Produkte hinzu, um eine Bestellung aufzugeben.</p>
            <Button asChild>
              <Link href="/#shop" className="inline-flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Zurück zum Shop
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-white mb-8">Dein Warenkorb</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-semibold text-white">Produkte</h2>
              </div>

              <div>
                {items.map((item) => (
                  <div 
                    key={item.id}
                    className="p-6 border-b border-gray-700 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                  >
                    <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                      {item.imageUrl ? (
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                          <ShoppingBag className="h-8 w-8 text-gray-500" />
                        </div>
                      )}
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-white font-medium">{item.name}</h3>
                      <p className="text-purple-400 mt-1">{item.price.toFixed(2)} €</p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 bg-gray-700 rounded-l-md hover:bg-gray-600 transition-colors"
                        >
                          -
                        </button>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                          className="w-12 text-center bg-gray-700 border-0 focus:ring-0"
                        />
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 bg-gray-700 rounded-r-md hover:bg-gray-600 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 text-right">
                <Button
                  variant="outline"
                  onClick={() => clearCart()}
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Warenkorb leeren
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Zusammenfassung</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Zwischensumme</span>
                  <span className="text-white">{totalPrice().toFixed(2)} €</span>
                </div>
                
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between font-semibold">
                    <span className="text-gray-200">Gesamtsumme</span>
                    <span className="text-purple-400 text-xl">{totalPrice().toFixed(2)} €</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-300 mb-2">E-Mail für Bestellbestätigung</label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="deine@email.de"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <Button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white py-3 rounded-lg transition-all duration-300 hover:shadow-lg mb-4"
              >
                {loading ? (
                  <span className="flex items-center">
                    <span className="inline-block h-4 w-4 mr-2 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></span>
                    Verarbeitung...
                  </span>
                ) : (
                  "Zur Kasse"
                )}
              </Button>
              
              <Button 
                variant="outline" 
                asChild
                className="w-full"
              >
                <Link href="/#shop">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Zurück zum Shop
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 