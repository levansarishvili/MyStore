import { Check, Star } from "lucide-react";
import BuySubscriptionButton from "./BuySubscriptionButton";
import CheckSubscriptionStatus from "../../../components/CheckSubscriptionStatus";
import { createTranslator } from "next-intl";

interface Props {
  params: { locale: string };
}

export default async function Pricing({ params }: Props) {
  const locale = params.locale;
  const messages = (await import(`../../../../../messages/${locale}.json`))
    .default;
  const t = createTranslator({ locale, messages });

  // Check if the user is already a Pro member
  const isProMember = await CheckSubscriptionStatus();

  return (
    <section className="flex flex-col gap-6 md:gap-10 w-full max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
      <h1 className="text-xl md:text-2xl mt-10 lg:mt-16 font-medium text-center">
        {t("Pricing.title")}
      </h1>

      {isProMember && (
        <div className="flex gap-2 justify-center items-center">
          <Star className="size-6 fill-primary stroke-primary" />
          <p className="text-sm md:text-xl text-primary font-medium">
            {t("Pricing.message")}
          </p>
        </div>
      )}

      <div className="flex flex-col custom-sm:flex-row gap-8 md:gap-12 w-full justify-center max-custom-sm:items-center">
        {/* Free Plan */}
        <div className="flex flex-col gap-4 w-[16rem] custom-sm:w-[20rem] p-4 md:p-6 border border-border bg-card rounded-xl shadow-md">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground text-center">
            {t("Pricing.freePlan")}
          </h2>
          <p className="text-xl mg:text-2xl font-semibold text-primary text-center">
            $0
          </p>

          {/* Features List */}
          <div className="flex flex-col gap-3 mt-12">
            {[
              `${t("Pricing.benefits.item1")}`,
              `${t("Pricing.benefits.item2")}`,
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="bg-primary text-white rounded-full flex justify-center items-center w-6 h-6 p-1">
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-sm text-foreground">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Plan */}
        <div className="flex flex-col gap-4 w-[16rem] custom-sm:w-[20rem] p-6 border border-border bg-card rounded-xl shadow-md max-custom-sm:items-center">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground text-center">
            {t("Pricing.proPlan")}
          </h2>
          <p className="text-xl mg:text-2xl font-semibold text-primary text-center">
            $29
          </p>

          {/* Features List */}
          <div className="flex flex-col gap-3">
            {[
              `${t("Pricing.benefits.item1")}`,
              `${t("Pricing.benefits.item2")}`,
              `${t("Pricing.benefits.item3")}`,
              `${t("Pricing.benefits.item4")}`,
              `${t("Pricing.benefits.item5")}`,
              `${t("Pricing.benefits.item6")}`,
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="bg-primary text-white rounded-full flex justify-center items-center w-6 h-6 p-1">
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-sm text-foreground">{feature}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <BuySubscriptionButton isProMember={isProMember} />
        </div>
      </div>
    </section>
  );
}
