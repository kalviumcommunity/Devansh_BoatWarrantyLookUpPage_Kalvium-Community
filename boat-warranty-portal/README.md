# Boat Warranty Portal

A Next.js portal for checking product warranty status and repair history.

## Requirements

- Node.js 20 or newer
- PostgreSQL 14 or newer running locally
- Git

## Setup

Clone the repository and enter the project folder:

```powershell
git clone <repository-url>
cd boat-warranty-portal
npm install
```

Create a file named `.env` in the project root. Replace `YOUR_POSTGRES_PASSWORD` with the password created for the local `postgres` user. The Docker password `password` will only work if you explicitly chose that password during local PostgreSQL installation:

```env
DATABASE_URL="postgresql://postgres:YOUR_POSTGRES_PASSWORD@localhost:5432/warranty_db"
JWT_SECRET=local-development-secret
```

Create the database once using pgAdmin or the PostgreSQL SQL Shell:

```sql
CREATE DATABASE warranty_db;
```

If `psql` is available in your PATH, the equivalent command is:

```powershell
createdb -U postgres warranty_db
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

For the Docker-based setup intended for the next developer, see [DOCKER-PHASED-SETUP.md](DOCKER-PHASED-SETUP.md).

