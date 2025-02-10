import Image from "next/image";
import Link from "next/link";
import { createTranslator } from "next-intl";

const categories = [
  {
    name: "Smartphones",
    image:
      "https://trsiucvoloylukdbsoaf.supabase.co/storage/v1/object/public/website-images//phone.png",
  },
  {
    name: "Tablets",
    image:
      "https://trsiucvoloylukdbsoaf.supabase.co/storage/v1/object/public/website-images//tablet.png",
  },
  {
    name: "Laptops",
    image:
      "https://trsiucvoloylukdbsoaf.supabase.co/storage/v1/object/public/website-images//laptop.png",
  },
  {
    name: "Audio",
    image:
      "https://trsiucvoloylukdbsoaf.supabase.co/storage/v1/object/public/website-images//headphone.png",
  },
  {
    name: "Monitors",
    image:
      "https://trsiucvoloylukdbsoaf.supabase.co/storage/v1/object/public/website-images//monitor.png",
  },
  {
    name: "Photo+and+video",
    image:
      "https://trsiucvoloylukdbsoaf.supabase.co/storage/v1/object/public/website-images//camera.png",
  },
];

export default async function ShopByCategory({ locale }: { locale: string }) {
  const messages = (await import(`../../../../messages/${locale}.json`))
    .default;
  const t = createTranslator({ locale, messages });

  return (
    <section className="w-full flex flex-col max-sm:items-center gap-6 md:gap-8 lg:gap-12 overflow-hidden max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
      <h2 className="text-xl sm:text:2xl md:text-3xl font-medium">
        {t("ShopByCategory.title")}
      </h2>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 py-4">
        {categories.map((category, index) => (
          <Link
            href={`/${locale}/store/?category=${category.name}`}
            key={index}
            className="group"
          >
            <div className="border flex flex-col items-center gap-3 bg-card rounded-xl py-4 md:py-10 hover:shadow-md transition-all duration-300 cursor-pointer">
              <div className="w-1/2 h-20 md:h-32 rounded-lg overflow-hidden flex justify-center">
                <Image
                  src={category.image}
                  width={800}
                  height={400}
                  quality={100}
                  alt={category.name}
                  className="w-32 lg:w-36 h-20lg:h-24 object-contain group-hover:scale-95 transition-transform duration-300"
                />
              </div>
              <p className="max-sm:text-xs text-base font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                {t(`ShopByCategory.categories.${category.name}`)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
