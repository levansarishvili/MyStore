import { createClient } from "src/utils/supabase/server";
import PageNotFound from "../../../../components/PageNotFound";
import PostDetails from "./PostDetails";
import { blogType } from "../page";

interface ParamsType {
  id: string;
}

// Fetch posts data from API according to post ID
export default async function PostsDetailsPage({
  params,
}: {
  params: ParamsType;
}) {
  const { id } = params;

  const supabase = await createClient();

  const { data: post, error } = (await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single()) as { data: blogType; error: any };

  if (error) {
    console.error(error);
    return <PageNotFound />;
  }

  return <PostDetails post={post} />;
}
