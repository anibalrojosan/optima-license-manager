'use client';

import { useEffect, useState } from 'react';

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const initMSW = async () => {
      const enableMsw = process.env.NEXT_PUBLIC_ENABLE_MSW === 'true';

      try {
        if (process.env.NODE_ENV === 'development' && enableMsw) {
          const { worker } = await import('@/mocks/browser');
          await worker.start({ onUnhandledRequest: 'bypass' });
        }
      } finally {
        setMswReady(true);
      }
    };

    void initMSW();
  }, []);

  if (!mswReady) return null;

  return <>{children}</>;
}