import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { TripStatus } from '@prisma/client';

// GET /api/trips - Récupérer tous les trajets
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status') as TripStatus | null;

    const where = {
      ...(userId && { userId }),
      ...(status && { status: status as TripStatus }),
    };

    const trips = await prisma.trip.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            phone: true,
          },
        },
        driver: {
          select: {
            name: true,
            phone: true,
            rating: true,
          },
        },
        vehicle: {
          select: {
            type: true,
            model: true,
            licensePlate: true,
          },
        },
        pickupLocation: true,
        dropoffLocation: true,
      },
      orderBy: {
        scheduledTime: 'desc',
      },
    });

    return NextResponse.json(trips);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des trajets' },
      { status: 500 }
    );
  }
}

// POST /api/trips - Créer un nouveau trajet
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, pickupLocation, dropoffLocation, scheduledTime, vehicleType, paymentMethod } =
      body;

    // Trouver un chauffeur disponible avec le bon type de véhicule
    const availableDriver = await prisma.driver.findFirst({
      where: {
        isAvailable: true,
        vehicle: {
          type: vehicleType,
        },
      },
      include: {
        vehicle: true,
      },
    });

    if (!availableDriver || !availableDriver.vehicle) {
      return NextResponse.json(
        { error: 'Aucun chauffeur disponible pour ce type de véhicule' },
        { status: 400 }
      );
    }

    // Créer les enregistrements de localisation
    const pickup = await prisma.location.create({
      data: {
        address: pickupLocation.address,
        lat: pickupLocation.lat,
        lng: pickupLocation.lng,
      },
    });

    const dropoff = await prisma.location.create({
      data: {
        address: dropoffLocation.address,
        lat: dropoffLocation.lat,
        lng: dropoffLocation.lng,
      },
    });

    // Calculer le prix (exemple simple)
    const basePrice = vehicleType === 'STANDARD' ? 2000 : vehicleType === 'CONFORT' ? 3000 : 4000;
    const price = basePrice;

    // Créer le trajet
    const trip = await prisma.trip.create({
      data: {
        userId,
        driverId: availableDriver.id,
        vehicleId: availableDriver.vehicle.id,
        pickupLocationId: pickup.id,
        dropLocationId: dropoff.id,
        scheduledTime: new Date(scheduledTime),
        price,
        paymentMethod,
      },
      include: {
        user: {
          select: {
            name: true,
            phone: true,
          },
        },
        driver: {
          select: {
            name: true,
            phone: true,
          },
        },
        vehicle: true,
        pickupLocation: true,
        dropoffLocation: true,
      },
    });

    // Mettre à jour le statut du chauffeur
    await prisma.driver.update({
      where: { id: availableDriver.id },
      data: { isAvailable: false },
    });

    return NextResponse.json(trip);
  } catch (error) {
    console.error('Erreur lors de la création du trajet:', error);
    return NextResponse.json({ error: 'Erreur lors de la création du trajet' }, { status: 500 });
  }
}
