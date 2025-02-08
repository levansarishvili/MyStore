import Link from "next/link";
import { Button } from "./ui/button";
import { Frown } from "lucide-react";

export default function PageNotFound() {
  return (
    <section className="mt-10 lg:mt-16 flex flex-col items-center gap-10 lg:gap-16 w-full max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0 min-h-screen">
      <div className="border bg-card mt-16 p-6 md:p-12 rounded-xl flex flex-col items-center gap-6">
        <h1 className="text-xl md:text-2xl font-medium">404</h1>
        <Frown className="size-12  stroke-muted-foreground" />
        <p className="text-sm md:text-base lg:text-lg font-medium">
          We are sorry, but the page you requested was not found.
        </p>

        <Link href="/">
          <Button className="text-white hover:bg-[#2ca76e] transition-all duration-300">
            Back to home
          </Button>
        </Link>
      </div>
    </section>
  );
}
