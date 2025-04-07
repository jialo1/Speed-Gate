'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { FaCar, FaUser, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPagesOpen, setIsPagesOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const togglePages = () => {
    setIsPagesOpen(!isPagesOpen)
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <FaCar className="h-8 w-8 text-blue-500" />
                <span className="ml-2 text-xl font-bold text-gray-800">Speed Gate</span>
              </Link>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
              Accueil
            </Link>
            <Link href="/reservation" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
              Réserver
            </Link>
            <Link href="/tracking" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
              Suivre
            </Link>
            <div className="relative">
              <button
                onClick={togglePages}
                className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                Pages
                <FaChevronDown className={`ml-1 transition-transform ${isPagesOpen ? 'transform rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isPagesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                  >
                    <div className="py-1">
                      <Link
                        href="/driver"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsPagesOpen(false)}
                      >
                        Profil Chauffeur
                      </Link>
                      <Link
                        href="/promotions"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsPagesOpen(false)}
                      >
                        Promotions
                      </Link>
                      <Link
                        href="/support"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsPagesOpen(false)}
                      >
                        Support
                      </Link>
                      <Link
                        href="/feedback"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsPagesOpen(false)}
                      >
                        Feedback
                      </Link>
                      <Link
                        href="/confirmation"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsPagesOpen(false)}
                      >
                        Confirmation
                      </Link>
                      <Link
                        href="/payment"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsPagesOpen(false)}
                      >
                        Paiement
                      </Link>
                      <Link
                        href="/tracking"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsPagesOpen(false)}
                      >
                        Tracking
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link href="/account" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
              Mon Compte
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMenuOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link
                href="/reservation"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Réserver
              </Link>
              <Link
                href="/tracking"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Suivre
              </Link>
              <div className="relative">
                <button
                  onClick={togglePages}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50 flex items-center justify-between"
                >
                  Pages
                  <FaChevronDown className={`transition-transform ${isPagesOpen ? 'transform rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isPagesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4"
                    >
                      <Link
                        href="/driver"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50"
                        onClick={() => {
                          setIsMenuOpen(false)
                          setIsPagesOpen(false)
                        }}
                      >
                        Profil Chauffeur
                      </Link>
                      <Link
                        href="/promotions"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50"
                        onClick={() => {
                          setIsMenuOpen(false)
                          setIsPagesOpen(false)
                        }}
                      >
                        Promotions
                      </Link>
                      <Link
                        href="/support"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50"
                        onClick={() => {
                          setIsMenuOpen(false)
                          setIsPagesOpen(false)
                        }}
                      >
                        Support
                      </Link>
                      <Link
                        href="/feedback"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50"
                        onClick={() => {
                          setIsMenuOpen(false)
                          setIsPagesOpen(false)
                        }}
                      >
                        Feedback
                      </Link>
                      <Link
                        href="/confirmation"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50"
                        onClick={() => {
                          setIsMenuOpen(false)
                          setIsPagesOpen(false)
                        }}
                      >
                        Confirmation
                      </Link>
                      <Link
                        href="/payment"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50"
                        onClick={() => {
                          setIsMenuOpen(false)
                          setIsPagesOpen(false)
                        }}
                      >
                        Paiement
                      </Link>
                      <Link
                        href="/tracking"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50"
                        onClick={() => {
                          setIsMenuOpen(false)
                          setIsPagesOpen(false)
                        }}
                      >
                        Tracking
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link
                href="/account"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Mon Compte
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
} 