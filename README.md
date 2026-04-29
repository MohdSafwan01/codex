# Codex — Digital Products E-commerce Store

> **"Knowledge Worth Owning."**

A full-stack digital products e-commerce platform built with a warm editorial museum aesthetic. Codex is a curated store for ebooks, notes, and PDFs — designed to feel like walking through a living art museum that also sells things.

**CCCL Lab · Experiment No. 11 · Cloud Computing & Services**

---

## 📸 Tech Stack

| Layer | Technology | Service Model |
|-------|-----------|---------------|
| **Frontend** | React + Vite + Tailwind CSS v4 | — |
| **Backend** | Node.js + Express.js | — |
| **Database** | MongoDB Atlas | **DBaaS** |
| **Storage** | Cloudinary | **Storage as a Service** |
| **Auth** | JWT + bcrypt | **Security as a Service** |
| **Frontend Deploy** | Vercel | **PaaS** |
| **Backend Deploy** | Render | **PaaS / IaaS** |

---

## ☁️ Cloud Service Labels (for Lab Report)

### [IaaS] — Render Infrastructure
Render's virtual machine / container infrastructure hosts our Express.js server. We manage the application code; Render manages the hardware, networking, and operating system. This represents Infrastructure-as-a-Service — we get compute resources without managing physical servers.

### [PaaS] — Vercel + Render
Both Vercel (React frontend) and Render (Express backend) are Platform-as-a-Service providers. A simple `git push` triggers automatic deployment. No server provisioning, no DevOps configuration required. The platform handles scaling, SSL certificates, and infrastructure management.

### [DBaaS] — MongoDB Atlas
MongoDB Atlas is our Database-as-a-Service. It provides a fully managed, auto-scaled MongoDB cluster. No database administration needed — we simply connect via `MONGO_URI` in our environment variables. Atlas handles replication, backups, and scaling automatically.

### [Storage as a Service] — Cloudinary
Cloudinary is our Storage-as-a-Service provider. Product files (PDFs, ebooks) and cover images are stored in Cloudinary's CDN. Downloads are gated behind signed URLs with 60-second expiry for security. Cloudinary handles image transformation, optimization, and global CDN distribution.

### [Security as a Service] — JWT + bcrypt + Helmet
- **JWT tokens** authenticate all protected API routes (7-day expiry)
- **bcrypt** (salt rounds: 12) hashes all passwords — never stored in plaintext
- **Helmet.js** sets HTTP security headers (XSS protection, content type sniffing prevention, etc.)
- **express-rate-limit** prevents brute-force attacks (100 requests per 15 minutes per IP)
- **HTTPS** enforced automatically by Vercel and Render in production

---

## 🏗️ Project Structure

```
codex/
├── frontend/                    # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── effects/         # CustomCursor, MagneticButton, ScrollReveal, ProductCard3D
│   │   │   ├── layout/          # Navbar, Footer, MarqueeStrip
│   │   │   └── shared/          # CartSidebar, PurchaseAnimation
│   │   ├── context/             # AuthContext, CartContext
│   │   ├── hooks/               # useScrollReveal, useMagneticEffect, use3DTilt, useCountUp
│   │   ├── lib/                 # api.js (axios), utils.js
│   │   ├── pages/               # Landing, Products, Login, Register, Dashboard
│   │   ├── styles/              # animations.css
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css            # Design system (@theme tokens)
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/                     # Express.js API
│   ├── config/                  # db.js, cloudinary.js
│   ├── controllers/             # authController, productController, orderController, downloadController
│   ├── middleware/               # authMiddleware (JWT), uploadMiddleware (Multer+Cloudinary)
│   ├── models/                  # User, Product, Order
│   ├── routes/                  # auth, products, orders, download
│   ├── server.js
│   ├── seed.js
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js v18+ installed
- MongoDB Atlas account (free tier works)
- Cloudinary account (free tier works)

### Step 1: Clone & Install

```bash
# Backend
cd codex/backend
cp .env.example .env
# Fill in your .env values (see guides below)
npm install

# Frontend
cd ../frontend
npm install
```

### Step 2: Configure Environment Variables

Edit `backend/.env` with your credentials:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/codex
JWT_SECRET=your-super-secret-key-change-this
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Step 3: Seed the Database

```bash
cd backend
npm run seed
```

### Step 4: Run Both Servers

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:5000

---

## 🗄️ MongoDB Atlas Setup Guide

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) and create a free account
2. Create a new **Shared Cluster** (free tier M0)
3. Under **Database Access**, create a database user with password
4. Under **Network Access**, add `0.0.0.0/0` to allow all IPs (for development)
5. Click **Connect** → **Connect your application**
6. Copy the connection string and replace `<password>` with your database user's password
7. Add `codex` as the database name at the end: `.../codex?retryWrites=true&w=majority`
8. Paste into `MONGO_URI` in your `.env` file

---

## 📁 Cloudinary Setup Guide

1. Go to [cloudinary.com](https://cloudinary.com) and create a free account
2. From the **Dashboard**, copy:
   - Cloud Name → `CLOUDINARY_CLOUD_NAME`
   - API Key → `CLOUDINARY_API_KEY`
   - API Secret → `CLOUDINARY_API_SECRET`
3. Paste these into your `.env` file

---

## 🌐 Deployment Guides

### Vercel (Frontend — PaaS)

1. Push your `frontend/` code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Set the **Root Directory** to `frontend`
4. Set **Build Command**: `npm run build`
5. Set **Output Directory**: `dist`
6. Add environment variable: `VITE_API_URL` = your Render backend URL
7. Click **Deploy** — Vercel auto-builds and deploys on every push

### Render (Backend — PaaS/IaaS)

1. Push your `backend/` code to a GitHub repository
2. Go to [render.com](https://render.com) and create a new **Web Service**
3. Connect your GitHub repo
4. Set the **Root Directory** to `backend`
5. Set **Build Command**: `npm install`
6. Set **Start Command**: `node server.js`
7. Add all environment variables from `.env`
8. Click **Create Web Service** — Render auto-deploys on push

---

## 🔌 API Reference

| Method | Endpoint | Auth | Description |
|--------|---------|------|-------------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login user |
| GET | `/api/auth/me` | Yes | Get current user |
| GET | `/api/products` | No | List all products |
| GET | `/api/products/:id` | No | Get single product |
| POST | `/api/products` | Yes | Create product (admin) |
| POST | `/api/orders/purchase` | Yes | Purchase products |
| GET | `/api/orders/my-purchases` | Yes | Get user's purchases |
| GET | `/api/download/:productId` | Yes | Get download URL |

---

## 🎨 Design System

- **Palette**: Ink (#0d0b08), Parchment (#f5efe0), Ochre (#c8852a), Burgundy (#6b1e2e), Cream (#faf7f2), Mist (#e8e0d5), Gold (#d4a847)
- **Typography**: Playfair Display (headings), Inter (body), Space Mono (prices/labels)
- **Aesthetic**: Warm editorial museum — Criterion Collection × A24 × antiquarian bookshop

---

## 📄 License

Built for CCCL Lab Experiment No. 11 — Cloud Computing & Services.
