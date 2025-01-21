import { Link } from "../../i18n/routing";
import Navigation from "../[locale]/Navigation";
import LanguageToggle from "./LanguageToggle";
import ProfileToggle from "./ProfileToggle";
import GetUserData from "./GetUserData";
import CheckSubscriptionStatus from "./CheckSubscriptionStatus";
import { ModeToggle } from "./ModeToggle";
import { BuildingStorefrontIcon } from "@heroicons/react/24/solid";

// Create Header component
async function Header() {
  const userData = await GetUserData();
  const userImageUrl = userData?.user_metadata?.avatar_url;

  const isNotAuthenticated = !userData;
  const isProMember = await CheckSubscriptionStatus();

  return (
    <header className="flex items-center sticky top-0 z-10 border-b">
      <div className="max-w-[90rem] w-full h-full mx-auto my-0 flex justify-between items-center px-16 py-0">
        <Link href="/" className="w-10 h-10">
          <BuildingStorefrontIcon />
        </Link>

        {!isNotAuthenticated && (
          <nav className="">
            <Navigation />
          </nav>
        )}

        {/* Profile and Shopping cart icons */}
        <div className="flex gap-4 cursor-pointer items-center justify-center">
          <div className="flex gap-2">
            {/* Color Theme */}
            <ModeToggle />

            {/* Language Toggle */}
            <LanguageToggle />
          </div>

          <div className="bg-border rounded-lg h-10 w-[1px]"></div>

          {/* User Profile */}
          <div
            className={`${
              isProMember && "border-2 border-primary rounded-full"
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
