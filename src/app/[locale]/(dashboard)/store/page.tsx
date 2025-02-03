import { createClient } from "../../../../utils/supabase/server";
import CheckSubscriptionStatus from "../../../components/CheckSubscriptionStatus";
import GetUserData from "../../../components/GetUserData";
import ProductItem from "./ProductItem";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../components/ui/pagination";

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
  in_cart: boolean;
}

interface Props {
  params: { locale: string };
  searchParams: { [key: string]: string | undefined };
}

export default async function Store({ params, searchParams }: Props) {
  const supabase = await createClient();
  // Fetch all products
  const { data: allProducts, error: allProductsError } = await supabase
    .from("products")
    .select("*");

  if (allProductsError) {
    console.error("Error fetching products:", allProductsError);
    return null;
  }

  const productsCount = allProducts?.length || 0;

  const page = Number(searchParams?.page) || 1;

  const itemsPerPage = 8;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage - 1;
  const totalPages = Math.ceil(productsCount / itemsPerPage);

  // Get user data
  const userData = await GetUserData();
  const userId = userData?.id;

  // Fetch products from Supabase according to pagination
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .range(startIndex, endIndex);
  const products = data as ProductsType[];

  const sortedProducts = products.sort((a, b) => Number(b.id) - Number(a.id));
  const isProMember = await CheckSubscriptionStatus();

  return (
    <section className="mt-10 lg:mt-16 flex flex-col items-center gap-10 lg:gap-16 w-full max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
      <h1 className="text-2xl lg:text-3xl font-medium">Products</h1>

      <div className="flex flex-wrap justify-center gap-6 w-full">
        {products?.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            imageSrc={product.image_urls?.[1] || "/assets/placeholder-img.png"}
            price={product.price}
            isProMember={isProMember}
            products={products}
            userId={userId}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination className="mt-12 md:mt-16">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={`${page === 1 && "pointer-events-none opacity-60"}`}
              href={`?page=${page > 1 ? page - 1 : 1}`}
            />
          </PaginationItem>
          <PaginationItem
            className={`${page === 1 && "opacity-0 pointer-events-none"}`}
          >
            <PaginationLink href={`?page=${page === 1 ? 1 : page - 1}`}>
              {page === 1 ? 1 : page - 1}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href={`?page=${page}`}
              isActive
              className="pointer-events-none bg-primary text-white hover:bg-[#2ca76e] hover:text-white transition-all duration-200"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem
            className={`${
              page === totalPages && "opacity-0 pointer-events-none"
            }`}
          >
            <PaginationLink
              href={`?page=${page === totalPages ? page : page + 1}`}
            >
              {page === totalPages ? page : page + 1}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              className={`${
                page === totalPages && "pointer-events-none opacity-60"
              }`}
              href={`?page=${page < totalPages ? page + 1 : page}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}
