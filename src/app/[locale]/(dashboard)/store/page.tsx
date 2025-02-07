import PaginationComponent from "src/app/components/PaginationComponent";
import { createClient } from "../../../../utils/supabase/server";
import CheckSubscriptionStatus from "../../../components/CheckSubscriptionStatus";
import GetUserData from "../../../components/GetUserData";
import ProductItem from "./ProductItem";
import { createTranslator } from "next-intl";
import ProductFilter from "src/app/components/filters/ProductFilter";

export interface ProductsType {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image_urls?: string[];
  created_at: string;
  user_id: string;
  stripe_product_id: string;
  stripe_price_id: string;
  solded_quantity: number;
}

interface Props {
  params: { locale: string };
  searchParams: { [key: string]: string | undefined };
}

export default async function Store({ params, searchParams }: Props) {
  const locale = params.locale;
  const messages = (await import(`../../../../../messages/${locale}.json`))
    .default;
  const t = createTranslator({ locale, messages });
  const supabase = await createClient();

  // Get user data
  const userData = await GetUserData();
  const userId = userData?.id;
  if (!userId) {
    console.error("User ID not found");
    return null;
  }

  // Fetch all products
  const { data: allProducts, error: allProductsError } = await supabase
    .from("products")
    .select("*");

  if (allProductsError) {
    console.error("Error fetching products:", allProductsError);
    return null;
  }

  // Fetch products from cart
  const { data: cartItems, error: fetchError } = await supabase
    .from("cart")
    .select("product_id")
    .eq("user_id", userId);

  const productsCount = allProducts?.length || 0;

  const page = Number(searchParams?.page) || 1;

  const itemsPerPage = 8;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage - 1;
  const totalPages = Math.ceil(productsCount / itemsPerPage);

  // Fetch products from Supabase according to pagination
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: false })
    .range(startIndex, endIndex);
  const products = data as ProductsType[];

  const sortedProducts = products.sort((a, b) => Number(b.id) - Number(a.id));
  const isProMember = await CheckSubscriptionStatus();

  return (
    <section className="mt-10 lg:mt-16 flex flex-col items-center gap-10 lg:gap-16 w-full max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
      <h1 className="text-xl md:text-2xl font-medium">{t("Products.title")}</h1>

      {/* Product filter */}
      <ProductFilter />

      <div className="w-full grid grid-cols-1 min-[460px]:grid-cols-2 custom-md:grid-cols-3 custom-lg:grid-cols-4 gap-6 justify-center">
        {products?.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            imageSrc={product.image_urls?.[0] || "/assets/placeholder-img.png"}
            price={product.price}
            isProMember={isProMember}
            products={products}
            userId={userId}
            in_cart={cartItems?.some((item) => item.product_id === product.id)}
          />
        ))}
      </div>

      {/* Pagination */}
      <PaginationComponent page={page} totalPages={totalPages} />
    </section>
  );
}
