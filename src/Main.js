import "./Main.css";
import playerData from "./playerData.js";
import productData from "./productData.js";

// Create Main component
function Main() {
  const formation = {
    goalkeeper: [playerData[0]],
    defence: [playerData[1], playerData[2], playerData[3], playerData[4]],
    midfield: [playerData[5], playerData[6], playerData[7]],
    attack: [playerData[8], playerData[9], playerData[10]],
  };

  return (
    <main className="main">
      {/* Fomration */}
      <section className="formation-wrapper">
        <h1 className="section__header">
          საქართველოს ფეხბურთის ეროვნული ნაკრები
        </h1>{" "}
        {/* Attack */}
        <div className="attack line">
          {formation.attack.map((player, index) => (
            <Player
              key={index}
              playerName={player.name}
              playerImageSrc={player.image}
              playerClub={player.club}
            />
          ))}
        </div>
        {/* Midfield */}
        <div className="midfield line">
          {formation.midfield.map((player, index) => (
            <Player
              key={index}
              playerName={player.name}
              playerImageSrc={player.image}
              playerClub={player.club}
            />
          ))}
        </div>
        {/* Defence */}
        <div className="defence line">
          {formation.defence.map((player, index) => (
            <Player
              key={index}
              playerName={player.name}
              playerImageSrc={player.image}
              playerClub={player.club}
            />
          ))}
        </div>
        {/* Goalkeeper */}
        <div className="goalkeeper line">
          {formation.goalkeeper.map((player, index) => (
            <Player
              key={index}
              playerName={player.name}
              playerImageSrc={player.image}
              playerClub={player.club}
            />
          ))}
        </div>
      </section>

      <section className="store-wrapper">
        <h1 className="section__header">GFF OFFICIAL FANSHOP</h1>
        <div className="store">
          {productData.map((product, index) => (
            <Product
              key={index}
              name={product.name}
              imageSrc={product.image}
              color={product.color}
              size={product.size}
              price={product.price}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

// Player card component
function Player({ playerName, playerImageSrc, playerClub }) {
  return (
    <div className="player-card">
      <img
        src={playerImageSrc}
        className="player__img"
        alt="Georgian football player"
      ></img>
      <p className="player__name">{playerName}</p>
      <p className="player__club">{playerClub}</p>
    </div>
  );
}

// Product card component
function Product({ name, imageSrc, color, size, price }) {
  return (
    <div className="product-card">
      <img className="product__img" src={imageSrc} alt="Product"></img>
      <h2 className="product__title">{name}</h2>
      <div className="product__desc">
        <p className="product__color">{color}</p>
        <p className="product__price">{`${price}.00 ₾`}</p>
      </div>
      <Button />
    </div>
  );
}

// Create Button component
function Button() {
  return <button className="btn">Add to Cart</button>;
}

// Exporting Main component
export default Main;
