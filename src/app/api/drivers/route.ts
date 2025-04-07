import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { VehicleType } from '@prisma/client'

// GET /api/drivers - Récupérer tous les chauffeurs
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const available = searchParams.get('available')
    const vehicleType = searchParams.get('vehicleType') as VehicleType | null

    const where = {
      ...(available === 'true' && { isAvailable: true }),
      ...(vehicleType && {
        vehicle: {
          type: vehicleType,
        },
      }),
    }

    const drivers = await prisma.driver.findMany({
      where,
      include: {
        vehicle: {
          select: {
            type: true,
            model: true,
            licensePlate: true,
            capacity: true,
          },
        },
        currentLocation: true,
      },
    })

    return NextResponse.json(drivers)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des chauffeurs' },
      { status: 500 }
    )
  }
}

// POST /api/drivers - Créer un nouveau chauffeur
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, password, vehicleData } = body

    // Vérifier si le chauffeur existe déjà
    const existingDriver = await prisma.driver.findUnique({
      where: { email },
    })

    if (existingDriver) {
      return NextResponse.json(
        { error: 'Un chauffeur avec cet email existe déjà' },
        { status: 400 }
      )
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10)

    // Créer le véhicule
    const vehicle = await prisma.vehicle.create({
      data: {
        type: vehicleData.type,
        model: vehicleData.model,
        licensePlate: vehicleData.licensePlate,
        capacity: vehicleData.capacity,
        features: vehicleData.features || [],
      },
    })

    // Créer le chauffeur
    const driver = await prisma.driver.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        vehicleId: vehicle.id,
      },
      include: {
        vehicle: true,
      },
    })

    return NextResponse.json(driver)
  } catch (error) {
    console.error('Erreur lors de la création du chauffeur:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création du chauffeur' },
      { status: 500 }
    )
  }
}

// PATCH /api/drivers/[id]/location - Mettre à jour la position du chauffeur
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { lat, lng, address } = body

    // Créer ou mettre à jour la localisation
    const location = await prisma.location.create({
      data: {
        lat,
        lng,
        address,
      },
    })

    // Mettre à jour la position du chauffeur
    const driver = await prisma.driver.update({
      where: { id: params.id },
      data: {
        currentLocationId: location.id,
      },
      include: {
        currentLocation: true,
        vehicle: true,
      },
    })

    return NextResponse.json(driver)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la position' },
      { status: 500 }
    )
  }
} 