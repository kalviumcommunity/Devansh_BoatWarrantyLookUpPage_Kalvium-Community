# Person 2 - Admin Portal Plan

**Goal:** Let authorized admins manage products, warranty documents, and repair records.

## Phase 1: Admin Product Search

[x] Create GET /api/admin/products?search=...
[x] Protect the route with the existing JWT proxy
[x] Search by exact serial number first
[x] Return product model, purchase date, warranty duration, and documents
[x] Return an empty result when no product matches

## Phase 2: Warranty Document Management

[x] Add a serial-number field to the upload form
[x] Connect the form to POST /api/admin/warranty-upload
[x] Enforce PDF-only uploads
[x] Enforce the PRD maximum of 5 MB
[x] Save the returned GCS URL with uploadWarrantyDoc()
[x] Add replace and soft-delete support
[x] Keep warranty files private; do not expose public downloads

## Phase 3: Repair Record Management

[x] Create POST /api/admin/repair-history
[x] Create PUT /api/admin/repair-history/[id]
[x] Validate serial number, date, description, and service-center code
[x] Use createRepairRecord() and Prisma updates
[x] Return clear 400, 404, and 401 responses

## Phase 4: Admin Pages and Audit

[x] Connect product search page to its API
[x] Connect repair-history page to its API
[x] Show upload, update, and delete results in the UI
[x] Add audit information using uploadedBy and createdBy
[x] Test unauthorized requests and invalid form data
[x] Run npm run lint and npm run build

## Rules

Admin routes require JWT authentication.
Use the existing helpers in src/lib, src/utils, and Prisma.
Keep code simple and avoid new abstractions unless needed.
Do not commit .env or gcp-service-account.json.