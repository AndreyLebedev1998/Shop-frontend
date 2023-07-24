import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { getOneDelivery } from "../../store/slices/delivery";
import style from "./deliveryOneUser.module.css";

const DeliveryOneUser = () => {
  const dispatch = useDispatch();
  const oneDelivery = useSelector((state) => state.delivery.oneDelivery.data);
  const auth = useSelector((state) => state.auth.auth.data);
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();
  const { id, authId } = useParams();

  const goBack = () => navigate(-1);

  useEffect(() => {
    if (token) {
      dispatch(
        getOneDelivery({
          authId: authId,
          id: Number(id),
        })
      );
    }
  }, []);

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h1
        style={{
          margin: "20px",
        }}
      >
        Заказ №{id}
      </h1>
      <Container>
        {oneDelivery
          ? oneDelivery.delivery.map((dev) => {
              return (
                <>
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
                </>
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

export default DeliveryOneUser;
