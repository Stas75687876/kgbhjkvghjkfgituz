import { NextRequest, NextResponse } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { prisma } from './prisma';
import * as bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || 'dein-geheimer-schlüssel-für-admin-authentication';
const COOKIE_NAME = 'admin-auth-token';

export async function login(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return { success: false, message: 'Ungültige Anmeldeinformationen' };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return { success: false, message: 'Ungültige Anmeldeinformationen' };
    }

    // JWT Token erstellen
    const token = await new SignJWT({ 
      id: user.id, 
      email: user.email,
      role: user.role 
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(new TextEncoder().encode(JWT_SECRET));

    // Token als Cookie setzen
    cookies().set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24 Stunden
      path: '/'
    });

    return { success: true };
  } catch (error) {
    console.error('Login-Fehler:', error);
    return { success: false, message: 'Interner Serverfehler beim Login' };
  }
}

export async function logout() {
  cookies().delete(COOKIE_NAME);
  return { success: true };
}

export async function verifyAuth(req?: NextRequest) {
  try {
    let token: string | undefined;
    
    if (req) {
      // Für API-Routen
      token = req.cookies.get(COOKIE_NAME)?.value;
    } else {
      // Für serverseitige Komponenten
      token = cookies().get(COOKIE_NAME)?.value;
    }

    if (!token) {
      return null;
    }

    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );

    return verified.payload as { id: string; email: string; role: string };
  } catch (error) {
    console.error('Auth-Verifizierungs-Fehler:', error);
    return null;
  }
}

// Higher-Order-Function für Admin-geschützte API-Routen
export function requireAdmin(handler: Function) {
  return async (req: NextRequest, params: any) => {
    const user = await verifyAuth(req);

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    return handler(req, params);
  };
} 