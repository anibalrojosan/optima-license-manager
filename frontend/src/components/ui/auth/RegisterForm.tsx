"use client";

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";

export const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const t = useTranslations("Register");

  // Definimos el esquema aquí dentro para usar las traducciones de 't'
  const registerSchema = z.object({
    organizationName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
  });

  type RegisterValues = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      organizationName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterValues) => {
    setIsLoading(true);
    setServerError(null);

    setTimeout(() => {
      if (data.password === "12345678") { 
        setServerError("Contraseña demasiado común");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        alert("Cuenta creada con éxito");
      }
    }, 1000);
  };

  return (
    <div className="max-w-md w-full bg-card text-card-foreground border border-border rounded-xl shadow-sm p-8 font-sans">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {t('title')}
        </h1>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            {t('email_label')}
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            disabled={isLoading}
            className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 transition-all ${
              errors.email ? "border-destructive focus:ring-destructive" : "border-input"
            }`}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="organizationName" className="text-sm font-medium text-foreground">
            {t('org_name_label')}
          </label>
          <input
            id="organizationName"
            type="text"
            {...register("organizationName")}
            disabled={isLoading}
            className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 transition-all ${
              errors.organizationName ? "border-destructive focus:ring-destructive" : "border-input"
            }`}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            {t('password_label')}
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            disabled={isLoading}
            className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 transition-all ${
              errors.password ? "border-destructive focus:ring-destructive" : "border-input"
            }`}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
            {t('confirm_password_label')}
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            disabled={isLoading}
            className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 transition-all ${
              errors.confirmPassword ? "border-destructive focus:ring-destructive" : "border-input"
            }`}
          />
        </div>

        {serverError && (
          <div className="flex items-center gap-2 p-3 text-sm rounded-md bg-destructive/10 text-destructive border border-destructive/20 animate-in fade-in zoom-in duration-200">
            <span>⚠️</span>
            <p>{serverError}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-10 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:bg-slate-300 disabled:opacity-50"
        >
          {isLoading ? t('submitting') : t('submit_button')}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground font-sans">
        {t('have_account')}{" "}
        <Link href="/auth/login" className="text-primary hover:underline font-medium transition-colors">
          {t('login_link')}
        </Link>
      </div>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">{t('register_with')}</span>
        </div>
      </div>

      <button 
        type="button"
        className="w-full inline-flex justify-center items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-all"
      >
        <Image src="https://www.google.com/favicon.ico" alt="Google" width={16} height={16} />
        {t('google_account')}
      </button>
    </div>
  );
};