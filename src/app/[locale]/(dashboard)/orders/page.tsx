import Link from "next/link";
import { createClient } from "../../../../utils/supabase/server";
import GetUserData from "../../../components/GetUserData";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

interface OrdersType {
  id: string;
  stripe_purchase_id: string;
  stripe_product_id: string;
  created_at: string;
  user_id: string;
  total_price: number;
}

export default async function OrdersPage() {
  // Fetch orders by user
  const supabase = await createClient();
  const userData = await GetUserData();
  const { data: orders, error } = (await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userData?.id)) as { data: OrdersType[] | null; error: any };

  const sortedOrders = orders?.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const totalPrice = sortedOrders?.reduce(
    (acc, order) => acc + order.total_price,
    0
  );

  return (
    <section className="flex flex-col items-center gap-20 w-full max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
      <h1 className="text-2xl lg:text-3xl font-medium mt-10 lg:mt-16">
        Orders
      </h1>

      <Table className="w-full border border-muted rounded-lg overflow-hidden shadow">
        <TableCaption className="text-muted-foreground text-sm py-2">
          A list of your recent payments.
        </TableCaption>
        <TableHeader className="bg-primary max-md:text-xs">
          <TableRow className="hover:bg-primary">
            <TableHead className="px-4 py-3 font-semibold text-white">
              #
            </TableHead>
            <TableHead className="px-4 py-3 text-white">Date</TableHead>
            <TableHead className="px-4 py-3 text-white">Details</TableHead>
            <TableHead className="px-4 py-3 text-white text-right">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="max-md:text-xs">
          {sortedOrders?.map((order, index) => (
            <TableRow
              key={order.id}
              className={index % 2 === 0 ? "bg-muted/50" : "bg-background"}
            >
              <TableCell className="max-md:px-2 *:px-4 py-3 font-medium">
                #{order.id}
              </TableCell>
              <TableCell className="max-md:px-2 px-4 py-3">
                {new Date(order.created_at)
                  .toLocaleDateString("en-GB")
                  .replace(/\//g, ".")}
              </TableCell>
              <TableCell className="max-md:px-2 px-4 py-3">
                <Link
                  href={`/orders/${order.id}`}
                  className="hover:text-primary transition-all duration-300 underline"
                >
                  Details
                </Link>
              </TableCell>
              <TableCell className="max-md:px-2 px-4 py-3 text-right">
                {`$${(order.total_price / 100).toFixed(2)}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="max-md:text-xs">
          <TableRow className="bg-muted font-semibold">
            <TableCell colSpan={3} className="px-4 py-3">
              Total
            </TableCell>
            <TableCell className="max-md:px-2 px-4 py-3 text-right text-primary">
              {totalPrice ? `$${(totalPrice / 100).toFixed(2)}` : "$0.00"}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </section>
  );
}
