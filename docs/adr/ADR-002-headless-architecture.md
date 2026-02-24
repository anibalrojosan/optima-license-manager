# ADR-002: Estrategia de Arquitectura Desacoplada (Headless)

* **Estado:** Aceptado
* **Fecha:** 2026-02-13

## Contexto
El sistema debe ser escalable y permitir una experiencia de usuario reactiva para dashboards financieros complejos.

## Decisión
Separación estricta entre Cliente (Next.js) y Servidor (FastAPI) mediante una arquitectura **Headless**.

## Alternativas consideradas
* **Monolito (Django Templates / MVC):** El renderizado en servidor de dashboards complejos genera una carga asimétrica y una UX menos fluida (recargas de página).

## Justificación Técnica
1. **Escalabilidad Independiente:** La carga de trabajo del Frontend (renderizado, interacción) y del Backend (cálculo numérico, ETLs) es asimétrica. Desacoplarlos permite escalar la infraestructura del backend (CPU/Memory optimized) sin sobredimensionar el servidor de frontend.
2. **Experiencia de Usuario (UX) Reactiva:** Una arquitectura SPA/Hybrid con Next.js permite transiciones instantáneas y actualizaciones de estado sin recargas de página, indispensable para dashboards financieros donde la fluidez es clave.
3. **Especialización del Equipo:** Permite que los desarrolladores frontend se enfoquen en UX/UI y accesibilidad, mientras el equipo de backend se enfoca en la integridad de los datos y algoritmos.

## Consecuencias
* **Despliegue:** Requiere gestionar dos entornos (Vercel para Front, Render/AWS para Back).
* **Seguridad:** Necesita una gestión robusta de CORS y autenticación basada en JWT.
* **Flexibilidad:** Facilita la creación de futuras aplicaciones móviles consumiendo la misma API.
