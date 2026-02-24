# ADR-008: Metodología de estilos y design system

* **Estado:** Aceptado
* **Fecha:** 2026-02-18

## Contexto
El frontend debe garantizar soporte nativo para Modo Oscuro y diseño responsivo, manteniendo una velocidad de desarrollo alta.

## Decisión
Se selecciona **Tailwind CSS** como motor de estilos, **shadcn/ui** como librería de componentes base, y **Recharts** como librería de gráficos.

## Alternativas consideradas
* **CSS Modules / Styled Components:** Requieren más código boilerplate y no ofrecen la misma velocidad de desarrollo que Tailwind. El soporte para Modo Oscuro requiere configuración adicional manual.
* **Material-UI (MUI) / Chakra UI:** Librerías de componentes completas pero con limitaciones en personalización. El bundle size es significativamente mayor y la curva de aprendizaje para customización profunda es alta.
* **Chart.js / D3.js:** Chart.js es menos flexible para visualizaciones complejas de datos financieros. D3.js tiene una curva de aprendizaje muy alta y requiere mucho código para gráficos comunes.
* **CSS-in-JS (Emotion / Styled-components):** Añade overhead en runtime y complejidad en la configuración de SSR con Next.js. Tailwind se compila en build-time, mejorando el rendimiento.

## Justificación Técnica
1. **Tailwind CSS (Utility-First):** Garantiza un bundle de CSS pequeño y evita colisiones de estilos. Su integración con variables CSS facilita el Modo Oscuro mediante configuración centralizada.
2. **Shadcn/ui:** Proporciona el código fuente de los componentes, permitiendo personalización total y control sobre la accesibilidad sin dependencias externas pesadas.
3. **Recharts:** Es una librería de gráficos para React, caracterizada por ser ligera, flexible y fácil de usar. Ofrece una API basada en componentes que simplifica la creación de gráficos personalizados, evitando el código repetitivo o boilerplate de otras librerías.
4. **Consistencia de Tokens:** La configuración de Tailwind actúa como **única fuente de verdad** para colores, tipografía, grid, espaciados, border-radius, sombras, motions y breakpoints.

## Consecuencias
* **Velocidad de Iteración:** Prototipado y desarrollo de componentes de alta fidelidad capaces de escalar a producción.
* **Personalización:** Control total sobre la UI sin las limitaciones de un paquete externo.