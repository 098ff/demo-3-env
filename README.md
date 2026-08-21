# Vercel 3‑Environment Proof‑of‑Concept

A minimal **Next.js** app that demonstrates how a single repo with **3 branches** can be deployed as **3 distinct environments** on Vercel. Each branch renders a visually different page so you can immediately tell which environment you're on.

| Branch | Environment | Background | Badge |
|--------|-------------|------------|-------|
| `develop` | Development | 🟢 Teal gradient | `Development (DEV)` |
| `preprod` | Pre-Production | 🟡 Amber gradient | `Pre-Production (PRE)` |
| `main` | Production | 🔵 Slate gradient | `Production (PROD)` |

---

## Prerequisites
- A **GitHub** account with the repo pushed (3 branches: `main`, `develop`, `preprod`)
- A **Vercel** account (free tier works) — sign up at [vercel.com](https://vercel.com)

---

## Step-by-Step: Deploy to Vercel

### Step 1 — Import the Project (Production)
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select the GitHub repo (e.g. `098ff/demo-3-env`)
4. Vercel auto-detects **Next.js** — leave all defaults as-is
5. **ไม่ต้องเพิ่ม Environment Variables** — โค้ดมี default ฝังไว้แล้ว
6. Click **"Deploy"**

> ✅ Vercel จะ deploy branch `main` เป็น **Production** ให้อัตโนมัติ  
> คุณจะเห็นหน้า **🔵 Production (PROD)** พื้นหลังสีเทาเข้ม (slate)  
> URL: `https://<project-name>.vercel.app`

---

### Step 2 — Trigger Preview Deployments (develop & preprod)

> ⚠️ **สำคัญ**: Vercel จะ deploy เฉพาะ branch ที่มีการ push **หลังจาก** ที่ import project แล้วเท่านั้น  
> ถ้า branch `develop` และ `preprod` ถูก push ไปก่อนหน้า → Vercel จะยังไม่เห็น → ต้อง trigger ด้วยการ push commit ใหม่

#### วิธี trigger: push empty commit ไปที่แต่ละ branch

```bash
# Trigger preprod preview deployment
git checkout preprod
git commit --allow-empty -m "chore: trigger vercel preview deploy"
git push origin preprod

# Trigger develop preview deployment
git checkout develop
git commit --allow-empty -m "chore: trigger vercel preview deploy"
git push origin develop
```

#### ดูผลบน Vercel
1. เปิด **Vercel Dashboard → Project → Deployments** tab
2. จะเห็น deployment ใหม่ 2 รายการ (status: Building → Ready)
3. คลิกที่แต่ละ deployment เพื่อเปิด Preview URL

| Deployment | Branch | Status | สิ่งที่เห็น |
|------------|--------|--------|------------|
| Production | `main` | ✅ มีอยู่แล้ว | 🔵 Slate — **Production (PROD)** |
| Preview | `preprod` | 🔄 ต้อง trigger | 🟡 Amber — **Pre-Production (PRE)** |
| Preview | `develop` | 🔄 ต้อง trigger | 🟢 Teal — **Development (DEV)** |

---

### Step 3 — ดู Preview URL ของแต่ละ branch

ไปที่ **Vercel Dashboard → Deployments tab** แล้วจะเห็น deployment list:

1. **คลิกที่ deployment** ของ branch `preprod` → จะเห็น Preview URL เช่น:
   ```
   https://demo-3-env-git-preprod-<your-username>.vercel.app
   ```
   เปิด URL นี้จะเห็นหน้า **🟡 Pre-Production (PRE)** พื้นหลังสีเหลืองอำพัน

2. **คลิกที่ deployment** ของ branch `develop` → จะเห็น Preview URL เช่น:
   ```
   https://demo-3-env-git-develop-<your-username>.vercel.app
   ```
   เปิด URL นี้จะเห็นหน้า **🟢 Development (DEV)** พื้นหลังสีเขียวน้ำเงิน (teal)

3. **Production URL** (branch `main`):
   ```
   https://demo-3-env.vercel.app
   ```
   เปิด URL นี้จะเห็นหน้า **🔵 Production (PROD)** พื้นหลังสีเทาเข้ม

---

### Step 4 — (Optional) Set Environment Variables per Environment

ถ้าต้องการให้แต่ละ environment มีค่า `NEXT_PUBLIC_API_URL` ต่างกัน:

1. ไปที่ **Project Settings → Environment Variables**
2. เพิ่ม `NEXT_PUBLIC_API_URL` โดยเลือก Environment ที่ต้องการ:

| Variable | Environment Target | Value |
|----------|-------------------|-------|
| `NEXT_PUBLIC_API_URL` | **Production** | `https://api.example.com` |
| `NEXT_PUBLIC_API_URL` | **Preview** | `https://pre-api.example.com` |
| `NEXT_PUBLIC_API_URL` | **Development** | `https://dev-api.example.com` |

> ไม่จำเป็นสำหรับ POC นี้ — โค้ดมี default value ฝังไว้แล้ว  
> แต่ใน production จริงๆ ควรตั้ง env vars ผ่าน Vercel dashboard

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

> **Note**: Vercel มีแค่ 2 deployment types: **Production** (1 branch) กับ **Preview** (ทุก branch อื่น)  
> ทั้ง `develop` และ `preprod` เป็น Preview deployment แต่ได้ URL คนละอัน  
> ความแตกต่างอยู่ที่โค้ดใน `page.js` ของแต่ละ branch ที่แสดง UI ต่างกัน

---

## How It Works (ทำไมแต่ละ env ถึงดูต่างกัน)

แต่ละ branch มีไฟล์ `app/page.js` ที่ **hardcode** สี background และ label ไว้ต่างกัน:

| Branch | Gradient | Badge Color | Label |
|--------|----------|------------|-------|
| `develop` | `#0d9488 → #115e59` (teal) | `#14b8a6` | 🟢 Development (DEV) |
| `preprod` | `#d97706 → #92400e` (amber) | `#f59e0b` | 🟡 Pre-Production (PRE) |
| `main` | `#334155 → #0f172a` (slate) | `#64748b` | 🔵 Production (PROD) |

เมื่อ Vercel deploy แต่ละ branch → มัน build โค้ดจาก branch นั้นๆ → UI จึงต่างกันโดยอัตโนมัติ

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
