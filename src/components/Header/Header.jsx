import React from "react";
import { NavLink } from "react-router-dom";
import style from "./header.module.css";

const goods = [
  { name: "Все", element: "/allGoods" },
  { name: "Клавиатуры", element: "/goods/keyboards" },
  { name: "Наушники", element: "/goods/headphones" },
  { name: "Ноутбуки", element: "/goods/laptops" },
  { name: "Моноблоки", element: "/goods/monoblocks" },
  { name: "Мыши", element: "/goods/mouses" },
];

const Header = () => {
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
        <NavLink className={style.home} to="/">
          Главная
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
