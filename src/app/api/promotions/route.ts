import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { NotificationType } from '@prisma/client'

// GET /api/promotions - Récupérer toutes les promotions actives
export async function GET() {
  try {
    const promotions = await prisma.promotion.findMany({
      where: {
        isActive: true,
        validUntil: {
          gte: new Date(),
        },
      },
      orderBy: {
        validUntil: 'asc',
      },
    })

    return NextResponse.json(promotions)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des promotions' },
      { status: 500 }
    )
  }
}

// POST /api/promotions - Créer une nouvelle promotion
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, type, value, conditions, validUntil } = body

    const promotion = await prisma.promotion.create({
      data: {
        title,
        description,
        type,
        value,
        conditions,
        validUntil: new Date(validUntil),
      },
    })

    // Créer une notification pour tous les utilisateurs
    await prisma.user.findMany({
      select: { id: true },
    }).then((users) => {
      const notifications = users.map((user) => ({
        userId: user.id,
        type: NotificationType.PROMOTION,
        title: 'Nouvelle promotion disponible !',
        message: `${title} - ${description}`,
      }))

      return prisma.notification.createMany({
        data: notifications,
      })
    })

    return NextResponse.json(promotion)
  } catch (error) {
    console.error('Erreur lors de la création de la promotion:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de la promotion' },
      { status: 500 }
    )
  }
}

// PATCH /api/promotions/[id] - Mettre à jour une promotion
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { isActive, validUntil } = body

    const promotion = await prisma.promotion.update({
      where: { id: params.id },
      data: {
        isActive,
        ...(validUntil && { validUntil: new Date(validUntil) }),
      },
    })

    return NextResponse.json(promotion)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la promotion' },
      { status: 500 }
    )
  }
} 