import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SpeedGate - Réservation de trajets vers l\'aéroport',
  description: 'Réservez votre trajet vers l\'aéroport en quelques clics avec SpeedGate. Simple, rapide et fiable.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 