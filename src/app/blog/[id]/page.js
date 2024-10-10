"use client";
import { useEffect, useState } from "react";
import PageNotFound from "../../components/PageNotFound";
import Loading from "../../components/loading";
import BlogPost from "./PostDetails";

// Fetch posts data from API
export default function fetchPostsDetails({ params }) {
  const { id } = params;
  const [postDetails, setPostDetails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPostsDetails() {
      try {
        const response = await fetch(`https://dummyjson.com/posts/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setPostDetails(data);
      } catch (err) {
        setError(err);
      }
    }

    fetchPostsDetails();
  }, [id]);

  // Handle page not found
  if (error) {
    return <PageNotFound />;
  }

  // Handle loading state
  if (postDetails.length === 0) {
    return <Loading />;
  }

  return <BlogPost post={postDetails} />;
}
