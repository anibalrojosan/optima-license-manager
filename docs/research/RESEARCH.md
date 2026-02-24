# Research & benchmarks: Optima

Este documento resume los hallazgos y la investigación que justifican la dirección visual y funcional de Optima.

## Tabla de contenidos
1. [Benchmark Competitivo](#1-benchmark-competitivo)
2. [Investigación de Usuarios (User Archetypes)](#2-investigación-de-usuarios-user-archetypes)
3. [Justificación de la Solución Visual](#3-justificación-de-la-solución-visual)
4. [Pruebas de Concepto (IA Prototyping)](#4-pruebas-de-concepto-ia-prototyping)
5. [Estrategia de KPIs y Trade-offs](#5-estrategia-de-kpis-y-trade-offs)
   - [5.1 Enterprise Bloat](#51-enterprise-bloat)
   - [5.2 Falta de Visualización Financiera Directa](#52-falta-de-visualización-financiera-directa)
   - [5.3 Mobile Experience Deficiente](#53-mobile-experience-deficiente)
   - [5.4 Investigación de Usuarios & KPIs Asociados](#54-investigación-de-usuarios--kpis-asociados)
   - [5.5 Justificación de la Solución Visual & Evidencia Estratégica](#55-justificación-de-la-solución-visual--evidencia-estratégica)
   - [5.6 Evidencia Diferencial & Posicionamiento Senior FinOps](#56-evidencia-diferencial--posicionamiento-senior-finops)

## 1. Benchmark Competitivo
Analizamos plataformas como **Zluri**, **BetterCloud** y **Torii**.

### Hallazgos clave:
- **Complejidad Excesiva:** Muchas herramientas están orientadas a empresas Enterprise con curvas de aprendizaje de semanas. Optima busca el **"Zero Learning Curve"**.
- **Falta de Visualización Financiera Directa:** Los competidores suelen enfocarse en el inventario, pero no en la proyección de flujo de caja (Cash Flow).
- **Mobile Experience deficiente:** La mayoría son "Desktop only" o tienen versiones móviles donde es imposible realizar acciones rápidas.

## 2. Investigación de Usuarios (User Archetypes)
- **IT Manager:** "Siento que el Excel siempre está desactualizado". Necesitan automatización de avisos.
- **CFO:** "No sé cuánto vamos a pagar en licencias el próximo trimestre". Necesitan gráficos de tendencia.

## 3. Justificación de la Solución Visual
- **Dashboard Modular:** Se eligió un diseño basado en tarjetas (Cards) por su facilidad para reordenar y su adaptabilidad a pantallas móviles.
- **Estética Dark Mode por Defecto:** Basado en la preferencia de los perfiles técnicos (IT) y la reducción de fatiga visual en dashboards prolongados.
- **Uso de Shadcn/UI + Tailwind:** Permite consistencia de tokens, cero colores hardcoded y un tiempo de iteración reducido.
- **Recharts:** Permite control granular de tooltips y optimización de rendering para leyendas financieras.

## 4. Pruebas de Concepto (IA Prototyping)
Se utilizaron **Lovable** y **v0.dev** para iterar rápidamente sobre el layout del dashboard.
- **Resultado:** Los usuarios prefirieron una barra lateral (Sidebar) colapsable para maximizar el espacio de las tablas de datos en Desktop.

## 5. Estrategia de KPIs y Trade-offs

En este benchmark corporativo se evaluaron KPIs y trade-offs iniciales de 3 plataformas (**Zluri, BetterCloud, Torii**) para determinar evidencias clave utilizadas como oportunidad estratégica para distinguir Optima como la mejor alternativa FinOps.

### 5.1 Enterprise Bloat
**Evidencia Observada:**
- Interfaces sobrecargadas y múltiples capas de navegación.
- Setup inicial complejo.
- Enfoque fuerte en automatizaciones IT antes que visibilidad financiera inmediata.

**Problema Real:**
- **Para IT Managers:** Tiempo excesivo hasta obtener control real.
- **Para CEOs y CFOs:** Necesitan ver tendencias de gasto antes de configurar reglas avanzadas.

**KPIs Evidenciados:**
| KPI | Problema Detectado |
| :--- | :--- |
| **Time-to-Value** | Alto (días/semanas) |
| **Cognitive Load** | Elevado |
| **Feature Adoption** | Parcial por complejidad |

**Decisión Optima:** *Zero Learning Curve Principle*: Si una acción crítica no puede realizarse en ≤3 clics, el diseño debe simplificarse.

**⚖️ Trade-off #1**
- **Decisión:** Menos configuración avanzada en V1.
- **Sacrificio:** No competir en automatización profunda Enterprise.
- **Justificación:** Optima prioriza acción inmediata, visibilidad financiera instantánea y reducción de fricción.

### 5.2 Falta de Visualización Financiera Directa
**Observación del Benchmark:**
Las plataformas analizadas priorizan inventario de aplicaciones, gestión de permisos y workflows IT, pero omiten:
- Cash Flow proyectado.
- Tendencia trimestral clara.
- Visualización de impacto presupuestario inmediato.

**Problema Detectado:**
Congestión visual y lentitud en decisión debido a numerosas funcionalidades y detalles excesivos por cada licencia. Optima propone la reducción del flujo de Decisión (Delete License), impactando directamente en TTV y Adopción.

**KPI de Negocio Definido para Optima:**
- **Time-to-Value:** Usuario visualiza gasto total en <5 minutos.
- **Precisión de Proyección:** <1% de varianza.
- **Adopción:** Sustituir Excel manual en ≤30 días.

**⚖️ Trade-off #2**
- **Decisión:** Priorizar gráficos de tendencia sobre inventario detallado.
- **Sacrificio:** Menor profundidad técnica en V1.
- **Propuesta:** Flujo de caja, claridad financiera y rápida decisión ejecutiva.

### 5.3 Mobile Experience Deficiente
**Observación:** Las plataformas analizadas son esencialmente *Desktop-first Enterprise dashboards*. En mobile, presentan experiencia limitada, sin acciones críticas y visualización comprimida.

**Problema Estratégico:**
CEO y CFO revisan métricas en movilidad, necesitan contexto rápido y toman decisiones fuera del escritorio.

**KPI de Experiencia para Optima:**
- 100% de funciones críticas operables en mobile.
- Visualización financiera legible ≥360px (resolución mobile).
- Carga de dashboard <2s en red 4G.

**⚖️ Trade-off #3**
- **Decisión:** Mobile funcional real.
- **Sacrificio:** 
  - Mayor complejidad de diseño responsive.
  - Tablas optimizadas para scroll horizontal controlado.
  - Menor estética “minimalista” (densidad de datos vs. espacios en blanco).
- **Propuesta:** Optima sugiere una plataforma FinOps sólida y ejecutable en movilidad.

### 5.4 Investigación de Usuarios & KPIs Asociados
| Arquetipo | Problema | KPI UX |
| :--- | :--- | :--- |
| **IT Manager** | Excel desactualizado | 90% errores manejados sin recarga; Alertas visibles sin navegación secundaria; Registro de licencia <60s |
| **CEO/CFO** | Falta de previsión trimestral | Filtro aplicado <100ms; Tendencia visible sin cambiar de vista; Comparación de categorías en misma pantalla |

### 5.5 Justificación de la Solución Visual & Evidencia Estratégica
- **Dashboard Modular:**
  - **KPI Asociado:** Reducción de fricción cognitiva; Escalabilidad futura sin rediseño completo.
- **Dark Mode por Defecto:**
  - **Evidencia:** Usuarios técnicos prefieren entornos oscuros; Reducción de fatiga visual en dashboards prolongados. 
  - **⚖️ Trade-off:** Menor percepción “corporativa tradicional” (mitigado con paleta FinOps sobria).
- **Shadcn/UI + Tailwind:**
  - **KPI Técnico:** Consistencia de tokens; Cero colores hardcoded; Time-to-iteration reducido.
- **Recharts (Decisión Estratégica):**
  - **Permite:** Control granular de tooltips; Optimización de rendering; Customización de leyendas financieras.
  - **⚖️ Trade-off:** Menor potencia que D3 pura (aceptable para MVP).

### 5.6 Evidencia Diferencial & Posicionamiento Senior FinOps
- **Competencia:** Gestión SaaS IT, enfoque administrativo, Enterprise-first.
- **Optima:** Flujo de caja primero, acción ejecutiva inmediata, Mobile operable real, Zero Learning Curve.

**Posicionamiento Estratégico:**
Optima no compite por más features, automatizaciones o configuraciones Enterprise. Compite por **Velocidad, Claridad y Decisión financiera inmediata**.

## Conclusión Estratégica
Optima se diferencia porque:
1. **Reduce Time-to-Value a minutos.**
2. **Hace FinOps operable en mobile.**
3. **Prioriza tendencia financiera sobre inventario técnico.**
4. **Diseña con densidad estratégica, no con bloat visual.**
5. **Implementa trade-offs conscientes alineados a KPIs.**

