//El H1, subtítulo y el botón que dispara el Modal
//Usar next-intl para los textos y un botón que dispare el modal de login/register

"use client";

import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { WelcomeModal } from "./WelcomeModal";
import { useState } from "react";

export function Hero() {
  const t = useTranslations('Index');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="text-center space-y-8 max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
          {t('title')}
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          {t('description')}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button 
          size="lg" 
          className="px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-primary/20 transition-all"
          onClick={() => setIsModalOpen(true)}
        >
          {t('cta_start')}
        </Button>
      </div>

      <WelcomeModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}