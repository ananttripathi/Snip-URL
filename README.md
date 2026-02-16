# ✂️ Snip — URL Shortener

A fast, lightweight URL shortener with click analytics, custom aliases, and link expiry. Built with Node.js, Express, and PostgreSQL.

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-black?style=flat-square&logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?style=flat-square&logo=postgresql)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)
![Hosted on Vercel](https://img.shields.io/badge/Frontend-Vercel-black?style=flat-square&logo=vercel)
![Hosted on Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=flat-square&logo=render)
![DB on Neon](https://img.shields.io/badge/Database-Neon-00E5B0?style=flat-square)

---

## 📸 Demo

![UI Preview](assets/preview.webp)

---

## 🛠️ Tech Stack

| Layer | Technology | Hosted On |
|-------|-----------|-----------|
| Frontend | HTML, CSS, JavaScript | [Vercel](https://vercel.com) (free) |
| Backend | Node.js + Express | [Render](https://render.com) (free) |
| Database | PostgreSQL | [Neon](https://neon.tech) (free) |

---

## 📁 Project Structure

```
snip/
├── client/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── server/
│   ├── index.js         # Entry point
│   ├── routes/
│   │   └── url.js       # API routes
│   ├── controllers/
│   │   └── urlController.js
│   └── db/
│       ├── index.js     # DB connection
│       └── schema.sql   # Table definitions
├── assets/
│   └── preview.webp     # UI Demo
├── .env.example
├── .gitignore
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [PostgreSQL](https://www.postgresql.org/) v15+

### Installation

1. **Navigate to the project directory**

```bash
cd snip
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env
```

Then fill in your `.env` file:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/snip
BASE_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000
```

4. **Set up the database**

```bash
psql -U your_user -d snip -f server/db/schema.sql
```

5. **Start the server**

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🗺️ Deployment Map: Where to Upload What

This project is optimized for a 100% free stack. Here is the exact mapping:

### 1. Database (Neon.tech)
**Files Used:** `server/db/schema.sql`
- **Action:** Copy the content of `server/db/schema.sql` and run it in the [Neon](https://neon.tech) SQL Editor to create your table.
- **Result:** You get a `DATABASE_URL` (connection string).

### 2. Backend (Render.com)
**Files Used:** `server/`, `package.json`
- **Action:** Connect your GitHub repo to [Render](https://render.com) as a "Web Service".
- **Environment Variables:**
    - `DATABASE_URL`: Your Neon connection string.
    - `CORS_ORIGIN`: Your Frontend URL (e.g., `https://snip.vercel.app` - add this after deploying frontend).
- **Result:** You get a Backend URL (e.g., `https://snip.onrender.com`).

### 3. Frontend (Vercel)
**Files Used:** `client/`
- **Action:**
    1. Update `client/app.js`: Set `const API_BASE_URL` to your new Render Backend URL.
    2. Deploy the `client` folder to [Vercel](https://vercel.com).
- **Result:** You get a live Frontend URL.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.
