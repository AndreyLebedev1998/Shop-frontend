import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
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
    <div className={style.allDelivery}>
      <h1>Ваши доставки</h1>
      {deliveryUser
        ? deliveryUser.map((dev) => {
            return (
              <div className={style.delivery}>
                <Link to={`/deliveryOneUser/${dev.id}/${dev.authId}`}>
                  <h3>Номер заказа: {dev.id}</h3>
                  <h3>
                    Имя: {dev.fullName} Фамилия:{" "}
                    {dev.lastName ? dev.lastName : ""}
                  </h3>
                </Link>
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
                <p>Общая сумма: {dev.totalPrice}</p>
                <p>Общее колличество: {dev.totalQty}</p>
                <button
                  onClick={() =>
                    deleteDelivery({ authId: dev.authId, id: dev.id })
                  }
                  className={style.deleteDelivery}
                >
                  Отменить
                </button>
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default DeliveryUser;
