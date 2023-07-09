import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "../../axios.js";
import {
  getBasketUser,
  buyOneGood,
  plusQtyBasket,
} from "../../store/slices/basket.js";

const Keyboard = () => {
  const products = useSelector((state) => state.product.good.data);
  const basket = useSelector((state) => state.basket.basket.data);
  const basketPlus = useSelector((state) => state.basket.basketPlus.data);
  const buyOneGoodinBasket = useSelector((state) => state.basket.buyGood.data);
  const auth = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();

  const buyGood = (id, name, imageUrl, price, categoryId, qtyInBasket) => {
    dispatch(getBasketUser(auth._id));
    if (basket.length === 0) {
      return axios.post(`/auth/basket/${auth._id}`, {
        id,
        name,
        imageUrl,
        price,
        categoryId,
        qtyInBasket: qtyInBasket + 1,
      });
    }

    if (basket.find((el) => el.id == id)) {
      dispatch(plusQtyBasket({ _id: auth._id, id, qtyInBasket }));
      if (basketPlus) {
        return dispatch(getBasketUser(auth._id));
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
      );
      if (buyOneGoodinBasket) {
        return dispatch(getBasketUser(auth._id));
      }
    }
  };

  return (
    <>
      <h1>Клавиатуры</h1>
      <div className="allProduct">
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

export default Keyboard;
