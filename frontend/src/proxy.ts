import createMiddleware from 'next-intl/middleware';

export const proxyFunction = createMiddleware({
  // Idiomas que soporta Optima
  locales: ['en', 'es'],

  // Idioma por defecto
  defaultLocale: 'es',

  // Esto asegura que si entras a / se redirija a /es automáticamente
  localePrefix: 'always'
});

export { proxyFunction as proxy };
export default proxyFunction;

export const config = {
  // Matcher simplificado para capturar todas las rutas excepto archivos estáticos y API
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};