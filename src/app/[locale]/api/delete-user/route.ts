import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export async function DELETE(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-11-20.acacia",
  });

  try {
    // Get user ID from request body
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    // Get stripe customer ID from Supabase
    const { data: customerData, error: customerError } = await supabaseAdmin
      .from("user_profiles")
      .select("stripe_customer_id")
      .eq("user_id", userId)
      .single();
    const stripeCustomerId = customerData?.stripe_customer_id;

    if (customerError) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to get customer ID from Supabase",
          details: customerError.message,
        },
        { status: 500 }
      );
    }

    // Delete user from Supabase
    const { error: supabaseError } = await supabaseAdmin.auth.admin.deleteUser(
      userId
    );

    if (supabaseError) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to delete user on Supabase",
          details: supabaseError.message,
        },
        { status: 500 }
      );
    }

    // Delete user from user_profiles table in Supabase
    const { error: profilesError } = await supabaseAdmin
      .from("user_profiles")
      .delete()
      .eq("user_id", userId);

    if (profilesError) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to delete user from user_profiles table in Supabase",
          details: profilesError.message,
        },
        { status: 500 }
      );
    }

    // Delete user from Stripe
    try {
      await stripe.customers.del(stripeCustomerId);
    } catch (stripeError) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to delete user on Stripe",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete user",
      },
      { status: 500 }
    );
  }
}
