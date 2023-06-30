import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const products = useSelector((state) => state.product.data);

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
                  <Link to={`/goods/${el._id}`}>
                    <img src={el.imageUrl} />
                  </Link>
                  <p>{el.price} рублей</p>
                  <button className="buy">Купить</button>
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
