# ADR-007: Gestión de estado en Frontend

* **Estado:** Aceptado
* **Fecha:** 2026-02-18

## Contexto
El frontend requiere manejar estados con necesidades distintas: datos del servidor, estados globales de la interfaz y autenticación, evitando re-renderizados innecesarios.

## Decisión
Se adopta un enfoque híbrido:
1. **Server State:** [TanStack Query](https://tanstack.com/query/latest) (React Query).
2. **Global UI State:** [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction).
3. **Auth State:** Context API (React).

## Alternativas consideradas
* **Redux Toolkit:** Demasiado verboso y con mucho boilerplate para las necesidades del proyecto. La curva de aprendizaje es más alta y requiere más configuración inicial. Aunque es maduro, es excesivo para el tamaño del proyecto.
* **Jotai/Recoil:** Soluciones modernas pero menos maduras que Zustand, con menor ecosistema y documentación. Recoil requiere más configuración y tiene dependencias de Facebook que pueden cambiar.
* **Solo Context API para todo:** Generaría re-renderizados innecesarios y complejidad en la gestión de estado del servidor sin las ventajas de caché y sincronización automática que ofrece TanStack Query.
* **SWR (Vercel):** Alternativa a TanStack Query, pero con menor ecosistema y menos características avanzadas como mutations optimistas y devtools.

## Justificación Técnica
1. **TanStack Query:** 
    - Maneja automáticamente caché, "Background fetching" y reintentos, vital para la resiliencia en la sincronización con el backend. Además, simplifica la obtención, almacenamiento en caché, sincronización y actualización de datos del servidor (API) en aplicaciones web.
    - Actúa como una capa entre la interfaz y el servidor, eliminando la necesidad de `useEffect` y `useState` complejos, mejorando el rendimiento y facilitando la experiencia de usuario con datos siempre actualizados.

2. **Zustand:** 
    - Es una librería de gestión de estado global para React, caracterizada por ser extremadamente ligera (~1 KB), rápida y minimalista, sin requerir proveedores de contexto (Providers).
    - Ofrece una API basada en hooks que simplifica el manejo de estados compartidos, como temas o barras laterales, evitando el código repetitivo o boilerplate de Redux.

3. **Context API:** 
    - Es una característica nativa de React diseñada para gestionar estados globales, permitiendo compartir datos (como el usuario autenticado) a través de todo el árbol de componentes sin necesidad de pasar props manualmente en cada nivel.
    - Al reservarla para autenticación, se crea un proveedor centralizado que simplifica la protección de rutas y la gestión de la sesión.

## Consecuencias
* **Rendimiento:** Reducción de re-renderizados mediante selectores eficientes y caché inteligente.
* **Mantenibilidad:** Separación clara entre datos del servidor y estado visual.