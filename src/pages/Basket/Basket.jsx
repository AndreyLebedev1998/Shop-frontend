import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  getBasketUser,
  plusQtyBasket,
  countPlus,
  countMinus,
  minusQtyBasket,
  deleteGood,
  deleteOneGood,
  computeTotalQty,
  deleteAllGood,
} from "../../store/slices/basket.js";
import { getAuthMe } from "../../store/slices/authorization";
import style from "./basket.module.css";

const Basket = () => {
  const auth = useSelector((state) => state.auth.auth.data);
  const basket = useSelector((state) => state.basket.basket.data);
  const totalQtyGoods = useSelector((state) => state.basket.basket.total);
  const emptyBasket = useSelector((state) => state.delivery.emptyBasket.data);
  const dispatch = useDispatch();
  const authId = JSON.parse(window.localStorage.getItem("auth"));

  /* const city = map[1];
  const street = map[2];
  const house = map[3]; */

  let totalQty = 0;
  let sum = 0;
  let totalPrice = 0;

  useEffect(() => {
    if (basket) {
      dispatch(computeTotalQty(totalQty));
    }
  }, [basket]);

  /* if (basket) {
    basket.map((el) => (totalQty += el.qtyInBasket));
  }
 */
  if (basket) {
    totalPrice = basket.map((el) => (sum += el.price * el.qtyInBasket));
  }

  useEffect(() => {
    /* dispatch(getAuthMe()); */
    if (auth) {
      dispatch(getBasketUser(auth._id));
    }
  }, []);

  const minusQtyGood = (id, qtyInBasket) => {
    dispatch(minusQtyBasket({ _id: auth._id, id, qtyInBasket }));
  };

  const deleteOneGoodInBasket = (id, qtyInBasket) => {
    dispatch(deleteOneGood({ _id: auth._id, id, qtyInBasket }));
  };

  const plusQtyGood = (id, qtyInBasket) => {
    dispatch(plusQtyBasket({ _id: auth._id, id, qtyInBasket }));
  };

  if (!window.localStorage.getItem("token")) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <Row>
        <h1>Корзина</h1>
        {basket
          ? basket.map((el) => {
              return (
                <Col xs={6} cm={6} md={4} lg={3} xl={3} xxl={3}>
                  <h3>{el.name}</h3>
                  <Link to={`/goods/${el.id}`}>
                    <img src={el.imageUrl} />
                  </Link>
                  <p>{el.price} рублей</p>
                  <p>Колличество: {el.qtyInBasket}</p>
                  <AiOutlineMinusCircle
                    onClick={() => {
                      if (el.qtyInBasket <= 1) {
                        dispatch(deleteGood({ id: el.id }));
                        dispatch(deleteAllGood());
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
                      deleteOneGoodInBasket(el.id, el.qtyInBasket);
                    }}
                    className={style.delete}
                  />
                </Col>
              );
            })
          : ""}
      </Row>
      <Row
        style={{
          marginTop: "30px",
        }}
      >
        {basket && basket.length !== 0 ? (
          <>
            <h4>Общее колличество товаров: {totalQtyGoods}</h4>
            <h4>
              Общая сумма товаров: {basket ? totalPrice.reverse()[0] : ""}{" "}
              рублей
            </h4>
            <Link
              to="/delivery"
              style={{
                marginTop: "20px",
              }}
            >
              <Button variant="success">Заказать</Button>
            </Link>
          </>
        ) : (
          <h2>Коризна пустая</h2>
        )}
      </Row>
      <Row
        style={{
          margin: "40px",
        }}
      ></Row>
    </Container>
  );
};

export default Basket;
