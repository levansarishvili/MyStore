import Image from "next/image";
import type { BlogType } from "../../blog/page";
import ReactMarkdown from "react-markdown";
import { useTranslations } from "next-intl";

export default function PostDetails({ post }: { post: BlogType }) {
  const t = useTranslations("Blogs.BlogDetails");

  return (
    <section className="min-h-screen flex flex-col items-center gap-10 lg:gap-16 w-full max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
      <h1 className="text-xl md:text-2xl font-medium">{t("title")}</h1>
      <div className="w-full max-w-4xl bg-muted p-4 md:p-8 rounded-2xl shadow-md">
        <h2 className="text-base lg:text-xl font-medium mt-6 text-foreground">
          {post.translated_title}
        </h2>

        <span className="text-xs md:text-sm text-primary font-medium block mt-2">
          {new Date(post?.created_at || new Date()).toLocaleDateString("en-GB")}
        </span>

        {/* Image with controlled size */}
        <div className="w-full max-w-3xl mx-auto mt-6">
          <Image
            src={post.image_url || "/placeholder-img.png"}
            alt={post.translated_title || "Blog Image"}
            width={700}
            height={400}
            className="rounded-lg w-full object-cover"
          />
        </div>

        {/* Blog content rendered from markdown */}
        <div className="text-sm lg:text-base text-muted-foreground mt-6 leading-relaxed flex flex-col gap-4">
          <ReactMarkdown className={"markdown"}>
            {post.translated_body}
          </ReactMarkdown>
        </div>
      </div>
    </section>
  );
}
