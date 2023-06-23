import React from "react";
import { Link } from "react-router-dom";
import style from "./header.module.css";

const goods = [
  { name: "Все", element: "/goods" },
  { name: "Клавиатуры", element: "/keyboards" },
  { name: "Наушники", element: "/headphones" },
  { name: "Ноутбуки", element: "/laptops" },
  { name: "Моноблоки", element: "/monoblocks" },
  { name: "Мыши", element: "/mouses" },
];

const Header = () => {
  return (
    <div>
      <div className={style.header}>
        {goods.map((el, index) => {
          return (
            <div className={style.product}>
              <Link key={index} to={el.element} className={style.link}>
                {el.name}
              </Link>
            </div>
          );
        })}
        <Link className={style.home} to="/">
          Главная
        </Link>
      </div>
    </div>
  );
};

export default Header;
