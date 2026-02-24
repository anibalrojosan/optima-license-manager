# 🚀 Roadmap de Desarrollo (MVP): Optima

Este Roadmap define la ruta de construcción de Optima. Está diseñado para un equipo de dos desarrolladores (Backend + Frontend) trabajando en paralelo mediante un modelo de "Contract First".

---

## FASE 1: Cimientos e Internacionalización
**Objetivo:** Establecer la infraestructura base y el soporte multi-idioma nativo.

### Backend (Python/FastAPI)
- [ ] **BE-101:** Setup de entorno con `uv`, FastAPI y estructura modular profesional.
- [ ] **BE-102:** Configuración de PostgreSQL y Alembic (primera migración).
- [ ] **BE-103:** Base Model de Pydantic para respuestas consistentes y manejo de errores.
- [ ] **BE-104:** Configuración de CORS y Logger para depuración.

### Frontend (Next.js/TS)
- [ ] **FE-101:** Setup de Next.js 14 (App Router) y TypeScript estricto.
- [ ] **FE-102:** Configuración de `next-intl` con diccionarios EN/ES iniciales.
- [ ] **FE-103:** Instalación de Shadcn/UI y configuración de temas (Light/Dark).
- [ ] **FE-104:** Layout base: Sidebar funcional y contenedor con soporte i18n.

**🚩 DoD de Fase 1:**
- El proyecto compila sin errores de TS o Lint.
- Existe un endpoint `/health` que responde correctamente.
- El usuario puede cambiar el idioma en la UI y el cambio persiste.
- **Estado del Sistema:** Una "cáscara" funcional con navegación básica y conexión a DB establecida.

---

## FASE 2: Autenticación y Seguridad
**Objetivo:** Implementar el control de acceso y la protección de datos.

### Backend (Seguridad)
- [ ] **BE-201:** Modelo de `User` y lógica de hashing (Passlib/Bcrypt).
- [ ] **BE-202:** Implementación de JWT (Login, Token Refresh y Logout).
- [ ] **BE-203:** Dependencia de FastAPI `get_current_user` para proteger rutas.
- [ ] **BE-204:** Endpoints de perfil `/me` y registro de usuarios.

### Frontend (Auth UX)
- [ ] **FE-201:** `AuthContext` para manejar el estado global de sesión.
- [ ] **FE-202:** Páginas de Login/Registro con validación de formularios (Zod).
- [ ] **FE-203:** Middleware de Next.js para redirección automática de usuarios no logueados.
- [ ] **FE-204:** Interceptor de Axios/Fetch para inyectar el token JWT.

**🚩 DoD de Fase 2:**
- No es posible acceder a la URL `/dashboard` sin un token válido.
- Las contraseñas se guardan encriptadas en la DB.
- **Estado del Sistema:** El sistema es privado. Solo usuarios registrados pueden entrar a la aplicación.

---

## FASE 3: Gestión de Licencias (Core)
**Objetivo:** El corazón del negocio: CRUD de licencias y cálculos financieros.

### Backend (Lógica)
- [ ] **BE-301:** Migración de tabla `licenses` con relaciones de usuario.
- [ ] **BE-302:** CRUD completo con validaciones de negocio (Pydantic).
- [ ] **BE-303:** Motor de cálculo: Consolidación de costos mensuales en moneda base.
- [ ] **BE-304:** Filtros de búsqueda y paginación en el endpoint `GET /licenses`.

### Frontend (Gestión)
- [ ] **FE-301:** Tabla de licencias (TanStack Table) con ordenamiento y filtrado.
- [ ] **FE-302:** Formulario modal para Crear/Editar (con Optimistic Updates).
- [ ] **FE-303:** Integración de React Query para sincronización BE-FE.
- [ ] **FE-304:** Formateo de monedas y fechas según el locale seleccionado.

**🚩 DoD de Fase 3:**
- El CRUD funciona de punta a punta (crear en FE -> guardar en DB -> ver en FE).
- Los cálculos financieros coinciden entre lo que calcula el BE y lo que muestra el FE.
- **Estado del Sistema:** Una herramienta funcional de inventario de licencias con cálculos automáticos.

---

## FASE 4: Dashboard y Visualización
**Objetivo:** Visualización de datos y alertas proactivas.

### Backend (Analytics)
- [ ] **BE-401:** Endpoints de agregación (Gasto por proveedor, por categoría).
- [ ] **BE-402:** Lógica de alertas para licencias próximas a vencer (<30 días).
- [ ] **BE-403:** Endpoint de resumen ejecutivo para el Dashboard.

### Frontend (Visualización)
- [ ] **FE-401:** Widgets de KPIs (Total Spend, Active Licenses, Alerts).
- [ ] **FE-402:** Gráficos interactivos (Recharts) de distribución de gastos.
- [ ] **FE-403:** Centro de notificaciones visuales en el Dashboard.

**🚩 DoD de Fase 4:**
- El Dashboard carga datos reales de la DB en menos de 500ms.
- Las alertas visuales cambian de color según la urgencia del vencimiento.
- **Estado del Sistema:** Una plataforma de FinOps que no solo guarda datos, sino que entrega insights y previene gastos innecesarios.

---

## FASE 5: QA y Lanzamiento MVP
**Objetivo:** Pulido final y despliegue a producción.

- [ ] **QA-501:** Suite de pruebas E2E (Cypress/Playwright) para el flujo principal.
- [ ] **QA-502:** Revisión de accesibilidad (WCAG) y responsive en móviles.
- [ ] **OPS-503:** Configuración de CI/CD (GitHub Actions) y variables de producción.
- [ ] **OPS-504:** Despliegue final (Vercel para FE, Railway/Render para BE).

**🚩 DoD Final MVP:**
- 0 errores críticos en consola.
- Documentación de API (Swagger) completa y pública.
- **Estado del Sistema:** Producto listo para ser usado por usuarios reales en internet.

---

## POST-MVP (Futuro)
- Integración con APIs de AWS/Azure/Google Cloud.
- Exportación de reportes a PDF/Excel.
- Multi-tenancy (Equipos y Organizaciones).