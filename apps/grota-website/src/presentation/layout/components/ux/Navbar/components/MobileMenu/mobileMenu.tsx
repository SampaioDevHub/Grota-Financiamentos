import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/src/presentation/layout/components/ui/sheet";
import { Button } from "@/src/presentation/layout/components/ui/button";
import { useState } from "react";
import { Menu, User } from "lucide-react";
import { navItems } from "../../links/Links";
import Link from "next/link";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button size="icon" className="md:hidden text-white bg-orange-500">
          <Menu className="h-8 w-8" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="bg-foreground shadow-2xl rounded-xl"
      >
        <SheetHeader>
          {/* Logo */}
          <div className="mt-6  flex items-center gap-2">
            <span className="text-black text-xl font-semibold tracking-wide">
              Grota Financiamentos
            </span>
          </div>
        </SheetHeader>
        <div className="flex flex-col space-y-4 mt-2 px-5">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-800 hover:text-orange-500 transition-colors duration-200 py-2"
            >
              {item.name}
            </Link>
          ))}
          <div className="border-t pt-2" />
          <Button className="justify-center w-40 cursor-pointer">
            <User />
            Area do Logista
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
