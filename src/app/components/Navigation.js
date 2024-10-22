import Link from "next/link";

export default function Navigation({ navListClass, navItemClass }) {
  return (
    <ul className={navListClass}>
      <li className={navItemClass}>
        <Link className="nav__link" href="/home">
          Home
        </Link>
      </li>
      <li className={navItemClass}>
        <Link className="nav__link" href="/about">
          About
        </Link>
      </li>
      <li className={navItemClass}>
        <Link className="nav__link" href="/store">
          Products
        </Link>
      </li>
      <li className={navItemClass}>
        <Link className="nav__link" href="/blog">
          Blogs
        </Link>
      </li>
      <li className={navItemClass}>
        <Link className="nav__link" href="/contact">
          Contact
        </Link>
      </li>
    </ul>
  );
}
