import { createClient } from "../../../../../utils/supabase/server";

interface OrderType {
  id: string;
  user_id: string;
  product_id: string;
  stripe_product_id: string;
  stripe_price_id: string;
  stripe_purchase_id: string;
  created_at: string;
  price: number;
}

export default async function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  // Fetch order details by id
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id);
  const order: OrderType | null = data?.[0] ?? null;

  return (
    <section className="flex flex-col items-center w-full">
      <div className="w-full mx-auto px-16 py-8 bg-white dark:bg-[#313131] rounded-lg shadow-md dark:hover:shadow-[#ec5e2a] duration-300">
        <h1 className="text-3xl font-semibold text-[#ec5e2a] mb-6">
          Order Details
        </h1>
        <div className="space-y-4">
          <div className="flex justify-between">
            <p className="font-medium text-lg">Order ID:</p>
            <p className="text-lg">{order?.id}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-lg">User ID:</p>
            <p className="text-lg">{order?.user_id}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-lg">Product ID:</p>
            <p className="text-lg">{order?.product_id}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-lg">Stripe Product ID:</p>
            <p className="text-lg">{order?.stripe_product_id}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-lg">Stripe Price ID:</p>
            <p className="text-lg">{order?.stripe_price_id}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-lg">Stripe Purchase ID:</p>
            <p className="text-lg">{order?.stripe_purchase_id}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-lg">Created At:</p>
            <p className="text-lg">{order?.created_at}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-lg">Price:</p>
            <p className="text-lg">${order?.price ? order.price / 100 : "0"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
