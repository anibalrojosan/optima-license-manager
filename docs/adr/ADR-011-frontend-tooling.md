# ADR-011: Tooling de Desarrollo Frontend (Bun & Biome)

## Estado
Aceptado

## Contexto
El ecosistema de JavaScript/TypeScript ha dependido históricamente de herramientas fragmentadas (npm/yarn para paquetes, ESLint para linting, Prettier para formateo, Jest para tests). Esta fragmentación genera lentitud en los pipelines de CI/CD y una experiencia de desarrollo inconsistente. 

Buscamos una paridad de rendimiento con el tooling del Backend (uv/Ruff) y una experiencia de desarrollo consistente en terminos de sencilles y rapidez.

## Decisión
Adoptar **Bun** como runtime y gestor de paquetes, y **Biome** como linter y formatter unificado para el Frontend.

### Justificación Técnica

1. **Bun (Runtime & Package Manager):**
   - **Velocidad extrema:** Al estar escrito en Zig, Bun es significativamente más rápido que npm/pnpm en la instalación de dependencias y ejecución de scripts.
   - **All-in-one:** Reemplaza al gestor de paquetes, al ejecutor de tareas y al test runner, reduciendo la complejidad del proyecto.
   - **Compatibilidad:** Soporte nativo para TypeScript y archivos `.env` sin necesidad de configuración adicional.

2. **Biome (Linter & Formatter):**
   - **Rendimiento instantáneo:** Al estar escrito en Rust, Biome es el equivalente a **Ruff** en el mundo de Python. Procesa miles de archivos en milisegundos.
   - **Unificación:** Reemplaza a ESLint y Prettier en una sola herramienta, eliminando conflictos de configuración entre reglas de estilo y reglas de lógica.
   - **Simplicidad:** Una sola configuración (`biome.json`) para todo el proyecto.

## Consecuencias

### Positivas
- **DX (Developer Experience):** Feedback casi instantáneo al guardar archivos y ejecutar tests.
- **Eficiencia en CI/CD:** Reducción drástica en los tiempos de instalación y validación en GitHub Actions.
- **Consistencia:** Tooling moderno y de alto rendimiento tanto en Backend (Rust/Python) como en Frontend (Zig/Rust/TS).

### Negativas
- **Ecosistema:** Bun es más reciente que Node.js. Si bien la compatibilidad es alta a día de hoy, podrían surgir casos borde en librerías antiguas.
- **Curva de aprendizaje:** El equipo debe familiarizarse con los comandos de Bun (`bun add`, `bun run`) en lugar de los tradicionales de npm/yarn.