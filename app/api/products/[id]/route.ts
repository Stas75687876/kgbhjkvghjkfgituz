import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Produkt nicht gefunden' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Fehler beim Abrufen des Produkts:', error);
    return NextResponse.json(
      { error: 'Fehler beim Abrufen des Produkts' },
      { status: 500 }
    );
  }
}

export const PUT = requireAdmin(async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    const body = await req.json();
    const { name, description, price, imageUrl } = body;

    if (!name || !description || !price) {
      return NextResponse.json(
        { error: 'Name, Beschreibung und Preis sind erforderlich' },
        { status: 400 }
      );
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: parseFloat(price),
        imageUrl: imageUrl || null,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Produkts:', error);
    return NextResponse.json(
      { error: 'Fehler beim Aktualisieren des Produkts' },
      { status: 500 }
    );
  }
});

export const DELETE = requireAdmin(async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Fehler beim Löschen des Produkts:', error);
    return NextResponse.json(
      { error: 'Fehler beim Löschen des Produkts' },
      { status: 500 }
    );
  }
}); 