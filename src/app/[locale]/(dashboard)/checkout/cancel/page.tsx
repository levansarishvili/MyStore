import { X } from "lucide-react";
import Link from "next/link";
import { Button } from "src/app/components/ui/button";
import { useTranslations } from "next-intl";

interface ParamsType {
  params: { locale: string };
}

export default function CancelPage({ params }: ParamsType) {
  const locale = params.locale;
  const t = useTranslations("UnsuccessPaymentMessage");

  return (
    <section className="flex flex-col w-full min-h-screen items-center mt-12 lg:mt-20 max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 py-12 bg-background">
      <div className="flex flex-col gap-8 lg:gap-12 bg-card rounded-lg p-8 justify-center items-center max-w-[30rem] text-center mx-auto shadow-md border">
        <h1 className="text-base md:text-xl lg:text-2xl font-semibold flex items-center gap-2">
          <X className="size-7 stroke-red-700" />
          {t("title")}
        </h1>
        <p className="text-sm md:text-base text-muted-foreground mb-8">
          {t("message")}
        </p>

        <Link href={`/${locale}`}>
          <Button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-[#38CB89]/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#38CB89] focus:ring-opacity-50">
            {t("button")}
          </Button>
        </Link>
      </div>
    </section>
  );
}
