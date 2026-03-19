import { createNavigation } from 'next-intl/navigation';

export const locales = ['en', 'es'] as const;

// Exportación de las herramientas de navegación configuradas con esos idiomas
export const { Link, redirect, usePathname, useRouter } =
  createNavigation({ locales });