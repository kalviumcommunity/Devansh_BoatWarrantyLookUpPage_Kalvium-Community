import { Storage } from "@google-cloud/storage";

function getBucket() {
  const bucketName = process.env.GCP_BUCKET_NAME;
  if (!bucketName) throw new Error("GCP_BUCKET_NAME is not configured");

  const storage = new Storage({
    projectId: process.env.GCP_PROJECT_ID || undefined,
  });
  return storage.bucket(bucketName);
}

export async function uploadPDF(fileName, fileBuffer) {
  if (!fileName.toLowerCase().endsWith(".pdf")) {
    throw new Error("Only PDF files can be uploaded");
  }

  const file = getBucket().file(fileName);
  await file.save(fileBuffer, {
    metadata: { contentType: "application/pdf" },
    resumable: false,
  });

  return `https://storage.googleapis.com/${file.bucket.name}/${encodeURIComponent(fileName)}`;
}

export async function deletePDF(fileName) {
  await getBucket().file(fileName).delete();
}
