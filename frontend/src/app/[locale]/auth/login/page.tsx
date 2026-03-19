import { AuthForm } from '@/components/ui/auth/AuthForm';

export default function LoginPage() {
  return (
    // Aplicar estilos de layout modernos (Design System) para el contenedor padre
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <AuthForm />
    </div>
  );
}