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
import Header from "./components/Header/Header";
import axios from "./axios";
import { fetchGetAllGoods } from "./store/slices/product";
import OneGood from "./pages/oneGood/OneGood";
import AllGoods from "./pages/allGoods/AllGoods";
import Footer from "./components/Footer/Footer";
import Register from "./pages/Register/Register";

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
        <Route path="/allGoods" element={<AllGoods />} />
        <Route path="/goods/keyboards" element={<Keyboard />} />
        <Route path="/goods/headphones" element={<Headphone />} />
        <Route path="/goods/laptops" element={<Laptop />} />
        <Route path="/goods/monoblocks" element={<Monoblock />} />
        <Route path="/goods/mouses" element={<Mouse />} />
        <Route path="/goods/:id" element={<OneGood />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
