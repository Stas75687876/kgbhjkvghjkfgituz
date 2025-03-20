import { NextRequest, NextResponse } from 'next/server';
import { Stripe } from 'stripe';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY || '', {
  apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const body = await req.json();
    const { items, email } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Der Warenkorb ist leer' },
        { status: 400 }
      );
    }

    // Produkte aus der Datenbank abrufen, um Preismanipulation zu vermeiden
    const productIds = items.map((item) => item.id);
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    if (products.length !== productIds.length) {
      return NextResponse.json(
        { error: 'Einige Produkte existieren nicht mehr' },
        { status: 400 }
      );
    }

    // Line items für Stripe erstellen
    const line_items = items.map((item) => {
      const product = products.find((p) => p.id === item.id);
      
      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: product?.name || 'Unbekanntes Produkt',
            images: product?.imageUrl ? [product.imageUrl] : [],
          },
          unit_amount: Math.round((product?.price || 0) * 100),
        },
        quantity: item.quantity,
      };
    });

    // Berechne den Gesamtpreis
    const totalPrice = items.reduce((total, item) => {
      const product = products.find((p) => p.id === item.id);
      return total + (product?.price || 0) * item.quantity;
    }, 0);

    // Speichere die Bestellung in der Datenbank
    const order = await prisma.order.create({
      data: {
        email,
        totalPrice,
        products: {
          connect: productIds.map((id) => ({ id })),
        },
      },
    });

    // Erstelle Stripe-Checkout-Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/erfolg?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/warenkorb`,
      metadata: {
        orderId: order.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Fehler beim Erstellen der Checkout-Session:', error);
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
} 