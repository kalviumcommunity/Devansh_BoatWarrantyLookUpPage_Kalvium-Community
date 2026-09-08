import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Prevent multiple instances during development
const globalForPrisma = globalThis;

let prisma;
if (!globalForPrisma.__prisma) {
  const connectionString =
    process.env.DATABASE_URL || "postgresql://localhost:5432/boat_dev";
  const adapter = new PrismaPg({ connectionString });
  globalForPrisma.__prisma = new PrismaClient({ adapter });
}

prisma = globalForPrisma.__prisma;

export default prisma;
