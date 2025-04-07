import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// GET /api/users - Récupérer tous les utilisateurs
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        level: true,
        loyaltyPoints: true,
        profileImage: true,
      },
    })
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des utilisateurs' },
      { status: 500 }
    )
  }
}

// POST /api/users - Créer un nouvel utilisateur
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, password } = body

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Un utilisateur avec cet email existe déjà' },
        { status: 400 }
      )
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10)

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        nextLevelPoints: 100, // Points nécessaires pour le niveau suivant
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        level: true,
        loyaltyPoints: true,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la création de l\'utilisateur' },
      { status: 500 }
    )
  }
} 