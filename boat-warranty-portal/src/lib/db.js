import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not configured");

const globalForPrisma = globalThis;
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function getProductBySerial(serialNumber) {
  return prisma.productRegistry.findUnique({
    where: { serialNumber },
    include: { warrantyDocuments: true, repairHistory: true },
  });
}

export async function getRepairHistory(serialNumber, page = 1) {
  const pageSize = 5;
  const currentPage = Math.max(1, Number(page) || 1);
  const where = { serialNumber };
  const [records, total] = await Promise.all([
    prisma.repairHistory.findMany({
      where,
      orderBy: { repairDate: "desc" },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    }),
    prisma.repairHistory.count({ where }),
  ]);

  return { records, total, page: currentPage, pageSize };
}

export async function createRepairRecord(data) {
  return prisma.repairHistory.create({ data });
}

export async function uploadWarrantyDoc(data) {
  return prisma.warrantyDocument.create({ data });
}

export { prisma };
