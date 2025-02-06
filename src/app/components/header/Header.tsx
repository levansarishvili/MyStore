import { Link } from "../../../i18n/routing";
import Navigation from "../../[locale]/Navigation";
import LanguageToggle from "./LanguageToggle";
import ProfileToggle from "../profile/ProfileToggle";
import GetUserData from "../GetUserData";
import CheckSubscriptionStatus from "../CheckSubscriptionStatus";
import { ModeToggle } from "./ModeToggle";
import NotificationBar from "./NotificationBar";
import BurgerMenu from "../../[locale]/BurgerMenu";
import { ShoppingCart } from "lucide-react";
import { createClient } from "src/utils/supabase/server";

// Create Header component
async function Header() {
  const supabase = await createClient();
  const userData = await GetUserData();

  const userId = userData?.id;
  const userImageUrl = userData?.user_metadata?.avatar_url;

  // Fetch cart quantity
  const { data: cartItems, error } = await supabase
    .from("cart")
    .select("quantity")
    .eq("user_id", userId);

  const cartQuantity = cartItems?.reduce(
    (total, item) => total + item.quantity,
    0
  );

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
        <div className="flex gap-2 sm:gap-4 cursor-pointer items-center justify-center">
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

              {/* Cart Icon */}
              <Link href="/cart" className="relative flex items-center">
                {/* Display quantity only if greater than 0 */}
                {cartQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                    {cartQuantity}
                  </span>
                )}
                <div className="flex gap-4 px-4 cursor-pointer hover:text-primary text-sm rounded-lg transition-all duration-300">
                  <ShoppingCart className="size-5 sm:size-6" />
                </div>
              </Link>
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
