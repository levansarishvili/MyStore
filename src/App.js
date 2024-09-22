import "./App.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";

// Create App component
function App() {
  return (
    <div className="wrapper">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

// Export App component
export default App;
