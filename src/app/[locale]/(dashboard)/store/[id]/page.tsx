import ProductDetails from "./ProductDetails";
import PageNotFound from "../../../../components/PageNotFound";
import React from "react";
import { supabase } from "../../../../../lib/supabaseClient";
import { ProductsType } from "../page";
import GetUserData from "src/app/components/GetUserData";
import SimilarProducts from "./SimilarProducts";
import ProductReviews from "./ProductReviews";

interface paramsType {
  params: {
    id: string;
    locale: string;
  };
}

export interface UsersType {
  user_id: string;
  email: string;
}

export interface ReviewsType {
  id: number;
  created_at: string;
  product_id: number;
  review_text: string;
  user_id: string;
  rating: number;
  likes: number | null;
  dislikes: number | null;
}

// Fetch product data from API according to product ID
export default async function ProductDetailsPage({ params }: paramsType) {
  const { id } = params;
  let product: ProductsType | null = null;
  const locale = params.locale;

  const userData = await GetUserData();
  const userId = userData?.id;
  if (!userId) {
    console.error("User ID not found");
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    product = data as ProductsType;
  } catch (err) {
    console.error(err);
    return <PageNotFound />;
  }

  // Fetch max 4 similar products
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*")
    .eq("category", product?.category)
    .not("id", "eq", product?.id)
    .limit(4);

  if (productsError) {
    console.error("Error fetching products:", productsError);
    return null;
  }

  // Check if product is in cart
  const { data: cartProductIds, error: cartError } = (await supabase
    .from("cart")
    .select("product_id")
    .eq("user_id", userId)) as { data: { product_id: number }[]; error: any };

  if (cartError) {
    console.error("Error fetching cart:", cartError);
    return null;
  }

  let isInCart = false;

  if (cartProductIds.find((item) => item.product_id === Number(product?.id))) {
    isInCart = true;
  }

  // Fetch product reviews
  const { data: reviews, error: reviewsError } = await supabase
    .from("product_reviews")
    .select("*")
    .eq("product_id", id)
    .order("created_at", { ascending: false });

  if (reviewsError) {
    console.error("Error fetching reviews:", reviewsError);
    return null;
  }

  // Fetch user's email from Supabase
  const { data: users, error: userError } = (await supabase
    .from("user_profiles")
    .select("email, user_id")) as { data: UsersType[]; error: any };

  if (userError) {
    console.error("Error fetching user:", userError);
    return null;
  }

  // Check if user bought this product before
  const { data: orderItems, error: orderItemsError } = await supabase
    .from("order_items")
    .select("*")
    .eq("product_id", Number(id))
    .eq("user_id", userId);

  if (orderItemsError) {
    console.error("Error fetching hasBoughtProduct:", orderItemsError);
    return null;
  }
  console.log(orderItems);

  return (
    <section className="w-full max-w-[90rem] my-0 mx-auto flex flex-col gap-6 md:gap-8 lg:gap-12 px-6 md:px-12 lg:px-20 py-0">
      <ProductDetails product={product} isInCart={isInCart} locale={locale} />
      <ProductReviews id={id} userId={userId} reviews={reviews} users={users} />
      <SimilarProducts
        products={products}
        locale={locale}
        cartProductIds={cartProductIds}
      />
    </section>
  );
}
