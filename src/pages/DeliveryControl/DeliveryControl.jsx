import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
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
    <div>
      <h1>Заказы</h1>
      {allDeliveryUsers
        ? allDeliveryUsers.map((el) => {
            return el.map((dev) => {
              return (
                <div className={style.delivery}>
                  <Link to={`/delivery/${dev.id}/${dev.authId}`}>
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
                  <MdDeleteForever
                    onClick={() =>
                      deleteDelivery({ authId: dev.authId, id: dev.id })
                    }
                    className={style.deleteDelivery}
                  />
                </div>
              );
            });
          })
        : ""}
    </div>
  );
};

export default DeliveryControl;
