# Boat Warranty Portal

A Next.js portal for checking product warranty status and repair history.

## Requirements

- Node.js 20 or newer
- Docker Desktop
- Git

## Setup

Clone the repository and enter the project folder:

```powershell
git clone <repository-url>
cd boat-warranty-portal
npm install
```

Create a file named `.env` in the project folder:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/warranty_db"
JWT_SECRET=local-development-secret
```

Start PostgreSQL in Docker. Run this once per computer:

```powershell
docker run --name warranty-postgres `
  -e POSTGRES_PASSWORD=password `
  -e POSTGRES_DB=warranty_db `
  -p 5432:5432 `
  -d postgres
```

On later days, start the existing container instead:

```powershell
docker start warranty-postgres
```

Apply the database migration and load demo data:

```powershell
npm run db:migrate
npm run db:seed
```

Start the application:

```powershell
npm run dev
```

Open http://localhost:3000.

## Demo Data

Use these serial numbers when testing:

```text
BOAT-DEMO-001
BOAT-DEMO-002
BOAT-DEMO-003
```

## Database Commands

```powershell
npm run db:migrate  # Apply Prisma migrations during development
npm run db:seed     # Insert demo products and repair records
```

Do not commit `.env` or `gcp-service-account.json`. Both are ignored by Git.

## Google Cloud Storage

Phase 3 uses Google Cloud Storage for warranty PDFs. Add these values to `.env` when cloud storage access is available:

```env
GCP_PROJECT_ID=your-google-cloud-project-id
GCP_BUCKET_NAME=your-bucket-name
GOOGLE_APPLICATION_CREDENTIALS=./gcp-service-account.json
```

Place the service account file at the project root. Do not commit it.
