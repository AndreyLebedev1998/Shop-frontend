import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineAccountCircle } from "react-icons/md";
import style from "./header.module.css";
import { loginOut } from "../../store/slices/authorization";

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
  const dispatch = useDispatch();
  const [account, setAccount] = useState(false);

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
                      <Link to="/basket">Корзина</Link>
                    </li>
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
