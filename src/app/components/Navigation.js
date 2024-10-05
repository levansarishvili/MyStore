import Link from "next/link";

export default function Cabins() {
  return (
    <ul>
      <li>
        <Link href="/home">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/formation">Formation</Link>
        <Link href="/store">Store</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contact">Contact</Link>
      </li>
    </ul>
  );
}
