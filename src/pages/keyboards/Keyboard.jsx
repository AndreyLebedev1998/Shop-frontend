import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Keyboard = () => {
  const products = useSelector((state) => state.product.data);
  return (
    <div>
      <h1>Клавиатуры</h1>
      {products ? (
        products
          .filter((el) => el.categoryId === 1)
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
      ) : (
        <h1>Секундочку...</h1>
      )}
    </div>
  );
};

export default Keyboard;
