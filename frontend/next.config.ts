// Esta configuración permite que el frontend pueda comunicarse con el backend al puerto 8000

import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

// Aplica el plugin de internacionalización
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Envía las peticiones de la API al backend
const backendUrl = process.env.BACKEND_URL ?? 'http://127.0.0.1:8000';

// Configuración de Next.js
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
        pathname: '/**',
      },
    ],
  },
  // Reescribe las rutas de la API para que apunten al backend
  rewrites: async () => [
    {
      source: '/api/:path*',
      destination: `${backendUrl}/api/:path*`,
    },
  ],
};


  // Luego, se aplica el plugin de internacionalización y el proxy de la API
export default withNextIntl(nextConfig);