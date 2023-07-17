import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import style from "./oneDelivery.module.css";
import {
  completedDelivery,
  framedDelivery,
  getOneDelivery,
} from "../../store/slices/delivery";

const OneDelivery = () => {
  const dispatch = useDispatch();
  const oneDelivery = useSelector((state) => state.delivery.oneDelivery.data);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOneDelivery(id));
  }, []);

  const statusFramedDelivery = () => {
    if (
      window.confirm(
        "Изменить статус заказа на оформлен?\nВернуть обратно будет нельзя"
      )
    ) {
      dispatch(framedDelivery(id)).then(() => dispatch(getOneDelivery(id)));
    }
  };

  const statusCompletedDelivery = () => {
    if (
      window.confirm(
        "Изменить статус заказа на выполнен?\nВернуть обратно будет нельзя"
      )
    )
      dispatch(completedDelivery(id)).then(() => dispatch(getOneDelivery(id)));
  };

  return (
    <div>
      {}
      <h1>Заказ №{id}</h1>
      {oneDelivery ? (
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
      ) : (
        ""
      )}
      <Link to="/deliveryControl">Назад</Link>
    </div>
  );
};

export default OneDelivery;
