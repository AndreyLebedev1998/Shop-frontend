import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Keyboard from "./pages/keyboards/Keyboard";
import Headphone from "./pages/headphones/Headphone";
import Laptop from "./pages/laptops/Laptop";
import Monoblock from "./pages/monoblocks/Monoblock";
import Mouse from "./pages/mouses/Mouse";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import {
  fetchGetAllGoods,
  getBasketUser,
  getTheBestGoods,
} from "./store/slices/product";
import OneGood from "./pages/oneGood/OneGood";
import Entry from "./pages/Entry/Entry";
import Register from "./pages/Register/Register";
import { getAuthMe } from "./store/slices/authorization";
import Basket from "./pages/Basket/Basket";
import Account from "./pages/Account/Account";
import Delivery from "./pages/Delivery/Delivery";
import DeliveryControl from "./pages/DeliveryControl/DeliveryControl";
import OneDelivery from "./pages/OneDelivery/OneDelivery";
import DeliveryUser from "./pages/DeliveryUser/DeliveryUser";
import DeliveryOneUser from "./pages/DeliveryOneUser/DeliveryOneUser";
import { getDeliveryUser } from "./store/slices/delivery";

function App() {
  const auth = useSelector((state) => state.auth.auth.data);
  const dispatch = useDispatch();
  const authId = JSON.parse(window.localStorage.getItem("auth"));

  useEffect(() => {
    dispatch(fetchGetAllGoods());
    dispatch(getTheBestGoods());
    dispatch(getAuthMe());
    dispatch(getBasketUser(authId));
    dispatch(getDeliveryUser(authId));
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
        <Route path="/delivery/:id/:authId" element={<OneDelivery />} />
        <Route path="/deliveryuser" element={<DeliveryUser />} />
        <Route
          path="/deliveryOneUser/:id/:authId"
          element={<DeliveryOneUser />}
        />
      </Routes>
    </div>
  );
}

export default App;
