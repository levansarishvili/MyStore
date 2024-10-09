import Link from "next/link";

export default function Navigation() {
  return (
    <ul className="nav__list">
      <li className="list__item">
        <Link className="nav__link" href="/">
          Home
        </Link>
      </li>
      <li className="list__item">
        <Link className="nav__link" href="/about">
          About
        </Link>
      </li>
      <li className="list__item">
        <Link className="nav__link" href="/store">
          Products
        </Link>
      </li>
      <li className="list__item">
        <Link className="nav__link" href="/blog">
          Blogs
        </Link>
      </li>
      <li className="list__item">
        <Link className="nav__link" href="/contact">
          Contact
        </Link>
      </li>
    </ul>
  );
}
