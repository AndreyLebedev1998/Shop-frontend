import React, { useState, useEffect } from "react";
import {
  YMaps,
  Map,
  FullscreenControl,
  GeoObject,
  Placemark,
  SearchControl,
} from "@pbe/react-yandex-maps";
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
  const dispatch = useDispatch();

  let sum = 0;
  let totalPrice = 0;

  if (basket) {
    totalPrice = basket.map((el) => (sum += el.price * el.qtyInBasket));
  }

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
    <div>
      <h1>Доставка</h1>
      Свердловская область, Новоуральск, Автозаводская улица, 21
      {allRight ? (
        <h1>Проверьте правильность введенных вами данных</h1>
      ) : (
        <h2>Введите название города, улицы и номер дома</h2>
      )}
      {allRight ? (
        map.length === 4 ? (
          <>
            <p>
              Город: {map[1]}, {map[0]}
            </p>
            <p>Улица: {map[2]}</p>
            <p>Дом: {map[3]}</p>
            <input
              type="number"
              placeholder="Введите номер квартиры"
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
                    ? e.originalEvent.target.state._data.inputValue.split(",")
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
      ) : (
        ""
      )}
      {allRight ? (
        <button onClick={() => setAllRight(!allRight)}>Назад</button>
      ) : map.length >= 3 ? (
        <button onClick={() => setAllRight(!allRight)}>Далее</button>
      ) : (
        ""
      )}
      {allRight ? (
        <>
          <div>
            <h1>Ваш заказ</h1>
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
                    </div>
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
          </div>
        </>
      ) : (
        ""
      )}
      {allRight ? (
        <Link
          to="/deliveryUser"
          onClick={() => {
            if (!apartment) {
              alert("Вы забыли указать номер квартиры");
            } else {
              addDelivery();
              dispatch(deleteGoodsInBasket(auth._id)).then(() =>
                dispatch(getBasketUser(auth._id))
              );
            }
          }}
        >
          Заказать
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default Delivery;
