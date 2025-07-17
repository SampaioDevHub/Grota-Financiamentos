import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {

  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface SubmenuItem {
  label: string;
  onClick?: () => void;
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  submenu?: SubmenuItem[];
  isCollapsed: boolean;
}

function SidebarItem({ icon, label, submenu, isCollapsed }: SidebarItemProps) {
  const [open, setOpen] = useState(false);
  const hasSubmenu = submenu && submenu.length > 0;

  const handleClick = () => {
    if (!isCollapsed && hasSubmenu) {
      setOpen((v) => !v);
    }
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className={`flex items-center justify-between cursor-pointer rounded-md px-3 py-2 hover:bg-orange-600 transition-colors ${
          isCollapsed ? "justify-center" : ""
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="shrink-0">{icon}</div>
          {!isCollapsed && (
            <motion.span
              initial={false}
              animate={{
                opacity: isCollapsed ? 0 : 1,
                width: isCollapsed ? 0 : "auto",
              }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden whitespace-nowrap text-base"
            >
              {label}
            </motion.span>
          )}
        </div>
        {!isCollapsed && hasSubmenu && (
          <span>
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        )}
      </div>

      <AnimatePresence>
        {hasSubmenu && open && !isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
            className="ml-8 mt-1 flex flex-col gap-1 overflow-hidden"
          >
            {submenu.map((item, idx) => (
              <div
                key={idx}
                onClick={item.onClick}
                className="cursor-pointer rounded px-2 py-1 text-sm hover:bg-orange-700"
              >
                {item.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SidebarItem;