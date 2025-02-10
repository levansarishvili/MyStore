import { createClient } from "src/utils/supabase/server";
import GetUserData from "../GetUserData";
import Image from "next/image";
import DeleteBlog from "./DeleteBlog";
import type { BlogType } from "../../[locale]/(dashboard)/blog/page";
import { SquarePen } from "lucide-react";
import { createTranslator } from "next-intl";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import EditBlogModal from "../forms/BlogEditForm";

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

  // Fetch posts in both English and Georgian
  const { data: allMyBlogs } = (await supabase
    .from("post_translations")
    .select("*")
    .order("id", { ascending: false })
    .eq("user_id", userdata?.id)) as { data: BlogType[]; error: any };

  return (
    <section className="flex flex-col gap-4">
      {myBlogs?.map((blog) => (
        <Card
          key={blog.id}
          className="w-full rounded-xl border border-muted bg-muted"
        >
          <div className="p-4 flex flex-col gap-4 sm:flex-row sm:items-center">
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
              <span className="text-xs text-muted-foreground">
                {new Date(blog.created_at || "")
                  .toLocaleDateString("en-GB")
                  .replace(/\//g, ".")}
              </span>
              <div className="flex gap-6 items-center">
                <DeleteBlog id={blog.blog_id || ""} />
                <EditBlogModal
                  locale={locale}
                  blog={blog}
                  allMyBlogs={allMyBlogs.filter(
                    (b) => b.blog_id === blog.blog_id
                  )}
                />
              </div>
            </div>
          </div>
        </Card>
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
