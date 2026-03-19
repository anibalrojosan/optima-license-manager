//Layout principal de la aplicación (cáscara global)
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "./globals.css";
import { MSWProvider } from '@/components/ui/providers/MSWProvider';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Optima - License Manager",
  description: "Gestión inteligente de licencias y FinOps",
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // En Next.js 14/15 params es una Promesa
}) {
  // Obtener el locale y los mensajes correspondientes
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className={`${inter.variable} ${robotoMono.variable}`}>
      <body className="antialiased font-sans">
        <NextIntlClientProvider messages={messages}>
          <MSWProvider>
            {children}
          </MSWProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
