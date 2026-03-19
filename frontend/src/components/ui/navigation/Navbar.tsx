"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const t = useTranslations("Navbar");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      {/* Usamos un grid de 3 columnas o flex con justify-between. 
          Para centrar perfectamente el medio, el pilar izquierdo y el derecho 
          deben tener un ancho visual similar o usar posicionamiento absoluto para el centro.
      */}
      <div className="container mx-auto px-4 h-16 flex items-center justify-between relative">
        
        {/* 1. Logo (Izquierda) */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-xl font-bold tracking-tighter hover:opacity-70 transition-opacity">
            Optima
          </Link>
        </div>

        {/* 2. Categorías (Centro Absoluto) */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8">
          <button 
            onClick={() => scrollToSection('producto')} 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('product')}
          </button>
          <button 
            onClick={() => scrollToSection('precios')} 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('pricing')}
          </button>
          <button 
            onClick={() => scrollToSection('acerca-de')} 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('about')}
          </button>
        </div>

        {/* 3. Botones (Derecha) */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Button variant="outline" size="sm" asChild>
            <Link href="/auth/login">{t('login')}</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/auth/register">{t('start')}</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}