/// Filtro de Seguridad e Idioma
// Verifica si la página es para todos o solo para miembros - Revisa el "carnet" (token) en las cookies - Entrega la página en el idioma que pediste

import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';//Extensiones de Next.js para las APIs Web estándar (Request y Response), diseñadas para facilitar el manejo de peticiones y respuestas HTTP en el App Router y Middleware

// Configuración original para next-intl
const intlMiddleware = createMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'es',
  localePrefix: 'always'
});

// Rutas públicas en donde la gente sin cuenta debería seguir accediendo
const publicPages = ['/auth/login', '/auth/register', '/'];// '/' es la homepage

//Next.js espera que el archivo de middleware exporte una función por defecto para ejecutarla en cada visita
export default function proxyFunction(req: NextRequest) {//Objeto de petición
  const { pathname } = req.nextUrl;//URL de la petición
  
  // Detectar si es una ruta pública independientemente del locale introducido
  const publicPathnameRegex = RegExp(// Objeto especial en JS que sirve para crear "filtros" o patrones de búsqueda complejos en textos
    `^(/([a-z]{2}))?(${publicPages.join('|')})?/?$`,//la url empieza con 2 letras / ingresa a alguna de las páginas definidas
    'i'//ignora si es en mayúsculas o minúsculas
  );
  const isPublicPage = publicPathnameRegex.test(pathname);// Método que ejecuta la RegExp. Toma el patrón creado y lo "prueba" en el pathname. Si el patrón coincide con la URL, devuelve true.

  const token = req.cookies.get('access_token')?.value;
  
  // 1. Si el usuario (intruso) no tiene Token y está en una ruta privada (como /dashboard): Lo regresamos al Login
  if (!isPublicPage && !token) {
    // Si no sabemos el idioma, forzamos /es
    const locale = pathname.split('/')[1] || 'es';
    return NextResponse.redirect(new URL(`/${locale}/auth/login`, req.url));
  }

  // 2. Si un usuario que ya tiene el JWT validado, quiere entrar manualmente al /login o /register: Redirecciona al /dashboard
  if (isPublicPage && token && (pathname.includes('/login') || pathname.includes('/register'))) {
    const locale = pathname.split('/')[1] || 'es';
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url));
  }

  // 3. Flujo normal (se evalúan las localizaciones /es /en por next-intl)
  return intlMiddleware(req);
}

export const config = {//Ejecuta este middleware en todas las páginas, excepto las que empiezan con api, _next, _vercel o una imagen/icono
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
