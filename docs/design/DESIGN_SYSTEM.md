# Design System: Optima

Este documento define el ecosistema visual de Optima, asegurando la consistencia entre el diseño y la implementación técnica. Optima está diseñado para ser una plataforma **Financiera, Analítica y Profesional**, transmitiendo Control, Claridad y Precisión.

## Tabla de contenidos
1. [Color System (Semántico + Escalable)](#1-color-system-semántico--escalable)
   - [1.1 Filosofía del Design System](#11-filosofía-del-design-system)
   - [1.2 Color Tokens Definitivos](#12-color-tokens-definitivos)
     - [1.2.1 Core Tokens](#121-core-tokens)
     - [1.2.2 Estados Interactivos](#122-estados-interactivos)
2. [Sistema Tipográfico](#2-sistema-tipográfico)
   - [2.1 Principio Estructural](#21-principio-estructural)
   - [2.2 Tipografía Primaria](#22-tipografía-primaria)
     - [2.2.1 Escala Tipográfica](#221-escala-tipográfica)
   - [2.3 Tipografía Secundaria](#23-tipografía-secundaria)
     - [2.3.1 Escala Numérica](#231-escala-numérica)
   - [2.4 Reglas de Aplicación Financiera](#24-reglas-de-aplicación-financiera)
3. [Spacing System](#3-spacing-system)
   - [3.1 Escala de Espaciado](#31-escala-de-espaciado)
   - [3.2 Separaciones Estándar](#32-separaciones-estándar)
4. [Grid System](#4-grid-system)
   - [4.1 Mobile](#41-mobile)
   - [4.2 Tablet](#42-tablet)
   - [4.3 Desktop](#43-desktop)
   - [4.4 Dashboard Layout](#44-dashboard-layout)
5. [Borders & Radius](#5-borders--radius)
   - [5.1 Border Radius Scale](#51-border-radius-scale)
6. [Elevation (Sombras)](#6-elevation-sombras)
   - [6.1 Shadow Tokens](#61-shadow-tokens)
7. [Motion System](#7-motion-system)
   - [7.1 Duraciones](#71-duraciones)
8. [Dark Mode Rules](#8-dark-mode-rules)
9. [Component Governance](#9-component-governance)
10. [Iconography](#10-iconography)
11. [Accessibility (A11Y)](#11-accessibility-a11y)
12. [Recharts Tokens](#12-recharts-tokens)
    - [12.1 Jerarquía Visual en Gráficos](#121-jerarquía-visual-en-gráficos)
    - [12.2 Tipografía en Recharts](#122-tipografía-en-recharts)
    - [12.3 Grid System dentro del gráfico](#123-grid-system-dentro-del-gráfico)
    - [12.4 Color en estados financieros](#124-color-en-estados-financieros)
    - [12.5 Densidad cognitiva](#125-densidad-cognitiva)
    - [12.6 Jerarquía Tooltip](#126-jerarquía-tooltip)
    - [12.7 Estados interactivos en gráficos](#127-estados-interactivos-en-gráficos)
    - [12.8 Recharts Design Tokens](#128-recharts-design-tokens)

---

## 1. Color System (Semántico + Escalable)

### 1.1 Filosofía del Design System

El Design System de Optima es la base visual y estructural que asegura coherencia, claridad y precisión en toda la plataforma.

Diseñado para un contexto FinOps, transmite confianza, control y rigor financiero, alineando experiencia de usuario e implementación técnica bajo un mismo lenguaje visual.

La dirección cromática principal sigue una línea FinOps Corporate, con una alternativa Dark Finance Minimal enfocada en análisis prolongado y reducción de fatiga visual.

### 1.2 Color Tokens Definitivos
Definimos roles semánticos basados en variables CSS para facilitar la integración con Tailwind, shadcn/ui e integramos Recharts para la definición de los gráficos.

#### 1.2.1 Core Tokens
| Token | Descripción | Hex | Uso |
|-------|-------------|-----|-----|
| Tonos de UI |
| `--background`           | Color de fondo principal |`#F8FAFC`| slate-50 → limpio y profesional|
| `--foreground`           | Color de texto principal |`#0F172A`| slate-900 → alto contraste |
| `--primary`              | Color de marca Navy corporativo |`#0B1F3A`| Navy corporativo → profesional y confiable |
| `--primary-foreground`   | Texto sobre color primario |`#FFFFFF`| Máximo contraste sobre navy |
| `--secondary`            | Color secundario |`#1E293B`|Slate-800 → paneles, cards importantes |
| `--secondary-foreground` | Texto sobre color secundario |`#F1F5F9`|Texto claro sobre slate oscuro |
| `--accent`               | Color de acento Cyan financiero |`#0EA5E9`| Cyan financiero |
| `--accent-foreground`    | Texto sobre color de acento |`#FFFFFF`| Contraste correcto sobre cyan |
| Tonos de Soporte |
| `--muted`                | Tonos apagados para UI secundaria |`#E2E8F0`|slate-200 → apagado para UI secundaria |
| `--muted-foreground`     | Texto sobre fondos apagados |`#475569`| slate-600 → texto sobre fondos apagados |
| `--border`               | Color de bordes de componentes |`#CBD5E1`|slate-300 → color de bordes de componentes |
| `--input`                | Fondo de inputs y controles |`#FFFFFF`|slate-50 → fondo de inputs y controles |
| `--ring`                 | Color para anillos de enfoque (focus) |`#38BDF8`|slate-400 → color para anillos de enfoque (focus) |
| Tonos de Estados Semánticos |
| `--destructive`          | Alertas críticas y errores |`#DC2626`|red-600 → alertas críticas y errores |
| `--destructive-foreground` | Texto sobre color destructivo |`#FFFFFF`| Máximo contraste sobre red |
| `--success`              | Estados positivos y crecimientos |`#16A34A`|green-600 → estados positivos y crecimientos |
| `--warning`              | Advertencias y estados preventivos |`#F59E0B`|Amber-500 → advertencias y estados preventivos |

#### 1.2.2 Estados Interactivos
| Estado | Token / Aplicación | Hex | Lógica |
|--------|---------------------|-----|--------|
| Default | `primary` | `#0B1F3A` | Color base |
| Hover | `primary/90` | `#091A31` | Respuesta inmediata |
| Active | `primary/80` | `#071526` | Confirmación táctil |
| Focus | `ring` + outline | `#38BDF8` | Accesibilidad |
| Disabled | `muted` + opacity-50 | `#E2E8F0` | Prevención |
| Loading | `feedback` + opacity-70 + spinner | `#0B1F3A` | Feedback de sistema |

---

## 2. Sistema Tipográfico

### 2.1 Principio Estructural
La tipografía en Optima no es solo una elección estética, es una **herramienta funcional** para la jerarquía de información:

*   **Inter:** Contenido semántico, narrativo y de control de interfaz.
*   **Roboto Mono:** Datos cuantitativos, valores financieros y precisión técnica.

---

### 2.2 Tipografía Primaria
La tipografía primaria es **Inter**, una fuente sans-serif que se utiliza para el contenido semántico, narrativo y de control de interfaz.
**Uso:** Headings, Body, Labels, Navegación, Botones y Microcopy.

#### 2.2.1 Escala Tipográfica
**Base:** 16px | **Font Family:** `Inter, sans-serif`

**Headings**
| Nivel | Tamaño | Line Height | Letter Spacing | Peso | Uso |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **H1** | 32px | 40px | -0.02em | 700 (Bold) | Títulos de página principales |
| **H2** | 24px | 32px | -0.01em | 600 (SemiBold) | Secciones mayores |
| **H3** | 20px | 28px | 0 | 600 (SemiBold) | Títulos de cards y modales |
| **H4** | 18px | 26px | 0 | 500 (Medium) | Subsecciones y agrupadores |

**Body**
| Tipo | Tamaño | Line Height | Peso | Uso |
| :--- | :--- | :--- | :--- | :--- |
| **Body Large** | 16px | 24px | 400 | Texto principal narrativo |
| **Body Default** | 14px | 22px | 400 | Contenido estándar de dashboards |
| **Body Small** | 12px | 18px | 400 | Metadata y descripciones cortas |

**Componentes UI (Inter)**
| Tipo | Tamaño | Peso | Uso |
| :--- | :--- | :--- | :--- |
| **Button** | 14px | 600 | Call to Action (CTA) |
| **Badge** | 11px | 600 | Estados y etiquetas (Uppercase) |
| **Microcopy** | 12px | 400 | Helper text / Mensajes de sistema |
| **Chart Label** | 12px | 400 | Etiquetas descriptivas en Recharts |

---

### 2.3 Tipografía Secundaria
La tipografía secundaria es **Roboto Mono**, una fuente monospace que se utiliza para los valores financieros, tablas numéricas, KPIs, decimales, porcentajes e IDs técnicos.
**Uso Exclusivo:** Cifras, valores financieros, tablas numéricas, KPIs, decimales, porcentajes e IDs técnicos.

**Font Family:** `Roboto Mono, monospace`

#### 2.3.1 Escala Numérica
| Tipo | Tamaño | Peso | Uso |
| :--- | :--- | :--- | :--- |
| **Table Data** | 14px | 400 | Cifras en celdas de tablas |
| **Financial Value** | 16px | 600 | Montos destacados en resúmenes |
| **KPI Large** | 20–24px | 600 | Indicadores principales de Dashboard |
| **Decimal** | Same as value | 400 | Parte decimal de un monto |

---

### 2.4 Reglas de Aplicación Financiera
Para garantizar la legibilidad y reducir el ruido cognitivo en contextos de alta densidad de datos:

*   **Valores Monetarios:**
    *   Siempre **SemiBold (600)**.
    *   Siempre **Roboto Mono**.
    *   *Ejemplo:* `$ 1,240.75` (Donde `1,240` es 600 y `.75` es 400 con ~70% de opacidad).
*   **Manejo de Decimales:**
    *   Peso menor (400) y opcionalmente color `--muted-foreground`.
    *   Esto enfoca la vista en la magnitud principal del gasto/ahorro.
*   **Alineación Predictiva:**
    *   **Tablas financieras:** Siempre alineación a la derecha (`right-aligned`) para comparación vertical.
    *   **KPIs centrales:** Centrados para impacto visual.
    *   **Listas mixtas:** Números alineados en columna fija para escaneo rápido.

---

## 3. Spacing System

El espaciado en Optima sigue una escala modular basada en una **unidad de 4px**. Esta escala asegura consistencia visual y facilita el diseño responsivo.

**Base unit:** 4px

### 3.1 Escala de Espaciado
| Token | Valor |
|-------|-------|
| 0 | 0 |
| 1 | 4px |
| 2 | 8px |
| 3 | 12px |
| 4 | 16px |
| 5 | 20px |
| 6 | 24px |
| 8 | 32px |
| 10 | 40px |
| 12 | 48px |
| 16 | 64px |
| 24 | 96px |

### 3.2 Separaciones Estándar
- **Dentro de componente:**
  - Button padding: 8px 16px
  - Card padding: 24px
  - Modal padding: 32px
- **Entre componentes:**
  - Cards grid gap: 24px
  - Form fields gap: 16px
  - Sección a sección: 48px

---

## 4. Grid System

**Justificación**: Se determinó que el grid de 12 columnas es el más adecuado para la plataforma, ya que permite una mayor flexibilidad en el diseño de dashboards y visualizaciones de datos.

**Determinamos que la plataforma se desarrollará como Desktop-first**, ya que la mayoría de los usuarios utilizarán la plataforma en computadoras de escritorio. Y adaptable a tablet y mobile para su visualización responsive, con las siguientes resoluciones:

### 4.1 Mobile
- **Columnas:** 4
- **Margin lateral:** 16px
- **Max width:** 360px
- **Gutter:** 16px

### 4.2 Tablet
- **Columnas:** 8
- **Margin lateral:** 24px
- **Max width:** 768px
- **Gutter:** 24px

### 4.3 Desktop
- **Columnas:** 12
- **Max width:** 1440px
- **Margin lateral:** 32px
- **Gutter:** 24px

### 4.4 Dashboard Layout
- **Sidebar:** 240px (colapsable)
- **Content:** Grid adaptable con scroll independiente si es necesario.

---

## 5. Borders & Radius

### 5.1 Border Radius Scale
| Uso | Valor |
|-----|-------|
| Small | 4px |
| Medium | 8px |
| Large | 12px |
| XLarge | 16px |

**Aplicación:**
- **Cards:** 12px
- **Buttons:** 8px
- **Badges:** 16px

---

## 6. Elevation (Sombras)

**Justificación**: Se determinó que el sistema de sombras debe ser sutil y funcional, sin ruido visual.

### 6.1 Shadow Tokens
| Token | Efecto | Uso |
|-------|--------|-----|
| `shadow-sm` | Subtle border | Dashboard cards |
| `shadow-md` | Card elevation | Hover states |
| `shadow-lg` | Modal elevation | Modals y Popovers |

---

## 7. Motion System

**Justificación**: Se determinó que el Motion System de Optima debe ser sutil y funcional.

### 7.1 Duraciones
- **Micro-interaction:** 150ms
- **Layout shift:** 250ms
- **Modal:** 300ms (ease-in-out)

---

## 8. Dark Mode Rules

**Justificación**: Se determinó que el Dark Mode de Optima debe ser sutil y funcional.

1. **Background:** 100% neutral dark.
2. **Surface:** Aumento de +4% en luminosidad respecto al fondo.
3. **Borders:** Ligeramente más claros que en Light Mode para definir volúmenes.
4. **Sombras:** Reducidas en opacidad (el contraste lo da el color de superficie).
5. **Charts:** Asegurar contraste AA en todos los elementos de visualización.

---

## 9. Component Governance

Cada componente añadido a la librería debe documentar:
- **Props:** Definición de tipos y valores por defecto.
- **Estados:** Visualización de Hover, Active, Focus, Disabled, Loading.
- **Accesibilidad:** Roles ARIA y navegación por teclado.
- **Uso correcto:** Cuándo usar este componente y no otro.
- **Casos prohibidos:** Ejemplos de mal uso o degradación visual.

---

## 10. Iconography

**Justificación**: Se determinó que el sistema de iconos debe ser consistente y funcional, utilizando una librería estándar que permita escalabilidad.

- **Librería**: Lucide React.
- **Stroke width**: 2px para iconos de UI, 1.5px para iconos ilustrativos.
- **Tamaño estándar**: 20x20px para botones y navegación, 16x16px para badges y microcopy.

---

## 11. Accessibility (A11Y)

**Justificación**: Optima se compromete con la accesibilidad para garantizar que la plataforma sea utilizable por todos.

- **Contraste**: Todos los elementos de texto y UI deben cumplir con el estándar WCAG AA (ratio mínimo 4.5:1).
- **Navegación**: Soporte completo para navegación por teclado (Focus rings visibles).
- **Semántica**: Uso de etiquetas HTML semánticas y roles ARIA cuando sea necesario.
- **Doble Codificación**: No depender únicamente del color para transmitir información (ej. usar iconos + color en alertas).

---

## 12. Recharts Tokens

Se define la lógica visual de los gráficos basada en el comportamiento, jerarquía, peso cognitivo y reducción de ruido.

### 12.1 Jerarquía Visual en Gráficos

#### Nivel 1 – Data principal (Insight core)
*   **Línea principal:** `--accent`
*   **Stroke width:** 2.5px
*   **Punto activo (dot):** Más grande
*   **Opacidad:** 1

#### Nivel 2 – Data secundaria
*   **Color:** `--muted`
*   **Stroke width:** 1.5px
*   **Opacidad:** 0.6

#### Nivel 3 – Contexto (Grid, Axis)
*   **Color:** `--border` o `--muted`
*   **Opacidad:** 0.3–0.4
*   **Estilo:** Stroke dashed si es referencia

---

### 12.2 Tipografía en Recharts

#### Axis Labels
*   **Font:** `Inter`
*   **Tamaño:** 12px
*   **Peso:** 400
*   **Color:** `--muted-foreground`
*   **Opacidad:** 0.7

#### Tooltip – Valores financieros
Para valores monetarios en tooltip:
*   **Parte entera:** `Roboto Mono 600`
*   **Decimal:** `Roboto Mono 400` (con 70% de opacidad)

**Ejemplo visual:**
`$ 2,450.75`
Donde `2,450` tiene peso fuerte y `.75` tiene peso menor y opacidad reducida.

---

### 12.3 Grid System dentro del gráfico
*   **Definición de Grid:** Máximo 4–6 líneas horizontales.
*   **Líneas:** Sin líneas verticales si no son necesarias.
*   **Bordes:** Sin borde completo del chart.
*   **Saturación:** No usar saturación alta en grid.

---

### 12.4 Color en estados financieros
*   **Línea:** Neutral
*   **Área:** Área bajo curva con gradiente suave.
*   **Estados:** Solo el punto crítico se resalta en verde (`--success`) o rojo (`--destructive`).

---

### 12.5 Densidad cognitiva
**Regla:** Los gráficos deben poder entenderse en **3 segundos**.
**Lógica:**
*   No más de 2–3 líneas principales.
*   No más de 2 colores saturados.
*   No más de 1 insight destacado.

---

### 12.6 Jerarquía Tooltip
*   **Estructura:**
    *   **Fecha:** `Inter 12px muted`
    *   **Valor principal:** `Roboto Mono 16px 600`
    *   **Variación:** `Roboto Mono 14px` + `--success`/`--destructive`
*   **Contenedor:**
    *   **Fondo:** `--background`
    *   **Borde:** `--border`
    *   **Sombra:** `shadow-md`

---

### 12.7 Estados interactivos en gráficos
*   **Hover en línea:** Aumentar stroke width + glow leve.
*   **Punto activo:** Tamaño mayor (radius: 5px).
*   **Cursor vertical line:** `--border` + opacity 0.5.

---

### 12.8 Recharts Design Tokens

#### Colores
*   **Primary Line:** `--accent`
*   **Secondary Line:** `--muted`
*   **Positive Highlight:** `--success`
*   **Negative Highlight:** `--destructive`
*   **Grid Lines:** `--border` (opacity 0.3)
*   **Axis Labels:** `--muted-foreground` (opacity 0.7)
*   **Tooltip Background:** `--background`
*   **Tooltip Border:** `--border`

#### Tipografía
*   **Axis:** `Inter 12px 400`
*   **Tooltip Fecha:** `Inter 12px`
*   **Tooltip Valor:** `Roboto Mono 16px 600`
*   **Tooltip Decimal:** `Roboto Mono 16px 400` + 70% opacity
*   **Tooltip Variación:** `Roboto Mono 14px` + `--success`/`--destructive`

#### Jerarquía Visual
*   **Primary stroke width:** 2.5px
*   **Secondary stroke width:** 1.5px
*   **Active dot radius:** 5px
*   **Normal dot radius:** 3px
