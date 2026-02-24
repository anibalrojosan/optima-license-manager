# ADR-003: Selección del Motor de Base de Datos

* **Estado:** Aceptado
* **Fecha:** 2026-02-13

## Contexto
La integridad de los datos financieros es crítica y los datos de proveedores (AWS, Azure, SaaS) son heterogéneos y cambiantes.

## Decisión
**PostgreSQL** (v15+) como motor relacional principal.

## Alternativas consideradas
* **MySQL:** Menos robusto en el manejo de tipos de datos complejos y JSON.
* **MongoDB:** Excelente para flexibilidad, pero carece de la integridad ACID estricta necesaria para operaciones financieras críticas.

## Justificación Técnica
1. **Modelo Híbrido (Relacional + JSONB):** Los proveedores de nube entregan datos con esquemas heterogéneos. El tipo `JSONB` permite almacenar la carga útil cruda (raw payload) con **indexación binaria**, permitiendo consultas rápidas sobre metadatos específicos sin migraciones constantes de esquema.
2. **Integridad Financiera (ACID):** En FinOps, la consistencia es prioritaria. PostgreSQL garantiza que si una transacción compleja falla, se revierte completamente (*rollback*), evitando estados financieros corruptos.
3. **Motor Analítico Nativo:** El uso de *Window Functions* y CTEs permite delegar cálculos matemáticos intensivos (promedios móviles, comparativas MoM) al motor de base de datos optimizado en C, reduciendo la latencia y el consumo de RAM en Python.

## Consecuencias
* **Integridad:** Garantía total de consistencia en reportes financieros.
* **Flexibilidad:** Capacidad de absorber nuevos proveedores SaaS con esquemas variables.
* **Rendimiento:** Consultas analíticas optimizadas directamente en el motor de DB.
