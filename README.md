# 🎬 MovieWebApp

A modern **full-stack Movie Web Application** that allows users to manage their personal movie collections.  
Built with a **Flask REST API backend** and a **React (Vite) frontend**, focusing on clean architecture, scalability, and a smooth user experience.

---

## ✨ Features

- 👤 Create and manage multiple user profiles
- 🎥 Add favorite movies by title (powered by OMDb API)
- 🖼 Automatic movie metadata & poster fetching
- ✏ Update movie titles
- 🗑 Delete movies with confirmation
- ⚡ Fast JSON-based REST API
- 🌙 Modern, responsive React UI (desktop & mobile)
- 🔌 Clean separation of frontend & backend

---

## 🛠 Tech Stack

| Technology | Purpose |
|---------|---------|
| **Python** | Core backend logic |
| **Flask** | REST API framework |
| **Flask-SQLAlchemy** | ORM & database management |
| **SQLite** | Persistent data storage |
| **OMDb API** | Movie metadata & posters |
| **Flask-CORS** | Cross-origin API access |

---

## 🚀 Installation & Setup

### Clone repository
```bash
git clone https://github.com/ilyassuelen/MovieWebApp.git
cd MovieWebApp
```

## 1. Backend setup:
- cd backend
- python -m venv .venv
- source .venv/bin/activate
- pip install -r requirements.txt

---

### Create .env:
- OMDB_API_KEY=your_api_key_here

### Start backend:
- python app.py

### Backend runs on:
👉 http://localhost:5001

## 2. Frontend setup:
- cd frontend
- npm install
- npm run dev

### Create frontend/.env:
- VITE_API_BASE_URL=http://localhost:5001

### Frontend runs on:
👉 http://localhost:5173

---

## 🔗 Author

Ilyas Sülen
Aspiring AI Engineer & Backend Developer.
Passionate about Python, APIs, and building clean, scalable systems.

GitHub: github.com/ilyassuelen
LinkedIn: linkedin.com/in/ilyas-suelen
