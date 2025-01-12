import { stripe } from "../../lib/stripe";

export default async function AddCustomerOnStripe(
  email: string,
  customerName: string
) {
  try {
    // Check if the customer already exists in Stripe
    const existingCustomer = await stripe.customers.list({
      email: email,
    });

    if (existingCustomer.data.length > 0) {
      return;
    }

    // Create a new customer in Stripe
    const stripeCustomer = await stripe.customers.create({
      email: email,
      name: customerName,
    });

    console.log("Created customer on Stripe:", stripeCustomer);
    return stripeCustomer;
  } catch (error) {
    console.error("Error creating customer on Stripe:", error);
    throw error;
  }
}
