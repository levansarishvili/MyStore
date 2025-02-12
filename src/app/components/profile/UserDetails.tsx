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
  const [createdSuccessfully, setCreatedSuccessfully] = useState(false);
  const t = useTranslations("Profile.AccountForm");
  const supabase = createClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: {
      first_name:
        userDetails?.first_name ||
        userData?.user_metadata.full_name?.split(" ")[0] ||
        "",
      last_name:
        userDetails?.last_name ||
        userData?.user_metadata.full_name?.split(" ")[1] ||
        "",
      username:
        userDetails?.username || userData?.user_metadata?.user_name || "",
      phone: userDetails?.phone || userData?.user_metadata?.phone || "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      let imageUrl = userDetails?.image_url || "";
      // // Upload image on supabase storage and after that get image url
      if (image) {
        const fileName = `${Date.now()}-${image.name}`;
        const { data: uploadData, error } = await supabase.storage
          .from("user_avatars")
          .upload(fileName, image);
        if (error) return;

        const { data: publicUrl } = supabase.storage
          .from("user_avatars")
          .getPublicUrl(uploadData.path);
        imageUrl = publicUrl.publicUrl;
      }

      // Update user profile details in Supabase table
      const { error: updateError } = await supabase
        .from("user_profiles")
        .update({
          first_name: data.first_name,
          last_name: data.last_name,
          username: data.username,
          phone: data.phone,
          image_url: imageUrl,
        })
        .eq("user_id", userData.id);

      if (updateError) throw updateError;
      setCreatedSuccessfully(() => true);
      deleteOldImage();
      router.refresh();

      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      console.log("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  // Delete old image from supabase storage after uploading new one
  const deleteOldImage = async () => {
    if (userDetails?.image_url && image) {
      try {
        const { error: deleteError } = await supabase.storage
          .from("user_avatars")
          .remove([userDetails?.image_url.split("/").pop() || ""]);
        if (deleteError) throw deleteError;
      } catch (error) {
        console.error("Error deleting old image:", error);
      }
    }
  };

  // Watch for input changes
  const formValues = watch();
  // Compare each input value with the initial values and if they changed make submit button visible
  const isFormChanged = Object.entries(formValues).some(
    ([key, value]) => value !== userDetails[key as keyof UserProfileDetailsType]
  );

  return (
    <div className="w-full flex justify-center flex-col items-center">
      <h2 className="text-base md:text-lg font-medium">{t("subtitle")}</h2>

      {createdSuccessfully && (
        <p className="mt-2 text-primary text-sm md:text-base">
          {t("success_message")}
        </p>
      )}
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
            <p className="text-red-500 text-xs mt-1">
              {errors.username.message}
            </p>
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

        {/* Email */}
        <div className="flex flex-col w-full">
          <label
            className="text-sm font-medium text-muted-foreground mb-1"
            htmlFor="email"
          >
            {t("email")}
          </label>
          <Input
            type="email"
            accept="image/*"
            disabled
            value={userData.email}
            className="rounded-lg border-none bg-background"
          />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col w-full">
          <label
            className="text-sm font-medium text-muted-foreground mb-1"
            htmlFor="image"
          >
            {t("uploadImage")}
          </label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
            className="rounded-lg border-none bg-background"
          />
        </div>

        {/* Submit Button */}
        <div className="w-full flex justify-center">
          <Button
            type="submit"
            className={`${
              image || isFormChanged ? "" : "hidden"
            } mt-4 bg-primary text-white text-xs md:text-sm font-medium py-2 px-6 rounded-lg transition-all duration-300 ${
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
    </div>
  );
}
