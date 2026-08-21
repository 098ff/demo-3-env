# Vercel 3‑Environment Proof‑of‑Concept

A minimal **Next.js** app that demonstrates how a single codebase can run with three distinct Vercel environments (Development, Preview, Production) using a generic environment variable `NEXT_PUBLIC_API_URL`.

## What You’ll See
The home page displays:
- The current Vercel environment (`development`, `preview`, or `production`).
- The value of `NEXT_PUBLIC_API_URL` for that environment.

## Repository Structure
```
cbc-demo-3-env/
├─ .git/                 # Git repository (auto‑initialized)
├─ .gitignore           
├─ .env.development      # Local dev env variables
├─ .env.preview          # Local preview env variables
├─ .env.production       # Local production env variables
├─ app/
│  └─ page.js           # Main page (environment demo)
├─ README.md            # This file
├─ package.json
└─ ...
```

## Prerequisites
- **Node.js** ≥ 18 (LTS) – includes npm.
- A **Vercel** account (free tier works).
- Git installed for version control.

## Local Development
1. **Open the folder**
   ```bash
   cd /Users/098f/Desktop/cbc-demo-3-env
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run the app**
   ```bash
   npm run dev   # uses .env.development automatically
   ```
   Open <http://localhost:3000>. You should see the Development label and the API URL set in `.env.development`.

### Switching Environments Locally
Next.js picks the env file based on the `NODE_ENV` value:
- `development` → `.env.development`
- `preview` (you can simulate) → set `VERCEL_ENV=preview` and run `npm run dev`.
- `production` → set `VERCEL_ENV=production` and run `npm run build && npm start`.

## Environment Files
Create the three files (already provided) with your own API endpoints:
```dotenv
# .env.development
NEXT_PUBLIC_API_URL=https://dev.example.com/api
```
```dotenv
# .env.preview
NEXT_PUBLIC_API_URL=https://preview.example.com/api
```
```dotenv
# .env.production
NEXT_PUBLIC_API_URL=https://prod.example.com/api
```
These files are ignored by Git (`.gitignore` contains `.env*`).

## Deploying to Vercel
1. **Create a new Vercel project** and point it at the folder `cbc-demo-3-env`.
2. **Link a Git provider** (GitHub, GitLab, Bitbucket). Push the repo to a remote branch – Vercel will automatically create a preview deployment for each PR/branch.
3. **Configure Environment Variables** in Vercel:
   - Go to **Project Settings → Environment Variables**.
   - Add `NEXT_PUBLIC_API_URL` three times – once for **Development**, once for **Preview**, and once for **Production**.
   - Use the same values you placed in the local `.env.*` files (or any values you need).
4. **Deploy**
   - Vercel runs `npm install && npm run build` automatically.
   - The production URL (`https://<project>.vercel.app`) will show the Production label and its API URL.
   - Preview URLs (`https://<branch>-<hash>.vercel.app`) will show the Preview label.

## Verifying the Environments
| Environment | How to verify locally | Vercel URL example |
|-------------|----------------------|-------------------|
| Development | `npm run dev` (uses `.env.development`) | `vercel dev` (CLI) |
| Preview | Set `VERCEL_ENV=preview` and run `npm run dev` | `https://<branch>-<hash>.vercel.app` |
| Production | `npm run build && npm start` (uses `.env.production`) | `https://<project>.vercel.app` |

## Git Workflow (Selective Release Strategy)
The repository follows the **Selective Release** branching model you provided:
- **develop** – ongoing development. Feature branches: `feat/<TEAM_ID>_BSL_<TASK_ID>`.
- **preprod** – UAT stage. Branches: `pp/<TEAM_ID>_BSL_<TASK_ID>` (Cherry‑pick from `develop`).
- **main** – production. Branches: `prod/<TEAM_ID>_BSL_<TASK_ID>` (Cherry‑pick from `preprod`).

All merges to `develop`, `preprod`, or `main` must go through Pull Requests. Direct pushes are prohibited.

## Styling & Aesthetics
The page uses:
- **Inter** font via Google Fonts (loaded automatically by Next.js).
- A dark‑mode friendly gradient background.
- Glass‑morphism cards with subtle blur (`backdrop-filter`).
- Responsive layout that works on mobile and desktop.

Feel free to tweak `styles/globals.css` or replace the inline styles with Tailwind/CSS modules.

## Next Steps (Optional Enhancements)
- Convert the project to **TypeScript** (`npx create-next-app@latest --ts`).
- Add server‑side API routes that consume secret env vars (no `NEXT_PUBLIC_` prefix).
- Write unit tests with **Jest** or end‑to‑end tests with **Cypress**.
- Integrate the git workflow automation (GitHub Actions) to enforce the branching policy.

---
## License
MIT – free to use, modify, and deploy.
