import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import "./App.css";
import Keyboard from "./pages/keyboards/Keyboard";
import Headphone from "./pages/headphones/Headphone";
import Laptop from "./pages/laptops/Laptop";
import Monoblock from "./pages/monoblocks/Monoblock";
import Mouse from "./pages/mouses/Mouse";
import Home from "./pages/Home";
import Header from "./components/Header";
import axios from "./axios";
import { fetchGetAllGoods } from "./store/slices/product";
import OneGood from "./pages/oneGood/OneGood";
import AllGoods from "./pages/allGoods/AllGoods";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetAllGoods());
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/goods" element={<AllGoods />} />
        <Route path="/keyboards" element={<Keyboard />} />
        <Route path="/headphones" element={<Headphone />} />
        <Route path="/laptops" element={<Laptop />} />
        <Route path="/monoblocks" element={<Monoblock />} />
        <Route path="/mouses" element={<Mouse />} />
        <Route path="/:id" element={<OneGood />} />
      </Routes>
    </div>
  );
}

export default App;
