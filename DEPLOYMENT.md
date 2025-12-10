# Deployment Guide for Mkulima_help

This guide will walk you through deploying your Mkulima_help application.

## 1. Prerequisites

-   A **GitHub** account (to host your code).
-   A **Render** or **Railway** account (for Backend).
-   A **Vercel** or **Netlify** account (for Frontend).

## 2. Step 1: Push Code to GitHub

First, you need to push your local code to a GitHub repository.

1.  Initialize Git if you haven't:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
2.  Create a new repository on GitHub.
3.  Link and push:
    ```bash
    git remote add origin <your-github-repo-url>
    git push -u origin main
    ```

## 3. Step 2: Deploy Backend (Render.com)

We will deploy the `backend` folder as a Node.js web service.

1.  Log in to **Render**.
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repository.
4.  Configure the service:
    *   **Name**: `mkulima-backend`
    *   **Root Directory**: `backend` (Important!)
    *   **Environment**: `Node`
    *   **Build Command**: `pnpm install && pnpm build`
    *   **Start Command**: `pnpm start`
5.  **Environment Variables**:
    Add the variables from your `.env` file:
    *   `GOOGLE_GENAI_API_KEY`: `your-actual-api-key`
6.  Click **Deploy Web Service**.
7.  **Copy the URL** once deployed (e.g., `https://mkulima-backend.onrender.com`).

## 4. Step 3: Update Frontend API URL

Now that the backend is live, tell the frontend where to find it.

1.  Open `frontend/src/environments/environment.prod.ts` (create if missing) or update `frontend/src/app/services/api.ts`.
2.  In `frontend/src/app/services/api.ts`, change:
    ```typescript
    private baseUrl = 'https://mkulima-backend.onrender.com/api'; // Use your Render URL
    ```
    *(Ideally, use Angular environments for this, but direct edit works for quick start).*
3.  Commit and push this change to GitHub.

## 5. Step 4: Deploy Frontend (Vercel)

We will deploy the `frontend` folder as a static Angular app.

1.  Log in to **Vercel**.
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository.
4.  Configure the project:
    *   **Framework Preset**: Angular
    *   **Root Directory**: `frontend` (Important!)
5.  **Build Settings** (should auto-detect):
    *   **Build Command**: `ng build`
    *   **Output Directory**: `dist/mkulima-frontend/browser`
6.  Click **Deploy**.

## 6. Verification

1.  Open your Vercel URL (e.g., `https://mkulima-frontend.vercel.app`).
2.  Test the **Market** price feature (it should call your Render backend).
3.  Test **Diagnosis** and **Advice**.

## Troubleshooting

-   **Backend 500 Error**: Check Render logs. Likely missing API Key.
-   **CORS Error**: If frontend fails to call backend, you might need to update `backend/src/index.ts` to allow the Vercel domain in CORS settings:
    ```typescript
    app.use(cors({ origin: 'https://your-vercel-app.vercel.app' }));
    ```
