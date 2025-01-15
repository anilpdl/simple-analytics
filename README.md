# Simple Analytics Dashboard using Next.js, NextAuth, Prisma, and Recharts

## Project Overview
A brief description of what the project is about.

## Prerequisites
- Node.js
- npm
- postgres (if using local database)

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Getting Google OAuth Credentials
1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
4. Go to Credentials → Create Credentials → OAuth Client ID
5. Configure the OAuth consent screen
6. Create credentials and copy the Client ID and Client Secret

## Generating AUTH_SECRET
1. Run the following command to generate a random secret key:
```bash
npx auth secret
```
2. Copy the generated secret key and paste it into the `.env` file as the `AUTH_SECRET` variable.

## Configuration
- Copy `.example.env` to `.env` and update the environment variables as needed.
```
AUTH_SECRET= # Your JWT secret key for NextAuth.js
AUTH_GOOGLE_ID= # Google OAuth Client ID
AUTH_GOOGLE_SECRET= # Google OAuth Client Secret
NEXTAUTH_URL=http://localhost:3000 # Your application URL (e.g., http://localhost:3000 for development)
DATABASE_URL="postgresql://user:password@localhost:5432/db_name" # Your database connection string
```

## Database Setup
- Ensure Prisma is set up and migrate the database:
  ```bash
  npx prisma migrate dev
  ```

## Scripts
- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm run start`: Starts the production server.
