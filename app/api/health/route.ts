import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Hier könnten zusätzliche Prüfungen stattfinden
    // z.B. Datenbankverbindung überprüfen

    // Erfolgreich
    return NextResponse.json(
      { 
        status: 'ok', 
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Health check failed:', error);
    
    // Fehlschlag
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Health check failed',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 