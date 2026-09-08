# Docker Setup Handoff

This guide is for the next developer who needs to run the portal with PostgreSQL in Docker. The current local setup uses a PostgreSQL service installed on Windows.

## Phase 1: Start PostgreSQL

1. Install and open Docker Desktop.
2. From the `boat-warranty-portal` folder, create the database container once:

```powershell
docker run --name warranty-postgres `
  -e POSTGRES_PASSWORD=password `
  -e POSTGRES_DB=warranty_db `
  -p 5432:5432 `
  -d postgres
```

3. On later sessions, start the existing container:

```powershell
docker start warranty-postgres
```

4. Confirm it is running:

```powershell
docker ps
```

## Phase 2: Configure the App

Set the database URL in `.env`:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/warranty_db"
JWT_SECRET=local-development-secret
```

Do not commit `.env` or service-account files.

## Phase 3: Initialize Data

From the project folder, run:

```powershell
npm install
npm run db:migrate
npm run db:seed
```

The demo serial numbers are `BOAT-DEMO-001`, `BOAT-DEMO-002`, and `BOAT-DEMO-003`.

## Phase 4: Verify and Run

```powershell
npm run lint
npm run build
npm run dev
```

Open `http://localhost:3000/warranty` and test a demo serial number.

## Troubleshooting

- `Cannot connect to the Docker daemon`: open Docker Desktop and wait until it is ready.
- `No such container: warranty-postgres`: repeat the `docker run` command from Phase 1.
- `Can't reach database server`: run `docker start warranty-postgres` and confirm port `5432` is available.
- Database already exists: do not recreate it; run the migration and seed commands.