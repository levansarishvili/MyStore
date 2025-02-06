import { createClient } from "src/utils/supabase/server";
import GetUserData from "../GetUserData";
import Image from "next/image";
import DeleteBlog from "./DeleteBlog";
import type { blogType } from "../../[locale]/(dashboard)/blog/page";
import { SquarePen } from "lucide-react";
import Link from "next/link";

export default async function MyBlogs({ locale }: { locale: string }) {
  const supabase = await createClient();
  const userdata = await GetUserData();

  const { data: myBlogs, error } = (await supabase
    .from("post_translations")
    .select("*")
    .order("id", { ascending: false })
    .eq("language_code", locale)
    .eq("user_id", userdata?.id)) as { data: blogType[]; error: any };

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
          <div className="flex gap-4 items-center">
            <span className="text-xs md:text-sm">
              {new Date(blog.created_at || "")
                .toLocaleDateString("en-GB")
                .replace(/\//g, ".")}
            </span>
            <DeleteBlog id={blog.blog_id || ""} />
            <Link href={`/blog/${blog.id}`} className="flex items-center">
              <button className="p-1 hover:bg-primary rounded-lg bg-background hover:text-white transition-all duration-200">
                <SquarePen className="size-4 cursor-pointer " />
              </button>
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}
