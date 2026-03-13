import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('Index');
  
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}