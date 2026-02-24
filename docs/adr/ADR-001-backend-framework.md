# ADR-001: Selección del Framework Backend

* **Estado:** Aceptado
* **Fecha:** 2026-02-13

## Contexto
Necesitamos un framework para el backend que soporte alta concurrencia, validación de datos estricta y generación automática de documentación para la gestión de licencias y costos FinOps.

## Decisión
Se ha seleccionado **FastAPI** (Python).

## Alternativas consideradas
* **Django REST Framework (DRF):** Demasiado pesado para microservicios de cálculo y con un ORM que puede ser lento en consultas analíticas complejas.
* **Flask:** Muy minimalista; requiere demasiadas librerías externas para alcanzar la funcionalidad nativa de FastAPI (validación, docs).

## Justificación Técnica
1. **Rendimiento Asíncrono (ASGI):** A diferencia de WSGI (Django/Flask), FastAPI se basa en Starlette y Pydantic, ofreciendo soporte nativo para `async`/`await`. Esto es crítico en FinOps para manejar múltiples llamadas a APIs externas (AWS, Azure) de forma concurrente sin bloquear el hilo principal.
2. **Validación de Datos Rigurosa:** La integración profunda con **Pydantic** asegura que los datos financieros (monedas, fechas, flotantes) se validen y tipen estrictamente antes de entrar a la lógica de negocio. Esto reduce drásticamente los errores en tiempo de ejecución (`RuntimeErrors`) comunes en Python dinámico.
3. **Documentación Viva:** La generación automática de **OpenAPI (Swagger UI)** permite que el equipo de frontend tenga un contrato de interfaz siempre actualizado, reduciendo la fricción en la integración.

## Consecuencias
* **Rendimiento:** Alta velocidad de respuesta en endpoints de cálculo.
* **Seguridad:** Validación automática de esquemas de entrada y salida.
* **Productividad:** Menor tiempo de desarrollo gracias al tipado estático y documentación automática.