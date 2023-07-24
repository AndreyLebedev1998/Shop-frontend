import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import style from "./oneDelivery.module.css";
import {
  completedDelivery,
  framedDelivery,
  getOneDelivery,
} from "../../store/slices/delivery";

const OneDelivery = () => {
  const dispatch = useDispatch();
  const oneDelivery = useSelector((state) => state.delivery.oneDelivery.data);
  const auth = useSelector((state) => state.auth.auth.data);
  const authIdLocal = JSON.parse(window.localStorage.getItem("auth"));
  const admin = window.localStorage.getItem("admin");
  const navigate = useNavigate();
  const { id, authId } = useParams();

  const goBack = () => navigate(-1);

  useEffect(() => {
    if (authIdLocal) {
      dispatch(
        getOneDelivery({
          authId: authId,
          id: Number(id),
        })
      );
    }
  }, []);

  const statusFramedDelivery = () => {
    if (
      window.confirm(
        "Изменить статус заказа на оформлен?\nВернуть обратно будет нельзя"
      )
    ) {
      dispatch(framedDelivery({ authId: authId, id: Number(id) })).then(() =>
        dispatch(getOneDelivery({ authId: authId, id: Number(id) }))
      );
    }
  };

  const statusCompletedDelivery = () => {
    if (
      window.confirm(
        "Изменить статус заказа на выполнен?\nВернуть обратно будет нельзя"
      )
    )
      dispatch(completedDelivery({ authId: authId, id: Number(id) })).then(() =>
        dispatch(getOneDelivery({ authId: authId, id: Number(id) }))
      );
  };

  if (!admin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h1>Заказ №{id}</h1>
      <Container>
        {oneDelivery
          ? oneDelivery.delivery.map((dev) => {
              return (
                <Row>
                  <Row>
                    <Col>
                      <h3>
                        Имя: {dev.fullName} Фамилия:{" "}
                        {dev.lastName ? dev.lastName : ""}
                      </h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p
                        style={
                          dev.status === "В обработке"
                            ? {
                                color: "red",
                              }
                            : dev.status === "Оформлен"
                            ? {
                                color: "black",
                              }
                            : dev.status === "Выполнен"
                            ? {
                                color: "green",
                              }
                            : { color: "black" }
                        }
                      >
                        <strong>{dev.status}</strong>
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p>Общая сумма: {dev.totalPrice}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p>Общее колличество: {dev.totalQty}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p>Адрес доставки: {dev.adress}</p>
                    </Col>
                  </Row>
                  <table>
                    <tbody>
                      <tr>
                        <th>Наименование</th>
                        <th>Цена</th>
                        <th>Колличество</th>
                      </tr>
                      {dev.delivery.map((el) => {
                        return (
                          <>
                            <tr>
                              <td>{el.name}</td>
                              <td>{el.price}</td>
                              <td>{el.qtyInBasket}</td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                  <h3>Изменить статус заказа</h3>
                  {dev.status === "В обработке" ? (
                    <Row>
                      <Col>
                        <Button
                          variant="primary"
                          tyle={{ margin: "30px" }}
                          onClick={statusFramedDelivery}
                        >
                          Оформлен
                        </Button>
                      </Col>
                    </Row>
                  ) : (
                    ""
                  )}
                  {dev.status === "Оформлен" ? (
                    <Button
                      variant="success"
                      tyle={{ margin: "30px" }}
                      onClick={statusCompletedDelivery}
                    >
                      Выполнен
                    </Button>
                  ) : (
                    ""
                  )}
                </Row>
              );
            })
          : ""}
        <Button style={{ margin: "30px" }} variant="secondary" onClick={goBack}>
          Назад
        </Button>
      </Container>
    </>
  );
};

export default OneDelivery;

/* return (
              <div className={style.delivery}>
                <h3>
                  Имя: {oneDelivery.fullName} Фамилия:{" "}
                  {oneDelivery.lastName ? oneDelivery.lastName : ""}
                </h3>
                <p
                  style={
                    oneDelivery.status === "В обработке"
                      ? {
                          color: "red",
                        }
                      : oneDelivery.status === "Оформлен"
                      ? {
                          color: "black",
                        }
                      : oneDelivery.status === "Выполнен"
                      ? {
                          color: "green",
                        }
                      : { color: "black" }
                  }
                >
                  <strong>{oneDelivery.status}</strong>
                </p>
                <p>Общая сумма: {oneDelivery.totalPrice}</p>
                <p>Общее колличество: {oneDelivery.totalQty}</p>
                <p>Адрес доставки: {oneDelivery.adress}</p>
                <table>
                  <tbody>
                    <tr>
                      <th>Наименование</th>
                      <th>Цена</th>
                      <th>Колличество</th>
                    </tr>
                    {oneDelivery.delivery.map((el) => {
                      return (
                        <>
                          <tr>
                            <td>{el.name}</td>
                            <td>{el.price}</td>
                            <td>{el.qtyInBasket}</td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
                <h3>Изменить статус заказа</h3>
                {oneDelivery.status === "В обработке" ? (
                  <button onClick={statusFramedDelivery}>Оформлен</button>
                ) : (
                  ""
                )}
                {oneDelivery.status === "Оформлен" ? (
                  <button onClick={statusCompletedDelivery}>Выполнен</button>
                ) : (
                  ""
                )}
              </div>
            );
          })
        : " */
