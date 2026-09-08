-- CreateTable
CREATE TABLE "product_registry" (
    "serial_number" TEXT NOT NULL,
    "model_name" TEXT NOT NULL,
    "purchase_date" TIMESTAMP(3) NOT NULL,
    "warranty_duration_months" INTEGER NOT NULL,

    CONSTRAINT "product_registry_pkey" PRIMARY KEY ("serial_number")
);

-- CreateTable
CREATE TABLE "warranty_documents" (
    "document_id" TEXT NOT NULL,
    "serial_number" TEXT NOT NULL,
    "gcs_file_url" TEXT NOT NULL,
    "file_size_kb" INTEGER NOT NULL,
    "uploaded_by" TEXT NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "warranty_documents_pkey" PRIMARY KEY ("document_id")
);

-- CreateTable
CREATE TABLE "repair_history" (
    "repair_id" TEXT NOT NULL,
    "serial_number" TEXT NOT NULL,
    "repair_date" TIMESTAMP(3) NOT NULL,
    "issue_description" TEXT NOT NULL,
    "service_center_code" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,

    CONSTRAINT "repair_history_pkey" PRIMARY KEY ("repair_id")
);

-- AddForeignKey
ALTER TABLE "warranty_documents" ADD CONSTRAINT "warranty_documents_serial_number_fkey" FOREIGN KEY ("serial_number") REFERENCES "product_registry"("serial_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repair_history" ADD CONSTRAINT "repair_history_serial_number_fkey" FOREIGN KEY ("serial_number") REFERENCES "product_registry"("serial_number") ON DELETE RESTRICT ON UPDATE CASCADE;
