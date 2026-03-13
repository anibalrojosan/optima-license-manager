import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

// El plugin por defecto busca src/i18n/request.ts, lo hacemos explícito para mayor seguridad
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  /* otras opciones */
};

export default withNextIntl(nextConfig);