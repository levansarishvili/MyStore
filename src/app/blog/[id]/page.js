import PageNotFound from "../../components/PageNotFound";
import PostDetails from "./PostDetails";

// Fetch posts data from API according to post ID
export default async function PostsDetailsPage({ params }) {
  const { id } = params;
  let postDetailsData;

  try {
    const response = await fetch(`https://dummyjson.com/posts/${id}`);
    if (!response.ok) {
      // Handle non-200 status codes
      return <PageNotFound />;
    }
    postDetailsData = await response.json();
  } catch (err) {
    console.error(err);
  }

  return <PostDetails post={postDetailsData} />;
}
