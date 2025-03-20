import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@beispiel.de';
  
  // Prüfen, ob der Admin-Benutzer bereits existiert
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    // Admin-Passwort hashen
    const hashedPassword = await bcrypt.hash('sicheresPassword123', 10);
    
    // Admin-Benutzer erstellen
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        name: 'Admin Benutzer'
      }
    });
    
    console.log(`Admin-Benutzer erstellt: ${admin.email}`);
  } else {
    console.log(`Admin-Benutzer existiert bereits: ${adminEmail}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 