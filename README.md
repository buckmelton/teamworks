# Teamworks Fullstack Boilerplate

Minimal monorepo-style starter with:
- `backend/`: FastAPI service
- `frontend/`: React + TypeScript app built with Vite

## Prerequisites
- Python 3.11+ (3.10+ works)
- Node.js 20+ recommended

## Quickstart

### 1) Backend
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 2) Frontend (new terminal)
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Smoke Test
- Open `http://localhost:5173`
- Verify the page shows the response from `GET http://localhost:8000/api/hello`
