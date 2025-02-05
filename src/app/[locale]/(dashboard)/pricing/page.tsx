import { Check, Star } from "lucide-react";
import BuySubscriptionButton from "./BuySubscriptionButton";
import CheckSubscriptionStatus from "../../../components/CheckSubscriptionStatus";

interface Props {
  params: { locale: string };
}

export default async function Pricing({ params }: Props) {
  // Check if the user is already a Pro member

  const isProMember = await CheckSubscriptionStatus();

  return (
    <section className="flex flex-col gap-10 w-full max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
      <h1 className="text-2xl lg:text-3xl mt-10 lg:mt-16 font-medium text-center">
        Buy Subscription
      </h1>

      {isProMember && (
        <div className="flex gap-2 justify-center items-center">
          <Star className="size-6 fill-primary stroke-primary" />
          <p className="text-base md:text-xl text-primary font-medium">
            You are a pro member already!
          </p>
        </div>
      )}

      <div className="flex flex-col custom-sm:flex-row gap-8 md:gap-12 w-full justify-center max-custom-sm:items-center">
        {/* Free Plan */}
        <div className="flex flex-col gap-4 w-[16rem] custom-sm:w-[20rem] p-6 border border-border bg-card rounded-xl shadow-md">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground text-center">
            Free Plan
          </h2>
          <p className="text-xl mg:text-2xl font-semibold text-primary text-center">
            $0
          </p>

          {/* Features List */}
          <div className="flex flex-col gap-3 mt-12">
            {["View and buy products", "View blogs", "Responsive Website"].map(
              (feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="bg-primary text-white rounded-full flex justify-center items-center w-6 h-6 p-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <p className="text-sm text-foreground">{feature}</p>
                </div>
              )
            )}
          </div>
        </div>

        {/* Pro Plan */}
        <div className="flex flex-col gap-4 w-[16rem] custom-sm:w-[20rem] p-6 border border-border bg-card rounded-xl shadow-md max-custom-sm:items-center">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground text-center">
            Pro Plan
          </h2>
          <p className="text-xl mg:text-2xl font-semibold text-primary text-center">
            $29
          </p>

          {/* Features List */}
          <div className="flex flex-col gap-3">
            {[
              "View and buy products",
              "View blogs",
              "Responsive Website",
              "Edit products",
              "Add new products",
              "Edit blogs",
              "Add new blogs",
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
