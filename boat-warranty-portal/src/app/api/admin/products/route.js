import { NextResponse } from "next/server";
import { getProductBySerial } from "@/lib/db";
import { validateSerialNumber } from "@/utils/validation";
import { handleApiError } from "@/utils/errors";

export async function GET(request) {
  try {
    const search =
      request.nextUrl.searchParams.get("search")?.trim().toUpperCase() || "";

    if (!search || !validateSerialNumber(search)) {
      return NextResponse.json({ results: [] });
    }

    const product = await getProductBySerial(search);

    if (!product) {
      return NextResponse.json({ results: [] });
    }

    return NextResponse.json({
      results: [
        {
          serialNumber: product.serialNumber,
          modelName: product.modelName,
          purchaseDate: product.purchaseDate,
          warrantyDurationMonths: product.warrantyDurationMonths,
          documents: product.warrantyDocuments,
          repairHistory: product.repairHistory,
        },
      ],
    });
  } catch (error) {
    return handleApiError(error);
  }
}
