# React.js + FastAPI JWT Authentication Starter

Full-stack starter with React (Vite) frontend and FastAPI backend with JWT auth (SQLAlchemy + SQLite).

## Features
- User registration & login
- JWT bearer tokens
- Protected `/users/me` endpoint
- CORS enabled for frontend
- Simple React login UI

## Quick Start

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\\Scripts\\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
API docs: http://localhost:8000/docs

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:5173

## GitHub Workflow (Pull / Push)

```bash
# Clone (first time)
git clone https://github.com/thanh54833/react-fastapi-auth.git
cd react-fastapi-auth

# Pull latest
git pull origin main

# Make changes, then push
git add .
git commit -m "your message"
git push origin main
```

## Default Test
1. Register a user via the form or POST `/register`
2. Login to get token
3. Token is stored in localStorage and used for protected calls

Change `SECRET_KEY` in production!
