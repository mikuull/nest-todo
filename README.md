# 💻 Task Manager - Next.js + NestJS + Prisma 

This repository contains a simple full-stack task management application. The goal of this project was learning NestJS fundamentals. It was built with:

- Next.js (frontend)  
- NestJS (backend API)  
- Prisma ORM (database)

---

## 🔧 Features

- CRUD operations for tasks  
- Filtering tasks by completion status  
- React Query for data fetching and mutations  
- Monorepo setup with Turborepo

---

## ☕ Setup

### Prerequisites

- Node.js >= 18.x  
- pnpm or yarn

### Environment Variables

Create a `.env` file in the `apps/api` folder (or in the root if your setup requires) with the following:

- `DATABASE_URL="YOUR POSTGRESQL DATABASE URL"`

---


## 🚀 Install dependencies

**In root (if using Turborepo):**

```bash
pnpm install
```

**Or separately:**
```bash
cd apps/api
pnpm install

cd ../web
pnpm install
```

---

## 🔥 Development

### Run backend (NestJS API)

```bash
cd apps/api
pnpx prisma generate
pnpm run start:dev
```

### Run frontend (Next.js)

```bash
cd apps/web
pnpm run dev
```

---

## 🤖 TODO:

- [ ] Add user authentication 
- [ ] Make tasks align to specific users


### 💫 Feel free to reach out if you have any questions or issues!
