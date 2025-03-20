import { NextResponse } from 'next/server';
import { logout } from '@/lib/auth';

export async function POST() {
  try {
    await logout();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout-Fehler:', error);
    return NextResponse.json(
      { message: 'Fehler beim Abmelden' },
      { status: 500 }
    );
  }
} 