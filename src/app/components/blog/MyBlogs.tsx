import { createClient } from "src/utils/supabase/server";
import GetUserData from "../GetUserData";
import Image from "next/image";
import DeleteBlog from "./DeleteBlog";
import type { BlogType } from "../../[locale]/(dashboard)/blog/page";
import { SquarePen } from "lucide-react";
import { createTranslator } from "next-intl";
import { Button } from "../ui/button";

export default async function MyBlogs({ locale }: { locale: string }) {
  const supabase = await createClient();
  const userdata = await GetUserData();

  const messages = (await import(`../../../../messages/${locale}.json`))
    .default;
  const t = createTranslator({ locale, messages });

  const { data: myBlogs, error } = (await supabase
    .from("post_translations")
    .select("*")
    .order("id", { ascending: false })
    .eq("language_code", locale)
    .eq("user_id", userdata?.id)) as { data: BlogType[]; error: any };

  if (error) {
    console.error("Error fetching products:", error);
    return null;
  }

  return (
    <section className="flex flex-col gap-4">
      {myBlogs?.map((blog) => (
        <div
          key={blog.id}
          className="flex max-custom-sm:flex-col gap-4 w-full justify-between items-center border rounded-lg p-4"
        >
          <Image
            src={blog.image_url || "/assets/placeholder.png"}
            alt="blog"
            width={800}
            height={600}
            className="w-20 h-auto rounded-md"
          />
          <p className="line-clamp-2 w-[60%] text-xs md:text-sm">
            {blog.translated_title}
          </p>
          <div className="flex gap-8 items-center">
            <span className="text-xs md:text-sm">
              {new Date(blog.created_at || "")
                .toLocaleDateString("en-GB")
                .replace(/\//g, ".")}
            </span>
            <div className="flex gap-6 items-center">
              <DeleteBlog id={blog.blog_id || ""} />

              <Button className="p-0 w-6 h-6 bg-primary rounded-md hover:border-primary hover:bg-primary-200 transition-all duration-200 ease-in-out">
                <SquarePen className="size-4 text-foreground text-white cursor-pointer" />
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* If no blog is found */}
      {!myBlogs?.length && (
        <div className="flex flex-col items-center justify-center gap-2 p-6 rounded-lg bg-muted">
          <p className="text-sm md:text-base text-muted-foreground">
            {t("Profile.MyBlogsForm.emptyMessage")}
          </p>
        </div>
      )}
    </section>
  );
}
