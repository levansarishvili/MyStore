// "use client";
import Link from "next/link";
import Navigation from "../components/Navigation.js";
import Button from "../components/Button.js";
import "./Header.css";

// Create Header component
function Header() {
  return (
    <header className="header">
      <div className="header__wrapper">
        <Link href="/home">
          <img
            src="../assets/logo.svg"
            alt="Georgia national football team logo"
            className="header__logo"
          ></img>
        </Link>

        <nav className="header__nav">
          <Navigation navListClass="nav__list" navItemClass="list__item" />
        </nav>

        {/* Profile and Shopping cart icons */}
        <div className="header__icons">
          <Link href="/profile">
            <div className="account-wrapper">
              <svg
                className="header__icon"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z"></path>
              </svg>
            </div>
          </Link>

          <div className="cart-wrapper">
            <svg
              className="header__icon"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path d="M104,216a16,16,0,1,1-16-16A16,16,0,0,1,104,216Zm88-16a16,16,0,1,0,16,16A16,16,0,0,0,192,200ZM239.71,74.14l-25.64,92.28A24.06,24.06,0,0,1,191,184H92.16A24.06,24.06,0,0,1,69,166.42L33.92,40H16a8,8,0,0,1,0-16H40a8,8,0,0,1,7.71,5.86L57.19,64H232a8,8,0,0,1,7.71,10.14ZM221.47,80H61.64l22.81,82.14A8,8,0,0,0,92.16,168H191a8,8,0,0,0,7.71-5.86Z"></path>
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}

// Exporting Header component
export default Header;
