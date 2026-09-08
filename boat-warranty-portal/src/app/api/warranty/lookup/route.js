import { NextResponse } from "next/server";
import { getProductBySerial, computeExpiry } from "@/lib/db";
import { validateSerialNumber } from "@/utils/validation";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const serial = searchParams.get("serialNumber") || "";

  if (!validateSerialNumber(serial)) {
    return NextResponse.json(
      { error: "Invalid serial number" },
      { status: 400 },
    );
  }

  const product = await getProductBySerial(serial);
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const expiry = computeExpiry(
    product.purchaseDate,
    product.warrantyDurationMonths,
  );
  const now = new Date();
  const status = expiry >= now ? "ACTIVE" : "EXPIRED";

  return NextResponse.json({
    serialNumber: product.serialNumber,
    modelName: product.modelName,
    purchaseDate: product.purchaseDate,
    expiryDate: expiry,
    status,
  });
}
