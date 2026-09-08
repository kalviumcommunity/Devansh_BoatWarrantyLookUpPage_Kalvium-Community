import { NextResponse } from "next/server";
import { uploadPDF, deletePDF, gcsUrlToFileName } from "@/lib/gcs";
import {
  getWarrantyDocument,
  replaceWarrantyDoc,
  softDeleteWarrantyDoc,
} from "@/lib/db";
import { getRequestUser } from "@/lib/auth";
import { validatePdfFile, isPdfBuffer } from "@/utils/validation";

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const existing = await getWarrantyDocument(id);
    if (!existing || existing.deletedAt) {
      return NextResponse.json(
        { error: "Warranty document not found" },
        { status: 404 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

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

    const document = await replaceWarrantyDoc(id, {
      gcsFileUrl,
      fileSizeKb: Math.ceil(file.size / 1024),
      uploadedBy: user.userId,
      uploadedAt: new Date(),
    });

    await deletePDF(gcsUrlToFileName(existing.gcsFileUrl)).catch((error) =>
      console.error("Could not remove replaced warranty PDF:", error),
    );

    return NextResponse.json({
      documentId: document.documentId,
      serialNumber: document.serialNumber,
      uploadedAt: document.uploadedAt,
    });
  } catch (error) {
    console.error("Warranty replace failed:", error);
    return NextResponse.json(
      { error: "Could not replace warranty PDF" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { id } = await params;
    const existing = await getWarrantyDocument(id);
    if (!existing || existing.deletedAt) {
      return NextResponse.json(
        { error: "Warranty document not found" },
        { status: 404 },
      );
    }

    await softDeleteWarrantyDoc(id);

    return NextResponse.json({ documentId: id, deleted: true });
  } catch (error) {
    console.error("Warranty soft-delete failed:", error);
    return NextResponse.json(
      { error: "Could not delete warranty PDF" },
      { status: 500 },
    );
  }
}
