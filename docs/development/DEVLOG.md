# Registro de Desarrollo: Optima

Este documento describe el proceso de desarrollo del proyecto **Optima**. Es un registro de las decisiones tomadas, los aprendizajes adquiridos, los problemas que surgieron y la forma en que se resolvieron, y el progreso realizado.

## 📑 Índice
- [[2026-02-16 - 2026-02-23] - Proceso de Documentación](#2026-02-16---2026-02-23---proceso-de-documentación)

---

## [2026-02-16 - 2026-02-23] - Proceso de Documentación

**Contexto:** Finalización de la etapa de definición estratégica y técnica. Se ha creado un ecosistema de documentación completo que servirá como "única fuente de verdad" para el desarrollo del MVP de Optima, asegurando que tanto el Backend como el Frontend estén alineados desde el primer commit.

### **Tarea 1: Registro de Decisiones Arquitectónicas (ADRs)**

Se ha implementado un sistema de gobernanza técnica mediante la creación de 12 ADRs que fundamentan las bases del proyecto:

*   **`ADR-001`**: Selección de **FastAPI** como framework backend por su alto rendimiento asíncrono y documentación automática.
*   **`ADR-002`**: Adopción de una **Arquitectura Headless** para desacoplar el ciclo de vida del Frontend y Backend.
*   **`ADR-003`**: Uso de **PostgreSQL** con soporte JSONB para garantizar integridad financiera y flexibilidad en metadatos.
*   **`ADR-004`**: Estrategia de **Internacionalización (i18n)** nativa (EN/ES) desde el núcleo del sistema.
*   **`ADR-005`**: Tooling de desarrollo backend basado en **uv, Ruff y Pytest** para un entorno moderno y rápido.
*   **`ADR-006`**: Validación de datos estricta con **Pydantic V2** para asegurar la integridad de los contratos de API.
*   **`ADR-007`**: Gestión de estado híbrida en Frontend: **TanStack Query** (servidor), **Zustand** (UI) y **Context API** (Auth).
*   **`ADR-008`**: Sistema de diseño basado en **Tailwind CSS, shadcn/ui y Recharts** para consistencia visual y financiera.
*   **`ADR-009`**: Estrategia de mocking de API mediante **MSW (Mock Service Worker)** para desarrollo paralelo.
*   **`ADR-010`**: Estrategia de QA multi-nivel: **Playwright** (E2E), **Vitest** (Unit) y **Axe-core** (Accesibilidad).
*   **`ADR-011`**: Tooling de frontend unificado con **Bun** como runtime/gestor y **Biome** como linter/formatter.
*   **`ADR-012`**: Simplificación del modelo de datos mediante **SQLModel**, eliminando la necesidad de un Repository Pattern explícito en esta etapa.

### **Tarea 2: Definición de la Base Documental**
Se han redactado y organizado los siguientes documentos clave en el directorio `docs/`:

*   **`PRD.md` (Product Requirements Document)**: Define el "qué" y el "por qué". Incluye la visión del producto (FinOps), los KPIs de éxito, las User Personas y el alcance detallado del MVP frente a futuras versiones.
*   **`ARCHITECTURE.md`**: Describe el "cómo" a nivel sistémico. Detalla la arquitectura desacoplada (FastAPI + Next.js), el flujo de datos unidireccional y la responsabilidad de cada capa del sistema.
*   **`DATABASE.md`**: Define la estrategia de persistencia. Contiene el Modelo Entidad-Relación (ERD), reglas de precisión financiera (uso de `Numeric` para dinero) y la estrategia de índices para garantizar latencias mínimas.
*   **`ROADMAP.md`**: Establece el "cuándo". Divide el desarrollo en 5 fases críticas, desde los cimientos e internacionalización hasta el lanzamiento del MVP, con criterios de aceptación (DoD) para cada hito.
*   **`DESIGN_SYSTEM.md`**: Define los lineamientos de UX/UI, el uso de tokens de diseño y la estrategia *Desktop-First* para la visualización de datos financieros.

### **Tarea 3: Preparación para el Desarrollo Activo**
*   **Creación de README del proyecto**: Redactado para enfocarse en el objetivo del proyecto y el Tech Stack (uv, FastAPI, Bun, Next.js).
*   **Estandarización de Tooling**: Configuración de un `.gitignore` robusto que protege el repositorio de archivos temporales de Python, Node, Docker y datos sensibles de bases de datos locales.

**Estado Actual:** La fase de diseño y documentación está oficialmente cerrada. El repositorio cuenta con una estructura profesional y coherente, lista para iniciar la implementación de la **Fase 1: Cimientos e Internacionalización**.