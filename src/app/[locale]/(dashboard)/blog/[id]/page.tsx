import PageNotFound from "../../../../components/PageNotFound";
import PostDetails from "./PostDetails";
import { supabase } from "../../../../lib/supabaseClient";

import type { Post } from "../../../../hooks/useFetchPosts";

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
  let postDetailsData: Post | null = null;

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      return <PageNotFound />;
    }

    postDetailsData = data;
  } catch (err) {
    console.error(err);
  }

  if (!postDetailsData) {
    // If no data, return not found
    return <PageNotFound />;
  }

  return <PostDetails post={postDetailsData} />;
}
