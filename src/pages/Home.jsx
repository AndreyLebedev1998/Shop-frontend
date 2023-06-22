import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
import { fetchGetAllGoods } from "../store/slices/product";

const Home = () => {
  const products = useSelector((state) => state.product.data);
  const dispatch = useDispatch();

  if (products !== null) {
    console.log(products);
  }

  useEffect(() => {
    dispatch(fetchGetAllGoods());
  }, []);

  return (
    <div>
      <h1>Главная страница</h1>
    </div>
  );
};

export default Home;
