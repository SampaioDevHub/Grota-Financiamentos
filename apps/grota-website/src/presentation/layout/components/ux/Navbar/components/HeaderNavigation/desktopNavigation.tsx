import Link from "next/link";
import DesktopNavigation from "../DesktopNavigation/desktopNavigation";
import UserProfile from "../UserProfile/userProfile";
import MobileMenu from "../MobileMenu/mobileMenu";

const Header = () => {
  return (
    <header className="bg-foreground border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="#" className="flex items-center space-x-2">
            <div className="text-md font-medium bg-orange-500 p-2 rounded-md shadow-md">
              Logo Marca
            </div>
          </Link>
          {/* Logo End */}

          {/* DesktopNavigation */}
          <DesktopNavigation />
          {/* DesktopNavigation End */}

          {/* UserProfile */}
          <UserProfile/>
          {/* UserProfile End */}

          {/* Mobile menu Button */}
          <MobileMenu />
          {/* Mobile menu Button */}
        </div>
      </div>
    </header>
  );
};

export default Header;
