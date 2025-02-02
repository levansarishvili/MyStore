import type { blogType } from "../../blog/page";

export default function PostDetails({ post }: { post: blogType }) {
  return <div>blog details: {post.title}</div>;
}
