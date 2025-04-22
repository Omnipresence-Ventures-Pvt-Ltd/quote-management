# 💬 Saved Quotes App

A minimal fullstack application to manage saved quotes for products, built with **Next.js**, **Tailwind CSS**, and a **Node.js/Express** backend.

---

## 🚀 How to Run the Application

### 1. Install dependencies:

```bash
npm install
```

### 2. Start the frontend development server:

```bash
npm run dev
```

### 3. Start the backend server in a separate terminal:

```bash
npm run server
```

- Frontend runs at: [http://localhost:3000](http://localhost:3000)
- Backend runs at: [http://localhost:3001](http://localhost:3001)

---

## ✨ Application Features

### 🔮 Frontend (Next.js + Tailwind CSS)

- List view of all saved quotes
- Form to add new quotes (with multiple products per quote)
- Edit existing quotes
- Delete quotes
- Styled with Tailwind CSS

### 🛠️ Backend (Node.js + Express)

- RESTful API with basic CRUD operations
- In-memory data storage (no database)
- JWT authentication stub (placeholder)
- Modular Express setup

---

## 🗂 Project Structure

```plaintext
saved-quotes-app/
├── components/              # Reusable React components
│   └── QuoteForm.tsx
├── pages/                   # Next.js routing
│   ├── _app.tsx
│   ├── index.tsx
│   └── quotes/
│       ├── [id].tsx         # Edit/View quote page
│       └── new.tsx          # Add new quote
├── server/                  # Express backend
│   └── index.js
├── styles/
│   └── globals.css          # Tailwind + global styles
├── types/                   # TypeScript types
│   └── index.ts
├── utils/                   # API interaction helpers
│   └── api.ts
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## 🧪 Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **Auth**: JWT (stub only for now)
- **Storage**: In-memory (no database)

---
