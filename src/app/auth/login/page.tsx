'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
};

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter la logique de connexion
    console.log('Données du formulaire:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Connexion</h1>
            <p className="text-gray-600">Connectez-vous à votre compte SpeedGate</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm">
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                className="input"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                className="input"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Se souvenir de moi
                </label>
              </div>

              <Link
                href="/auth/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            <button type="submit" className="btn btn-primary w-full mb-4" aria-label="Se connecter">
              Se connecter
            </button>

            <p className="text-center text-sm text-gray-600">
              Pas encore de compte ?{' '}
              <Link href="/auth/register" className="text-blue-600 hover:text-blue-700">
                Créer un compte
              </Link>
            </p>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
