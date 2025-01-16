import Link from "next/link";
import { createClient } from "../../../../utils/supabase/server";
import GetUserData from "../../../components/GetUserData";
import Image from "next/image";

interface OrdersType {
  id: string;
  product_id: string;
  stripe_product_id: string;
  stripe_price_id: string;
  created_at: string;
  user_id: string;
  price: number;
}

export default async function OrdersPage() {
  // Fetch orders by user
  const supabase = await createClient();
  const userData = await GetUserData();
  const { data: orders, error } = (await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userData?.id)) as { data: OrdersType[] | null; error: any };

  // Fetch all products by ordered product IDs
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*")
    .in("id", orders?.map((order) => order.product_id) as string[]);

  console.log(products, orders);
  return (
    <section className="flex flex-col items-center gap-20 w-full px-16">
      <h1 className="text-3xl font-semibold">Orders</h1>

      <ul className="flex flex-col gap-10 w-2/3 px-16">
        {orders?.map((order) => (
          <Link href={`/orders/${order.id}`}>
            <li
              className="flex items-center gap-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out px-16 cursor-pointer"
              key={order.id}
            >
              {/* Product Name and Order Date */}
              <div className="flex-1 flex flex-col gap-6">
                <h2 className="text-2xl font-semibold text-[#ec5e2a]">
                  {
                    products?.find((product) => product.id === order.product_id)
                      ?.name
                  }
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">
                  Order date: {new Date(order.created_at).toDateString()}
                </p>
                {/* Total Price */}
                <div className="flex-shrink-0">
                  <p className="text-2xl font-medium">
                    ${(order.price / 100).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Product Image */}
              <div className="flex-shrink-0">
                <Image
                  src={
                    products?.find((product) => product.id === order.product_id)
                      ?.image_url as string
                  }
                  width={150}
                  height={150}
                  alt={
                    products?.find((product) => product.id === order.product_id)
                      ?.name as string
                  }
                  className="rounded-lg shadow-sm"
                />
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
}
