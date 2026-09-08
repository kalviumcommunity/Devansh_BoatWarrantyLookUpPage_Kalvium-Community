import prisma from "./prisma";

export function validateSerialNumber(serial) {
  if (!serial || typeof serial !== "string") return false;
  const s = serial.trim().toUpperCase();
  // Basic validation: alphanumeric between 8 and 20 chars
  return /^[A-Z0-9]{8,20}$/.test(s);
}

export async function getProductBySerial(serial) {
  const s = serial.trim().toUpperCase();
  return prisma.productRegistry.findUnique({ where: { serialNumber: s } });
}

export async function getRepairHistory(serial, page = 1, perPage = 5) {
  const s = serial.trim().toUpperCase();
  const take = perPage;
  const skip = (Math.max(1, page) - 1) * perPage;

  const [records, total] = await Promise.all([
    prisma.repairHistory.findMany({
      where: { serialNumber: s },
      orderBy: { repairDate: "desc" },
      take,
      skip,
    }),
    prisma.repairHistory.count({ where: { serialNumber: s } }),
  ]);

  return { records, total, page: Math.max(1, page), perPage };
}

export function computeExpiry(purchaseDate, warrantyMonths) {
  if (!purchaseDate || typeof warrantyMonths !== "number") return null;
  const d = new Date(purchaseDate);
  const newMonth = d.getMonth() + warrantyMonths;
  d.setMonth(newMonth);
  return d;
}
