import { Link } from "../../i18n/routing";
import Navigation from "../[locale]/Navigation";
import ColorTheme from "./ColorTheme";
import LanguageToggle from "./LanguageToggle";
import { Crown } from "lucide-react";
import ProfileToggle from "./ProfileToggle";
import GetUserData from "./GetUserData";
import CheckSubscriptionStatus from "./CheckSubscriptionStatus";

// Create Header component
async function Header() {
  const userData = await GetUserData();
  const userImageUrl = userData?.user_metadata?.avatar_url;

  const isNotAuthenticated = !userData;
  const isProMember = await CheckSubscriptionStatus();

  return (
    <header
      className="header flex items-center bg-[#f1f3f5] dark:bg-[#313131]
    shadow-md sticky top-0 z-10"
    >
      <div className="header__wrapper max-w-[144rem] w-full h-full mx-auto my-0 flex justify-between items-center text-2xl text-gray-700 px-16 py-0">
        <Link href="/">
          <img
            src="/assets/logo.svg"
            alt="E-shop logo"
            className="header__logo h-16"
          ></img>
        </Link>

        {!isNotAuthenticated && (
          <nav className="header__nav flex items-center gap-12">
            <Navigation />
          </nav>
        )}

        {/* Profile and Shopping cart icons */}
        <div className="header__icons flex gap-6 cursor-pointer items-center justify-center">
          {/* Language Toggle */}
          <LanguageToggle />

          {/* Color Theme */}
          <ColorTheme />

          {/* Buy subscription */}
          {!isNotAuthenticated && (
            <Link href="/pricing">
              <Crown className="hover:stroke-[#ec5e2a] duration-300 dark:stroke-white" />
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

          {!isNotAuthenticated && (
            <div className="cart-wrapper flex justify-center items-center p-3 rounded-full text-2xl group">
              <svg
                className="header__icon w-10 h-10 group-hover:transition-all group-hover:fill-[#ec5e2a] transition-all duration-300 dark:fill-white"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill=""
                viewBox="0 0 256 256"
              >
                <path d="M104,216a16,16,0,1,1-16-16A16,16,0,0,1,104,216Zm88-16a16,16,0,1,0,16,16A16,16,0,0,0,192,200ZM239.71,74.14l-25.64,92.28A24.06,24.06,0,0,1,191,184H92.16A24.06,24.06,0,0,1,69,166.42L33.92,40H16a8,8,0,0,1,0-16H40a8,8,0,0,1,7.71,5.86L57.19,64H232a8,8,0,0,1,7.71,10.14ZM221.47,80H61.64l22.81,82.14A8,8,0,0,0,92.16,168H191a8,8,0,0,0,7.71-5.86Z"></path>
              </svg>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// Exporting Header component
export default Header;
