import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  Facebook,
  Instagram,
  Linkedin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Create Footer component
function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-background w-full mt-24 border-t py-10">
      <div className="md:border-b pb-8 max-w-[90rem] w-full h-full mx-auto my-0 flex justify-between max-sm:flex-col gap-8 px-6 md:px-12 lg:px-20 py-0">
        <div className="flex flex-col gap-8">
          <p className="text-2xl font-medium">3legant.</p>
          <p className="text-base font-normal md:font-medium md:text-xl max-w-[16.5rem]">
            More than just a game. It&apos;s a lifestyle.
          </p>
          <div className="flex gap-6">
            <Facebook className="hover:stroke-primary transition-all duration-300 cursor-pointer" />
            <Instagram className="hover:stroke-primary transition-all duration-300 cursor-pointer" />
            <Linkedin className="hover:stroke-primary transition-all duration-300 cursor-pointer" />
          </div>
        </div>

        {/* Accordion for smaller screens */}
        <Accordion type="single" collapsible className="w-full sm:hidden">
          <AccordionItem value="item-1">
            <AccordionTrigger className="hover:no-underline text-base font-medium">
              Page
            </AccordionTrigger>
            <AccordionContent>
              <Link
                href="/"
                className="hover:text-primary transition-all duration-300"
              >
                Home
              </Link>
            </AccordionContent>
            <AccordionContent>
              <Link
                href="/"
                className="hover:text-primary transition-all duration-300"
              >
                Product
              </Link>
            </AccordionContent>
            <AccordionContent>
              <Link
                href="/"
                className="hover:text-primary transition-all duration-300"
              >
                Blog
              </Link>
            </AccordionContent>
            <AccordionContent>
              <Link
                href="/"
                className="hover:text-primary transition-all duration-300"
              >
                Contact
              </Link>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="hover:no-underline text-base font-medium">
              Info
            </AccordionTrigger>
            <AccordionContent>Shipping Policy</AccordionContent>
            <AccordionContent>Return & Refund</AccordionContent>
            <AccordionContent>Support</AccordionContent>
            <AccordionContent>FAQs</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="hover:no-underline text-base font-medium">
              Office
            </AccordionTrigger>
            <AccordionContent>221B Baker Street</AccordionContent>
            <AccordionContent>London NW1 6XE</AccordionContent>
            <AccordionContent>United Kingdom</AccordionContent>
            <AccordionContent>+44 20 7946 0958</AccordionContent>
          </AccordionItem>
        </Accordion>
        {/* =============================================== */}
        <div className="flex flex-col gap-6 sm:gap-10 max-sm:hidden">
          <p className="text-base font-medium">Page</p>
          <ul className="flex flex-col gap-6">
            <Link
              href="/"
              className="hover:text-primary transition-all duration-300"
            >
              <li className="text-sm">Home</li>
            </Link>
            <Link
              href="/store"
              className="hover:text-primary transition-all duration-300"
            >
              <li className="text-sm">Shop</li>
            </Link>
            <Link
              href="/blog"
              className="hover:text-primary transition-all duration-300"
            >
              <li className="text-sm">Blog</li>
            </Link>
            <Link
              href="/contact"
              className="hover:text-primary transition-all duration-300"
            >
              <li className="text-sm">Contact</li>
            </Link>
          </ul>
        </div>
        <div className="flex flex-col gap-6 sm:gap-10 max-sm:hidden">
          <div className="flex items- justify-between gap-2 cursor-pointer">
            <p className="text-base font-medium">Info</p>
            <ChevronDown className="hidden max-sm:flex" />
          </div>
          <ul className="flex flex-col gap-6">
            <li className="text-sm">Shipping Policy</li>
            <li className="text-sm">Return & Refund</li>
            <li className="text-sm">Support</li>
            <li className="text-sm">FAQs</li>
          </ul>
        </div>

        <div className="flex flex-col gap-6 sm:gap-10 max-sm:hidden">
          <p className="text-base font-medium">Office</p>
          <ul className="flex flex-col gap-6">
            <li className="text-sm">221B Baker Street</li>
            <li className="text-sm">London NW1 6XE</li>
            <li className="text-sm">United Kingdom</li>
            <li className="text-sm">+44 20 7946 0958</li>
          </ul>
        </div>
      </div>
      <div className="max-w-[90rem] w-full h-full mx-auto my-0 flex justify-between max-sm:flex-col gap-8 px-6 md:px-12 lg:px-20 pt-8">
        <p className="text-xs">Copyright © 2023 3legant. All rights reserved</p>

        <div className="flex gap-4">
          <Image
            src="/assets/stripe.png"
            alt="logo"
            width={200}
            height={200}
            quality={100}
            className="w-12 h-8"
          />
          <Image
            src="/assets/visa.png"
            alt="logo"
            width={200}
            height={200}
            quality={100}
            className="w-12 h-8"
          />
          <Image
            src="/assets/mastercard.png"
            alt="logo"
            width={200}
            height={200}
            quality={100}
            className="w-12 h-8"
          />
          <Image
            src="/assets/apple-pay.png"
            alt="logo"
            width={200}
            height={200}
            quality={100}
            className="w-12 h-8"
          />
        </div>
      </div>
    </footer>
  );
}

// Exporting Footer component
export default Footer;
