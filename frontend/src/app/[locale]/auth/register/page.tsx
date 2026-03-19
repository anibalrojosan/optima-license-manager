import { RegisterForm } from '@/components/ui/auth/RegisterForm';
import { Metadata } from "next";

export default function RegisterPage() {
  return (
    // Aplicamos estilos de layout modernos (Design System) para el contenedor padre
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <RegisterForm />
    </main>
  );
}
export const metadata: Metadata = {
  title: "Registro Corporativo | Optima",
  description: "Crea tu cuenta corporativa en Optima",
};
