# 📈 Optima - FinOps License Manager 

> **Estado del proyecto:** Este proyecto esta en fase de desarrollo. Actualmente en **FASE 1: Cimientos e Internacionalización**.
>
> Puedes revisar el [DEVLOG](docs/development/DEVLOG.md) para seguir el progreso diario, las decisiones técnicas y la evolución del proyecto.

**Optima** es una plataforma de FinOps (Financial Operations) diseñada para la gestión inteligente, optimización y auditoría de licencias de software y costos en la nube.

El objetivo principal es transformar la gestión de activos digitales de una tarea administrativa reactiva a una estrategia financiera proactiva, eliminando el "gasto zombie" y centralizando la visibilidad de costos.

## 📚 Documentación

Para entender en detalle la visión, arquitectura y diseño del sistema, consulta los siguientes documentos:

- [PRD](./docs/PRD.md): Objetivos, User Stories y alcance del MVP.
- [ARCHITECTURE](./docs/ARCHITECTURE.md): Stack tecnológico y flujo de datos.
- [DATABASE](./docs/DATABASE.md): Modelo Entidad-Relación y reglas de integridad.
- [ROADMAP](./docs/ROADMAP.md): Fases de desarrollo y hitos.

## 🛠️ Tech Stack

| Categoría | Backend (Python) | Frontend (Next.js) |
| :--- | :--- | :--- |
| **Core Framework** | `FastAPI` | `Next.js 14+ (App Router)` |
| **Lenguaje** | `Python 3.12+` | `TypeScript` |
| **Validación / Estado** | `Pydantic v2` | `TanStack Query` |
| **Persistencia / UI** | `SQLModel (PostgreSQL)` | `Tailwind CSS` + `shadcn/ui` |
| **Testing** | `Pytest` | `Vitest` + `Playwright` |
| **Visualización** | - | `Recharts` |
| **Gestor de Paquetes** | `uv` | `Bun` |
| **Linting & Formatting** | `Ruff` | `Biome` |

---

Hecho con ❤️ por [Aníbal Rojo](https://github.com/anibalrojosan) y [Fernando Arriagada](https://github.com/Fernandodesign96).
