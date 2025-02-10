import Header from "src/app/components/header/Header";
import { createClient } from "../../../utils/supabase/server";
import { redirect } from "next/navigation";
import Footer from "src/app/components/Footer";
import { CartProvider } from "src/app/context/CartContext";
import GetUserData from "src/app/components/GetUserData";
import PageNotFound from "src/app/components/PageNotFound";

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function DashboardLayout({ children, params }: Props) {
  const supabase = await createClient();
  const userData = await GetUserData();

  const userId = userData?.id;

  // Fetch cart quantity
  const { data: cartQuantityServer, error: cartError } = await supabase
    .from("cart")
    .select("quantity")
    .eq("user_id", userId);

  if (cartError) {
    console.error("Error fetching cart quantity:", cartError);
  }

  const cartQuantity = cartQuantityServer?.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const locale = params.locale;

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }
  return (
    <>
      <CartProvider cartQuantityServer={cartQuantity}>
        <Header locale={locale} />
        <main className="flex flex-col justify-center items-center gap-10 mt-8 lg:mt-12 md:gap-16 lg:gap-20 w-full">
          {children}
        </main>
        <Footer locale={locale} />
      </CartProvider>
    </>
  );
}
