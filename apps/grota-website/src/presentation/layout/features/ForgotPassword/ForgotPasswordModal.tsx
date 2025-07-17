"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/src/presentation/layout/components/ui/dialog";
import { Input } from "@/src/presentation/layout/components/ui/input";
import { Button } from "@/src/presentation/layout/components/ui/button";
import { Label } from "@/src/presentation/layout/components/ui/label";
import { useState } from "react";

export function ForgotPasswordModal() {
  const [openResetModal, setOpenResetModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setOpenResetModal(false);
      setOpenConfirmModal(true);
    }, 1500);
  };

  return (
    <section>
      {/* Botão para modal de redefinição */}
      <button
        onClick={() => setOpenResetModal(true)}
        className="ml-auto text-sm underline-offset-2 hover:underline text-primary cursor-pointer"
        type="button"
      >
        Esqueceu sua senha?
      </button>

      {/* Redefinir senha */}
      <Dialog open={openResetModal} onOpenChange={setOpenResetModal}>
        <DialogContent className="sm:max-w-md bg-foreground">
          <DialogHeader>
            <DialogTitle className="text-secondary-foreground">
              Redefinir Senha
            </DialogTitle>
            <DialogDescription>
              Insira seu e-mail cadastrado para receber o link de recuperação.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="forgot-email">E-mail</Label>
              <Input
                id="forgot-email"
                type="email"
                placeholder="seuemail@grota.com"
                required
                disabled={loading}
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
                {loading ? "Enviando..." : "Enviar link de redefinição"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmação */}
      <Dialog open={openConfirmModal} onOpenChange={setOpenConfirmModal}>
        <DialogContent className="sm:max-w-md text-center bg-foreground">
          <DialogHeader>
            <DialogTitle className="text-secondary-foreground">
              Verifique seu e-mail
            </DialogTitle>
            <DialogDescription>
              Um link de redefinição de senha foi enviado para seu e-mail. Siga
              as instruções para criar uma nova senha.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setOpenConfirmModal(false)}
              className="w-full"
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
