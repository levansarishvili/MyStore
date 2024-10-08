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
        <img
          src="../assets/logo.svg"
          alt="Georgia national football team logo"
          className="header__logo"
        ></img>
        <nav className="header__nav">
          <Navigation />
          <Button className="btn" name="ბილეთები" />
        </nav>

        {/* Profile and Shopping cart icons */}
        <div className="header__icons">
          <Link href="/profile">
            <span className="header__icon-wrapper">
              <svg
                className="header__icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M332.64 64.58C313.18 43.57 286 32 256 32c-30.16 0-57.43 11.5-76.8 32.38-19.58 21.11-29.12 49.8-26.88 80.78C156.76 206.28 203.27 256 256 256s99.16-49.71 103.67-110.82c2.27-30.7-7.33-59.33-27.03-80.6zM432 480H80a31 31 0 01-24.2-11.13c-6.5-7.77-9.12-18.38-7.18-29.11C57.06 392.94 83.4 353.61 124.8 326c36.78-24.51 83.37-38 131.2-38s94.42 13.5 131.2 38c41.4 27.6 67.74 66.93 76.18 113.75 1.94 10.73-.68 21.34-7.18 29.11A31 31 0 01432 480z" />
              </svg>
            </span>
          </Link>
          <span className="header__icon-wrapper">
            <svg
              className="header__icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <circle cx="176" cy="416" r="32" fill="#fff" />
              <circle cx="400" cy="416" r="32" fill="#fff" />
              <path d="M456.8 120.78a23.92 23.92 0 00-18.56-8.78H133.89l-6.13-34.78A16 16 0 00112 64H48a16 16 0 000 32h50.58l45.66 258.78A16 16 0 00160 368h256a16 16 0 000-32H173.42l-5.64-32h241.66A24.07 24.07 0 00433 284.71l28.8-144a24 24 0 00-5-19.93z" />
            </svg>
          </span>
        </div>
      </div>
    </header>
  );
}

// Exporting Header component
export default Header;
