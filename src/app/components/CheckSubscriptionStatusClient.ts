"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";

// Check if the user is a Pro member in a client-side component, returns subscription status and loading state
export default function CheckSubscriptionStatusClient() {
  const [isProMember, setIsProMember] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Error fetching session:", error);
          return;
        }

        const { data, error: fetchError } = await supabase
          .from("user_profiles")
          .select("subscription_status")
          .eq("email", session?.user?.email)
          .single();

        if (fetchError) {
          console.error("Error fetching subscription status:", fetchError);
          return;
        }

        setIsProMember(data?.subscription_status);
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSubscriptionStatus();
  }, []);

  return { isProMember, loading };
}
