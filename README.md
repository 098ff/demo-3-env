# Vercel 3‑Environment Proof‑of‑Concept

A minimal **Next.js** app that demonstrates how a single repo with **3 branches** can be deployed as **3 distinct environments** on Vercel. Each branch renders a visually different page so you can immediately tell which environment you're on.

| Branch | Environment | Background | Badge |
|--------|-------------|------------|-------|
| `develop` | Development | 🟢 Teal gradient | `Development (DEV)` |
| `preprod` | Pre-Production | 🟡 Amber gradient | `Pre-Production (PRE)` |
| `main` | Production | 🔵 Slate gradient | `Production (PROD)` |

---

## Prerequisites
- A **GitHub** account with the repo: `https://github.com/098ff/demo-3-env`
- A **Vercel** account (free tier works) — sign up at [vercel.com](https://vercel.com)

---

## Step-by-Step: Deploy to Vercel

### Step 1 — Import the Project
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select the GitHub repo **`098ff/demo-3-env`**
4. Vercel auto-detects **Next.js** — leave all defaults as-is
5. Click **"Deploy"**

> After this step, Vercel deploys the `main` branch as **Production**.  
> You should see the **🔵 Production (PROD)** page with a slate background.

---

### Step 2 — Set the Production Branch
1. Go to **Project Settings → Git**
2. Under **"Production Branch"**, make sure it is set to **`main`**
3. Click **Save**

> This ensures only `main` is treated as Production.

---

### Step 3 — (Optional) Set Environment Variables per Environment
1. Go to **Project Settings → Environment Variables**
2. Add `NEXT_PUBLIC_API_URL` with different values for each environment:

| Variable | Environment Target | Value |
|----------|-------------------|-------|
| `NEXT_PUBLIC_API_URL` | **Production** | `https://api.example.com` |
| `NEXT_PUBLIC_API_URL` | **Preview** | `https://pre-api.example.com` |
| `NEXT_PUBLIC_API_URL` | **Development** | `https://dev-api.example.com` |

> When adding, use the **Environment** checkboxes to pick which target (Production / Preview / Development) each value applies to.

---

### Step 4 — Trigger Deployments for Each Branch

#### 4a. Production (`main`) — Already Deployed
- The initial import already deployed `main` as production.
- **URL**: Your project's primary domain, e.g. `https://demo-3-env.vercel.app`
- You should see: **🔵 Production (PROD)** with a slate background.

#### 4b. Pre-Production (`preprod`) — Preview Deployment
Any branch that is **not** the production branch is treated as a **Preview** deployment by Vercel. To trigger it:

1. Go to GitHub → repo **demo-3-env**
2. The `preprod` branch is already pushed.
3. Go to Vercel dashboard → your project → **"Deployments"** tab.
4. If `preprod` hasn't been deployed yet, you can trigger it by:
   - Pushing a small commit to `preprod`, **OR**
   - Going to **Vercel Dashboard → Project → Settings → Git** and clicking **"Redeploy"** for the `preprod` branch, **OR**
   - Using the Vercel CLI: `vercel --force` (while on the `preprod` branch)
5. Vercel will create a **Preview URL** like: `https://demo-3-env-git-preprod-098ffs-projects.vercel.app`
6. You should see: **🟡 Pre-Production (PRE)** with an amber background.

#### 4c. Development (`develop`) — Preview Deployment
Same process as `preprod`:

1. The `develop` branch is already pushed.
2. Trigger a deployment by pushing a commit or redeploying from the dashboard.
3. Vercel will create a **Preview URL** like: `https://demo-3-env-git-develop-098ffs-projects.vercel.app`
4. You should see: **🟢 Development (DEV)** with a teal background.

---

## How Vercel Maps Branches to Environments

```
┌──────────────┐     ┌─────────────────────────┐     ┌──────────────────────┐
│  main branch │────▶│  Production Environment │────▶│  demo-3-env.vercel.app│
└──────────────┘     └─────────────────────────┘     └──────────────────────┘

┌──────────────┐     ┌─────────────────────────┐     ┌─────────────────────────────────────┐
│preprod branch│────▶│  Preview Environment    │────▶│  demo-3-env-git-preprod-xxx.vercel.app│
└──────────────┘     └─────────────────────────┘     └─────────────────────────────────────┘

┌──────────────┐     ┌─────────────────────────┐     ┌─────────────────────────────────────┐
│develop branch│────▶│  Preview Environment    │────▶│  demo-3-env-git-develop-xxx.vercel.app│
└──────────────┘     └─────────────────────────┘     └─────────────────────────────────────┘
```

> **Note**: Vercel has only 2 deployment types: **Production** (one branch) and **Preview** (all other branches). Both `develop` and `preprod` are Preview deployments but get unique URLs.

---

## Verifying All 3 Environments Are Working

| What to check | Expected result |
|---------------|-----------------|
| Open the **production URL** (`demo-3-env.vercel.app`) | 🔵 Slate background, label says **Production (PROD)**, branch shows **main** |
| Open the **preprod preview URL** | 🟡 Amber background, label says **Pre-Production (PRE)**, branch shows **preprod** |
| Open the **develop preview URL** | 🟢 Teal background, label says **Development (DEV)**, branch shows **develop** |

---

## Running Locally

```bash
# Clone the repo
git clone https://github.com/098ff/demo-3-env.git
cd demo-3-env

# Install dependencies
npm install

# Run each branch locally:

# Development
git checkout develop && npm run dev
# → Open http://localhost:3000 → 🟢 Teal (DEV)

# Pre-Production
git checkout preprod && npm run dev
# → Open http://localhost:3000 → 🟡 Amber (PRE)

# Production
git checkout main && npm run dev
# → Open http://localhost:3000 → 🔵 Slate (PROD)
```

---

## Git Workflow (Selective Release Strategy)

| Environment | Main Branch | Feature Branch Pattern | Promotion Method |
|-------------|-------------|----------------------|-----------------|
| Development | `develop` | `feat/<TEAM_ID>_BSL_<TASK_ID>` | PR into `develop` |
| Pre-Production | `preprod` | `pp/<TEAM_ID>_BSL_<TASK_ID>` | Cherry-pick → PR into `preprod` |
| Production | `main` | `prod/<TEAM_ID>_BSL_<TASK_ID>` | Cherry-pick → PR into `main` |

### Tagging Policy
- **Pre-Production**: `vX.Y.Z-rc.N` (e.g. `v1.0.0-rc.1`)
- **Production**: `vX.Y.Z` (e.g. `v1.0.0`) — immutable, one tag per version

---

## License
MIT
