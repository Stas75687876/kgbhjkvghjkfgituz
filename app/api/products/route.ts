import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Fehler beim Abrufen der Produkte:', error);
    return NextResponse.json(
      { error: 'Fehler beim Abrufen der Produkte' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, price, imageUrl } = body;

    if (!name || !description || !price) {
      return NextResponse.json(
        { error: 'Name, Beschreibung und Preis sind erforderlich' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        imageUrl: imageUrl || null,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Fehler beim Erstellen des Produkts:', error);
    return NextResponse.json(
      { error: 'Fehler beim Erstellen des Produkts' },
      { status: 500 }
    );
  }
} 