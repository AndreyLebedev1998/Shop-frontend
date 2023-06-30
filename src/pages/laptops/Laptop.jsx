import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Laptop = () => {
  const products = useSelector((state) => state.product.data);
  return (
    <div>
      <h1>Ноутбуки</h1>
      {products ? (
        products
          .filter((el) => el.categoryId === 4)
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

export default Laptop;
