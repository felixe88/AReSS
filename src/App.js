import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/home";
import Header from "./components/header";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Polmone from "./components/polmone";
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/Popolazione" exact element="" />
          <Route path="/Polmoni" exact element={<Polmone />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
