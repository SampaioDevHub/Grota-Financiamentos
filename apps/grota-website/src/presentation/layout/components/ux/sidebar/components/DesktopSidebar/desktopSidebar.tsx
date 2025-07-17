import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Car,
  DollarSign,
  Home,
  Menu,
  Settings,
  UserCircle,
  X,
} from "lucide-react";
import { useMediaQuery } from "@/src/presentation/layout/hooks/useMediaQuery";
import SidebarItem from "../SidebarItem/sidebarItem";

export default function SidebarDesktop() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <motion.div
      onMouseEnter={() => !isMobile && setCollapsed(false)}
      onMouseLeave={() => !isMobile && setCollapsed(true)}
      initial={false}
      animate={{ width: collapsed ? 90 : 300 }}
      transition={{ duration: 0.8, ease: [0.28, 0.1, 0.8, 1] }}
      className="bg-orange-500 text-white shadow-2xl h-full rounded-r-lg flex flex-col overflow-hidden select-none fixed sm:static top-0 left-0 z-50 sm:z-10"
    >
      {/* Topo */}
      <div className="flex items-center justify-between h-16 px-4 transition-all duration-500">
        <span
          className={`text-xl font-bold truncate transition-all duration-500 ${
            collapsed ? "text-center w-[60px]" : "w-full"
          }`}
        >
          {!collapsed ? "Grota Financiamentos" : "GF"}
        </span>

        {isMobile && (
          <button onClick={() => setMobileOpen(false)} className="text-white">
            <X size={22} />
          </button>
        )}
      </div>

      {/* Navegação */}
      <nav className="flex flex-col gap-3 px-3 pb-4 overflow-y-auto flex-1 transition-all duration-500 ease-in-out">
        <SidebarItem
          icon={<Home size={20} />}
          label="Dashboard"
          isCollapsed={collapsed}
          submenu={[
            { label: "Subitem 1", onClick: () => alert("Subitem 1 clicado") },
            { label: "Subitem 2", onClick: () => alert("Subitem 2 clicado") },
          ]}
        />
        <SidebarItem
          icon={<Car size={20} />}
          label="Análise de Placas"
          isCollapsed={collapsed}
          submenu={[
            { label: "Subitem 1", onClick: () => alert("Subitem 1 clicado") },
            { label: "Subitem 2", onClick: () => alert("Subitem 2 clicado") },
          ]}
        />
        <SidebarItem
          icon={<BarChart size={20} />}
          label="Relatórios"
          isCollapsed={collapsed}
          submenu={[
            { label: "Subitem 1", onClick: () => alert("Subitem 1 clicado") },
            { label: "Subitem 2", onClick: () => alert("Subitem 2 clicado") },
          ]}
        />

        <SidebarItem
          icon={<Settings size={20} />}
          label="Configurações"
          isCollapsed={collapsed}
          submenu={[
            { label: "Perfil", onClick: () => alert("Perfil clicado") },
            { label: "Usuários", onClick: () => alert("Usuários clicado") },
          ]}
        />
        <SidebarItem
          icon={<UserCircle size={20} />}
          label="Relatórios"
          isCollapsed={collapsed}
        />
      </nav>
      {/* Rodapé */}
      <div
        className={`flex items-center h-12 px-4 text-xs text-white/70 transition-all duration-500 ${
          collapsed ? "justify-center" : "justify-start"
        }`}
      >
        <span className="truncate w-full">
          {collapsed ? "© 2025" : "© 2025 Grota Financiamentos"}
        </span>
      </div>
    </motion.div>
  );

  return (
    <>
      {/* (mobile) */}
      {isMobile && !mobileOpen && (
        <button
          className="fixed top-4 left-4 z-50 text-white bg-orange-500 p-2 rounded-full shadow-md"
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={20} />
        </button>
      )}

      {/* Sidebar Mobile */}
      {isMobile ? (
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            >
              <div onClick={(e) => e.stopPropagation()}>{sidebarContent}</div>
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        sidebarContent
      )}
    </>
  );
}
