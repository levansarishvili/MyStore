"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import { useTranslations } from "next-intl";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Define Zod schema for validation
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message too short"),
});

// Type for the form data based on the Zod schema
type FormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const t = useTranslations("Contact");

  // Use React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string>("");

  // Handle form submission with TypeScript types
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/contact-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result: { success: boolean; error?: string } = await res.json();

      if (result.success) {
        setSuccess(true);
        // Reset the form after successful submission
        reset();
      } else {
        setError(result.error || "Failed to send message.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
      <h1 className="text-xl lg:text-2xl font-medium text-center mb-6">
        {t("title")}
      </h1>
      <div className="flex flex-col justify-center  bg-muted p-6 md:p-12 rounded-2xl">
        <p className="text-sm md:text-base text-center mb-8">{t("question")}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          <div className="flex flex-col justify-center">
            <form
              className="flex flex-col justify-center items-center gap-6 w-full bg-muted sm:p-6 rounded-xl"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="w-full flex flex-col gap-2">
                <Input
                  type="text"
                  placeholder={t("name")}
                  className="w-full text-sm rounded-lg px-4 py-2 bg-background border border-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div className="w-full flex flex-col gap-2">
                <Input
                  type="email"
                  placeholder={t("email")}
                  className="w-full text-sm rounded-lg px-4 py-2 bg-background border border-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="w-full flex flex-col gap-2">
                <Textarea
                  placeholder={t("message")}
                  className="h-28 w-full text-sm rounded-lg px-4 py-2 bg-background border border-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300"
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#38cb89] hover:bg-[#2da874] text-white font-medium py-2 px-8 rounded-lg transition"
                >
                  {loading ? t("sending") : t("button")}
                </Button>
              </div>

              {success && (
                <p className="text-green-500 text-center mt-2">
                  {t("sendMessage")}
                </p>
              )}
              {error && (
                <p className="text-red-500 text-center mt-2">{error}</p>
              )}
            </form>
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex flex-col space-y-6">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-sm">contact@e-shop.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-sm">+995 599 999 999 </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm">{t("address")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
