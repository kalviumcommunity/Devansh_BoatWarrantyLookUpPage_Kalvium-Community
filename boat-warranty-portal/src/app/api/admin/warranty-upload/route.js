import { NextResponse } from "next/server";
import { uploadPDF } from "@/lib/gcs";
import { getProductBySerial, uploadWarrantyDoc } from "@/lib/db";
import { getRequestUser } from "@/lib/auth";
import { validateSerialNumber, validatePdfFile, isPdfBuffer } from "@/utils/validation";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const serialNumber = formData.get("serialNumber")?.trim().toUpperCase();

    if (!validateSerialNumber(serialNumber)) {
      return NextResponse.json(
        { error: "A valid serial number is required" },
        { status: 400 },
      );
    }

    const product = await getProductBySerial(serialNumber);
    if (!product) {
      return NextResponse.json(
        { error: "No registered product matches that serial number" },
        { status: 404 },
      );
    }

    const fileError = validatePdfFile(file);
    if (fileError) {
      return NextResponse.json({ error: fileError }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    if (!isPdfBuffer(buffer)) {
      return NextResponse.json(
        { error: "The file is not a valid PDF" },
        { status: 400 },
      );
    }

    const user = getRequestUser(request);
    const fileName = `warranties/${crypto.randomUUID()}-${file.name}`;
    const gcsFileUrl = await uploadPDF(fileName, buffer);

    const document = await uploadWarrantyDoc({
      serialNumber,
      gcsFileUrl,
      fileSizeKb: Math.ceil(file.size / 1024),
      uploadedBy: user.userId,
    });

    return NextResponse.json({
      documentId: document.documentId,
      serialNumber: document.serialNumber,
      uploadedAt: document.uploadedAt,
    });
  } catch (error) {
    console.error("Warranty upload failed:", error);
    return NextResponse.json(
      { error: "Could not upload warranty PDF" },
      { status: 500 },
    );
  }
}
