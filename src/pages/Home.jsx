import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
import { fetchGetAllGoods } from "../store/slices/product";

const Home = () => {
  const products = useSelector((state) => state.product.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetAllGoods());
  }, []);

  return (
    <>
      <h1>Посмотрите наши лучшие предложения!</h1>
      <div className="allProduct">
        {products ? (
          products
            .map((el) => {
              return (
                <div className="product">
                  <h1>{el.name}</h1>
                  <img src={el.imageUrl} />
                  <p>{el.price} рублей</p>
                </div>
              );
            })
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
        ) : (
          <h1>Секундочку...</h1>
        )}
      </div>
    </>
  );
};

export default Home;
