'use client';

import { useEffect, useState } from 'react';

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const initMSW = async () => {
      // Solo activa MSW en desarrollo
      if (process.env.NODE_ENV === 'development') {
        const { worker } = await import('@/mocks/browser');
        // 'bypass' permite que las peticiones que NO están en handlers sigan su curso normal
        await worker.start({ onUnhandledRequest: 'bypass' });
      }
      setMswReady(true);
    };

    initMSW();
  }, []);

  if (!mswReady) return null; // Previene fallos visuales/hidratación hasta que MSW cargue

  return <>{children}</>;
}