'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              SpeedGate
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600">
              Accueil
            </Link>
            <Link href="/reservation" className="text-gray-600 hover:text-blue-600">
              Réservation
            </Link>
            <Link href="/account" className="text-gray-600 hover:text-blue-600">
              Mon Compte
            </Link>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Connexion
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-600 hover:text-blue-600"
              >
                Accueil
              </Link>
              <Link
                href="/reservation"
                className="block px-3 py-2 text-gray-600 hover:text-blue-600"
              >
                Réservation
              </Link>
              <Link
                href="/account"
                className="block px-3 py-2 text-gray-600 hover:text-blue-600"
              >
                Mon Compte
              </Link>
              <button className="w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600">
                Connexion
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar 