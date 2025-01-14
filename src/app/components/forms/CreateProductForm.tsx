import Stripe from "stripe";
import { stripe } from "../../../lib/stripe";
import { createClient } from "../../../utils/supabase/server";
import GetUserData from "../GetUserData";

interface stripeProduct {
  name: string;
  description: string;
  images: string[];
}

export default function CreateProductForm() {
  async function createProduct(FormData: FormData) {
    "use server";

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: "2024-11-20.acacia",
    });

    const supabase = await createClient();

    // Get user ID
    const userData = await GetUserData();
    const userId = userData?.id;
    // If user is not logged in, return
    if (!userId) {
      console.log("User is not logged in");
      return;
    }

    const name = FormData.get("name") as string;
    const price = Number(FormData.get("price"));
    const category = FormData.get("category") as string;
    const description = FormData.get("description") as string;
    const imageUrl = FormData.get("image") as string;

    let stripeProduct;
    let stripePrice;

    // Create Stripe product
    try {
      stripeProduct = await stripe.products.create({
        name: name as string,
        description: description as string,
        images: [imageUrl as string],
      });
    } catch {
      console.log("Failed to create product on Stripe");
    }

    // Create Stripe price
    try {
      stripePrice = await stripe.prices.create({
        unit_amount: Math.round(price * 100),
        currency: "usd",
        product: stripeProduct?.id,
      });

      console.log(stripeProduct, stripePrice);
    } catch {
      console.log("Failed to create price on Stripe");
    }

    // Create product on supabase
    try {
      const { data, error } = await supabase.from("products").insert({
        name: name,
        price: Math.round(price * 100),
        category: category,
        description: description,
        image_url: imageUrl,
        user_id: userId,
        stripe_product_id: stripeProduct?.id,
        stripe_price_id: stripePrice?.id,
      });
      if (error) {
        console.log(error);
      } else {
        console.log("Product is added successfully ✔");
      }
    } catch {
      console.log("Failed to create product on Supabase");
    }
  }
  return (
    <form
      action={createProduct}
      className="product-form dark:bg-[#313131] flex flex-col items-center justify-center gap-6 bg-[#f1f3f5] p-8 rounded-2xl w-[36rem]"
    >
      <div className="form-group flex flex-col items-start justify-center gap-4 w-full">
        <label
          className="product-add-form-label text-[1.6rem] font-semibold"
          htmlFor="name"
        >
          Product Name
        </label>
        <input
          className="product-add-input dark:bg-[#4a4a4a] w-full p-3 border border-gray-300 rounded-md text-xl outline-none transition-all duration-300 cursor-pointer focus:border-[#ec5e2a]"
          type="text"
          id="name"
          name="name"
          required
        />
      </div>
      <div className="form-group flex flex-col items-start justify-center gap-4 w-full">
        <label
          className="product-add-form-label text-[1.6rem] font-semibold"
          htmlFor="price"
        >
          Price
        </label>
        <input
          className="product-add-input dark:bg-[#4a4a4a] p-3 border border-gray-300 rounded-md text-xl outline-none w-full transition-all duration-300 cursor-pointer focus:border-[#ec5e2a]"
          type="number"
          step="0.01"
          id="price"
          name="price"
          required
        />
      </div>
      <div className="form-group flex flex-col items-start justify-center gap-4 w-full">
        <label
          className="product-add-form-label text-[1.6rem] font-semibold"
          htmlFor="description"
        >
          Description
        </label>
        <input
          className="product-add-input dark:bg-[#4a4a4a] p-3 border border-gray-300 rounded-md text-xl outline-none w-full transition-all duration-300 cursor-pointer focus:border-[#ec5e2a]"
          type="text"
          id="description"
          name="description"
          required
        />
      </div>
      <div className="form-group flex flex-col items-start justify-center gap-4 w-full">
        <label
          className="product-add-form-label text-[1.6rem] font-semibold"
          htmlFor="category"
        >
          Category
        </label>
        <input
          className="product-add-input dark:bg-[#4a4a4a] p-3 border border-gray-300 rounded-md text-xl outline-none w-full transition-all duration-300 cursor-pointer focus:border-[#ec5e2a]"
          type="text"
          id="category"
          name="category"
          required
        />
      </div>
      <div className="form-group flex flex-col items-start justify-center gap-4 w-full">
        <label
          className="product-add-form-label text-[1.6rem] font-semibold"
          htmlFor="image"
        >
          Image url
        </label>
        <input
          className="product-add-input dark:bg-[#4a4a4a] p-3 border border-gray-300 rounded-md text-xl outline-none w-full transition-all duration-300 cursor-pointer focus:border-[#ec5e2a]"
          type="text"
          id="image"
          name="image"
          required
        />
      </div>

      <button
        type="submit"
        className="product-add-form-btn flex items-center justify-center p-3 bg-[#ec5e2a] text-white border-none rounded-md cursor-pointer text-[1.4rem] font-medium w-48 transition-all duration-300 hover:bg-white hover:text-[#ec5e2a] hover:shadow-md"
      >
        Add Product
      </button>
    </form>
  );
}
