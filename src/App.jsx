import Header from "./header/Header.jsx";
import Main from "./main/Main.jsx";
import Footer from "./footer/Footer.jsx";
import "./App.css";

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
