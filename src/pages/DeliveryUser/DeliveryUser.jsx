import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import style from "./deliveryUser.module.css";
import {
  getDeliveryUser,
  deleteOneDelivery,
  getAllDeliveryUsers,
} from "../../store/slices/delivery";

const DeliveryUser = () => {
  const dispatch = useDispatch();
  const deliveryUser = useSelector(
    (state) => state.delivery.deliveryUserId.data
  );
  const auth = useSelector((state) => state.auth.auth.data);
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (auth) {
      dispatch(getDeliveryUser(auth._id));
    }
  }, []);

  const deleteDelivery = (params) => {
    dispatch(deleteOneDelivery(params)).then(() => {
      dispatch(getDeliveryUser(auth._id));
    });
  };

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h1
        style={{
          marginTop: "20px",
        }}
      >
        Ваши доставки
      </h1>
      <Container>
        {deliveryUser
          ? deliveryUser.map((dev) => {
              return (
                <Row
                  style={{
                    margin: "auto",
                    marginTop: "30px",
                    border: "1px solid black",
                    width: "90%",
                  }}
                >
                  <Row>
                    <Col
                      lg={6}
                      xs={10}
                      style={{
                        margin: "auto",
                      }}
                    >
                      <Link to={`/deliveryOneUser/${dev.id}/${dev.authId}`}>
                        <h4
                          style={{
                            marginTop: "20px",
                          }}
                        >
                          Номер заказа: {dev.id}
                        </h4>

                        <h4>
                          Имя: {dev.fullName} Фамилия:{" "}
                          {dev.lastName ? dev.lastName : ""}
                        </h4>
                      </Link>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      lg={4}
                      xs={6}
                      style={{
                        margin: "auto",
                      }}
                    >
                      <p>Общая сумма: {dev.totalPrice}</p>
                    </Col>
                    <Col
                      lg={4}
                      xs={6}
                      style={{
                        margin: "auto",
                      }}
                    >
                      <p>Общее колличество: {dev.totalQty}</p>
                    </Col>
                    <Col
                      lg={4}
                      xs={12}
                      style={{
                        margin: "auto",
                      }}
                    >
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
                        {dev.status}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      lg={2}
                      xs={12}
                      style={{
                        margin: "auto",
                        marginBottom: "20px",
                      }}
                    >
                      {dev.status === "Выполнен" ? (
                        ""
                      ) : (
                        <Button
                          variant="danger"
                          onClick={() =>
                            deleteDelivery({ authId: dev.authId, id: dev.id })
                          }
                        >
                          Отменить
                        </Button>
                      )}
                    </Col>
                  </Row>
                </Row>
              );
            })
          : ""}
        <Row
          style={{
            marginTop: "30px",
          }}
        ></Row>
      </Container>
    </>
  );
};

export default DeliveryUser;
