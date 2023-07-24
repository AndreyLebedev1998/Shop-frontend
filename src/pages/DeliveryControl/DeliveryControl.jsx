import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { Container, Row, Col } from "react-bootstrap";
import {
  deleteOneDelivery,
  getAllDeliveryUsers,
} from "../../store/slices/delivery";
import style from "./deliveryControl.module.css";

const DeliveryControl = () => {
  const dispatch = useDispatch();
  const allDeliveryUsers = useSelector(
    (state) => state.delivery.allDeliveryUsers.data
  );
  const auth = useSelector((state) => state.auth.auth.data);
  const admin = window.localStorage.getItem("admin");

  useEffect(() => {
    dispatch(getAllDeliveryUsers());
  }, []);

  const deleteDelivery = (params) => {
    dispatch(deleteOneDelivery(params)).then(() =>
      dispatch(getAllDeliveryUsers())
    );
  };

  if (!admin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h1>Заказы</h1>
      <Container>
        {allDeliveryUsers
          ? allDeliveryUsers.map((el) => {
              return el.map((dev) => {
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
                        <Link to={`/delivery/${dev.id}/${dev.authId}`}>
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
                      <Col lg={4} xs={6}>
                        <p>Общая сумма: {dev.totalPrice}</p>
                      </Col>

                      <Col lg={4} xs={6}>
                        <p>Общее колличество: {dev.totalQty}</p>
                      </Col>

                      <Col lg={4} xs={12}>
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
                        style={{
                          margin: "auto",
                          marginBottom: "20px",
                        }}
                      >
                        <MdDeleteForever
                          onClick={() =>
                            deleteDelivery({ authId: dev.authId, id: dev.id })
                          }
                          className={style.deleteDelivery}
                        />
                      </Col>
                    </Row>
                  </Row>
                );
              });
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

export default DeliveryControl;
