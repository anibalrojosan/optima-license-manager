# ADR-009: Estrategia de mocking de API

* **Estado:** Aceptado
* **Fecha:** 2026-02-18

## Contexto
Se requiere simular respuestas del servidor de forma realista para permitir el desarrollo paralelo del frontend sin depender de la disponibilidad inmediata de los endpoints del backend.

## Decisión
Se selecciona **MSW (Mock Service Worker)** para la interceptación de peticiones a nivel de red.

## Alternativas consideradas
* **JSON Server:** Requiere un servidor separado y archivos JSON estáticos. No permite simular comportamientos complejos como latencia variable o errores intermitentes de forma realista.
* **Jest Mock Functions:** Solo funciona en el contexto de pruebas, no en desarrollo. Requiere modificar el código de producción para inyectar mocks, violando el principio de separación de concerns.
* **Nock (Node.js):** Solo funciona en entornos Node.js, no en el navegador. No permite desarrollo frontend independiente sin un entorno de pruebas configurado.
* **API Backend temporal:** Desarrollar endpoints mock en el backend real consume tiempo y recursos que deberían dedicarse al desarrollo real. Además, requiere mantener sincronización manual con los contratos.

## Justificación Técnica
1. **Interceptación en Service Worker:** MSW intercepta `fetch` a nivel de red mediante Service Workers nativos del navegador, lo que permite que el código de producción permanezca agnóstico a los mocks. MSW es una biblioteca de JavaScript diseñada para interceptar peticiones de red (REST o GraphQL) a nivel de navegador o Node.js, simulando respuestas de API sin modificar el código de la aplicación.
2. **Mismo contrato Front/Back:** Facilita el uso de contratos de datos compartidos entre ambos extremos, asegurando que los mocks reflejen exactamente la estructura esperada del backend real.
3. **Simulación de resiliencia:** Permite recrear escenarios de latencia, errores 500 intermitentes y tokens expirados (401) de forma sencilla, mejorando la preparación del frontend para condiciones reales de producción.

## Consecuencias
* **Desarrollo desacoplado:** El frontend puede avanzar independientemente del estado del backend.
* **Testing reutilizable:** Los manejadores de mocks se comparten entre desarrollo y pruebas unitarias/integración, reduciendo duplicación de código.