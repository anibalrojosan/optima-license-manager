# ADR-004: Estrategia de Internacionalización (i18n)

* **Estado:** Aceptado
* **Fecha:** 2026-02-13

## Contexto
El producto nace con ambición global y requiere precisión terminológica en conceptos financieros sensibles.

## Decisión
Implementación nativa de **i18n** desde el core de la arquitectura base (v1.0) con persistencia en **localStorage** del navegador.

## Alternativas consideradas
* **Traducción Automática:** Insuficiente para términos financieros técnicos que requieren contexto exacto.
* **Hardcoding Inicial:** Genera una deuda técnica masiva que obligaría a refactorizar toda la UI en el futuro.
* **Persistencia en Backend:** Añade complejidad innecesaria para el MVP. El backend no necesita conocer la preferencia de idioma del usuario ya que las traducciones se manejan completamente en el frontend.

## Justificación Técnica
1. **Deuda Técnica Preventiva:** Integrar i18n desde el inicio asegura que cada nuevo componente nazca listo para múltiples regiones, evitando refactorizaciones costosas.
2. **Precisión Terminológica:** Los términos financieros (ej. "Write-off", "Amortization") requieren traducciones controladas mediante diccionarios (`JSON namespaces`).
3. **Formateo Regional:** Centraliza las reglas de formato de moneda (`, ` vs `. `) y fechas, asegurando consistencia visual según la región del usuario.
4. **Implementación Simplificada (MVP):** El uso de `localStorage` elimina la necesidad de endpoints adicionales en el backend y permite un cambio de idioma instantáneo sin recarga de página.

## Implementación Técnica
- **Frontend:** Selector de idioma (botón ES/EN) ubicado en el header de la aplicación, visible en todas las páginas después del login.
- **Persistencia:** Preferencia guardada en `localStorage` con clave `optima-locale` (valores: `'es'` | `'en'`).
- **Archivos de Traducción:** Diccionarios JSON en `frontend/src/locales/es/common.json` y `frontend/src/locals/en/common.json`.
- **Provider:** Context API de React para distribuir el idioma actual y la función de cambio a todos los componentes.
- **Backend:** No requiere cambios. El backend devuelve datos numéricos y formateados según el locale del usuario (si aplica), pero las traducciones de texto se manejan exclusivamente en el frontend.

## Consecuencias
* **Desarrollo:** Requiere un pequeño esfuerzo adicional al crear nuevos textos en la UI (usar keys de traducción en lugar de strings hardcodeados).
* **Calidad:** Mejora la percepción de profesionalismo y facilita la expansión a mercados internacionales.
* **Escalabilidad Futura:** En versiones posteriores, se puede migrar la preferencia de idioma al perfil de usuario en el backend sin romper la funcionalidad existente.