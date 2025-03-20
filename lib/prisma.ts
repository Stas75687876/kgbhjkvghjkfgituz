import { PrismaClient } from "@prisma/client";

// PrismaClient als globale Variable, um während der Entwicklung Hot Reloading zu unterstützen
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma; 