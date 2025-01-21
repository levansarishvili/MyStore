// "use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import HeroSlider from "src/app/components/HeroSlider";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <section className="grid grid-cols-[1fr_3fr] gap-12">
      {/* Search Bar */}
      <div className="grid grid-rows-2 gap-6 border rounded-2xl"></div>

      <HeroSlider />
    </section>
  );
}
