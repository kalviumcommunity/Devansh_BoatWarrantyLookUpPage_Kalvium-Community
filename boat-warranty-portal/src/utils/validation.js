export function validateSerialNumber(serialNumber) {
  return /^[A-Z0-9-]{6,30}$/.test(serialNumber?.trim().toUpperCase() || "");
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email?.trim() || "");
}

export const MAX_WARRANTY_PDF_SIZE = 5 * 1024 * 1024;

const pdfMagicBytes = Buffer.from("%PDF-");

export function validatePdfFile(file) {
  if (!file || typeof file.arrayBuffer !== "function") {
    return "A PDF file is required";
  }

  if (file.size > MAX_WARRANTY_PDF_SIZE) {
    return "File must be 5 MB or smaller";
  }

  if (
    file.type !== "application/pdf" ||
    !file.name.toLowerCase().endsWith(".pdf")
  ) {
    return "Only PDF files are allowed";
  }

  return null;
}

export function isPdfBuffer(buffer) {
  return buffer.subarray(0, pdfMagicBytes.length).equals(pdfMagicBytes);
}

export function validateServiceCenterCode(code) {
  return /^[A-Z0-9-]{2,20}$/.test(code?.trim().toUpperCase() || "");
}

export function parseRepairDate(dateString) {
  const date = new Date(dateString);
  return Number.isNaN(date.getTime()) ? null : date;
}
