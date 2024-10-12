// import Loading from "./loading";
import "./Blog.css";
import Button from "../components/Button";
import Link from "next/link";

// Function to fetch posts data from API
async function fetchPosts() {
  const response = await fetch("https://dummyjson.com/posts");
  const data = await response.json();
  return data.posts;
}

// Blogs Component
export default async function Blog() {
  const posts = await fetchPosts();

  return (
    <section className="blog-wrapper">
      <h1 className="section-header">Blogs</h1>
      <ul className="blog__list">
        {posts.map((post) => (
          <BlogItem
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.body}
          />
        ))}
      </ul>
    </section>
  );
}

// Blog item component
function BlogItem({ id, title, content }) {
  return (
    <li className="blog__list__item">
      <div className="blog__content">
        <h2 className="blog__title">{title}</h2>
        <p className="blog__txt">{content}</p>
        <Link className="blog__link" href={`/blog/${id}`}>
          <Button className="btn blog-btn" name="Read more" />
        </Link>
      </div>
    </li>
  );
}
