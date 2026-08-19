## Warranty Lookup Page - PRD

Date: 18 Aug 2026
Figma: https://www.figma.com/design/KRHLRRjewSbQz8aD12DzkT/Untitled?node-id=0-1

---
# Product Requirement Document (PRD)

## boAt Customer Warranty & Repair History Self-Service Portal

## 1. Product Overview

A self-service web portal that allows boAt customers to check **warranty status and repair history using their product serial number**, without contacting customer support.

An authenticated **Admin Portal** will allow boAt Operations teams to manage warranty PDFs and repair records.

### Goals

* Reduce warranty-related support tickets.
* Provide instant and accurate warranty verification.
* Give customers transparency into repair history.
* Centralize warranty documents and service records.
* Reduce manual Operations workload.
* Protect the system against abuse and unauthorized access.

---

## 2. Business Problem

Customers currently depend on support teams to verify warranty coverage and repair history. Internally, warranty PDFs and repair records require manual searching and maintenance.

### Current Impact

* ~14,000 warranty verification tickets/month.
* ~4.5 minutes average handling time per ticket.
* > 1,050 support hours/month.
* ~15 admin hours/week spent searching/managing records.
* Estimated ₹8.5L/month operational leakage.

### Target Outcomes

* ≥65% reduction in warranty verification tickets within 60 days.
* ≥80% reduction in admin maintenance effort.
* ≥99% valid serial-number lookup accuracy.
* P95 lookup response time ≤1.5 seconds.

---

## 3. Users & Stakeholders

### Primary Users

* **Customers:** Check warranty and repair history.
* **Operations Admins:** Manage warranty certificates and repair records.

### Secondary Stakeholders

* Customer Support / Regional Operations.
* Core Platform & Inventory Data Team.
* Head of Customer Operations.
* Engineering Manager / Backend Lead.

---

## 4. Core Features

### Customer Portal

1. Enter product serial number without login.
2. Validate serial-number format.
3. Check warranty status.
4. Display purchase and expiry dates.
5. Display repair history.
6. Paginate repair records (5 per page).
7. Provide serial-number location guidance.
8. Show clear errors for invalid/not-found serial numbers.

### Admin Portal

1. Corporate SSO authentication.
2. Role-based access control.
3. Search registered serial numbers.
4. Upload warranty PDFs.
5. Replace or soft-delete warranty PDFs.
6. Add and update repair records.
7. Maintain audit information.

---

## 5. User Stories

### US-01 — Warranty Verification

**As a customer**, I want to enter my serial number without logging in so that I can instantly determine whether my product is under warranty.

**Acceptance:** Display product model, purchase date, expiry date and `ACTIVE`/`EXPIRED` status.

### US-02 — Repair History

**As a customer**, I want to view my product's repair history so that I can verify previous authorized service activity.

**Acceptance:** Display date, service performed and service-center code in reverse chronological order.

### US-03 — Warranty Management

**As an admin**, I want to upload, replace and soft-delete warranty PDFs so that product documents remain centrally managed.

**Acceptance:** SSO required; PDF only; maximum 5 MB; upload activity audited.

### US-04 — Repair Management

**As an admin**, I want to create and update repair records so that customers see accurate service information.

**Acceptance:** Date, category, description and service-center code are required.

---

## 6. Data Model

### `product_registry`

* `serial_number` — Primary Key
* `model_name`
* `purchase_date`
* `warranty_duration_months`

### `warranty_documents`

* `document_id` — Primary Key
* `serial_number` — Foreign Key
* `s3_file_url`
* `file_size_kb`
* `uploaded_by`
* `uploaded_at`

### `repair_history`

* `repair_id` — Primary Key
* `serial_number` — Foreign Key
* `repair_date`
* `issue_description`
* `service_center_code`
* `created_by`

PostgreSQL is the primary database and AWS S3 stores warranty PDFs. Legacy records without activation timestamps use the factory dispatch timestamp as fallback.

---

## 7. Warranty Logic

```text
Expiry Date = Purchase Date + Warranty Duration
```

* Expiry date ≥ current date → `ACTIVE`
* Expiry date < current date → `EXPIRED`

Serial-number searches use exact matching against an indexed `serial_number`.

---

## 8. System Architecture

```text
Customer
   │
   ▼
Cloudflare WAF
(Turnstile + Rate Limit)
   │
   ▼
Public Query API
   │
   ▼
PostgreSQL Read Replica
   │
   ├── Product Registry
   ├── Warranty Documents
   └── Repair History


Admin
   │
   ▼
Admin Portal
   │
   ▼
SSO / RBAC
   │
   ▼
Admin API
   │
   ├── PostgreSQL
   └── Private AWS S3
```

