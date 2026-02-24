# ADR-005: Tooling de Desarrollo Backend (uv, ruff, pytest)

* **Estado:** Aceptado
* **Fecha:** 2026-02-13

## Contexto
Necesitamos un entorno de desarrollo moderno, rápido y que garantice la calidad del código en un proyecto con lógica financiera crítica.

## Decisión
Uso de **uv** para gestión de paquetes, **Ruff** para calidad de código y **Pytest** para pruebas.

## Justificación Técnica
1. **Velocidad con `uv`:** Es significativamente más rápido que pip o poetry al estar escrito en Rust. Proporciona un gestor de dependencias determinista y un entorno virtual eficiente.
2. **Unificación con `Ruff`:** Reemplaza a múltiples herramientas (Flake8, Isort, Black, Pyupgrade) en un solo binario ultra rápido. Esto simplifica la configuración y acelera los pipelines de CI/CD.
3. **Fiabilidad con `Pytest`:** Es el estándar de la industria para testing en Python. Permite validar los algoritmos de cálculo de FinOps con una sintaxis limpia y potente.

## Consecuencias
* **DX (Developer Experience):** Setup de proyecto casi instantáneo.
* **Mantenibilidad:** Reglas de estilo estrictas y automatizadas.
* **Seguridad:** Suite de pruebas que previene regresiones en la lógica de negocio.
