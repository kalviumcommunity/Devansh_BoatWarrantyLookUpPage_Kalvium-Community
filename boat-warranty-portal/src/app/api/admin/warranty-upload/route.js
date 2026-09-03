import { NextResponse } from "next/server";
import { uploadPDF } from "@/lib/gcs";

const maxFileSize = 10 * 1024 * 1024;

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file.arrayBuffer !== "function") {
      return NextResponse.json(
        { error: "A PDF file is required" },
        { status: 400 },
      );
    }

    if (file.size > maxFileSize) {
      return NextResponse.json(
        { error: "File must be 10 MB or smaller" },
        { status: 400 },
      );
    }

    if (
      file.type !== "application/pdf" ||
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 },
      );
    }

    const fileName = `warranties/${crypto.randomUUID()}-${file.name}`;
    const url = await uploadPDF(
      fileName,
      Buffer.from(await file.arrayBuffer()),
    );

    return NextResponse.json({ fileName, url });
  } catch (error) {
    console.error("Warranty upload failed:", error);
    return NextResponse.json(
      { error: "Could not upload warranty PDF" },
      { status: 500 },
    );
  }
}
