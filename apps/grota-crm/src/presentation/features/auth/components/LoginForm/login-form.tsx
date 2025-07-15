"use client";

import { Button } from "@/src/presentation/layout/components/ui/button";
import {
  Card,
  CardContent,
} from "@/src/presentation/layout/components/ui/card";
import { Input } from "@/src/presentation/layout/components/ui/input";
import { Label } from "@/src/presentation/layout/components/ui/label";
import { cn } from "@/src/presentation/layout/lib/utils";
import { ForgotPasswordModal } from "../ForgotPasswordModal/ForgotPasswordModal";
import { CaptchaErrorModal } from "../CaptchaErrorModal/CaptchaErrorModal";

import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [captchaModalOpen, setCaptchaModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = recaptchaRef.current?.getValue();
    if (!token) {
      setCaptchaModalOpen(true);
      return;
    }

    // continuar com a autenticação
  };

  return (
    <div
      className={cn("flex flex-col items-center gap-6 ", className)}
      {...props}
    >
      <Card className="w-full max-w-lg">
        <CardContent className="p-6 md:p-8">
          <form className="flex flex-col gap-6 items-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold">Bem-vindo</h1>
              <p className="text-muted-foreground text-sm">Acesse sua conta</p>
            </div>

            <div className="grid gap-3 w-full max-w-md">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@grota.com"
                required
              />
            </div>

            <div className="grid gap-3 w-full max-w-md">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
                <div className="ml-auto text-sm underline-offset-2 hover:underline">
                  <ForgotPasswordModal />
                </div>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="sua senha"
                required
              />
            </div>

            <div className="w-full max-w-md">
              <ReCAPTCHA ref={recaptchaRef} sitekey="SUA_SITE_KEY_AQUI" />
            </div>

            <Button
              type="submit"
              onSubmit={handleSubmit}
              className="w-full max-w-md cursor-pointer"
            >
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="text-muted-foreground text-center text-xs text-balance px-4 max-w-md">
        Ao continuar, você concorda com nossos{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Termos de Uso
        </a>{" "}
        e{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Política de Privacidade
        </a>
        .
      </div>

      <CaptchaErrorModal
        open={captchaModalOpen}
        onClose={() => setCaptchaModalOpen(false)}
      />
    </div>
  );
}
