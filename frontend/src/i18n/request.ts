import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Definimos los locales como un tipo constante para TypeScript
const locales = ['en', 'es'] as const;
type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Validamos que el locale sea uno de los permitidos
  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    locale: locale as string,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});