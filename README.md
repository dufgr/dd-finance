# DD Finance

A personal finance web app to track income, expenses, and investments on a dashboard, manage transactions, and get financial insights.

## Demo

Preview and production link will be added after deployment. The current logo and visual identity are preserved.

## Features

- Monthly dashboard with income, expenses, and investment summaries.
- Transaction and expenses-by-category charts.
- Create, edit, and delete transactions.
- Authentication and user management with Clerk.
- Premium subscription and Stripe checkout.
- Financial report powered by OpenAI; without an API key, the app returns a sample report.

## Tech Stack

- Next.js 14.2.35 and React 18.
- TypeScript 5 and Tailwind CSS 3.
- PostgreSQL 16, Prisma 5.21, and versioned migrations.
- Clerk for authentication, Stripe for subscriptions, and OpenAI for reports.
- Node.js 20 or later and Docker Desktop for the local database.

## Architecture and Technical Decisions

The UI and routes use the Next.js App Router. Data access is handled by Prisma with PostgreSQL as the relational database; the schema is in `prisma/schema.prisma`. Structural changes are applied through the migrations in `prisma/migrations`. Authentication is delegated to Clerk; transaction data is associated with the authenticated user's identifier.

The project has no seed configured. To initialize an empty database, apply the migrations described below; there is no automatic sample data loading.

## Running Locally

1. Install Node.js 20 or later, npm, and Docker Desktop. Start Docker Desktop.
2. Install dependencies:

   ```bash
   npm ci
   ```

3. Create the local configuration from the example:

   ```bash
   cp .env.example .env
   ```

   On PowerShell, use `Copy-Item .env.example .env`. `NEXT_PUBLIC_LOCAL_AUTH_BYPASS=true` enables a demo user only during `npm run dev`, without requiring Clerk credentials. This bypass is ignored outside the development environment. The local demo user has access to a sample premium plan; Stripe and OpenAI are disabled by default. To test Clerk locally, set the bypass to `false` and configure `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` with valid development credentials. The default connection URL points to the local PostgreSQL database.

4. Start the project's dedicated database:

   ```bash
   docker compose up -d database
   ```

   The service uses PostgreSQL 16 on port `5432`, database `dd_finance`, user `dd_finance`, and the Docker volume `dd-finance-postgres-data`. The default password `dd-finance-local` is for development only. If you change `POSTGRES_PASSWORD` in `.env`, also update the password in `DATABASE_URL`.

5. Apply migrations:

   ```bash
   npx prisma migrate deploy
   ```

6. Start the app:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000). With the local bypass enabled, no Clerk setup is required. With no integrations enabled, checkout remains unavailable and the report uses sample data. To enable Stripe, set `NEXT_PUBLIC_STRIPE_ENABLED=true` and the Stripe credentials; for real AI analysis, set `OPENAI_ENABLED=true` and `OPENAI_API_KEY`.

## Deploy on Vercel

The project uses the standard Next.js build flow. For this deployment, configure only the following on Vercel:

- `DATABASE_URL`: pooled PostgreSQL Neon URL for application requests.
- `DIRECT_URL`: direct Neon URL without `-pooler` in the hostname; used by Prisma for migrations.
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`: Clerk production credentials.
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/` and `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/`. Do not set `NEXT_PUBLIC_CLERK_SIGN_IN_URL` or `NEXT_PUBLIC_CLERK_SIGN_UP_URL`: the flow uses Clerk's hosted Account Portal. You can switch to a custom modal login later if preferred.
- `NEXT_PUBLIC_LOCAL_AUTH_BYPASS=false`, `NEXT_PUBLIC_STRIPE_ENABLED=false`, and `OPENAI_ENABLED=false`.

Do not configure Stripe keys or `OPENAI_API_KEY`; without the activation flags, these integrations remain unavailable. Before the first access, apply the migrations to the production database with `npx prisma migrate deploy`; Prisma uses `DIRECT_URL` for this operation. The default Vercel build runs `npm run build`.
