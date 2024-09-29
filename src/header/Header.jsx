import { NavLink } from "react-router-dom";
import "./Header.css";

// Create Header component
function Header() {
  return (
    <header className="header">
      <div className="header__wrapper">
        <img
          src="./assets/logo.svg"
          alt="Georgia national football team logo"
          className="header__logo"
        ></img>
        <nav className="header__nav">
          <ul className="nav__list">
            <li className="list__item">
              <NavLink to="/">მთავარი</NavLink>
            </li>
            <li className="list__item">
              <NavLink to="/about">ჩვენს შესახებ</NavLink>
            </li>
            <li className="list__item">
              <NavLink to="/formation">შემადგენლობა</NavLink>
            </li>
            <li className="list__item">
              <NavLink to="/news">სიახლეები</NavLink>
            </li>
            <li className="list__item">
              <NavLink to="/store">მაღაზია</NavLink>
            </li>
            <li className="list__item">
              <NavLink to="/contact">კონტაქტი</NavLink>
            </li>
          </ul>
          <Button />
        </nav>
      </div>
    </header>
  );
}

// Create Button component
function Button() {
  return <button className="btn">ბილეთები</button>;
}

// Exporting Header component
export default Header;
