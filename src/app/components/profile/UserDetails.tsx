"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { createClient } from "src/utils/supabase/client";
import { UserProfileDetailsType } from "src/app/[locale]/(dashboard)/profile/page";
import { Loader } from "lucide-react";

const userDetailsSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  phone: z.string().regex(/^[0-9]+$/, "Phone must contain only numbers"),
});

type FormData = z.infer<typeof userDetailsSchema>;

interface UserDetailsProps {
  locale: string;
  userData: any;
  userDetails: UserProfileDetailsType;
}

export default function UserDetails({
  locale,
  userData,
  userDetails,
}: UserDetailsProps) {
  const [image, setImage] = useState<File | null>(null);
  const t = useTranslations("Profile.AccountForm");
  const supabase = createClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: {
      first_name:
        userDetails?.first_name ||
        userData?.user_metadata.full_name.split(" ")[0] ||
        "",
      last_name:
        userDetails?.last_name ||
        userData?.user_metadata.full_name.split(" ")[1] ||
        "",
      username:
        userDetails?.username || userData?.user_metadata.user_name || "",
      phone: userDetails?.phone || userData?.user_metadata.phone || "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    console.log("123");

    try {
      let imageUrl = userData?.user_metadata.image_url || "";

      // Update user profile details in Supabase table
      const { error: updateError } = await supabase
        .from("user_profiles")
        .update({
          first_name: data.first_name,
          last_name: data.last_name,
          username: data.username,
          phone: data.phone,
        })
        .eq("user_id", userData.id);

      if (updateError) throw updateError;

      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      console.log("Failed to update profile.");
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-full bg-muted p-6 rounded-xl"
    >
      {/* First Name */}
      <div className="flex flex-col w-full">
        <label
          className="text-sm font-medium text-muted-foreground mb-1"
          htmlFor="first_name"
        >
          {t("first_name")} <span className="text-destructive">*</span>
        </label>
        <Input
          {...register("first_name")}
          className="rounded-lg border-none bg-background"
        />
        {errors.first_name && (
          <p className="text-red-500 text-xs mt-1">
            {errors.first_name.message}
          </p>
        )}
      </div>

      {/* Last Name */}
      <div className="flex flex-col w-full">
        <label
          className="text-sm font-medium text-muted-foreground mb-1"
          htmlFor="last_name"
        >
          {t("last_name")} <span className="text-destructive">*</span>
        </label>
        <Input
          {...register("last_name")}
          className="rounded-lg border-none bg-background"
        />
        {errors.last_name && (
          <p className="text-red-500 text-xs mt-1">
            {errors.last_name.message}
          </p>
        )}
      </div>

      {/* Username */}
      <div className="flex flex-col w-full">
        <label
          className="text-sm font-medium text-muted-foreground mb-1"
          htmlFor="username"
        >
          {t("username")} <span className="text-destructive">*</span>
        </label>
        <Input
          {...register("username")}
          className="rounded-lg border-none bg-background"
        />
        {errors.username && (
          <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
        )}
      </div>

      {/* Phone */}
      <div className="flex flex-col w-full">
        <label
          className="text-sm font-medium text-muted-foreground mb-1"
          htmlFor="phone"
        >
          {t("phone")} <span className="text-destructive">*</span>
        </label>
        <Input
          {...register("phone")}
          className="rounded-lg border-none bg-background"
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="w-full flex justify-center">
        <Button
          type="submit"
          className={`mt-4 bg-primary text-white text-xs md:text-sm font-medium py-2 px-6 rounded-lg transition-all duration-300 ${
            loading ? "cursor-wait opacity-70" : "hover:bg-[#2ca76e]"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              {t("button")}
              <Loader className="size-4 animate-spin h-5 w-5" />
            </div>
          ) : (
            t("button")
          )}
        </Button>
      </div>
    </form>
  );
}
