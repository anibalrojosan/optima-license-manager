# ADR-010: Estrategia de QA y testing de interfaz

* **Estado:** Aceptado
* **Fecha:** 2026-02-18

## Contexto
Es necesario un sistema de pruebas que garantice confianza en cada despliegue de la interfaz, cubriendo desde flujos de negocio hasta accesibilidad.

## Decisión
Se adopta una estrategia de testing multi-nivel:
1. **E2E & Integration:** [Playwright](https://playwright.dev/).
2. **Unit & Component Testing:** [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) + [Vitest](https://vitest.dev/).
3. **A11Y Testing:** Axe-core integrado en Playwright.

## Alternativas consideradas
* **Cypress:** Alternativa a Playwright, pero con menor soporte para múltiples navegadores y ejecución en paralelo. Su arquitectura basada en Chrome limita las pruebas cross-browser reales.
* **Jest:** Estándar de la industria pero más lento que Vitest y con configuración más compleja para TypeScript y ESM. Requiere más configuración para trabajar con Vite.
* **Testing Library sin Vitest:** Usar Jest con React Testing Library es viable pero sacrifica velocidad de ejecución y requiere configuración adicional para módulos ES.
* **Solo pruebas manuales:** Insuficiente para garantizar calidad en despliegues continuos. No escala y es propenso a errores humanos.

## Justificación Técnica
1. **Playwright (Flujos de Negocio):** Framework principal para validar flujos críticos (Registro, Gestión de Licencias) en navegadores reales. Su capacidad de ejecución en paralelo y herramientas de depuración aseguran la fiabilidad de las transacciones financieras en la UI, garantizando que el frontend y el backend operen en conjunto según lo definido en la arquitectura headless (ADR-002).

2. **React Testing Library:** Biblioteca centrada en la interacción del usuario real. Al evitar detalles de implementación técnica, garantiza que los tests de componentes sean resistentes a refactorizaciones internas de **shadcn/ui** (ADR-008) y lógica de estado en **Zustand** o **TanStack Query** (ADR-007).

3. **Vitest:** Sustituye a Jest como motor de pruebas unitarias por su integración nativa con el motor de construcción (Vite), ofreciendo una velocidad de ejecución significativamente mayor y compatibilidad total con TypeScript y ESM sin configuración adicional, optimizando el feedback loop del desarrollador.

4. **Axe-core:** Motor automatizado para garantizar el cumplimiento de los estándares **WCAG 2.1 nivel AA** definidos en la guía de accesibilidad del proyecto (A11Y.md). Se integra directamente en el pipeline de Playwright para detectar barreras de uso de forma continua y automática.

## Consecuencias
* **Confianza en despliegue:** Reducción de regresiones visuales y funcionales.
* **Accesibilidad continua:** Prevención automática de barreras de uso.
* **Feedback loop rápido:** Ejecución de pruebas veloz durante el desarrollo.