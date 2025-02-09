"use client";

import Link from "next/link";
import { signup } from "./actions";
import { useTranslations } from "next-intl";
import { Button } from "src/app/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "src/app/components/ui/use-toast";

interface paramsType {
  params: { locale: string };
}

// Validation schema
const signupSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .min(1, "Password is required"),
});

type FormData = z.infer<typeof signupSchema>;

// Signup page component
export default function SignUpPage({ params }: paramsType) {
  const locale = params.locale;
  const t = useTranslations("SignUpPage");
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signupSchema),
  });

  // Submit handler
  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    const result = await signup(formData);

    if (!result?.success) {
      toast({
        title: "Signup Failed",
        description: result?.message || "Something went wrong",
        variant: "default",
      });
      // Clear form on failure
      reset();
    } else {
      toast({
        title: "Signup Successful",
        description: "Redirecting...",
      });
      window.location.href = "/";
    }
  };

  return (
    <div className="mt-16 bg-card flex flex-col items-center gap-6 justify-center border max-w-[24rem] mx-auto rounded-xl px-6 md:px-8 py-8 shadow-md">
      <form
        className="flex flex-col items-center gap-8 lg:gap-10 justify-center max-w-[24rem] mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-xl md:text-2xl font-medium">{t("title")}</h1>
        <div className="flex">
          <p className="text-xs sm:text-sm lg:text-base">
            {t("question")} &nbsp;
          </p>
          <Link
            href={`/${locale}/login`}
            className="text-primary text-xs sm:text-sm lg:text-base"
          >
            {t("link")}
          </Link>
        </div>
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-2 min-w-[16rem]">
            <label className="text-xs sm:text-sm lg:text-base" htmlFor="email">
              {t("email")}:
            </label>
            <input
              {...register("email")}
              className="border rounded-lg px-4 py-2 text-sm bg-background"
              id="email"
              type="email"
              data-cy="email-input"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="text-xs sm:text-sm lg:text-base"
              htmlFor="password"
            >
              {t("password")}:
            </label>
            <input
              {...register("password")}
              className="border rounded-lg px-4 py-2 text-sm bg-background"
              id="password"
              type="password"
              data-cy="password-input"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>
        </div>
        <div className="w-2/3">
          <Button
            variant={"default"}
            className="text-white hover:bg-[#2ca76e] transition-all duration-300 w-full"
            data-cy="signup-button"
            type="submit"
          >
            {t("signup-button")}
          </Button>
        </div>
      </form>
    </div>
  );
}
