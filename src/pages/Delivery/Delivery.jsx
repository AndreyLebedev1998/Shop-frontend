import React, { useState, useEffect } from "react";
import {
  YMaps,
  Map,
  FullscreenControl,
  GeoObject,
  Placemark,
  SearchControl,
} from "@pbe/react-yandex-maps";
import { MdOutlineApartment } from "react-icons/md";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  Alert,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { getAuthMe } from "../../store/slices/authorization";
import { getBasketUser } from "../../store/slices/basket";
import style from "./delivery.module.css";
import {
  deleteGoodsInBasket,
  addDeliveryInUser,
} from "../../store/slices/delivery";

const Delivery = () => {
  const basket = useSelector((state) => state.basket.basket.data);
  const auth = useSelector((state) => state.auth.auth.data);
  const totalQtyGoods = useSelector((state) => state.basket.basket.total);
  const authId = JSON.parse(window.localStorage.getItem("auth"));
  const [allRight, setAllRight] = useState(false);
  const [map, setMap] = useState([]);
  const [notFound, setNotFound] = useState("");
  const [apartment, setApartment] = useState("");
  const [warning, setWarning] = useState(false);
  const dispatch = useDispatch();

  let sum = 0;
  let totalPrice = 0;

  if (basket) {
    totalPrice = basket.map((el) => (sum += el.price * el.qtyInBasket));
  }

  console.log(map);

  const addDelivery = () => {
    dispatch(
      addDeliveryInUser({
        _id: auth._id,
        id: Math.floor(Math.random() * 100000) + 1,
        fullName: auth.fullName,
        lastName: auth.lastName,
        email: auth.email,
        adress:
          map.length === 4
            ? `Город: ${map[0]} ${map[1]}, Улица: ${map[2]}, Дом: ${map[3]}, Квартира: ${apartment}`
            : `Город: ${map[0]}}, Улица: ${map[1]}, Дом: ${map[2]}, Квартира: ${apartment}`,
        telephone: auth.telephone,
        delivery: basket,
        totalPrice: totalPrice[0],
        totalQty: totalQtyGoods,
        status: "В обработке",
      })
    );
  };

  useEffect(() => {
    dispatch(getAuthMe());
    if (auth) {
      dispatch(getBasketUser(auth._id));
    }
  }, []);

  if (!authId) {
    return <Navigate to="/" />;
  }

  if (basket) {
    if (basket.length === 0) {
      return <Navigate to="/basket" />;
    }
  }

  return (
    <Container>
      <h1>Доставка</h1>
      {allRight ? (
        <h3>Проверьте правильность введенных вами данных</h3>
      ) : (
        <h3>Введите название города, улицы и номер дома через запятую</h3>
      )}
      {allRight ? (
        map.length === 4 ? (
          <>
            <Row>
              <Col>
                <p>
                  Город: {map[1]}, {map[0]}
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>Улица: {map[2]}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>Дом: {map[3]}</p>
              </Col>
            </Row>

            <Row>
              <Col
                lg={6}
                xs={10}
                xl={6}
                style={{
                  margin: "auto",
                }}
              >
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <MdOutlineApartment
                      style={{
                        fontSize: "1.4rem",
                      }}
                    />
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    placeholder="Введите номер квартиры"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>
          </>
        ) : (
          ""
        )
      ) : (
        ""
      )}
      {allRight ? (
        map.length === 3 ? (
          <>
            <p>Город: {map[0]}</p>
            <p>Улица: {map[1]}</p>
            <p>Дом: {map[2]}</p>
            <input
              type="number"
              value={apartment}
              onChange={(e) => setApartment(e.target.value)}
            />
          </>
        ) : (
          ""
        )
      ) : (
        ""
      )}
      {!allRight ? (
        <Row>
          <Col xs={12}>
            <YMaps
              query={{
                apikey: "9ff20f06-4c0c-4b03-8c72-64ffd99b5479",
              }}
            >
              <Map
                className={style.map}
                defaultState={{
                  center: [57.15, 60.05],
                  zoom: 9,
                  controls: [],
                }}
              >
                <SearchControl
                  options={{
                    fitMaxWidth: true,
                  }}
                  onChange={(e) => {
                    setMap(
                      e.originalEvent.target.state._data.inputValue
                        ? e.originalEvent.target.state._data.inputValue.split(
                            ","
                          )
                        : ""
                    );
                    setNotFound(
                      e.originalEvent.target.state._data.popupHintContent
                    );
                  }}
                />
                <FullscreenControl />
                {/* <Placemark geometry={[57.2399, 60.09]} /> */}
              </Map>
            </YMaps>
          </Col>
        </Row>
      ) : (
        ""
      )}
      {allRight ? (
        <Row>
          <Col>
            <Button variant="secondary" onClick={() => setAllRight(!allRight)}>
              Назад
            </Button>
          </Col>
        </Row>
      ) : map.length >= 3 ? (
        <Button
          style={{
            margin: "30px",
          }}
          variant="success"
          onClick={() => setAllRight(!allRight)}
        >
          Далее
        </Button>
      ) : (
        ""
      )}
      {allRight ? (
        <>
          <Row>
            <h1>Ваш заказ</h1>
            {basket
              ? basket.map((el) => {
                  return (
                    <Col xs={6} sm={6} md={4} lg={4}>
                      <h1>{el.name}</h1>
                      <Link to={`/goods/${el._id}`}>
                        <img src={el.imageUrl} />
                      </Link>
                      <p>{el.price} рублей</p>
                      <p>Колличество: {el.qtyInBasket}</p>
                    </Col>
                  );
                })
              : ""}
            {basket && basket.length !== 0 ? (
              <>
                <h2>Общее колличество товаров: {totalQtyGoods}</h2>
                <h2>
                  Общая сумма товаров: {basket ? totalPrice.reverse()[0] : ""}{" "}
                  рублей
                </h2>
              </>
            ) : (
              <h2>Коризна пустая</h2>
            )}
          </Row>
        </>
      ) : (
        ""
      )}
      {warning ? (
        <Row>
          <Col>
            <Alert variant="danger">Вы забыли указать номер квартиры</Alert>
          </Col>
        </Row>
      ) : (
        ""
      )}
      {allRight ? (
        <Button
          to="/deliveryUser"
          onClick={() => {
            if (!apartment) {
              setWarning(true);
            } else {
              addDelivery();
              setWarning(false);
              dispatch(deleteGoodsInBasket(auth._id)).then(() =>
                dispatch(getBasketUser(auth._id))
              );
            }
          }}
        >
          Заказать
        </Button>
      ) : (
        ""
      )}
      <Row
        style={{
          margin: "40px",
        }}
      ></Row>
    </Container>
  );
};

export default Delivery;
