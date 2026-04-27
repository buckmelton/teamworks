# Backend (FastAPI)

## Prerequisites
- Python 3.11+ (3.10+ also works)

## Setup
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Run
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Endpoints
- `GET /health`
- `GET /api/hello`
