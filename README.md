# ✂️ Snip — URL Shortener

A fast, lightweight URL shortener with click analytics, custom aliases, and link expiry. Built with Node.js, Express, and PostgreSQL.

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-black?style=flat-square&logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?style=flat-square&logo=postgresql)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)
![Hosted on Vercel](https://img.shields.io/badge/Frontend-Vercel-black?style=flat-square&logo=vercel)
![Hosted on HuggingFace](https://img.shields.io/badge/Backend-HuggingFace_Spaces-FFD21E?style=flat-square&logo=huggingface&logoColor=black)
![DB on Neon](https://img.shields.io/badge/Database-Neon-00E5B0?style=flat-square)

---

## 🚀 Live Demo

🔗 [snip-url-alpha.vercel.app](https://snip-url-alpha.vercel.app)

## 📸 Preview

![UI Preview](assets/preview.webp)

---

## 🛠️ Tech Stack

| Layer | Technology | Hosted On |
|-------|-----------|-----------|
| Frontend | HTML, CSS, JavaScript | [Vercel](https://vercel.com) (free) |
| Backend | Node.js + Express | [Hugging Face Spaces](https://huggingface.co/spaces) (free) |
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

### 2. Backend (Hugging Face Spaces)
**Files Used:** `server/`, `Dockerfile`, `package.json`
- **Action:** Create a new Space on [Hugging Face](https://huggingface.co/spaces) with **Docker** SDK. The GitHub Action (`.github/workflows/deploy-hf.yml`) auto-deploys on every push to `main`.
- **Environment Variables (add as Secrets/Variables in Space settings):**
    - `DATABASE_URL`: Your Neon connection string (secret).
    - `BASE_URL`: Your HF Space URL (e.g., `https://username-snip-url-backend.hf.space`).
    - `CORS_ORIGIN`: Your Frontend URL (e.g., `https://snip.vercel.app`).
- **Result:** You get a Backend URL (e.g., `https://username-snip-url-backend.hf.space`).

### 3. Frontend (Vercel)
**Files Used:** `client/`
- **Action:**
    1. Update `client/app.js`: Set `const API_BASE_URL` to your Hugging Face Space backend URL.
    2. Deploy the `client` folder to [Vercel](https://vercel.com).
- **Result:** You get a live Frontend URL.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.
