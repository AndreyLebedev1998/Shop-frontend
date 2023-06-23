import React from "react";
import { useSelector } from "react-redux";

const Mouse = () => {
  const products = useSelector((state) => state.product.data);
  return (
    <div>
      <h1>Мыши</h1>
      {products ? (
        products
          .filter((el) => el.categoryId === 2)
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

export default Mouse;
