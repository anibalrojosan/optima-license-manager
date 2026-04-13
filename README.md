# 📈 Optima - FinOps License Manager

[![Python](https://img.shields.io/badge/Python-3.12+-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Pydantic](https://img.shields.io/badge/Pydantic-v2-E92063?style=flat-square&logo=pydantic&logoColor=white)](https://docs.pydantic.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![SQLModel](https://img.shields.io/badge/SQLModel-ORM-2962FF?style=flat-square)](https://sqlmodel.tiangolo.com/)
[![Alembic](https://img.shields.io/badge/Alembic-migraciones-A4373A?style=flat-square)](https://alembic.sqlalchemy.org/)
[![uv](https://img.shields.io/badge/uv-package_manager-261230?style=flat-square)](https://docs.astral.sh/uv/)
[![Ruff](https://img.shields.io/badge/Ruff-linter-261230?style=flat-square)](https://docs.astral.sh/ruff/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white)](https://docs.docker.com/compose/)

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-package_manager-000000?style=flat-square&logo=bun&logoColor=white)](https://bun.sh/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

> **Estado del proyecto:** En desarrollo. La **Fase 1** (cimientos, i18n, API base, PostgreSQL y migraciones) está **cerrada**. El trabajo actual se encuadra en la **Fase 2: autenticación y seguridad**, según el [ROADMAP](./docs/ROADMAP.md).
>
> Puedes revisar el [DEVLOG](docs/development/DEVLOG.md) para seguir el progreso diario, las decisiones técnicas y la evolución del proyecto.

## Índice

- [Descripción](#descripción)
- [📦 Estructura del repositorio](#estructura-del-repositorio)
- [📚 Documentación](#documentación)
- [🛠️ Stack tecnológico](#stack-tecnológico)

## Descripción

**Optima** es una plataforma de FinOps (Financial Operations) diseñada para la gestión inteligente, optimización y auditoría de licencias de software y costos en la nube.

El objetivo principal es transformar la gestión de activos digitales de una tarea administrativa reactiva a una estrategia financiera proactiva, eliminando el "gasto zombie" y centralizando la visibilidad de costos.



## Estructura del repositorio

```text
optima-license-manager/
├── backend/                 # API FastAPI (uv, SQLModel, Alembic)
│   ├── app/                 # Código de la aplicación (api, core, models, schemas, services)
│   ├── alembic/             # Migraciones de base de datos
│   ├── pyproject.toml       # Dependencias y herramientas (uv)
│   └── Dockerfile           # Configuración de contenedor
├── frontend/                # Aplicación Next.js (Bun, next-intl, Tailwind)
│   ├── src/                 # App Router, componentes, i18n, mocks (MSW)
│   └── package.json         # Dependencias de Node.js
├── docs/                    # PRD, arquitectura, contratos de API, roadmap, DEVLOG
├── docker-compose.yml       # Postgres + servicio backend
├── Makefile                 # Comandos frecuentes (Docker, Alembic, lint)
└── .env.example             # Plantilla de POSTGRES_* para interpolación de Compose (raíz)
```

## Documentación

Para entender en detalle la visión, arquitectura y diseño del sistema, consulta los siguientes documentos:

- [PRD](./docs/PRD.md): Objetivos, User Stories y alcance del MVP.
- [ARCHITECTURE](./docs/ARCHITECTURE.md): Stack tecnológico y flujo de datos.
- [DATABASE](./docs/DATABASE.md): Modelo Entidad-Relación y reglas de integridad.
- [DESIGN SYSTEM](./docs/design/DESIGN_SYSTEM.md): Componentes UI y estilos.
- [ROADMAP](./docs/ROADMAP.md): Fases de desarrollo e hitos.
- [USER FLOWS](./docs/design/USER_FLOWS.md): Flujos de usuario y casos de uso.

## Stack tecnológico

| Categoría | Backend (Python) | Frontend (Next.js) |
| :--- | :---: | :---: |
| **Framework** | `FastAPI` | `Next.js 14+ (App Router)` |
| **Lenguaje** | `Python 3.12+` | `TypeScript` |
| **Validación / Estado** | `Pydantic v2` | `TanStack Query` |
| **Persistencia / UI** | `SQLModel (PostgreSQL)` | `Tailwind CSS` + `shadcn/ui` |
| **Testing** | `Pytest` | `Vitest` + `Playwright` |
| **Visualización** | - | `Recharts` |
| **Gestor de Paquetes** | `uv` | `Bun` |
| **Linting & Formatting** | `Ruff` | `Biome` |

---

> Hecho con ❤️ por [Aníbal Rojo](https://github.com/anibalrojosan) y [Fernando Arriagada](https://github.com/Fernandodesign96).
