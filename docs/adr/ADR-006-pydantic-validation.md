# ADR-006: Validación de Datos con Pydantic

* **Estado:** Aceptado
* **Fecha:** 2026-02-13

## Contexto
En una aplicación FinOps, recibir datos mal formateados (ej. un string donde debería haber un número o un float con errores de precisión) puede corromper los cálculos de proyecciones y reportes financieros. Necesitamos una forma robusta de garantizar la integridad de los datos desde el momento en que entran a la API.

## Decisión
Uso de **Pydantic V2** para la definición de esquemas de datos (Schemas) y la validación en tiempo de ejecución.

## Alternativas consideradas
* **Marshmallow:** Más lento y requiere una sintaxis más verbosa para definir esquemas.
* **Validación manual con diccionarios:** Propensa a errores, difícil de mantener y no proporciona autocompletado ni tipado estático.

## Justificación Técnica
1. **Tipado Estricto y Coerción:** Pydantic garantiza que si un campo se define como `Decimal`, el sistema rechazará cualquier entrada que no pueda convertirse de forma segura, protegiendo la integridad de los cálculos financieros.
2. **Rendimiento:** La versión 2 de Pydantic está escrita en Rust, lo que garantiza que la validación de grandes volúmenes de datos (ej. importación masiva de licencias) sea extremadamente rápida.
3. **Integración con FastAPI:** FastAPI utiliza Pydantic de forma nativa para la validación de peticiones y la generación de esquemas OpenAPI, lo que reduce la duplicación de código.
4. **Parsing vs Validation:** Pydantic no solo valida, sino que transforma los datos de entrada en objetos de Python con tipos garantizados, asegurando que el `FinOpsEngine` siempre reciba datos limpios.

## Consecuencias
* **Contratos Claros:** El frontend recibe errores de validación detallados y automáticos (422 Unprocessable Entity).
* **Seguridad:** Previene ataques de inyección de datos y errores de lógica mediante la coerción estricta de tipos.
* **Mantenibilidad:** Los esquemas de Pydantic sirven como documentación viva del modelo de datos de la API.
