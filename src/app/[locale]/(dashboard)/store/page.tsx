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
  brand: string;
}

export interface reviewsType {
  rating: number;
  user_id: string;
  product_id: string;
}

interface Props {
  params: { locale: string };
  searchParams: { [key: string]: string | undefined };
}

interface categoryType {
  category: string;
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

  // Fetch products from cart
  const { data: cartItems, error: fetchError } = await supabase
    .from("cart")
    .select("product_id")
    .eq("user_id", userId);

  if (fetchError) {
    console.error("Error fetching cart items:", fetchError);
    return null;
  }

  let products: ProductsType[] = [];
  // Fetch products from Supabase according to pagination and filters
  let query = supabase.from("products").select("*");

  // Apply search filter if `search` exists
  if (searchParams.search) {
    query = query.ilike("name", `%${searchParams.search}%`);
  }

  // Apply category filter if `category` exists
  if (searchParams.category) {
    query = query.eq("category", `${searchParams.category}`);
  }

  // Apply sorting based on `sortBy` parameter
  if (searchParams.sortBy) {
    if (searchParams.sortBy === "title-asc") {
      query = query.order("name", { ascending: true });
    } else if (searchParams.sortBy === "title-desc") {
      query = query.order("name", { ascending: false });
    } else if (searchParams.sortBy === "price-asc") {
      query = query.order("price", { ascending: true });
    } else if (searchParams.sortBy === "price-desc") {
      query = query.order("price", { ascending: false });
    }
  }

  // Execute the query
  const { data, error } = await query;
  if (error) {
    console.error("Error fetching products:", error);
  } else {
    products = data as ProductsType[];
  }

  const productsCount = products?.length || 0;
  const page = Number(searchParams?.page) || 1;

  // Calculate pagination parameters
  const itemsPerPage = 12;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage - 1;
  const totalPages = Math.ceil(productsCount / itemsPerPage);
  query = query.range(startIndex, endIndex);

  // Execute the query
  const { data: productsData, error: newError } = await query;
  if (error) {
    console.error("Error fetching products:", error);
  } else {
    products = productsData as ProductsType[];
  }

  const isProMember = await CheckSubscriptionStatus();

  // Fetch product reviews
  const { data: reviews, error: reviewsError } = (await supabase
    .from("product_reviews")
    .select("rating, product_id, user_id")) as {
    data: reviewsType[];
    error: any;
  };

  if (reviewsError) {
    console.error("Error fetching product reviews:", reviewsError);
  }

  return (
    <section className="flex flex-col items-center gap-6 md:gap-8 lg:gap-12 w-full max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
      <h1 className="text-xl md:text-2xl font-medium">{t("Products.title")}</h1>

      <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_4fr] gap-10">
        {/* Product filter */}
        <ProductFilter />

        {/* Products */}
        <div className="w-full grid grid-cols-1 custom-xs:grid-cols-2 custom-md:grid-cols-3 lg:grid-cols-2 custom-lg-2:grid-cols-3 gap-6 justify-center">
          {products?.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              name={product.name}
              imageSrc={
                product.image_urls?.[0] || "/assets/placeholder-img.png"
              }
              price={product.price}
              isProMember={isProMember}
              products={products}
              userId={userId}
              in_cart={cartItems?.some(
                (item) => item.product_id === product.id
              )}
              reviews={reviews.filter(
                (review) => review.product_id === product.id
              )}
            />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <PaginationComponent page={page} totalPages={totalPages} />
    </section>
  );
}
