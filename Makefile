.DEFAULT_GOAL := help

.PHONY: help setup-root-env sync-root-env up down build logs restart-backend psql alembic-upgrade install-backend ruff-backend install-frontend dev-frontend

help: ## Mostrar esta ayuda
	@grep -E '^[a-zA-Z_-]+:.*?##' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-22s\033[0m %s\n", $$1, $$2}'

setup-root-env: ## Crear .env en la raíz desde .env.example (no sobrescribe si ya existe)
	@test -f .env && echo ".env ya existe en la raíz" || (cp .env.example .env && echo "Creado .env desde .env.example — edita POSTGRES_* para que coincidan con backend/.env")

sync-root-env: ## Crear/actualizar .env en la raíz con POSTGRES_* leídos de backend/.env (recomendado antes de make up)
	@test -f backend/.env || (echo "Falta backend/.env"; exit 1)
	@grep -E '^POSTGRES_(USER|PASSWORD|DB)=' backend/.env | tr -d '\r' > .env
	@echo ".env en la raíz actualizado desde backend/.env"

up: ## Levantar Postgres y API (docker compose up -d)
	@test -f .env || (echo "Falta .env en la raíz. Ejecuta: make sync-root-env (o make setup-root-env)"; exit 1)
	docker compose up -d

down: ## Parar contenedores (docker compose down)
	docker compose down

build: ## Construir imágenes Docker
	docker compose build

logs: ## Seguir logs de todos los servicios
	docker compose logs -f

restart-backend: ## Reiniciar solo el servicio backend
	docker compose restart backend

psql: ## psql interactivo en el contenedor optima-db (lee usuario y BD desde backend/.env)
	@docker exec -it optima-db psql -U $$(grep -E '^POSTGRES_USER=' backend/.env 2>/dev/null | cut -d= -f2- | tr -d '\r' || echo postgres) -d $$(grep -E '^POSTGRES_DB=' backend/.env 2>/dev/null | cut -d= -f2- | tr -d '\r' || echo optima_db)

alembic-upgrade: ## Aplicar migraciones Alembic (usa DATABASE_URL de backend/.env; en host suele ser localhost:5436)
	cd backend && uv run alembic upgrade head

install-backend: ## Instalar dependencias del backend (uv sync)
	cd backend && uv sync

ruff-backend: ## Ejecutar Ruff en el backend
	cd backend && uv run ruff check .

install-frontend: ## Instalar dependencias del frontend (bun)
	cd frontend && bun install

dev-frontend: ## Servidor de desarrollo Next.js
	cd frontend && bun run dev
