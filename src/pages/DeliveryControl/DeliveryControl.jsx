import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllDelivery } from "../../store/slices/delivery";
import style from "./deliveryControl.module.css";
import { Link } from "react-router-dom";

const DeliveryControl = () => {
  const dispatch = useDispatch();
  const allDelivery = useSelector((state) => state.delivery.allDelivery.data);

  useEffect(() => {
    dispatch(getAllDelivery());
  }, []);

  return (
    <div>
      <h1>Заказы</h1>
      {allDelivery
        ? allDelivery.map((el) => {
            return (
              <Link to={`/delivery/${el._id}`}>
                <div className={style.delivery}>
                  <h2>Номер заказа: {el._id}</h2>
                  <h3>
                    Имя: {el.fullName} Фамилия: {el.lastName ? el.lastName : ""}
                  </h3>
                  <p
                    style={
                      el.status === "В обработке"
                        ? {
                            color: "red",
                          }
                        : el.status === "Оформлен"
                        ? {
                            color: "black",
                          }
                        : el.status === "Выполнен"
                        ? {
                            color: "green",
                          }
                        : { color: "black" }
                    }
                  >
                    {el.status}
                  </p>
                  <p>Общая сумма: {el.totalPrice}</p>
                  <p>Общее колличество: {el.totalQty}</p>
                </div>
              </Link>
            );
          })
        : ""}
    </div>
  );
};

export default DeliveryControl;
