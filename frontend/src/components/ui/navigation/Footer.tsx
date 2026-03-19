//Microcopy de Copyright y enlaces legales.

import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('Footer');
  
  return (
    <footer className="w-full py-6 border-t border-border/40 bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
        <p>{t('copyright')}</p>
        <p className="font-mono text-[10px] uppercase tracking-widest opacity-50">
          {t('version')}
        </p>
      </div>
    </footer>
  );
}