import { useSearchParams } from "next/navigation";
import BlogItem from "./BlogItem";
import BlogFilter from "../../../components/filters/BlogFilter";
import { useState } from "react";
import BlogAddForm from "../../../components/forms/CreateBlogForm";
import PostEditForm from "../../../components/forms/PostEditForm";
import { createClient } from "src/utils/supabase/server";

interface blogType {
  id: number;
  title: string;
  body: string;
  image_url?: string;
}

export default async function BlogPage() {
  const supabase = await createClient();

  const { data: posts, error } = (await supabase.from("posts").select("*")) as {
    data: blogType[];
    error: any;
  };
  if (error) {
    console.error(error);
    return null;
  }

  return (
    <section className="min-h-screen mt-10 lg:mt-16 flex flex-col items-center gap-10 lg:gap-16 w-full max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
      <h1 className="text-2xl lg:text-3xl font-medium">Blogs</h1>

      <ul className="flex flex-wrap justify-center gap-8">
        {posts?.map((post) => (
          <BlogItem
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.body}
          />
        ))}
      </ul>

      {posts && <p className="text-base">Currently there are not any posts!</p>}
    </section>
  );
}
