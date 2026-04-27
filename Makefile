BACKEND_PORT ?= 8000

.PHONY: dev-backend dev-frontend

dev-backend:
	cd backend && uvicorn app.main:app --reload --host 0.0.0.0 --port $(BACKEND_PORT)

dev-frontend:
	cd frontend && npm run dev