### Request Flow

1. Customer submits serial number.
2. WAF/CAPTCHA/rate limit validates request.
3. API performs indexed serial-number lookup.
4. Warranty status is calculated.
5. Repair history and warranty metadata are retrieved.
6. Results are returned to the customer.

---

## 9. Security Requirements

* HTTPS for all communication.
* Cloudflare Turnstile CAPTCHA.
* Maximum **10 requests/minute/IP**.
* Exact-match serial-number lookup.
* Database `UNIQUE` constraint on serial numbers.
* Corporate SSO + RBAC for admins.
* Server-side PDF MIME and magic-byte validation.
* Maximum PDF size: **5 MB**.
* Private/encrypted S3 storage.
* Audit trail for administrative actions.
* Customer PDF downloads are not publicly exposed.

---

## 10. Scope

### In Scope — v1.0

* Public warranty lookup.
* Warranty-status calculation.
* Repair-history display.
* Serial-number guidance.
* CAPTCHA and rate limiting.
* Admin authentication/RBAC.
* Warranty PDF upload/replace/soft-delete.
* Manual repair-record management.
* Audit tracking.

### Out of Scope — v1.0

* Customer accounts/profile login.
* Social SSO.
* Third-party service-center ERP integration.
* External service-center portal.
* Public warranty PDF downloads.
* Automated email/SMS expiry notifications.
* Multi-language support.

---

## 11. KPIs

| KPI                       |      Target |
| ------------------------- | ----------: |
| Warranty ticket reduction |        ≥65% |
| Valid lookup accuracy     |        ≥99% |
| Admin maintenance effort  | ≤3 hrs/week |
| P95 lookup latency        |    ≤1.5 sec |
| Admin adoption            |  8/8 admins |

---

## 12. Risks & Mitigation

| Risk                           | Mitigation                             |
| ------------------------------ | -------------------------------------- |
| Serial-number enumeration      | CAPTCHA + rate limiting                |
| Duplicate serial numbers       | Database `UNIQUE` constraint           |
| Malicious PDF uploads          | MIME + magic-byte validation           |
| Admin adoption issues          | Training + quick-reference guide       |
| Unmatched serial numbers       | Serial-number guidance and support CTA |
| Missing legacy activation data | Factory dispatch timestamp fallback    |

---

## 13. UI Requirements

### Customer Landing Page

* boAt branding.
* Centered serial-number search.
* `Where do I find my serial number?` guidance.
* Responsive design.

### Results Page

**Warranty Card**

* Model
* Purchase date
* Expiry date
* `ACTIVE` / `EXPIRED` status

**Repair Table**

* Date
* Service performed
* Service center
* 5 records/page

### Admin Dashboard

* Searchable serial registry.
* Warranty document management.
* `Upload / Replace PDF`.
* `+ Add Repair Entry`.
* Repair management side panel/form.

---

## 14. Non-Functional Requirements

* **Performance:** P95 ≤1.5 seconds under 100 RPS.
* **Security:** Authentication, RBAC, WAF, CAPTCHA and secure file storage.
* **Reliability:** High availability for public lookups.
* **Data Integrity:** Primary/foreign keys, unique serial numbers and audit records.
* **Responsive:** Desktop and mobile web support.

---

## 15. Definition of Done

Version 1.0 is ready when:

* [ ] Customer warranty lookup works.
* [ ] Warranty calculation is verified.
* [ ] Repair history is displayed correctly.
* [ ] Admin SSO/RBAC works.
* [ ] PDF upload validation works.
* [ ] Warranty documents are securely stored.
* [ ] Repair records can be created/updated.
* [ ] Rate limiting and CAPTCHA are active.
* [ ] Audit logging is implemented.
* [ ] Database relationships and constraints are verified.
* [ ] P95 latency meets ≤1.5 seconds.
* [ ] Security and performance testing are completed.

---

## 16. Future Enhancements — v2

* Third-party ERP integration.
* Customer accounts.
* Automated expiry notifications.
* Multi-language support.
* Customer digital warranty certificates.
* External service-center access.
* Advanced warranty analytics.

---

## 17. Success Definition

The product is successful when customers can **independently verify warranty coverage and repair history quickly and accurately**, while boAt Operations significantly reduces manual document management and support workload.

The primary success measures are **ticket deflection, lookup accuracy, response time, administrative-effort reduction, and secure data management**.


