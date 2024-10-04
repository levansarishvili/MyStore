import Header from "./header/Header.jsx";
import Footer from "./footer/Footer.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import About from "./pages/About.jsx";
import Formation from "./pages/Formation.jsx";
import Blog from "./pages/Blog.jsx";
import Store from "./pages/Store.jsx";
import Contact from "./pages/Contact.jsx";
import Profile from "./pages/Profile.jsx";
import "./App.css";
import Assignment3 from "./pages/Assignment3.jsx";

// Create App component
function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="assignment3" element={<Assignment3 />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/formation" element={<Formation />}></Route>
          <Route path="/blog" element={<Blog />}></Route>
          <Route path="/store" element={<Store />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

// Export App component
export default App;
