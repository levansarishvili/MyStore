import Link from "next/link";

export default function Navigation() {
  return (
    <ul className="nav__list">
      <li className="list__item">
        <Link className="nav__link" href="/">
          მთავარი
        </Link>
      </li>
      <li className="list__item">
        <Link className="nav__link" href="/assignment-3">
          Assignment - 3
        </Link>
      </li>
      <li className="list__item">
        <Link className="nav__link" href="/about">
          ჩვენს შესახებ
        </Link>
      </li>
      <li className="list__item">
        <Link className="nav__link" href="/formation">
          შემადგენლობა
        </Link>
      </li>
      <li className="list__item">
        <Link className="nav__link" href="/store">
          მაღაზია
        </Link>
      </li>
      <li className="list__item">
        <Link className="nav__link" href="/blog">
          ბლოგი
        </Link>
      </li>
      <li className="list__item">
        <Link className="nav__link" href="/contact">
          კონტაქტი
        </Link>
      </li>
    </ul>
  );
}
