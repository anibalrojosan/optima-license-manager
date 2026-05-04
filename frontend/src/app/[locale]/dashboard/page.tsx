"use client";

import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

function clearAccessTokenCookie() {
  document.cookie =
    "access_token=; path=/; max-age=0; SameSite=Lax";
}

export default function DashboardPage() {
  const router = useRouter();

  const handleSignOut = () => {
    clearAccessTokenCookie();
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-50 p-4">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Panel
        </h1>
        <p className="text-sm text-muted-foreground max-w-md">
          Vista mínima del panel. Aquí irá el contenido del dashboard en
          iteraciones posteriores.
        </p>
      </div>
      <Button type="button" variant="outline" onClick={handleSignOut}>
        Cerrar sesión
      </Button>
    </div>
  );
}