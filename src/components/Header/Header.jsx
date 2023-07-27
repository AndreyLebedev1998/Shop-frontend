import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineAccountCircle } from "react-icons/md";
import {
  Col,
  Container,
  Dropdown,
  Nav,
  Navbar,
  Row,
  Modal,
  Button,
} from "react-bootstrap";
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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    setAccount(false);
    dispatch(loginOut());
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Потвердите действие</Modal.Title>
        </Modal.Header>
        <Modal.Body>Вы действительно хотите выйти?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onClickLogout();
              handleClose();
            }}
          >
            Выйти
          </Button>
        </Modal.Footer>
      </Modal>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="primary">
        {/* <Navbar.Brand>Магазин</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {goods.map((el, index) => {
              return (
                <Nav.Link>
                  <NavLink key={index} to={el.element} className={style.link}>
                    {el.name}
                  </NavLink>
                </Nav.Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            {auth ? (
              <Dropdown className="mr-2">
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  <MdOutlineAccountCircle
                    className={style.accountIcon}
                    onClick={() => setAccount(!account)}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link to="/account">Аккаунт</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/basket">
                      Корзина{" "}
                      {basket && basket.length === 0 ? 0 : totalQtyGoods}
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/deliveryUser">
                      Доставки {deliveryUser ? deliveryUser.length : ""}
                    </Link>
                  </Dropdown.Item>
                  {auth && auth.admin ? (
                    <Dropdown.Item>
                      <Link to="/deliveryControl">Заказы</Link>
                    </Dropdown.Item>
                  ) : (
                    ""
                  )}
                  <Dropdown.Item>
                    <li onClick={handleShow}>Выход</li>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Nav.Link>
                  <NavLink to="/entry" className={style.link}>
                    Вход
                  </NavLink>
                </Nav.Link>
                <Nav.Link>
                  <NavLink to="/register" className={style.link}>
                    Регистрация
                  </NavLink>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
