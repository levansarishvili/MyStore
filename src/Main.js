import "./Main.css";
import Formation from "./Formation.js";
import Store from "./Store.js";

// Create Main component
function Main() {
  return (
    <main className="main">
      <Formation />
      <Store />
    </main>
  );
}

// Exporting Main component
export default Main;
