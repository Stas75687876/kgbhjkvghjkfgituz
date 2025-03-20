"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LockKeyhole } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Anmeldung fehlgeschlagen');
      }

      router.push('/panel/products');
    } catch (err) {
      setError(err.message || 'Anmeldung fehlgeschlagen. Bitte versuche es erneut.');
      console.error('Login-Fehler:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-900">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-purple-600/20 rounded-full">
              <LockKeyhole className="h-8 w-8 text-purple-500" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-white text-center mb-8">
            Admin-Anmeldung
          </h1>
          
          {error && (
            <div className="mb-6 p-4 bg-red-600/20 border border-red-600 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-300 mb-2">E-Mail</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="admin@beispiel.de"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-300 mb-2">Passwort</label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              {loading ? (
                <span className="flex items-center">
                  <span className="inline-block h-4 w-4 mr-2 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></span>
                  Anmelden...
                </span>
              ) : (
                "Anmelden"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
} 