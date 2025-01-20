import { Link } from "../../i18n/routing";
import Navigation from "../[locale]/Navigation";
import LanguageToggle from "./LanguageToggle";
import { Star, ShoppingCart } from "lucide-react";
import ProfileToggle from "./ProfileToggle";
import GetUserData from "./GetUserData";
import CheckSubscriptionStatus from "./CheckSubscriptionStatus";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";

// Create Header component
async function Header() {
  const userData = await GetUserData();
  const userImageUrl = userData?.user_metadata?.avatar_url;

  const isNotAuthenticated = !userData;
  const isProMember = await CheckSubscriptionStatus();

  return (
    <header className="flex items-center sticky top-0 z-10 border-b">
      <div className="max-w-[90rem] w-full h-full mx-auto my-0 flex justify-between items-center px-16 py-0">
        <Link href="/">
          <Image
            src="/assets/logo.svg"
            alt="E-shop logo"
            className="h-16"
            width={130}
            height={40}
          ></Image>
        </Link>

        {!isNotAuthenticated && (
          <nav className="">
            <Navigation />
          </nav>
        )}

        {/* Profile and Shopping cart icons */}
        <div className="flex gap-4 cursor-pointer items-center justify-center">
          {/* Color Theme */}
          <ModeToggle />

          {/* Language Toggle */}
          <LanguageToggle />

          {/* Buy subscription */}
          {!isNotAuthenticated && (
            <Link href="/pricing">
              <Star className="hover:stroke-[#ec5e2a] duration-300 dark:stroke-white" />
            </Link>
          )}

          {/* User Profile */}
          <div
            className={`${
              isProMember && "border-2 border-[#ec5e2a] rounded-full"
            }`}
          >
            <ProfileToggle userImageUrl={userImageUrl} />
          </div>
        </div>
      </div>
    </header>
  );
}

// Exporting Header component
export default Header;
