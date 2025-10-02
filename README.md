# Tldraw Editor App

A simple drawing editor built with Tldraw, powered by Next.js, TailwindCSS, Shadcn UI, and tRPC.

<br>

---

## Tech Stack

- **[Next.js](https://nextjs.org)** – App Router, SSR, API routes  
- **[TailwindCSS](https://tailwindcss.com)** – Utility-first styling  
- **[Shadcn UI](https://ui.shadcn.com)** – Accessible, themeable UI components  
- **[tRPC](https://trpc.io)** – Type-safe API communication  
- **[Prisma](https://www.prisma.io)** – ORM for database access  
- **[SQLite](https://www.sqlite.org)** – Lightweight embedded database  
- **[Tldraw](https://tldraw.dev)** – Canvas editor for shapes and drawings  

<br>

---

## Features

- Create a new drawing or list your drawings from the homepage (`/`)
- Open and edit drawings at `/[drawingId]`
- Real-time autosave of drawing store data
- Fully type-safe backend communication via tRPC
- Clean SSR architecture with modular components

<br>

---

## Setup Instructions
In order to run the project locally you should follow the next steps.

### 1. Clone the repository
```bash
git clone https://github.com/MinaZhen/tldraw-editor
cd tldraw-editor
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run Prisma migration
```bash
npm run prisma:migrate
```

### 4. Start the development server
```bash
npm run dev
```

<br>

---

## Project Folders Structure

```bash
src/
├── app/                    # App Router pages and global styles
│   ├── api/                # API route handlers
│   │   └── trpc/           # tRPC endpoint routing
│   └── (routes)/           # Main frontend routes (home and editor)
├── application/            # Business logic (use cases)
├── client/                 # UI components and frontend hooks
│   ├── api/                # tRPC client setup
│   ├── components/         # Reusable UI components
│   │   └── atoms/          # Atomic design system components
│   └── hooks/              # Custom React hooks
├── domain/                 # Domain entities and interfaces
├── infrastructure/         # External services and adapters
│   ├── database/           # Prisma database setup
│   │   └── prisma/         # Prisma schema and migrations
│   └── trpc/               # tRPC server configuration
├── lib/                    # Utility functions
└── shared/                 # Shared types and interfaces
    └── types/              # Type definitions
```

---

## API Endpoints

All endpoints are exposed via tRPC at `/api/trpc`. You can use tools like Postman or curl to test the following endpoints locally.

#### 1. `GET /api/trpc/list`
Retrieves all drawings.

#### 2. `GET /api/trpc/find?input={"id":"<drawingId>"}`
Retrieves a specific drawing by ID.

#### 3. `POST /api/trpc/create`
Creates a new drawing given a name.

**Body example:**
```json
{
  "name": "Some name"
}
```

#### 4. `POST /api/trpc/save`
Saves the store data of a drawing.

**Body example:**
```json
{
  "id": "your-drawing-id",
  "storeData": "data-from-tldraw-editor"
}
```

<br>

---

## Database Schema

Using Prisma with SQLite (`dev.db`). <br>
Created after `npm run prisma:migrate`. <br>
The main model:

```prisma
model TldrawData {
  id          String   @id @default(uuid())
  name        String
  storeData   Json?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

<br>

---

## Environment Variables
No `.env` required.

<br>

---

## License
This project is for technical evaluation and learning purposes only.