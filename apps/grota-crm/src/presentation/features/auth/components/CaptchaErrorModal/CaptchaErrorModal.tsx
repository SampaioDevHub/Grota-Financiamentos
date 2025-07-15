"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/src/presentation/layout/components/ui/dialog";
import { Button } from "@/src/presentation/layout/components/ui/button";

interface CaptchaErrorModalProps {
  open: boolean;
  onClose: () => void;
}

export function CaptchaErrorModal({ open, onClose }: CaptchaErrorModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm text-center bg-foreground">
        <DialogHeader>
          <DialogTitle className="text-red-600">Verificação necessária</DialogTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Por favor, complete o reCAPTCHA antes de continuar.
          </p>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClose} className="w-full">
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
