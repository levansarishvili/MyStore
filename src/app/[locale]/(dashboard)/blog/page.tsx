import BlogItem from "./BlogItem";
import { createClient } from "src/utils/supabase/server";
import PaginationComponent from "src/app/components/PaginationComponent";
import CheckSubscriptionStatus from "src/app/components/CheckSubscriptionStatus";

export interface blogType {
  id: number;
  title: string;
  body: string;
  image_url?: string;
  created_at?: string;
  translated_title?: string | null;
  translated_body?: string | null;
  language_code?: string;
  blog_id?: string;
}

interface ParamsType {
  params: { locale: string };
  searchParams: { [key: string]: string | undefined };
}

export default async function BlogPage({ params, searchParams }: ParamsType) {
  const supabase = await createClient();
  const locale = params.locale;

  if (!locale) {
    return null;
  }

  // Fetch post data according to locale
  let { data: allPosts } = await supabase.from("posts").select("*");
  if (!allPosts) {
    console.log("No posts found");
    return;
  }

  const postsCount = allPosts.length || 0;

  const page = Number(searchParams?.page) || 1;
  const itemsPerPage = 6;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage - 1;
  const totalPages = Math.ceil(postsCount / itemsPerPage);

  // Fetch posts from Supabase according to pagination
  const { data: posts, error } = (await supabase
    .from("post_translations")
    .select("*")
    .order("id", { ascending: false })
    .eq("language_code", locale)
    .range(startIndex, endIndex)) as { data: blogType[]; error: any };

  if (error) {
    console.error(error);
    return null;
  }

  // Check subscription status
  const isProMember = await CheckSubscriptionStatus();

  return (
    <section className="min-h-screen mt-10 lg:mt-16 flex flex-col items-center gap-10 lg:gap-16 w-full max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
      <h1 className="text-2xl lg:text-3xl font-medium">Blogs</h1>

      <ul className="w-full grid grid-cols-1 gap-6 custom-sm:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post) => (
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

      {posts?.length === 0 && (
        <p className="text-base">Currently there are not any posts!</p>
      )}

      {/* Pagination */}
      <PaginationComponent page={page} totalPages={totalPages} />
    </section>
  );
}
