import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import {
  getBasketUser,
  buyOneGood,
  plusQtyBasket,
} from "../store/slices/basket.js";

const Home = () => {
  const products = JSON.parse(window.localStorage.getItem("products"));
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
      <h1
        style={{
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        Посмотрите наши лучшие предложения!
      </h1>
      <Container>
        <Row>
          {products ? (
            products.map((el) => {
              return (
                <Col
                  xl={4}
                  md={4}
                  cm={6}
                  xs={6}
                  style={{
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <h3>{el.name}</h3>
                  <Link to={`/goods/${el._id}`}>
                    <img src={el.imageUrl} />
                  </Link>
                  <p>{el.price} рублей</p>
                  {auth ? (
                    <Button
                      variant="success"
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
                      className="btn btn-success btn-lg"
                    >
                      Купить
                    </Button>
                  ) : (
                    ""
                  )}
                </Col>
              );
            })
          ) : (
            <h1>Секундочку...</h1>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Home;
