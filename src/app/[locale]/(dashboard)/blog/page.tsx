import BlogItem from "./BlogItem";
import { createClient } from "src/utils/supabase/server";
import PaginationComponent from "src/app/components/PaginationComponent";
import CheckSubscriptionStatus from "src/app/components/CheckSubscriptionStatus";
import { createTranslator } from "next-intl";
import BlogFilter from "src/app/components/filters/BlogFilter";

export interface BlogType {
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
  const messages = (await import(`../../../../../messages/${locale}.json`))
    .default;
  const t = createTranslator({ locale, messages });

  if (!locale) {
    return null;
  }

  let query = supabase
    .from("post_translations")
    .select("*")
    .eq("language_code", locale);

  // Apply Search Filter
  if (searchParams.search) {
    query = query.ilike("translated_title", `%${searchParams.search}%`);
  }

  // Apply Sorting
  if (searchParams.sortBy) {
    if (searchParams.sortBy === "title-asc") {
      query = query.order("translated_title", { ascending: true });
    } else if (searchParams.sortBy === "title-desc") {
      query = query.order("translated_title", { ascending: false });
    } else if (searchParams.sortBy === "date-asc") {
      query = query.order("created_at", { ascending: true });
    } else if (searchParams.sortBy === "date-desc") {
      query = query.order("created_at", { ascending: false });
    }
  }

  // Get Total Count Before Pagination
  const { data: allPosts, error: countError } = await query;
  if (countError) {
    console.error("Error fetching post count:", countError);
    return null;
  }

  const postsCount = allPosts?.length || 0;

  // Pagination Logic
  const page = Number(searchParams?.page) || 1;
  const itemsPerPage = 6;
  const totalPages = Math.ceil(postsCount / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage - 1;

  // Fetch Paginated Data
  const { data: posts, error } = await query.range(startIndex, endIndex);
  if (error) {
    console.error("Error fetching posts:", error);
    return null;
  }

  // Check Subscription Status
  const isProMember = await CheckSubscriptionStatus();

  return (
    <section className="min-h-screen mt-10 lg:mt-16 flex flex-col items-center gap-10 lg:gap-16 w-full max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
      <h1 className="text-xl md:text-2xl font-medium">{t("Blogs.title")}</h1>

      {/* Blog Filter */}
      <BlogFilter />

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

      {/* Show Message if No Posts */}
      {posts?.length === 0 && (
        <p className="text-base">{t("Blogs.emptyMessage")}</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <PaginationComponent page={page} totalPages={totalPages} />
      )}
    </section>
  );
}
