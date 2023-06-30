import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Headphone = () => {
  const products = useSelector((state) => state.product.data);

  return (
    <>
      <h1>Наушники</h1>
      <div className="allProduct">
        {products ? (
          products
            .filter((el) => el.categoryId === 3)
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
    </>
  );
};

export default Headphone;
