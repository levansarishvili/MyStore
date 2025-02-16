"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Rating } from "@mui/material";
import type { ReviewsType, UsersType } from "./page";
import { Button } from "src/app/components/ui/button";
import { Input } from "src/app/components/ui/input";
import { createClient } from "src/utils/supabase/client";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { useTranslations } from "next-intl";
import { Loader } from "lucide-react";
import { has } from "cypress/types/lodash";

// Supabase setup
const supabase = createClient();

// Zod validation schema
const reviewSchema = z.object({
  review: z.string().min(5, "Review must be at least 5 characters long"),
  rating: z.number().min(1, "Rating is required").max(5, "Max rating is 5"),
});

interface ProductReviewsProps {
  id: string;
  userId: string | undefined;
  reviews: ReviewsType[];
  users: UsersType[];
  hasBoughtProduct: boolean;
}

export default function ProductReviews({
  id,
  userId,
  reviews,
  users,
  hasBoughtProduct,
}: ProductReviewsProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reviewsData, setReviewsData] = useState(reviews);
  const [addedSuccessfully, setAddedSuccessfully] = useState(false);
  const [alreadyHasReview, setAlreadyHasReview] = useState(false);
  const t = useTranslations("Products.ProductReviwes");
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      review: "",
      rating: 5,
    },
  });

  const ratingValue = watch("rating");

  // Check if user already has a review
  const userHasReview = reviews.some((review) => review.user_id === userId);

  // Submit review to Supabase
  const onSubmit = async (data: { review: string; rating: number }) => {
    if (userHasReview) {
      console.log("You already have a review for this product");
      setAlreadyHasReview(() => true);
      reset();
      return;
    }
    setLoading(() => true);
    const { error } = await supabase.from("product_reviews").insert([
      {
        review_text: data.review,
        rating: data.rating,
        product_id: id,
        user_id: userId,
      },
    ]);

    if (error) {
      console.error("Error submitting review:", error.message);
      setLoading(() => false);
    } else {
      console.log("Review submitted successfully!");
      reset();
      setAddedSuccessfully(() => true);
      setLoading(() => false);
      router.refresh();
    }
  };

  return (
    <section className="w-full flex flex-col gap-8 md:gap-10 lg:gap-12">
      <h2 className="text-center text-xl md:text-2xl font-medium">
        {t("title")}
      </h2>

      {/* Review Input Form */}
      {hasBoughtProduct && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 bg-muted p-6 border rounded-xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Input
              {...register("review")}
              type="text"
              placeholder={t("ReviewItem.inputPlaceholder")}
              className="rounded-lg h-12 bg-background border-none text-sm"
            />
            <div className="">
              <Button
                type="submit"
                className={`bg-primary text-white text-xs md:text-sm font-medium py-2 px-6 rounded-lg transition-all duration-300 ${
                  loading ? "cursor-wait opacity-70" : "hover:bg-[#2ca76e]"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    {t("ReviewItem.submitButton")}
                    <Loader className="size-4 animate-spin h-5 w-5" />
                  </div>
                ) : (
                  `${t("ReviewItem.submitButton")}`
                )}
              </Button>
            </div>
          </div>

          {errors.review && (
            <p className="text-destructive text-sm">{errors.review.message}</p>
          )}

          {alreadyHasReview && (
            <p className="text-red-500 text-xs">{t("alreadyHasReview")}</p>
          )}

          {addedSuccessfully && (
            <p className="text-green-500 text-sm">{t("success_message")}</p>
          )}

          {/* Rating System */}
          <div className="flex items-center gap-2">
            {isMounted && (
              <>
                <Rating
                  name="product-rating"
                  value={ratingValue}
                  onChange={(_, newValue) => setValue("rating", newValue ?? 1)}
                />
                <span className="text-muted-foreground text-sm">
                  {ratingValue} Stars
                </span>
              </>
            )}
          </div>
          {errors.rating && (
            <p className="text-destructive text-sm">{errors.rating.message}</p>
          )}
        </form>
      )}

      {/* Review List */}
      {reviews.length > 0 && (
        <div className="w-full flex flex-col md:flex-row justify-between items-start gap-4">
          <p className="text-start text-base font-medium">
            {reviews.length} {t("ReviewsNum")}
          </p>
        </div>
      )}

      {/* If there is not reviews yet */}
      {reviews.length === 0 && (
        <p className="text-center text-muted-foreground">{t("emptyMessage")}</p>
      )}

      {/* Review Cards */}
      <div className="flex flex-col gap-6">
        {isMounted &&
          reviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col gap-3 border border-muted bg-card rounded-xl p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="/assets/user.svg" alt="User Avatar" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">
                    {
                      users.find((user) => user.user_id === review.user_id)
                        ?.email
                    }
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-foreground">
                {review.review_text}
              </p>
              <div className="flex items-center gap-2">
                <Rating
                  name="product-rating"
                  value={review.rating}
                  readOnly
                  size="small"
                />
                <span className="text-muted-foreground text-sm">
                  {review.rating} Stars
                </span>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
