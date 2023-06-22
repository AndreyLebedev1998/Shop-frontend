import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Keyboard from "./pages/keyboards/Keyboard";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/keyboard" element={<Keyboard />} />
      </Routes>
    </div>
  );
}

export default App;
