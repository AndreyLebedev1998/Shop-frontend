import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineAccountCircle } from "react-icons/md";
import style from "./header.module.css";
import { getAuthMe, loginOut } from "../../store/slices/authorization";
import { computeTotalQty, getBasketUser } from "../../store/slices/basket";
import { getDeliveryUser } from "../../store/slices/delivery";

const goods = [
  { name: "Главная", element: "/" },
  { name: "Клавиатуры", element: "/goods/keyboards" },
  { name: "Наушники", element: "/goods/headphones" },
  { name: "Ноутбуки", element: "/goods/laptops" },
  { name: "Моноблоки", element: "/goods/monoblocks" },
  { name: "Мыши", element: "/goods/mouses" },
];

const Header = () => {
  const auth = useSelector((state) => state.auth.auth.data);
  const basket = useSelector((state) => state.basket.basket.data);
  const totalQtyGoods = useSelector((state) => state.basket.basket.total);
  const dispatch = useDispatch();
  const deliveryUser = useSelector(
    (state) => state.delivery.deliveryUserId.data
  );

  const [account, setAccount] = useState(false);

  let totalQty = 0;

  useEffect(() => {
    dispatch(getAuthMe());
    if (auth) {
      dispatch(getBasketUser(auth._id));
      dispatch(getDeliveryUser(auth._id));
    }
  }, []);

  useEffect(() => {
    if (basket) {
      dispatch(computeTotalQty(totalQty));
    }
  }, [basket]);

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти")) {
      setAccount(false);
      dispatch(loginOut());
    }
  };
  return (
    <div>
      <div className={style.header}>
        {goods.map((el, index) => {
          return (
            <div className={style.product}>
              <NavLink key={index} to={el.element} className={style.link}>
                {el.name}
              </NavLink>
            </div>
          );
        })}
        <div className={style.authorization}>
          {auth ? (
            <>
              <MdOutlineAccountCircle
                className={style.account}
                onClick={() => setAccount(!account)}
              />
              {account ? (
                <div className={style.accountList}>
                  <ul>
                    <li>
                      <Link to="/account">Аккаунт</Link>
                    </li>
                    <li>
                      <Link to="/basket">
                        Корзина{" "}
                        {basket && basket.length === 0 ? 0 : totalQtyGoods}
                      </Link>
                    </li>
                    <li>
                      <Link to="/deliveryUser">
                        Доставки {deliveryUser ? deliveryUser.length : ""}
                      </Link>
                    </li>
                    {auth && auth.admin ? (
                      <li>
                        <Link to="/deliveryControl">Заказы</Link>
                      </li>
                    ) : (
                      ""
                    )}
                    <li onClick={onClickLogout}>Выход</li>
                  </ul>
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              <NavLink to="/entry" className={style.link}>
                Вход
              </NavLink>
              <NavLink to="/register" className={style.link}>
                Регистрация
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
