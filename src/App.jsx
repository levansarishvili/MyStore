import Header from "./header/Header.jsx";
// import Main from "./main/Main.jsx";
import Footer from "./footer/Footer.jsx";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import About from "./pages/About.jsx";
import Formation from "./pages/Formation.jsx";
import News from "./pages/News.jsx";
import Store from "./pages/Store.jsx";
import Contact from "./pages/Contact.jsx";

// Create App component
function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/formation" element={<Formation />}></Route>
          <Route path="/news" element={<News />}></Route>
          <Route path="/store" element={<Store />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
        </Routes>

        <Footer />
      </BrowserRouter>

      {/* <div >
        <Header />
        <Main />
        <Footer />
      </div> */}
    </div>
  );
}

// Export App component
export default App;
