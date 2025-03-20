import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const user = await verifyAuth(req);
    
    return NextResponse.json({
      isAdmin: user && user.role === 'admin',
    });
  } catch (error) {
    console.error('Auth-Check-Fehler:', error);
    return NextResponse.json(
      { isAdmin: false },
      { status: 500 }
    );
  }
} 