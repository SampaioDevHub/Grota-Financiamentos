import Link from "next/link";
import { navItems } from "../../links/Links";

const DesktopNavigation = () => {
  return (
    <nav className="hidden md:flex space-x-8">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="text-gray-800 hover:text-orange-500 transition-colors duration-200"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default DesktopNavigation;
