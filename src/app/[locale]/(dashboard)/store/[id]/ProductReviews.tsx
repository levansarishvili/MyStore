"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Rating } from "@mui/material";
import type { ReviewsType } from "./page";
import { Button } from "src/app/components/ui/button";
import { Input } from "src/app/components/ui/input";
import { createClient } from "src/utils/supabase/client";
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
}

export default function ProductReviews({
  id,
  userId,
  reviews,
}: ProductReviewsProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [reviewsData, setReviewsData] = useState(reviews);

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

  // Submit review to Supabase
  const onSubmit = async (data: { review: string; rating: number }) => {
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
    } else {
      console.log("Review submitted successfully!");
      reset();
    }
  };

  return (
    <section className="w-full flex flex-col gap-6 md:gap-8 lg:gap-12">
      <h2 className="text-center text-xl md:text-2xl font-medium">
        Customer Reviews
      </h2>

      {/* Review Input Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex justify-between items-center gap-4">
          <Input
            {...register("review")}
            type="text"
            placeholder="Write a review here"
            className="rounded-lg"
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-white rounded-lg hover:bg-[#2ca76e] transition-all duration-300"
          >
            {isSubmitting ? "Posting..." : "Post"}
          </Button>
        </div>
        {errors.review && (
          <p className="text-red-500 text-sm">{errors.review.message}</p>
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
              <span className="text-gray-700 text-sm">{ratingValue} Stars</span>
            </>
          )}
        </div>
        {errors.rating && (
          <p className="text-red-500 text-sm">{errors.rating.message}</p>
        )}
      </form>

      {/* Review List */}
      <div className="flex justify-between gap-12">
        <p className="text-sm md:text-base font-medium">
          {reviews.length} Reviews
        </p>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort reviews by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="apple">Newest</SelectItem>
              <SelectItem value="banana">Oldest</SelectItem>
              <SelectItem value="blueberry">Most liked</SelectItem>
              <SelectItem value="grapes">Most disliked</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-4">
        {isMounted &&
          reviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col gap-2 border border-muted bg-card rounded-lg p-4"
            >
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-sm">{review.review_text}</p>
              <div className="flex items-center gap-2">
                <Rating
                  name="product-rating"
                  value={review.rating}
                  readOnly
                  size="small"
                />
                <span className="text-gray-700 text-sm">
                  {review.rating} Stars
                </span>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
