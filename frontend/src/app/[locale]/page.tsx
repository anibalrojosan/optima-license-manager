"use client";

import { Navbar } from "@/components/ui/navigation/Navbar";
import { Hero } from "@/components/ui/home/Hero";
import { Footer } from "@/components/ui/navigation/Footer";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const tProduct = useTranslations("Product");
  const tPricing = useTranslations("Pricing");
  const tAbout = useTranslations("About");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center pt-16">
          <Hero />
        </section>

        {/* Sección Producto */}
        <section id="producto" className="py-24 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12">{tProduct('section_title')}</h2>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="p-6 bg-background rounded-xl border">
                <h3 className="font-bold text-lg mb-2">{tProduct('it_title')}</h3>
                <p className="text-muted-foreground italic text-sm">{tProduct('it_desc')}</p>
              </div>
              <div className="p-6 bg-background rounded-xl border">
                <h3 className="font-bold text-lg mb-2">{tProduct('cfo_title')}</h3>
                <p className="text-muted-foreground italic text-sm">{tProduct('cfo_desc')}</p>
              </div>
              <div className="p-6 bg-background rounded-xl border">
                <h3 className="font-bold text-lg mb-2">{tProduct('emp_title')}</h3>
                <p className="text-muted-foreground italic text-sm">{tProduct('emp_desc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección Precios */}
        <section id="precios" className="py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-extrabold mb-4">{tPricing('title')}</h1>
            <p className="text-muted-foreground mb-16 max-w-2xl mx-auto">{tPricing('subtitle')}</p>
            
            <div className="grid md:grid-cols-3 gap-0 items-center max-w-5xl mx-auto">
              {/* Standard */}
              <div className="p-8 border rounded-l-2xl bg-background">
                <h3 className="text-lg font-bold">{tPricing('standard')}</h3>
                <div className="my-6">
                  <span className="text-4xl font-bold">$499</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                <Button variant="outline" className="w-full">{tPricing('cta_standard')}</Button>
              </div>

              {/* Premium (Destacada) */}
              <div className="p-10 border-2 border-primary rounded-2xl bg-background shadow-xl z-10 scale-105">
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-4">
                  {tPricing('popular_badge')}
                </div>
                <h3 className="text-xl font-bold">{tPricing('premium')}</h3>
                <div className="my-6">
                  <span className="text-5xl font-bold">{tPricing('custom_price')}</span>
                </div>
                <Button className="w-full h-12">{tPricing('cta_premium')}</Button>
              </div>

              {/* Enterprise */}
              <div className="p-8 border rounded-r-2xl bg-background border-l-0">
                <h3 className="text-lg font-bold">{tPricing('enterprise')}</h3>
                <div className="my-6">
                  <span className="text-4xl font-bold">{tPricing('custom_price')}</span>
                </div>
                <Button variant="outline" className="w-full">{tPricing('cta_enterprise')}</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Sección Acerca de */}
        <section id="acerca-de" className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h1 className="text-3xl font-bold mb-6">{tAbout('title')}</h1>
                <p className="text-muted-foreground leading-relaxed">
                  {tAbout('description')}
                </p>
              </div>
              <div className="aspect-video bg-muted rounded-2xl flex items-center justify-center text-muted-foreground border-2 border-dashed">
                [FinOps Illustration]
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}