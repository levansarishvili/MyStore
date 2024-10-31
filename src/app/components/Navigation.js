import Link from "next/link";

export default function Navigation() {
  return (
    <ul className="flex items-center gap-20 list-none h-20">
      <li className="cursor-pointer transition-all duration-300 relative h-full flex items-center text-2xl font-medium">
        <Link
          className="nav__link h-full flex items-center transition-all duration-300 hover:text-[#ec5e2a] after:content-[''] after:absolute after:w-20 after:h-1 after:bg-[#ec5e2a] after:left-1/2 after:-translate-x-1/2 after:bottom-2 after:rounded-2xl after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-300"
          href="/home"
        >
          Home
        </Link>
      </li>
      <li className="cursor-pointer transition-all duration-300 relative h-full flex items-center text-2xl font-medium">
        <Link
          className="nav__link h-full flex items-center transition-all duration-300 hover:text-[#ec5e2a] after:content-[''] after:absolute after:w-20 after:h-1 after:bg-[#ec5e2a] after:left-1/2 after:-translate-x-1/2 after:bottom-2 after:rounded-2xl after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-300"
          href="/about"
        >
          About
        </Link>
      </li>
      <li className="cursor-pointer transition-all duration-300 relative h-full flex items-center text-2xl font-medium">
        <Link
          className="nav__link h-full flex items-center transition-all duration-300 hover:text-[#ec5e2a] after:content-[''] after:absolute after:w-20 after:h-1 after:bg-[#ec5e2a] after:left-1/2 after:-translate-x-1/2 after:bottom-2 after:rounded-2xl after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-300"
          href="/store"
        >
          Products
        </Link>
      </li>
      <li className="cursor-pointer transition-all duration-300 relative h-full flex items-center text-2xl font-medium">
        <Link
          className="nav__link h-full flex items-center transition-all duration-300 hover:text-[#ec5e2a] after:content-[''] after:absolute after:w-20 after:h-1 after:bg-[#ec5e2a] after:left-1/2 after:-translate-x-1/2 after:bottom-2 after:rounded-2xl after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-300"
          href="/blog"
        >
          Blogs
        </Link>
      </li>
      <li className="cursor-pointer transition-all duration-300 relative h-full flex items-center text-2xl font-medium">
        <Link
          className="nav__link h-full flex items-center transition-all duration-300 hover:text-[#ec5e2a] after:content-[''] after:absolute after:w-20 after:h-1 after:bg-[#ec5e2a] after:left-1/2 after:-translate-x-1/2 after:bottom-2 after:rounded-2xl after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-300"
          href="/contact"
        >
          Contact
        </Link>
      </li>
    </ul>
  );
}
