import Image from "next/image";
import { createClient } from "../../../../../utils/supabase/server";
import { filter } from "cypress/types/bluebird";

export default async function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  const supabase = await createClient();

  // Fetch products from products table
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (!products) {
    console.log("No products found");
    return;
  }

  // Fetch stripe_purchase_id from orders table according to order ID
  const { data } = await supabase
    .from("orders")
    .select("stripe_purchase_id")
    .eq("id", id)
    .single();

  if (!data) {
    console.log("No order found");
    return;
  }

  const stripe_purchase_id = data?.stripe_purchase_id;

  // Fetch order details from order_items table according to stripe_purchase_id
  const { data: orderItems } = await supabase
    .from("order_items")
    .select("*")
    .eq("stripe_purchase_id", stripe_purchase_id)
    .order("created_at", { ascending: false });

  if (!orderItems) {
    console.log("No order items found");
    return;
  }

  // Filter products by order items
  const filteredProducts = products?.filter((product) =>
    orderItems.some((orderItem) => orderItem.product_id === product.id)
  );
  console.log(filteredProducts);

  console.log(orderItems);

  return (
    <section className="flex flex-col items-center gap-16 w-full max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-10">
      <h1 className="text-2xl lg:text-3xl font-medium mt-10 lg:mt-16">
        Order Details
      </h1>

      <ul className="flex flex-col gap-6 w-full">
        {orderItems?.map((orderItem, index) => (
          <li
            key={orderItem.id}
            className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 p-6 bg-muted rounded-lg shadow w-full"
          >
            <Image
              src={
                filteredProducts[index].image_urls?.[1] ||
                "/assets/placeholder-img.png"
              }
              alt={filteredProducts[index].name || "Product Image"}
              width={1000}
              height={600}
              quality={100}
              className="w-32 h-32 object-cover rounded-lg border"
            />

            <div className="flex flex-col gap-2 flex-1 text-center md:text-left">
              <h2 className="text-lg font-medium text-foreground">
                {filteredProducts[index].name}
              </h2>
              <p className="text-sm text-muted-foreground">
                Price: ${filteredProducts[index].price / 100}
              </p>
              <p className="text-sm text-muted-foreground">
                Quantity: {orderItem.quantity}
              </p>
              <p className="text-sm font-semibold text-primary">
                Subtotal: $
                {(filteredProducts[index].price * orderItem.quantity) / 100}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(orderItem.created_at)
                  .toLocaleDateString("en-GB")
                  .replace(/\//g, ".")}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
