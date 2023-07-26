import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import {
  getBasketUser,
  buyOneGood,
  plusQtyBasket,
} from "../../store/slices/basket.js";

const Monoblock = () => {
  const products = useSelector((state) => state.product.good.data);
  const basket = useSelector((state) => state.basket.basket.data);
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
      <h1>Моноблоки</h1>
      <Container>
        <Row>
          {products ? (
            products
              .filter((el) => el.categoryId === 5)
              .map((el) => {
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
                    <h4>{el.name}</h4>
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

export default Monoblock;
