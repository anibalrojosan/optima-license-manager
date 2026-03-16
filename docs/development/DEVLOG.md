# Registro de Desarrollo: Optima

Este documento describe el proceso de desarrollo del proyecto **Optima**. Es un registro de las decisiones tomadas, los aprendizajes adquiridos, los problemas que surgieron y la forma en que se resolvieron, y el progreso realizado.

## 📑 Índice
- [[2026-03-12] - Backend | Sprint 2: Implementación de seguridad y JWT](#2026-03-12---backend--sprint-2-implementación-de-seguridad-y-jwt)
- [[2026-03-12] - Backend | Sprint 3: Modelado y contrato de autenticación](#2026-03-12---backend--sprint-2-modelado-y-contrato-de-autenticación)
- [[2026-03-11] - Frontend | Sprint 2: Setup base y estabilización de componentes](#2026-03-11---frontend--sprint-2-setup-base-y-estabilización-de-componentes)
- [[2026-03-11] - Backend | Sprint 1: Setup base y estrategia asíncrona](#2026-03-11---backend--sprint-1-setup-base-y-estrategia-asíncrona)
- [[2026-02-16 - 2026-02-23] - Estrategia y documentación](#2026-02-16---2026-02-23---estrategia-y-documentación)

---

## [2026-03-12] - Backend | Sprint 2: Implementación de seguridad y JWT

### Contexto y objetivos
Inicio de la fase de seguridad real (`phase1-04`) para el sistema de autenticación. El objetivo principal es establecer las herramientas criptográficas necesarias para el manejo de contraseñas y la generación de tokens de acceso, garantizando un sistema de sesión escalable y seguro.

### Implementación técnica
- **Gestión de dependencias:** Instalación de `passlib[bcrypt]` para el hashing de contraseñas y `python-jose` para la gestión de tokens JWT mediante `uv`.
- **Núcleo de seguridad:** Creación del módulo `backend/app/core/security.py` que centraliza las funciones de utilidad para:
    - Hashing de contraseñas con el algoritmo **Bcrypt** (incluyendo *salting* automático).
    - Verificación de credenciales comparando texto plano con hashes almacenados.
    - Generación de tokens JWT firmados con una `SECRET_KEY` y tiempo de expiración configurable.
- **Configuración de entorno:** Actualización de `.env` y `.env.example` con variables críticas de seguridad (`SECRET_KEY`, `ALGORITHM`, `ACCESS_TOKEN_EXPIRE_MINUTES`).
- **Documentación visual:** Integración de diagramas de secuencia Mermaid en `ARCHITECTURE.md` y `docs/api-contracts/auth.md` para ilustrar el ciclo de vida de una petición autenticada.

### 💡 Repaso técnico: JWT y arquitectura Stateless
La adopción de **JWT (JSON Web Tokens)** permite que Optima funcione bajo una arquitectura **Stateless** (sin estado). A diferencia de las sesiones tradicionales donde el servidor debe recordar a cada usuario en una base de datos o memoria (Redis), en un sistema *stateless* el servidor no guarda nada sobre la sesión activa. Toda la información necesaria para identificar al usuario está contenida en el propio token que viaja en cada petición. Gracias a la firma digital creada con nuestra `SECRET_KEY`, el backend puede confiar plenamente en la integridad del token sin necesidad de consultar una tabla de sesiones, lo que reduce la latencia y permite que el sistema escale horizontalmente de forma masiva.

### Próximos pasos (continuar con este sprint phase1-04)
- Crear el servicio de autenticación en `backend/app/services/auth.py` para orquestar el registro y login.
- Implementar la inyección de dependencias `get_current_user` para proteger rutas privadas.
- Continuar con el desarrollo de la API de autenticación.

---

## [2026-03-12] - Backend | Sprint 3: Modelado y contrato de autenticación

### Contexto y objetivos
El objetivo de esta sesión fue completar el issue `phase1-03`, estableciendo los cimientos de la autenticación y el modelo de datos multi-inquilino (*multi-tenancy*). Se buscó definir un contrato de API claro que permita al equipo de frontend trabajar de forma asíncrona mediante el uso de simulacros (*mocks*).

### Implementación técnica
- **Modelado de datos con SQLModel**: Se dedicó tiempo al estudio y análisis de `SQLModel` para unificar la potencia de **SQLAlchemy** y **Pydantic**. Se implementaron las entidades `Organization` y `User` en `backend/app/models/auth.py`, asegurando que cada usuario esté vinculado obligatoriamente a una organización.
- **Seguridad mediante esquemas**: Se definieron esquemas de Pydantic específicos en `backend/app/schemas/auth.py` para las operaciones de registro y lectura. Esta separación es crítica para evitar la filtración accidental de datos sensibles como el hash de la contraseña.
- **Actualización de documentación técnica**: Se corrigieron incongruencias entre `docs/DATABASE.md` y `docs/CLASS_DIAGRAM.md`, unificando el uso de `Numeric(10,2)` para precisión financiera y estableciendo a la `Organization` como la propietaria legal de las licencias.
- **Contrato de API**: Se creó el documento `docs/api-contracts/auth.md` detallando los puntos de entrada (*endpoints*) `/register` y `/login`, incluyendo ejemplos exactos de peticiones y respuestas JSON para facilitar la integración con el frontend.

### 💡 Repaso técnico: Seguridad mediante la separación de esquemas y modelos
Una de las mayores ventajas de usar `SQLModel` junto con esquemas de Pydantic es la creación de una "capa de aislamiento". Mientras que el **Modelo de Base de Datos** contiene la estructura completa de la tabla (incluyendo campos sensibles como `password_hash`), los **Esquemas de Respuesta** actúan como un filtro de seguridad. Al definir un esquema de lectura que omite campos privados,se garantiza que, incluso si el objeto de la base de datos se pasa directamente a la respuesta de la API, FastAPI solo enviará los campos explícitamente permitidos, eliminando cualquier riesgo de filtración de credenciales o claves internas.

### Próximos pasos
- Implementar la lógica de hashing de contraseñas con **bcrypt** (`phase1-04`).
- Desarrollar el servicio de generación y validación de tokens **JWT**.
- Integrar los esquemas definidos en las rutas reales de FastAPI.

---

## [2026-03-11] - Frontend | Sprint 2: Setup base y estabilización de componentes

### Contexto y objetivos
Establecer la infraestructura base del frontend de Optima y estabilizar el entorno técnico resolviendo deudas técnicas de tipado detectadas durante la integración inicial. Se completó la fase de configuración base (`phase1-02`).

### Implementación técnica
- **Inicialización con Bun y Next.js**: Se seleccionó Bun como gestor de paquetes por su velocidad, instalando la versión más reciente de Next.js. Se estructuró el proyecto en `frontend/src/{app,components,features,lib,locales}`.
- **Configuración de i18n**: Implementación de `next-intl` para soporte multi-idioma (EN/ES). Se ajustó `src/i18n/request.ts` para manejar el parámetro `locale` de forma asíncrona, resolviendo bloqueos de compilación.
- **Resolución de tipos en Next.js 16**: Corrección de errores críticos de TypeScript en la configuración de internacionalización y eliminación de usos de `any` en configuraciones core.
- **Stack visual**: Instalación de Tailwind CSS y Shadcn/UI para la base de la interfaz de usuario.
- **Saneamiento de Git**: Eliminación de un repositorio Git anidado accidentalmente en la carpeta `frontend/`.

### 💡 Repaso técnico: Ruteo en Next.js 16
En esta versión, la convención `middleware.ts` ha sido marcada como obsoleta en favor de `proxy.ts`. Esto requiere que el archivo de configuración de `next-intl` apunte explícitamente a la ruta del archivo de solicitudes para que el plugin de internacionalización funcione correctamente con la carpeta `src/`.

### Próximos pasos
- Iniciar la creación del layout base del dashboard (`AppLayout`).
- Implementar la navegación lateral responsiva (Sidebar) mediante Shadcn/UI.
- Realizar la primera prueba de conexión real con el backend de FastAPI usando el contrato de API.

---

## [2026-03-11] - Backend | Sprint 1: Setup base y estrategia asíncrona

### Contexto y objetivos
Transición de la documentación a la implementación física, configurando la infraestructura central y estableciendo un flujo de trabajo asíncrono robusto para permitir el desarrollo independiente de backend y frontend.

### Implementación técnica
- **Inicialización del backend (`phase1-01`)**: Uso de `uv` para gestión de dependencias y creación de la estructura `backend/app/{api,core,models,schemas,services}` con un endpoint `/health`.
- **Contenerización y orquestación**: Creación de `Dockerfile` multi-etapa y `docker-compose.yml` para orquestar FastAPI y PostgreSQL 16 (puerto 5436).
- **Gestión del entorno**: Establecimiento de patrones estrictos para archivos `.env` y configuración de `ruff` para imponer estándares de calidad de código.
- **Automatización de Kanban**: Generación de backlog en `SPRINTS.md` y automatización de Issues en GitHub mediante `gh cli`.

### 💡 Repaso técnico: Desarrollo asíncrono mediante contratos de API
Para resolver el cuello de botella donde el backend bloquea al frontend, adoptamos una estrategia **API-First**. Definiremos contratos explícitos en `docs/api-contracts/` y el frontend podrá utilizar **Mock Service Worker (MSW)** para simular respuestas de la API, permitiendo que el desarrollo de la UI avance sin depender de la lógica real del backend.

### Próximos pasos
- Definición del primer contrato de API (Auth) y modelos iniciales de SQLModel (`phase1-03`).

---

## [2026-02-16 - 2026-02-23] - Estrategia y documentación

### Contexto y objetivos
Finalización de la etapa de definición estratégica y técnica. Se ha creado un ecosistema de documentación completo que servirá como "única fuente de verdad" para el desarrollo del MVP de Optima.

### Implementación técnica
- **Decisiones Arquitectónicas (ADRs)**: Implementación de 12 ADRs cubriendo la selección de FastAPI, Next.js, PostgreSQL con JSONB, i18n nativa, y estrategias de QA y mocking.
- **Base Documental**: Redacción de `PRD.md`, `ARCHITECTURE.md`, `DATABASE.md`, `ROADMAP.md` y `DESIGN_SYSTEM.md` para alinear los objetivos de producto y técnicos.
- **Preparación de Tooling**: Configuración de README y `.gitignore` robusto para proteger el repositorio.

### Próximos pasos
- Inicio de la Fase 1: Cimientos e Internacionalización.

---
