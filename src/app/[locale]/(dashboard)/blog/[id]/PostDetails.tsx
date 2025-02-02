import Image from "next/image";
import type { blogType } from "../../blog/page";

export default function PostDetails({ post }: { post: blogType }) {
  return (
    <section className="min-h-screen mt-10 lg:mt-16 flex flex-col items-center gap-10 lg:gap-16 w-full max-w-[90rem] my-0 mx-auto px-6 md:px-12 lg:px-20 py-0">
      <h1 className="text-2xl lg:text-3xl font-medium">Blog Details</h1>
      <div className="w-full max-w-4xl bg-muted p-4 md:p-8 rounded-2xl shadow-md">
        <h2 className="text-base lg:text-2xl font-medium mt-6 text-foreground">
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

        {/* Blog content */}
        <p className="text-sm lg:text-base text-muted-foreground mt-6 leading-relaxed">
          {post.translated_body}
        </p>
      </div>
    </section>
  );
}
