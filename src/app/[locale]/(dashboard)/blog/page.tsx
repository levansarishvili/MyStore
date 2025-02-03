import { data } from "cypress/types/jquery";
import BlogItem from "./BlogItem";
import { createClient } from "src/utils/supabase/server";

export interface blogType {
  id: number;
  title: string;
  body: string;
  image_url?: string;
  created_at?: string;
  translated_title?: string | null;
  translated_body?: string | null;
  language_code?: string;
}

interface ParamsType {
  params: { locale: string };
}

export default async function BlogPage({ params }: ParamsType) {
  const supabase = await createClient();
  const locale = params.locale;

  if (!locale) {
    return null;
  }

  // Fetch post data according to locale
  let { data: posts } = await supabase
    .from("post_translations")
    .select("*")
    .order("created_at", { ascending: false });

  if (!posts) {
    console.log("No posts found");
    return;
  }

  // Find post data according to locale
  if (locale === "ka") {
    posts = posts.filter((post: blogType) => post.language_code === "ka");
  } else {
    posts = posts.filter((post: blogType) => post.language_code === "en");
  }

  return (
    <section className="min-h-screen mt-10 lg:mt-16 flex flex-col items-center gap-10 lg:gap-16 w-full max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
      <h1 className="text-2xl lg:text-3xl font-medium">Blogs</h1>

      <ul className="flex flex-wrap justify-center gap-8">
        {posts?.map((post) => (
          <BlogItem
            key={post.id}
            id={post.id}
            title={post.translated_title}
            content={post.translated_body}
            image_url={post.image_url}
            locale={locale}
          />
        ))}
      </ul>

      {posts.length === 0 && (
        <p className="text-base">Currently there are not any posts!</p>
      )}
    </section>
  );
}
