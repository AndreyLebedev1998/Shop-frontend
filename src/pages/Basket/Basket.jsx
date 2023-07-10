import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import {
  getBasketUser,
  plusQtyBasket,
  countPlus,
  countMinus,
  minusQtyBasket,
  deleteGood,
  deleteOneGood,
} from "../../store/slices/basket.js";
import { getAuthMe } from "../../store/slices/authorization";
import axios from "../../axios.js";
import style from "./basket.module.css";

const Basket = () => {
  const auth = useSelector((state) => state.auth.auth.data);
  const basket = useSelector((state) => state.basket.basket.data);
  const dispatch = useDispatch();
  const authId = JSON.parse(window.localStorage.getItem("auth"));

  useEffect(() => {
    dispatch(getAuthMe());
    if (auth) {
      dispatch(getBasketUser(auth._id));
    }
  }, []);

  const minusQtyGood = (id, qtyInBasket) => {
    dispatch(minusQtyBasket({ _id: auth._id, id, qtyInBasket }));
  };

  const deleteOneGoodInBasket = (id) => {
    dispatch(deleteOneGood({ _id: auth._id, id }));
  };

  const plusQtyGood = (id, qtyInBasket) => {
    dispatch(plusQtyBasket({ _id: auth._id, id, qtyInBasket }));
  };

  if (!window.localStorage.getItem("token")) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Корзина</h1>
      {basket
        ? basket.map((el) => {
            return (
              <div className="product">
                <h1>{el.name}</h1>
                <Link to={`/goods/${el._id}`}>
                  <img src={el.imageUrl} />
                </Link>
                <p>{el.price} рублей</p>
                <p>Колличество: {el.qtyInBasket}</p>
                <AiOutlineMinusCircle
                  onClick={() => {
                    if (el.qtyInBasket <= 1) {
                      dispatch(deleteGood({ id: el.id }));
                      return deleteOneGoodInBasket(el.id);
                    } else {
                      minusQtyGood(el.id, el.qtyInBasket);
                      return dispatch(countMinus({ id: el.id }));
                    }
                  }}
                  className={style.minus}
                />
                <AiOutlinePlusCircle
                  className={style.plus}
                  onClick={() => {
                    dispatch(countPlus({ id: el.id }));
                    plusQtyGood(el.id, el.qtyInBasket);
                  }}
                />
                <MdDeleteForever
                  onClick={() => {
                    dispatch(deleteGood({ id: el.id }));
                    deleteOneGoodInBasket(el.id);
                  }}
                  className={style.delete}
                />
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default Basket;
