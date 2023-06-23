import React from "react";
import { useSelector } from "react-redux";

const AllGoods = () => {
  const products = useSelector((state) => state.product.data);
  return (
    <div>
      <div className="allProduct">
        {products ? (
          products.map((el) => {
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
    </div>
  );
};

export default AllGoods;
