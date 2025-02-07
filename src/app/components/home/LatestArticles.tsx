import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { createClient } from "src/utils/supabase/server";
import type { BlogType } from "../../[locale]/(dashboard)/blog/page";
import BlogItem from "../../[locale]/(dashboard)/blog/BlogItem";
import { createTranslator } from "next-intl";

export default async function LatestArticles({ locale }: { locale: string }) {
  const messages = (await import(`../../../../messages/${locale}.json`))
    .default;
  const t = createTranslator({ locale, messages });
  const supabase = await createClient();
  // Fetch latest 4 post
  const { data: latestPosts, error } = (await supabase
    .from("post_translations")
    .select("*")
    .eq("language_code", locale)
    .order("id", { ascending: false })
    .limit(3)) as { data: BlogType[]; error: any };

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <section className="w-full flex flex-col gap-12 max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
      <div className="w-full items-center flex justify-between gap-16">
        <h2 className="text-2xl md:text-3xl font-medium">
          {t("LatestBlogs.title")}
        </h2>
        <div className="flex justify-end gap-16">
          <Link
            href={`/${locale}/blog`}
            className="flex gap-2 items-center hover:text-primary transition-all duration-300"
          >
            <p className="text-sm sm:text-base font-medium">
              {t("LatestBlogs.readMore")}
            </p>
            <ArrowRight className="size-5" />
          </Link>
        </div>
      </div>

      <ul className="w-full grid grid-cols-1 gap-6 custom-sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {latestPosts?.map((post) => (
          <BlogItem
            key={post.id}
            id={post.id}
            title={post.translated_title || ""}
            content={post.translated_body || ""}
            image_url={post.image_url}
            locale={locale}
          />
        ))}
      </ul>
    </section>
  );
}
