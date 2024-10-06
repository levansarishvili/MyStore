import "./Formation.css";
import playerData from "../../data/playerData.js";

// Create Formation component
function Formation() {
  const formation = {
    goalkeeper: [playerData[0]],
    defence: [playerData[1], playerData[2], playerData[3], playerData[4]],
    midfield: [playerData[5], playerData[6], playerData[7]],
    attack: [playerData[8], playerData[9], playerData[10]],
  };

  return (
    <main className="main">
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

// Exporting Formation component
export default Formation;
