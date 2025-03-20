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

  // Beispielprodukte erstellen
  const productData = [
    {
      name: "Natürliche Gesichtscreme",
      description: "Eine reichhaltige, natürliche Gesichtscreme mit Bio-Inhaltsstoffen.",
      price: 24.99,
      imageUrl: "/images/products/gesichtscreme.jpg"
    },
    {
      name: "Entspannendes Badeöl",
      description: "Ein luxuriöses Badeöl mit ätherischen Ölen für Entspannung.",
      price: 19.99,
      imageUrl: "/images/products/badeoel.jpg"
    },
    {
      name: "Beruhigende Gesichtsmaske",
      description: "Eine beruhigende Maske für sensible Haut.",
      price: 14.99,
      imageUrl: "/images/products/gesichtsmaske.jpg"
    }
  ];

  // Prüfen, ob bereits Produkte existieren
  const productCount = await prisma.product.count();
  
  if (productCount === 0) {
    for (const product of productData) {
      await prisma.product.create({
        data: product
      });
    }
    console.log(`${productData.length} Beispielprodukte wurden erstellt`);
  } else {
    console.log(`Es existieren bereits ${productCount} Produkte in der Datenbank`);
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