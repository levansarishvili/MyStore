import { Check } from "lucide-react";
import Link from "next/link";

interface Props {
  params: { locale: string };
}

export default function Pricing({ params }: Props) {
  const locale = params.locale;

  return (
    <div className="flex flex-col gap-12 rounded-2xl bg-[#f1f3f5] justify-center items-center max-w-[100rem] px-[4.8rem] py-[3.2rem]">
      <h1 className="text-[2.2rem] font-semibold">Buy Subscription</h1>

      {/* Stripe */}
      <ul className="card-list">
        <li>
          <Link
            href={`/${locale}/donate-with-embedded-checkout`}
            className="card checkout-style-background"
          >
            <h2 className="bottom">Donate with embedded Checkout</h2>
          </Link>
        </li>
        <li>
          <Link
            href={`/${locale}/donate-with-checkout`}
            className="card checkout-style-background"
          >
            <h2 className="bottom">Donate with hosted Checkout</h2>
          </Link>
        </li>
        <li>
          <Link
            href={`/${locale}/donate-with-elements`}
            className="card elements-style-background"
          >
            <h2 className="bottom">Donate with Elements</h2>
          </Link>
        </li>
      </ul>

      <div className="flex gap-8">
        {/* Free Plan */}
        <div className="flex flex-col gap-8 items-start w-[26rem] p-8 bg-white rounded-lg">
          <div className="flex flex-col">
            <h2 className="text-[#202842] text-[2.2rem] font-semibold">
              Free Plan
            </h2>
            <p className="text-[#202842] text-[1.4rem] font-medium">
              For personal
            </p>
          </div>
          <p className="text-[#202842] text-[2.6rem] font-medium">$0</p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-[#ec5e2a] rounded-full flex justify-center items-center w-[2.6rem] h-[2.6rem] p-1">
                <Check className="text-[#F4F2FD]" />
              </div>
              <p className="text-[#202842] text-[1.4rem]">1 users</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#ec5e2a] rounded-full flex justify-center items-center w-[2.6rem] h-[2.6rem] p-1">
                <Check className="text-[#F4F2FD]" />
              </div>
              <p className="text-[#202842] text-[1.4rem]">4 Web mails</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#ec5e2a] rounded-full flex justify-center items-center w-[2.6rem] h-[2.6rem] p-1">
                <Check className="text-[#F4F2FD]" />
              </div>
              <p className="text-[#202842] text-[1.4rem]">Responsive Website</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#ec5e2a] rounded-full flex justify-center items-center w-[2.6rem] h-[2.6rem] p-1">
                <Check className="text-[#F4F2FD]" />
              </div>
              <p className="text-[#202842] text-[1.4rem]">Free SSL</p>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <button className="flex justify-center text-[1.6rem] items-center bg-[#ec5e2a] rounded-full text-[#F4F2FD] font-medium px-6 py-2">
              Subscribe now
            </button>
          </div>
        </div>

        {/* Basic Plan */}
        <div className="flex flex-col gap-8 items-start w-[26rem] p-8 bg-white rounded-lg">
          <div className="flex flex-col">
            <h2 className="text-[#202842] text-[2.2rem] font-semibold">
              Basic Plan
            </h2>
            <p className="text-[#202842] text-[1.4rem] font-medium">
              For small business
            </p>
          </div>
          <p className="text-[#202842] text-[2.6rem] font-medium">$29</p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-[#ec5e2a] rounded-full flex justify-center items-center w-[2.6rem] h-[2.6rem] p-1">
                <Check className="text-[#F4F2FD]" />
              </div>
              <p className="text-[#202842] text-[1.4rem]">4 users</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#ec5e2a] rounded-full flex justify-center items-center w-[2.6rem] h-[2.6rem] p-1">
                <Check className="text-[#F4F2FD]" />
              </div>
              <p className="text-[#202842] text-[1.4rem]">10 Web mails</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#ec5e2a] rounded-full flex justify-center items-center w-[2.6rem] h-[2.6rem] p-1">
                <Check className="text-[#F4F2FD]" />
              </div>
              <p className="text-[#202842] text-[1.4rem]">Responsive Website</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#ec5e2a] rounded-full flex justify-center items-center w-[2.6rem] h-[2.6rem] p-1">
                <Check className="text-[#F4F2FD]" />
              </div>
              <p className="text-[#202842] text-[1.4rem]">Free SSL</p>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <button className="flex justify-center text-[1.6rem] items-center bg-[#ec5e2a] rounded-full text-[#F4F2FD] font-medium px-6 py-2">
              Subscribe now
            </button>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="flex flex-col gap-8 items-start w-[26rem] p-8 bg-white rounded-lg">
          <div className="flex flex-col">
            <h2 className="text-[#202842] text-[2.2rem] font-semibold">
              Pro Plan
            </h2>
            <p className="text-[#202842] text-[1.4rem] font-medium">
              For enterprise
            </p>
          </div>
          <p className="text-[#202842] text-[2.6rem] font-medium">$49</p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-[#ec5e2a] rounded-full flex justify-center items-center w-[2.6rem] h-[2.6rem] p-1">
                <Check className="text-[#F4F2FD]" />
              </div>
              <p className="text-[#202842] text-[1.4rem]">Unlimited users</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#ec5e2a] rounded-full flex justify-center items-center w-[2.6rem] h-[2.6rem] p-1">
                <Check className="text-[#F4F2FD]" />
              </div>
              <p className="text-[#202842] text-[1.4rem]">
                Unlimited Web mails
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#ec5e2a] rounded-full flex justify-center items-center w-[2.6rem] h-[2.6rem] p-1">
                <Check className="text-[#F4F2FD]" />
              </div>
              <p className="text-[#202842] text-[1.4rem]">Responsive Website</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#ec5e2a] rounded-full flex justify-center items-center w-[2.6rem] h-[2.6rem] p-1">
                <Check className="text-[#F4F2FD]" />
              </div>
              <p className="text-[#202842] text-[1.4rem]">Free SSL + SEO</p>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <button className="flex justify-center text-[1.6rem] items-center bg-[#ec5e2a] rounded-full text-[#F4F2FD] font-medium px-6 py-2">
              Subscribe now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
