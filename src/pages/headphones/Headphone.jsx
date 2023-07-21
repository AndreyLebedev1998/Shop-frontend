import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBasketUser,
  buyOneGood,
  plusQtyBasket,
} from "../../store/slices/basket.js";

const Headphone = () => {
  const products = useSelector((state) => state.product.good.data);
  const basket = useSelector((state) => state.basket.basket.data);
  const basketPlus = useSelector((state) => state.basket.basketPlus.data);
  const buyOneGoodinBasket = useSelector((state) => state.basket.buyGood.data);
  const auth = useSelector((state) => state.auth.auth.data);
  const dispatch = useDispatch();

  const buyGood = (id, name, imageUrl, price, categoryId, qtyInBasket) => {
    if (basket.find((el) => el.id == id)) {
      if (basket) {
        dispatch(plusQtyBasket({ _id: auth._id, id, qtyInBasket })).then(() =>
          dispatch(getBasketUser(auth._id)).catch((error) => {
            console.error(error);
            alert("Не удалось добавить товар");
          })
        );
      }
    } else {
      dispatch(
        buyOneGood({
          _id: auth._id,
          id,
          name,
          imageUrl,
          price,
          categoryId,
          qtyInBasket,
        })
      )
        .then(() => dispatch(getBasketUser(auth._id)))
        .catch((error) => {
          console.error(error);
          alert("Не удалось добавить товар");
        });
    }
  };

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
                  {auth ? (
                    <button
                      onClick={() =>
                        buyGood(
                          el._id,
                          el.name,
                          el.imageUrl,
                          el.price,
                          el.categoryId,
                          el.qtyInBasket
                        )
                      }
                      style={
                        basket
                          ? {
                              cursor: "pointer",
                            }
                          : {
                              cursor: "progress",
                            }
                      }
                      disabled={basket ? false : true}
                      className="buy"
                    >
                      Купить
                    </button>
                  ) : (
                    ""
                  )}
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
