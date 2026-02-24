# 📂 Documento de Requerimientos de Producto (PRD): Optima

Este documento define el Documento de Requerimientos de Producto (PRD) de Optima, desde la visión general hasta los detalles técnicos de cada capa.

| Metadatos | Detalle |
| --- | --- |
| **Proyecto** | Optima – FinOps License Manager |
| **Versión** | 1.1 |
| **Estado** | 🟡 En planificación activa |
| **Propietarios** | Aníbal Rojo (Arquitectura Backend) & Fernando Arriagada (Diseño de Producto) |
| **Última Actualización** | 13 Febrero 2026 |

---

## 📋 Tabla de contenidos
1. [Introducción y Visión Estratégica](#1-introducción-y-visión-estratégica)
2. [Benchmark y Diferenciación (Zero Learning Curve)](#2-benchmark-y-diferenciación-zero-learning-curve)
3. [Objetivos y Métricas de Éxito (KPIs)](#3-objetivos-y-métricas-de-éxito-kpis)
4. [User Personas](#4-user-personas)
5. [Reglas de Negocio y Lógica de Datos](#5-reglas-de-negocio-y-lógica-de-datos)
6. [Requerimientos Funcionales (User Stories)](#6-requerimientos-funcionales-user-stories)
7. [Requerimientos No Funcionales](#7-requerimientos-no-funcionales)
8. [Lineamientos de UX/UI (Design System)](#8-lineamientos-de-uxui-design-system)
9. [Alcance del MVP y Post-MVP](#9-alcance-del-mvp-y-post-mvp)
10. [Arquitectura Técnica (Resumen)](#10-arquitectura-técnica-resumen)
11. [Riesgos y Mitigaciones](#11-riesgos-y-mitigaciones)

---

## 1. Introducción y Visión Estratégica

### 1.1 Definición del Problema

En el panorama actual de SaaS, las empresas pierden entre un **20% y un 30% de su presupuesto de software** debido a:

1. **Licencias "Zombie":** Pagos activos por software que nadie usa.
2. **Renovaciones Involuntarias:** Falta de alertas preventivas antes de cargos automáticos.
3. **Shadow IT:** Compras descentralizadas sin supervisión del departamento de TI.
4. **Gestión Manual:** El uso de hojas de cálculo (Excel/Sheets) es propenso a errores humanos, carece de auditoría y no permite proyecciones financieras fiables.

### 1.2 Visión del Producto

**Optima** no es simplemente un rastreador de inventario; es una plataforma de **FinOps (Operaciones Financieras)**. Nuestra misión es transformar la gestión de activos digitales de una tarea administrativa reactiva a una **estrategia financiera proactiva**.

Buscamos proporcionar:

* **Visibilidad Radical:** Saber exactamente cuánto se gasta y dónde en tiempo real.
* **Gobernanza de Datos:** Centralización de la verdad financiera en una base de datos íntegra.
* **Eficiencia Operativa:** Automatización de alertas y cálculos de proyecciones.

## 2. Benchmark y Diferenciación (Zero Learning Curve)
Las plataformas como **Zluri, Torii y BetterCloud** están diseñadas bajo una lógica **Enterprise-IT first**, priorizando gobernanza, automatización avanzada y administración granular.

Esto genera lo que denominamos **“Enterprise Bloat”:**
interfaces densas en configuración, onboarding prolongado y curvas de aprendizaje que pueden extenderse por semanas.

*   **Enfoque Optima:** Diseño orientado a la acción inmediata. Si no se puede realizar una acción en menos de 3 clics, el diseño debe simplificarse.
*   **Visualización Financiera:** Mientras otros se enfocan en la gestión de IT, Optima diseña para el flujo de caja, convirtiendo números técnicos en gráficos de tendencia accionables.

## 3. Objetivos y Métricas de Éxito (KPIs)

Para considerar el MVP (Producto Mínimo Viable) un éxito, debemos impactar las siguientes métricas:

### 3.1 KPIs de Negocio (Financieros)

* **Identificación de Ahorro (Savings Opportunity):** Capacidad del sistema para detectar al menos un 10% de gasto desperdiciado en la primera carga de datos.
* **Visibilidad de Renovación:** Lograr que el 100% de las licencias críticas tengan una fecha de expiración auditada.
* **Precisión de Proyección:** Reducir la varianza entre el "Gasto Proyectado" por el sistema y el "Gasto Real" a final de mes a menos del 1%.

### 3.2 KPIs de Producto (Experiencia)

* **Time-to-Value:** El usuario debe poder visualizar su gasto total (Total Monthly Spend) en menos de 5 minutos tras el registro.
* **Tasa de Recuperación de Errores:** El 90% de los errores de red o API deben ser manejados por la UI sin requerir una recarga completa de la página (F5).
* **Usabilidad Móvil:** Todas las funciones críticas (ver dashboard, aprobar renovación) deben ser operables en dispositivos móviles (<768px).


## 4. User Personas

Diseñamos para dos perfiles con necesidades contrapuestas:

### 👩‍💻 IT Manager (Operativo)

* **Preocupación:** "¿Se nos va a caer el servicio mañana porque olvidé pagar?"
* **Necesidad:** Alertas claras, inventario de herramientas, gestión de accesos.
* **Frecuencia de uso:** Diaria/Semanal.

### 👨‍💼 CFO / Director Financiero (Estratégico)

* **Preocupación:** "¿Por qué gastamos $5k más que el mes pasado?"
* **Necesidad:** Gráficos de tendencias, desglose por departamentos, proyecciones anuales para presupuestos.
* **Frecuencia de uso:** Mensual/Trimestral.

## 5. Reglas de Negocio y Lógica de Datos

Esta sección define la **integridad del sistema**. Estas reglas son inmutables y tienen prioridad sobre cualquier requerimiento de UI.

### 5.1 Precisión Financiera (Handling Money)

* **Regla de los 2 Decimales:** Todos los cálculos monetarios en el backend deben redondearse estrictamente a 2 decimales utilizando estrategias de punto fijo (ej. `Decimal` en Python) para evitar errores de coma flotante (`0.1 + 0.2 != 0.300000004`).
* **Moneda Base:** Para la versión 1.0, el sistema operará exclusivamente en **USD**. Cualquier input en otra moneda debe ser convertido manualmente por el usuario antes de ingresar.

### 5.2 Integridad de Auditoría (Soft Deletes)

* **Prohibición de Borrado Físico:** Ninguna licencia o transacción financiera puede ser eliminada permanentemente de la base de datos (`DELETE FROM...`).
* **Eliminación Lógica:** Al "borrar" un registro, el sistema debe marcar una columna `deleted_at` con el timestamp actual. Esto garantiza que los reportes históricos de gastos sigan cuadrando incluso si la licencia ya no está activa hoy.

### 5.3 Ciclos de Vida de Licencias

* **Suscripciones Recurrentes:** Requieren obligatoriamente `costo`, `frecuencia` (mensual/anual) y `fecha_renovación`.
* **Licencias Perpetuas (Lifetime):** Tienen un costo único (`one-time`). El sistema debe excluirlas de las alertas de renovación pero incluirlas en el cálculo de "Gasto Histórico Total".


## 6. Requerimientos Funcionales (User Stories)

### 6.1 Módulo Core: FinOps & Gestión

| ID | Actor | Historia de Usuario | Prioridad | Criterio de Aceptación |
| --- | --- | --- | --- | --- |
| **F01** | IT Manager | Ver Dashboard de Gasto | **P0** | Debe mostrar "Gasto Mensual", "Gasto Anual Proyectado" y "Próximas Renovaciones". |
| **F02** | IT Manager | Registrar Licencia (CRUD) | **P0** | Validar campos obligatorios. Impedir fechas de renovación en el pasado para licencias activas. |
| **F03** | Sistema | Motor de Alertas | **P0** | Generar notificación en UI si `fecha_renovación - hoy <= 7 días`. |
| **F04** | CFO | Visualizar Distribución | **P1** | Gráfico de torta/barras agrupado por "Categoría" (Infraestructura, Marketing, HR). |
| **F05** | Todos | Filtrado Avanzado | **P1** | Poder filtrar por: Proveedor, Estado (Activa/Trial/Cancelada) y Rango de Costo. |

### 6.2 Módulo Plataforma: Sistema & UX

| ID | Actor | Historia de Usuario | Prioridad | Criterio de Aceptación |
| --- | --- | --- | --- | --- |
| **F06** | Usuario | Autenticación Segura | **P0** | Login/Registro con email. Sesión persistente vía JWT seguro. |
| **F07** | Usuario | Gestión de Perfil | **P1** | Poder cambiar nombre y contraseña. Visualizar rol actual. |
| **F08** | Sistema | Internacionalización (i18n) | **P1** | Botón ES/EN en el header de la aplicación (visible después del login). Cambio instantáneo sin recarga de página. Preferencia persistida en `localStorage` del navegador. Soporte para Español (ES) e Inglés (EN) mediante diccionarios JSON. Si no hay preferencia guardada, detectar idioma del navegador o usar `'es'` como predeterminado. |
| **F09** | Sistema | Adaptabilidad Visual | **P1** | Soporte nativo para Modo Claro / Modo Oscuro (Dark Mode). |
| **F10** | Sistema | Manejo de Errores (Resiliencia) | **P1** | Páginas 404 personalizadas. Toasts de error si falla la API. |

## 7. Requerimientos No Funcionales

### 7.1 Rendimiento y Escalabilidad

* **Latencia de API:** El 95% de las peticiones de lectura (GET) deben completarse en **<200ms**.
* **Carga de Datos:** El frontend debe ser capaz de renderizar y filtrar una lista de **1,000 licencias** sin congelar la interfaz (jank-free scrolling).
* **Base de Datos:** Estructura optimizada para soportar hasta 10,000 registros históricos sin degradación de consultas analíticas.

### 7.2 Seguridad

* **Protección de Datos:** Cifrado de contraseñas utilizando `bcrypt`.
* **Autorización:** Todas las rutas de API (excepto `/login` y `/register`) deben requerir un header `Authorization: Bearer <token>`.
* **Seguridad de Frontend:** Almacenamiento seguro del token y limpieza automática al expirar la sesión.

### 7.3 Resiliencia y Disponibilidad

* **Intermitencia de Red:** Si el usuario pierde conexión, la aplicación debe mostrar un indicador de "Reconectando..." y no perder los datos del formulario que se está llenando.
* **Graceful Degradation:** Si el servicio de estadísticas falla, el usuario aún debe poder ver la lista de licencias (aunque los gráficos no carguen).

## 8. Lineamientos de UX/UI (Design System)

La experiencia de usuario es un ciudadano de primera clase en Optima.

* **Estrategia Responsive (Desktop-First):**
    * **Desktop (≥1280px):** Tablas de alta densidad de datos, dashboards con múltiples gráficos simultáneos.
    * **Tablet (768px - 1280px):** Vistas de lista vertical, menús tipo "hamburguesa", acciones principales al alcance del pulgar.
    * **Mobile (<768px):** Vistas de lista vertical, menús tipo "hamburguesa", acciones principales al alcance del pulgar.

* **Feedback de Estado:**
    * **Skeleton Loaders:** Usados durante la carga de datos para reducir la percepción de latencia.
    * **Empty States:** Diseños amigables e ilustrativos cuando no hay datos, con botones claros de llamada a la acción ("Agrega tu primera licencia").

👉 *Para una visión técnica detallada, consulta el documento oficial:* [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

## 9. Alcance del MVP y Post-MVP

Esta sección define claramente qué funcionalidades están incluidas en el **Producto Mínimo Viable (MVP)** y qué queda para versiones posteriores, estableciendo límites explícitos para evitar scope creep.

### 9.1 Definición del MVP

El MVP de Optima está diseñado para cumplir los **KPIs críticos** definidos en la sección 2, permitiendo que un usuario pueda:

1. **Registrarse y autenticarse** en menos de 2 minutos.
2. **Visualizar su gasto total** en menos de 5 minutos tras el registro (Time-to-Value).
3. **Gestionar sus licencias** (crear, editar, eliminar) de forma completa.
4. **Recibir alertas** de renovaciones próximas (< 7 días) de forma visible.

### 9.2 Funcionalidades Incluidas en el MVP

#### Backend

**✅ Autenticación y Seguridad:**
- Login/Registro con email y contraseña
- Autenticación JWT con tokens seguros
- Hashing de contraseñas con bcrypt
- Protección de rutas con middleware JWT

**✅ Gestión de Licencias (CRUD Completo):**
- Crear, leer, actualizar y eliminar licencias (soft delete)
- Validación estricta con Pydantic (Decimal para costos)
- Campos obligatorios: `software_name`, `provider`, `monthly_cost`, `renewal_date`
- Validación de fechas (no permitir renovaciones pasadas)

**✅ Dashboard y Métricas:**
- Endpoint de resumen con gasto mensual total
- Cálculo de gasto anual proyectado (básico)
- Lista de próximas renovaciones (< 7 días)

**✅ Sistema de Alertas:**
- Detección automática de renovaciones próximas
- Registro en `alert_log` para auditoría
- Endpoint para consultar alertas activas

**✅ Infraestructura Base:**
- PostgreSQL con modelos: `users`, `licenses`, `alert_log`
- Migraciones Alembic funcionales
- Validación Pydantic en todos los endpoints
- Manejo de errores HTTP estándar

#### Frontend

**✅ Autenticación:**
- Páginas de Login y Registro
- Context API para gestión de sesión
- Protección de rutas (redirección a login si no autenticado)
- Persistencia de token en almacenamiento seguro

**✅ Dashboard:**
- Vista principal con cards de métricas (Gasto Mensual, Gasto Anual, Renovaciones)
- Integración con API mediante TanStack Query
- Skeleton loaders durante carga
- Empty states cuando no hay datos

**✅ Gestión de Licencias:**
- Tabla de licencias con información básica
- Modal para crear/editar licencias
- Confirmación antes de eliminar
- Optimistic updates para mejor UX

**✅ Sistema de Alertas:**
- Sección visible en Dashboard con renovaciones próximas
- Badges/indicadores visuales para alertas críticas
- Acciones básicas: ver detalles, marcar como gestionada

**✅ Infraestructura Base:**
- Next.js con App Router
- Tailwind CSS + shadcn/ui (componentes base)
- TanStack Query para server state
- Manejo básico de errores (toasts, páginas de error)

### 9.3 Funcionalidades Excluidas del MVP (Post-MVP)

Las siguientes funcionalidades están **intencionalmente fuera del alcance del MVP** para mantener el foco y cumplir con el Time-to-Value:

#### Funcionalidades P1 (Post-MVP Inmediato)

**F04 - Visualización de Distribución:**
- Gráficos de torta/barras por categoría
- Análisis de tendencias financieras
- Comparativas mes a mes

**F05 - Filtrado Avanzado:**
- Filtros por proveedor, estado, rango de costo
- Búsqueda de texto completo
- Ordenamiento avanzado

**F07 - Gestión de Perfil:**
- Cambio de nombre y contraseña
- Visualización de rol actual
- Configuración de preferencias

**F08 - Internacionalización (i18n):**
- Soporte completo EN/ES
- Cambio de idioma en tiempo real
- Persistencia de preferencia

**F09 - Adaptabilidad Visual:**
- Modo Oscuro/Claro
- Personalización de tema

**F10 - Resiliencia Avanzada:**
- Error Boundaries completos
- Recuperación de red con reintentos
- Sincronización offline

#### Funcionalidades Futuras (Post-MVP Extendido)

**Análisis Financiero Avanzado:**
- Proyecciones anuales detalladas
- Detección de anomalías de gasto
- Reportes exportables (PDF/CSV)
- Comparativas históricas mes a mes

**Gobernanza y Colaboración:**
- Multi-tenant (organizaciones)
- Roles y permisos avanzados
- Compartir dashboards entre usuarios
- Notificaciones por email

**Integraciones:**
- Sincronización automática con proveedores (AWS, Azure)
- Webhooks para eventos externos
- API pública para integraciones

**Optimizaciones:**
- Cost History tracking detallado
- Caché avanzado de consultas
- Paginación y virtualización de tablas grandes
- Optimizaciones de rendimiento para 10,000+ registros

### 9.4 Alcance Fuera de Scope (V1.0)

Para mantener el foco en el MVP, se excluyen **permanentemente** de la versión 1.0:

**Integración Bancaria:**
- Conexión directa con cuentas bancarias
- Reconciliación automática de pagos
- Integración con sistemas contables

**Multi-Moneda:**
- Conversión automática de monedas
- Soporte para múltiples monedas simultáneas
- Fluctuaciones de cambio en tiempo real

**Visualizaciones Complejas:**
- Diagramas de Sankey
- Redes de nodos
- Visualizaciones 3D

**Micro-interacciones Decorativas:**
- Animaciones que no proporcionan feedback funcional
- Efectos visuales que no reducen carga cognitiva

### 9.5 Criterios de Éxito del MVP

El MVP se considera exitoso cuando:

1. **KPIs de Negocio:**
   - ✅ Detecta al menos 10% de gasto desperdiciado en primera carga
   - ✅ 100% de licencias críticas tienen fecha de renovación auditada
   - ✅ Precisión de proyección < 1% de varianza

2. **KPIs de Producto:**
   - ✅ Time-to-Value < 5 minutos (usuario ve su gasto total)
   - ✅ 90% de errores manejados sin recarga de página
   - ✅ Funciones críticas operables en móvil (<768px)

3. **Calidad Técnica:**
   - ✅ Latencia de API < 200ms (95% de peticiones)
   - ✅ Frontend renderiza 1,000 licencias sin congelar
   - ✅ Autenticación JWT funcional y segura

### 9.6 Evolución Post-MVP

La evolución del producto post-MVP seguirá el [ROADMAP.md](./ROADMAP.md), priorizando funcionalidades según:

1. **Feedback de usuarios** del MVP
2. **KPIs no alcanzados** que requieran nuevas funcionalidades
3. **Demanda del mercado** identificada en análisis competitivo
4. **Viabilidad técnica** y recursos disponibles

👉 *Para ver la planificación detallada de fases y funcionalidades futuras, consulta el:* [ROADMAP.md](./ROADMAP.md)

## 10. Arquitectura Técnica (Resumen)

Optima utiliza una **Arquitectura Desacoplada (Headless)** diseñada para separar la lógica de cálculo financiero de la experiencia de usuario, garantizando escalabilidad y resiliencia.

*   **Frontend (The Face):** Basado en **Next.js (React)**, utiliza un sistema de diseño atómico con **Tailwind CSS** y **Shadcn UI**. La gestión de estado se divide en Auth, Server State (Tanstack Query) y UI State.
*   **Backend (The Brain):** Motor de alto rendimiento construido con **FastAPI (Python)**. Implementa validación rigurosa mediante **Pydantic** y procesamiento asíncrono (ASGI) para integraciones externas.
*   **Persistencia (The Memory):** **PostgreSQL** con un modelo híbrido (Relacional + JSONB) para manejar datos heterogéneos de proveedores SaaS con integridad ACID total.
*   **Infraestructura:** Contenerización con **Docker** y pipelines de CI/CD mediante **GitHub Actions**.

👉 *Para una visión técnica detallada, consulta el documento oficial:* [ARCHITECTURE.md](./ARCHITECTURE.md)


## 11. Riesgos y Mitigaciones

### 11.1 Riesgos Identificados
| Riesgo Identificado | Probabilidad | Impacto | Estrategia de Mitigación |
| --- | --- | --- | --- |
| **Desalineación Diseño-Código** | Alta | Medio | El Frontend no comienza hasta que el contrato de API (Swagger) esté aprobado y los Mockups validados. |
| **Complejidad de Datos** | Media | Alto | Uso estricto de Pydantic para validar datos de entrada y evitar "datos basura" en la DB. |
| **Scope Creep (Alcance)** | Alta | Alto | Mantener estrictamente fuera del alcance la integración bancaria y multi-moneda en la V1. |

### 11.2 Alcance Fuera de Scope (Lente de Diseño)
Para mantener el foco en el MVP, se excluye intencionalmente:
*   **Iconografía Custom:** Se utilizarán librerías estándar (Lucide/Radix) para no retrasar el desarrollo con diseño de activos visuales secundarios.
*   **Visualizaciones de Datos Complejas:** Excluidas redes de nodos o diagramas de Sankey; nos limitamos a Recharts (barras, líneas, tortas) por su alta legibilidad financiera.
*   **Micro-interacciones decorativas:** Cualquier animación que no proporcione feedback funcional o reduzca la carga cognitiva.