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
import { Link } from "react-router-dom";
import { getBasketUser } from "../../store/slices/basket";
import style from "./delivery.module.css";

const Delivery = () => {
  const basket = useSelector((state) => state.basket.basket.data);
  const auth = useSelector((state) => state.auth.auth.data);
  const totalQtyGoods = useSelector((state) => state.basket.basket.total);
  const [allRight, setAllRight] = useState(false);
  const [map, setMap] = useState([]);
  const [notFound, setNotFound] = useState("");
  const dispatch = useDispatch();

  let sum = 0;
  let totalPrice = 0;

  if (basket) {
    totalPrice = basket.map((el) => (sum += el.price * el.qtyInBasket));
  }

  useEffect(() => {
    /* dispatch(getAuthMe()); */
    if (auth) {
      dispatch(getBasketUser(auth._id));
    }
  }, []);

  console.log(map);

  return (
    <div>
      <h1>Доставка</h1>
      {allRight ? (
        <h1>Проверьте правльность введенных вами данных</h1>
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
      {allRight ? <button>Заказать</button> : ""}
    </div>
  );
};

export default Delivery;
