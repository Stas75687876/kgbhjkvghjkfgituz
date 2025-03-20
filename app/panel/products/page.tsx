"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdmin } from '@/hooks/useAdmin';
import { Product } from '@prisma/client';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { isAdmin, isLoading } = useAdmin();

  useEffect(() => {
    // Prüfen, ob der Benutzer ein Admin ist
    if (!isLoading && !isAdmin) {
      router.push('/panel/login');
      return;
    }

    // Produkte laden
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

    if (isAdmin) {
      fetchProducts();
    }
  }, [isAdmin, isLoading, router]);

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Möchtest du dieses Produkt wirklich löschen?')) {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Fehler beim Löschen des Produkts');
        }

        setProducts(products.filter(product => product.id !== id));
      } catch (err) {
        setError('Fehler beim Löschen des Produkts');
        console.error(err);
      }
    }
  };

  if (isLoading) {
    return <div className="p-8">Laden...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  if (loading) {
    return <div className="p-8">Produkte werden geladen...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Produkte verwalten</h1>
        <Button onClick={() => router.push('/panel/products/new')}>
          Neues Produkt
        </Button>
      </div>

      <div className="mb-4">
        <Input 
          placeholder="Produkte suchen..." 
          className="max-w-xs"
          onChange={(e) => {
            // Implementiere hier eine Suchfunktion
          }}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Bild</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Preis</TableHead>
            <TableHead>Erstellt am</TableHead>
            <TableHead>Aktionen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Keine Produkte gefunden
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  {product.imageUrl && (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price.toFixed(2)} €</TableCell>
                <TableCell>
                  {new Date(product.createdAt).toLocaleDateString('de-DE')}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/panel/products/edit/${product.id}`)}
                    >
                      Bearbeiten
                    </Button>
                    <Button 
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Löschen
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
} 