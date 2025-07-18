import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Car,
  Home,
  LayoutDashboard,
  Menu,
  Settings,
  Users,
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
      animate={{ width: collapsed ? 90 : 240 }}
      transition={{ duration: 0.8, ease: [0.28, 0.2, 0.8, 1] }}
      className="bg-orange-500 text-white shadow-2xl h-full rounded-r-lg flex flex-col overflow-hidden select-none fixed sm:static top-0 left-0 z-50 sm:z-10"
    >
      {/* Topo */}
      <div className="flex items-center justify-between h-16 px-4 transition-all duration-500">
        <div
          className={`flex items-center gap-2 transition-all duration-500 ${
            collapsed ? "justify-center w-[60px]" : "justify-start w-full"
          }`}
        >
          <img
            src={collapsed ? "/logo-icon.svg" : "/logo-full.svg"}
            alt="Logo"
            className={`transition-all duration-500 ${
              collapsed ? "h-6 w-6" : "h-6"
            }`}
          />

          {!collapsed && (
            <span className="text-xl font-bold truncate text-white">
              Grota Financiamentos
            </span>
          )}
        </div>

        {isMobile && (
          <button onClick={() => setMobileOpen(false)} className="text-white">
            <X size={22} />
          </button>
        )}
      </div>

      {/* Navegação */}
      <nav className="flex flex-col gap-3 px-3 pb-4 overflow-y-auto scroll-smooth flex-1 transition-all duration-500 ease-in-out">
        <SidebarItem
          icon={<Home size={20} />}
          label="Início"
          isCollapsed={collapsed}
        />

        <SidebarItem
          icon={<Users size={20} />}
          label="Clientes"
          isCollapsed={collapsed}
          submenu={[
            {
              label: "Análise de Crédito",
              onClick: () => alert("Análise de Crédito"),
            },
          ]}
        />
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          label="Painel de Controle"
          isCollapsed={collapsed}
          submenu={[
            {
              label: "Status de Propostas",
              onClick: () => alert("Status de Propostas"),
            },
           
          ]}
        />
        <SidebarItem
          icon={<Car size={20} />}
          label="Veículos"
          isCollapsed={collapsed}
          submenu={[
            {
              label: "Análise de Placa",
              onClick: () => alert("Análise de Placa"),
            },
            {
              label: "Tabela FIPE",
              onClick: () => alert("Tabela FIPE"),
            },
          ]}
        />
        <SidebarItem
          icon={<BarChart size={20} />}
          label="Relatórios"
          isCollapsed={collapsed}
          submenu={[
            {
              label: "Relatório de Propostas",
              onClick: () => alert("Relatório de Propostas"),
            },
           
          ]}
        />

        <SidebarItem
          icon={<Settings size={20} />}
          label="Configurações"
          isCollapsed={collapsed}
          submenu={[
            { label: "Minha Conta", onClick: () => alert("Minha Conta") },
            {
              label: "Preferências do Sistema",
              onClick: () => alert("Preferências do Sistema"),
            },
          ]}
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
