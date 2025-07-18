import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { User } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../components/ui/input";

import { ForgotPasswordModal } from "../ForgotPassword/ForgotPasswordModal";
import { useRouter } from "next/navigation";

const AreaDoLogista = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="cursor-pointer"
        >
          <User className="h-5 w-5" />
          Área do Logista
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px] bg-foreground shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-gray-800">
            Area do Logista
          </DialogTitle>

          <section className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-400">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="logista@empresa.com"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password" className="text-gray-400">
                Senha
              </Label>
              <Input id="password" type="password" placeholder="*********" />
            </div>

            {/* Link Esqueceu Password */}
            <ForgotPasswordModal />
            {/* Link Esqueceu Password End */}

            <Button
              className="cursor-pointer"
              onClick={() => router.replace("/dashboard")}
            >
              Login
            </Button>
          </section>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AreaDoLogista;
