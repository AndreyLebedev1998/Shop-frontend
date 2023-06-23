import React from "react";
import { useSelector } from "react-redux";

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
                <img src={el.imageUrl} />
                <p>{el.price} рублей</p>
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
