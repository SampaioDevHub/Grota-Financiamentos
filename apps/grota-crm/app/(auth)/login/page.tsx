"use client";

import { LoginForm } from "@/src/presentation/features/auth/components/LoginForm/login-form";

export default function Login() {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-background">
      {/* Lado esquerdo com imagem de fundo e texto na frente */}
      <div className="relative hidden md:flex items-center justify-center overflow-hidden">
        <img
          src="https://res.cloudinary.com/dqxcs3pwx/image/upload/v1752618347/iptbl6lszaqrid678a9x.webp"
          alt="Grota Financiamentos"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 text-center text-white px-10">
          <h2 className="text-4xl font-bold drop-shadow-md">
            Seja Bem-vindo à Plataforma Grota
          </h2>
          <p className="mt-4 text-2xl text-white/90 max-w-md mx-auto drop-shadow">
            A solução completa para gerenciamento de financiamentos automotivos.
          </p>
        </div>

        {/* Overlay escuro para contraste no texto */}
        <div className="absolute inset-0 bg-black/50 z-0" />
      </div>

      {/* Lado direito: formulário de login */}
      <div className="flex flex-col items-center justify-center p-6 md:p-12 bg-secondary shadow-2xl">
        <div className="w-full max-w-md space-y-6">
          <LoginForm />
          <p className="text-center text-muted-foreground text-xs">
            Ao continuar, você concorda com nossos{" "}
            <a
              href="#"
              className="underline underline-offset-2 hover:text-primary"
            >
              Termos de Uso
            </a>{" "}
            e{" "}
            <a
              href="#"
              className="underline underline-offset-2 hover:text-primary"
            >
              Política de Privacidade
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
