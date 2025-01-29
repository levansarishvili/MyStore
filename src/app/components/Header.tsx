import { Link } from "../../i18n/routing";
import Navigation from "../[locale]/Navigation";
import LanguageToggle from "./LanguageToggle";
import ProfileToggle from "./ProfileToggle";
import GetUserData from "./GetUserData";
import CheckSubscriptionStatus from "./CheckSubscriptionStatus";
import { ModeToggle } from "./ModeToggle";
import NotificationBar from "./NotificationBar";
import BurgerMenu from "../[locale]/BurgerMenu";

// Create Header component
async function Header() {
  const userData = await GetUserData();
  const userImageUrl = userData?.user_metadata?.avatar_url;

  const isNotAuthenticated = !userData;
  const isProMember = await CheckSubscriptionStatus();

  return (
    <header className="flex flex-col items-center sticky top-0 z-10 shadow-md bg-secondary">
      {!isNotAuthenticated && <NotificationBar />}
      <div className="max-w-[90rem] w-full h-16 mx-auto my-0 flex justify-between items-center px-6 md:px-12 lg:px-20 py-0 rounded-xl">
        <Link href="/" className="h-10 flex gap-4 items-center">
          <p className="text-lg md:text-2xl font-medium">3legant.</p>
        </Link>

        {/* Navigation for larger screens */}
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

          {!isNotAuthenticated && (
            <>
              {/* Divider */}
              <div className="bg-border rounded-lg h-10 w-[1px]"></div>

              {/* User Profile */}
              <div
                className={`${
                  isProMember ? "border-2 border-primary rounded-full" : ""
                }`}
              >
                <ProfileToggle userImageUrl={userImageUrl} />
              </div>
            </>
          )}
        </div>

        {/* Navigation for smaller screens */}
        {!isNotAuthenticated && <BurgerMenu />}
      </div>
    </header>
  );
}

// Exporting Header component
export default Header;
