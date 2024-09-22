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
            <li className="list__item">მთავარი</li>
            <li className="list__item">შემადგენლობა</li>
            <li className="list__item">სიახლეები</li>
            <li className="list__item">მაღაზია</li>
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
