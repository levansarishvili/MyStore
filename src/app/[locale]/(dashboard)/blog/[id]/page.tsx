import { createClient } from "src/utils/supabase/server";
import PageNotFound from "../../../../components/PageNotFound";
import PostDetails from "./PostDetails";
import { BlogType } from "../page";

interface ParamsType {
  id: string;
  locale: string;
}

// Fetch posts data from API according to post ID
export default async function PostsDetailsPage({
  params,
}: {
  params: ParamsType;
}) {
  const { id } = params;
  const locale = params.locale;
  const supabase = await createClient();

  let { data: post, error } = (await supabase
    .from("post_translations")
    .select("*")
    .eq("id", id)
    .eq("language_code", locale)
    .single()) as { data: BlogType; error: any };

  if (error) {
    console.error(error);
    return <PageNotFound />;
  }

  return <PostDetails post={post} />;
}
