import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
  const auth = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
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
            <button
              className={style.logOut}
              onClick={() => dispatch(loginOut())}
            >
              Выход
            </button>
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
