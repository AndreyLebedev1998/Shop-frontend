import { Link, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { BsBasketFill } from "react-icons/bs";
import "./App.css";
import Keyboard from "./pages/keyboards/Keyboard";
import Headphone from "./pages/headphones/Headphone";
import Laptop from "./pages/laptops/Laptop";
import Monoblock from "./pages/monoblocks/Monoblock";
import Mouse from "./pages/mouses/Mouse";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import axios from "./axios";
import { fetchGetAllGoods, getBasketUser } from "./store/slices/product";
import OneGood from "./pages/oneGood/OneGood";
import Footer from "./components/Footer/Footer";
import Entry from "./pages/Entry/Entry";
import Register from "./pages/Register/Register";
import { getAuthMe } from "./store/slices/authorization";
import Basket from "./pages/Basket/Basket";
import Account from "./pages/Account/Account";
import Delivery from "./pages/Delivery/Delivery";
import DeliveryControl from "./pages/DeliveryControl/DeliveryControl";

function App() {
  const auth = useSelector((state) => state.auth.auth.data);
  const dispatch = useDispatch();
  const authId = JSON.parse(window.localStorage.getItem("auth"));

  useEffect(() => {
    dispatch(fetchGetAllGoods());
    dispatch(getAuthMe());
    dispatch(getBasketUser(authId));
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/goods/keyboards" element={<Keyboard />} />
        <Route path="/goods/headphones" element={<Headphone />} />
        <Route path="/goods/laptops" element={<Laptop />} />
        <Route path="/goods/monoblocks" element={<Monoblock />} />
        <Route path="/goods/mouses" element={<Mouse />} />
        <Route path="/goods/:id" element={<OneGood />} />
        <Route path="/entry" element={<Entry />} />
        <Route path="/register" element={<Register />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/account" element={<Account />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/deliveryControl" element={<DeliveryControl />} />
      </Routes>
    </div>
  );
}

export default App;
