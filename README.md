# Night Blogs - A Medium Clone

Night Blog is a full-stack web application inspired by Medium, allowing users to read, write, and share their stories and ideas. It features a clean interface for an enjoyable reading and writing experience.

## Features

*   User authentication (Signup/Signin)
*   Create, Read, Update, Delete (CRUD) blog posts
*   Browse all blog posts
*   View individual blog posts
*   Responsive design for various screen sizes
*   (Add any other specific features you have implemented or plan to implement)

## Tech Stack

**Frontend:**

*   **React:** A JavaScript library for building user interfaces.
*   **TypeScript:** Superset of JavaScript that adds static typing.
*   **Vite:** Next-generation frontend tooling for fast development.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **Axios:** Promise-based HTTP client for making API requests.
*   **React Router DOM:** For client-side routing.

**Backend:**

*   **Hono:** A small, simple, and ultrafast web framework for the Edge. (Running on Cloudflare Workers)
*   **TypeScript:** For type safety on the backend.
*   **Prisma:** Next-generation ORM for Node.js and TypeScript.
*   **PostgreSQL:** (Or your chosen database) - The database used to store application data.
*   **JWT (JSON Web Tokens):** For user authentication.
*   **Zod:** TypeScript-first schema declaration and validation library.

## Project Structure

```
medium/
├── backend/        # Hono backend (Cloudflare Worker)
│   ├── prisma/
│   ├── src/
│   │   ├── routes/
│   │   ├── index.ts
│   │   └── ...
│   ├── package.json
│   ├── tsconfig.json
│   └── wrangler.toml
├── common/         # Shared types/validation (Zod schemas)
│   ├── src/
│   └── ...
├── frontend/       # React frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── ...
│   ├── index.html
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Prerequisites

*   Node.js (v18.x or later recommended)
*   npm or yarn
*   Access to a PostgreSQL database (or your chosen DB)
*   Cloudflare account and `wrangler` CLI installed (for backend deployment)

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd medium
    ```

2.  **Backend Setup:**
    *   Navigate to the backend directory:
        ```bash
        cd backend
        ```
    *   Install dependencies:
        ```bash
        npm install
        # or
        yarn install
        ```
    *   Set up your `.env` file based on `.env.example` (if you create one) with your `DATABASE_URL` and `JWT_SECRET`.
        ```env
        DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
        JWT_SECRET="your-super-secret-jwt-key"
        ```
    *   Initialize Prisma and push the schema to your database:
        ```bash
        npx prisma migrate dev --name init
        # or
        # npx prisma db push (if you prefer not to use migrations initially)
        ```
    *   (Optional) Generate Prisma client:
        ```bash
        npx prisma generate
        ```

3.  **Frontend Setup:**
    *   Navigate to the frontend directory:
        ```bash
        cd ../frontend
        ```
    *   Install dependencies:
        ```bash
        npm install
        # or
        yarn install
        ```
    *   Create a `src/config.ts` file (if it doesn't exist) or update it with your backend URL:
        ```typescript
        // src/config.ts
        export const BACKEND_URL = "http://localhost:8787"; // For local dev
        // export const BACKEND_URL = "https://your-worker-url.workers.dev"; // For deployed backend
        ```

4.  **Common Package Setup (if applicable):**
    *   Navigate to the common directory:
        ```bash
        cd ../common
        ```
    *   Install dependencies (if any, usually just devDependencies like typescript):
        ```bash
        npm install
        # or
        yarn install
        ```
    *   Build the common package:
        ```bash
        npm run build
        # or
        # yarn build
        ```
        (Ensure your `package.json` in `common/` has a build script, e.g., `tsc -b`)

## Running the Project

1.  **Start the Backend (Cloudflare Worker locally):**
    *   In the `backend` directory:
        ```bash
        npm run dev
        # or
        # yarn dev
        # (This usually runs `wrangler dev`)
        ```
    *   The backend will typically be available at `http://localhost:8787`.

2.  **Start the Frontend:**
    *   In the `frontend` directory:
        ```bash
        npm run dev
        # or
        # yarn dev
        ```
    *   The frontend will typically be available at `http://localhost:5173` (or another port specified by Vite).

3.  Open your browser and navigate to the frontend URL (e.g., `http://localhost:5173`).

## Deployment

**Backend (Cloudflare Workers):**

*   In the `backend` directory:
    ```bash
    wrangler deploy
    ```
*   Update the `BACKEND_URL` in your frontend's `src/config.ts` to your deployed worker URL.

**Frontend:**

*   Build the frontend:
    *   In the `frontend` directory:
        ```bash
        npm run build
        # or
        # yarn build
        ```
*   Deploy the contents of the `frontend/dist` folder to your preferred static hosting provider (e.g., Vercel, Netlify, Cloudflare Pages, GitHub Pages).

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

(Optional: Add sections for API Endpoints, Environment Variables, License, etc.)
