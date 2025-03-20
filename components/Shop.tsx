"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCartStore, CartItem } from '@/store/cart';
import { Button } from './ui/button';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Fehler beim Laden der Produkte');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('Fehler beim Laden der Produkte');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl
    };
    
    addItem(cartItem);
  };

  return (
    <section id="shop" className="py-20 bg-gray-900" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Unser Shop
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Entdecke unsere digitalen Produkte und Dienstleistungen
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent"></div>
            <p className="mt-4 text-white">Produkte werden geladen...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.length === 0 ? (
              <div className="col-span-full text-center py-12 text-white">
                Keine Produkte verfügbar.
              </div>
            ) : (
              products.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={product.imageUrl || 'https://via.placeholder.com/400x200'} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-purple-400">{product.price.toFixed(2)} €</span>
                      <Button 
                        onClick={() => handleAddToCart(product)}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                        size="sm"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        In den Warenkorb
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
} 