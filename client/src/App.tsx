import Navbar from "./Components/common/NavBar";
import "./App.css";
import About from "./Components/feature/About/About";
import FAQ from "./Components/feature/FAQ/Faq";

function App() {
  return (
    <div>
      <Navbar />
      <div className="banner"></div>
      <About />
      <FAQ />
    </div>
  );
}

export default App;
