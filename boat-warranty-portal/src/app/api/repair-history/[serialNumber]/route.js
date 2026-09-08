import { NextResponse } from "next/server";
import {
  validateSerialNumber,
  getProductBySerial,
  getRepairHistory,
} from "@/lib/db";

export async function GET(req, { params }) {
  const { serialNumber } = params;
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10) || 1;

  if (!validateSerialNumber(serialNumber)) {
    return NextResponse.json(
      { error: "Invalid serial number" },
      { status: 400 },
    );
  }

  const product = await getProductBySerial(serialNumber);
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { records, total, perPage } = await getRepairHistory(
    serialNumber,
    page,
    5,
  );

  return NextResponse.json({ records, total, page, perPage });
}
