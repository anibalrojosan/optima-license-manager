//El componente Dialog (Shadcn) con los botones/inputs a Login/Register

// src/components/ui/home/WelcomeModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Building2, LogIn } from "lucide-react";

interface WelcomeModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WelcomeModal({ isOpen, onOpenChange }: WelcomeModalProps) {
  const t = useTranslations("WelcomeModal");

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] p-8 gap-6 border-none shadow-2xl">
        <DialogHeader className="space-y-3 text-center">
          <DialogTitle className="text-2xl font-bold tracking-tight">
            {t("title")}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-balance">
            {t("description")}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Opción: Iniciar Sesión (Para clientes existentes) */}
          <Button
            asChild
            variant="outline"
            className="h-auto flex items-center justify-start gap-4 p-4 hover:border-primary hover:bg-primary/5 transition-all group"
            onClick={() => onOpenChange(false)}
          >
            <Link href="/auth/login">
              <div className="p-2 rounded-md bg-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <LogIn className="size-5" />
              </div>
              <div className="flex flex-col items-start gap-1">
                <span className="font-semibold">{t("login_button")}</span>
                <span className="text-xs text-muted-foreground font-normal">
                  Accede a tu panel de control
                </span>
              </div>
            </Link>
          </Button>

          {/* Opción: Registro (Para nuevas organizaciones) */}
          <Button
            asChild
            className="h-auto flex items-center justify-start gap-4 p-4 shadow-md transition-all"
            onClick={() => onOpenChange(false)}
          >
            <Link href="/auth/register">
              <div className="p-2 rounded-md bg-primary-foreground/20">
                <Building2 className="size-5" />
              </div>
              <div className="flex flex-col items-start gap-1">
                <span className="font-semibold">{t("register_button")}</span>
                <span className="text-xs text-primary-foreground/80 font-normal">
                  Registra tu empresa en Optima
                </span>
              </div>
            </Link>
          </Button>
        </div>

        <div className="text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest opacity-60">
            Powered by Optima Engine
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}