import { Link } from "../../../i18n/routing";
import Navigation from "../../[locale]/Navigation";
import LanguageToggle from "./LanguageToggle";
import ProfileToggle from "../profile/ProfileToggle";
import GetUserData from "../GetUserData";
import CheckSubscriptionStatus from "../CheckSubscriptionStatus";
import { ModeToggle } from "./ModeToggle";
import NotificationBar from "./NotificationBar";
import BurgerMenu from "../../[locale]/BurgerMenu";
import { createClient } from "src/utils/supabase/server";
import CartButton from "./CartButton";
import Image from "next/image";

// Create Header component
async function Header({ locale }: { locale: string }) {
  const supabase = await createClient();
  const userData = await GetUserData();

  const userId = userData?.id;
  const userImageUrl = userData?.user_metadata?.avatar_url;

  // Fetch cart quantity
  const { data: cartItems, error } = await supabase
    .from("cart")
    .select("quantity")
    .eq("user_id", userId);

  // Fetch user details
  const { data: userAvatar, error: userError } = await supabase
    .from("user_profiles")
    .select("image_url")
    .eq("user_id", userId)
    .single();

  if (error || userError) {
    console.error(error, userError);
  }

  const cartQuantity = cartItems?.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const isNotAuthenticated = !userData;
  const isProMember = await CheckSubscriptionStatus();

  return (
    <header className="flex flex-col items-center sticky z-50 top-0 shadow-md bg-background">
      {!isNotAuthenticated && <NotificationBar locale={locale} />}
      <div className="max-w-[90rem] w-full h-16 mx-auto my-0 flex justify-between items-center px-6 md:px-12 lg:px-20 py-0 rounded-xl">
        <Link href="/" className="h-10 flex gap-4 items-center">
          <Image
            src="/assets/logo.svg"
            alt="Logo"
            width={400}
            height={400}
            className="w-12"
          />
          <p className="max-lg:hidden text-xl md:text-xl font-semibold">
            MyStore
          </p>
        </Link>

        {/* Navigation for larger screens */}
        {!isNotAuthenticated && (
          <nav className="max-md:hidden">
            <Navigation locale={locale} />
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
              <div className="bg-border rounded-lg h-10 w-[1px]"></div>
              {/* User Profile */}
              <div
                className={`${
                  isProMember ? "border-2 border-primary rounded-full" : ""
                }`}
              >
                <ProfileToggle
                  userImageUrl={userImageUrl}
                  locale={locale}
                  userAvatar={userAvatar?.image_url}
                />
              </div>

              {/* Cart Icon */}
              <CartButton locale={locale} />
            </>
          )}
        </div>

        {/* Navigation for smaller screens */}
        {!isNotAuthenticated && <BurgerMenu locale={locale} />}
      </div>
    </header>
  );
}

// Exporting Header component
export default Header;
