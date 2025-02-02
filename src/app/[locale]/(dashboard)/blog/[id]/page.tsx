import PageNotFound from "../../../../components/PageNotFound";
import PostDetails from "./PostDetails";
import { supabase } from "../../../../../lib/supabaseClient";

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
  } catch (err) {
    console.error(err);
  }

  return <PostDetails post={post} />;
}
