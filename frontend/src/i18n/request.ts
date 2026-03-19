//Next.js y next-intl exigen que "locale" sea una Promesa
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Definimos los locales como un tipo constante para TypeScript
const locales = ['en', 'es'] as const;
type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  // Obtener el locale de forma asíncrona (requerido por next-intl y Next.js 15+)
  const locale = await requestLocale;//Al usar await, el código "espera" a estar seguro de si el usuario está en /es o /en

  // Validar que el locale sea uno de los permitidos
  if (!locale || !locales.includes(locale as Locale)) {//si alguien intenta ejecutar otro idioma, el código ejecuta notFound()
    notFound();
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});