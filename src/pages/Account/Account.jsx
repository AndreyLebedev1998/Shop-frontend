import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import style from "./account.module.css";
import {
  updateUser,
  changeFullName,
  getAuthMe,
  changeLastName,
  changeAdress,
  changeTelephone,
  deleteAccount,
  loginOut,
} from "../../store/slices/authorization";

const Account = () => {
  const auth = useSelector((state) => state.auth.auth.data);
  const fullName = useSelector((state) => state.auth.fullName.text);
  const lastName = useSelector((state) => state.auth.lastName.text);
  const adress = useSelector((state) => state.auth.adress.text);
  const telephone = useSelector((state) => state.auth.telephone.text);
  const updateUserState = useSelector((state) => state.auth.updateUser.data);
  const deleteUserState = useSelector((state) => state.auth.deleteUser.data);
  const dispatch = useDispatch();
  const [gender, setGender] = useState(0);
  const [man, setMan] = useState("");
  const [women, setWomen] = useState("");
  /*  const man = "Мужчина";
  const women = "Женщина"; */

  useEffect(() => {
    dispatch(getAuthMe());
  }, []);

  const chacngeUserData = (params) => {
    dispatch(updateUser(params));
  };

  if (!window.localStorage.getItem("token")) {
    return <Navigate to="/" />;
  }

  const changeGender = (e) => {
    setGender(e.target.value);
    if (e.target.value == 1) {
      setMan("Мужчина");
      setWomen("");
    } else if (e.target.value == 2) {
      setMan("");
      setWomen("Женщина");
    }
  };

  const deleteUser = () => {
    if (
      window.confirm(
        "Вы действительно хотите удалить свой аккаунт\nОтменить это действие будет невозможно"
      )
    ) {
      dispatch(deleteAccount(auth._id)).then(() => dispatch(loginOut()));
    }
  };

  /* if (deleteUserState) {
    window.localStorage.removeItem("token");
  } */

  return (
    <>
      <h1>Ваши данные</h1>
      {updateUserState ? <h2>Данные успешно обновлены</h2> : ""}
      <div className={style.account}>
        <p>Здесь вы можете изменить свои данные</p>
        <p>Ваш email: {auth ? auth.email : ""}</p>

        <input
          type="text"
          placeholder="Введите ваше имя"
          value={fullName}
          onChange={(e) => dispatch(changeFullName(e.target.value))}
        />
        <input
          type="text"
          placeholder="Введите вашу фамилию"
          value={lastName}
          onChange={(e) => dispatch(changeLastName(e.target.value))}
        />
        <div className={style.gender}>
          <p>Выберите ваш пол:</p>
          <input
            type="radio"
            value="1"
            checked={gender == "1" ? true : false}
            onChange={changeGender}
          />
          <label>М</label>
          <input
            type="radio"
            value="2"
            checked={gender == "2" ? true : false}
            onChange={changeGender}
          />
          <label>Ж</label>
        </div>
        <input
          type="text"
          placeholder="Адрес постоянной доставки"
          value={adress}
          onChange={(e) => dispatch(changeAdress(e.target.value))}
        />
        <input
          type="tel"
          placeholder="Введите ваш номер телефона"
          value={telephone}
          onChange={(e) => dispatch(changeTelephone(e.target.value))}
        />
        <button
          onClick={() =>
            chacngeUserData({
              _id: auth._id,
              fullName,
              lastName,
              gender: man ? man : women,
              adress,
              telephone,
            })
          }
        >
          Изменить
        </button>
        <button onClick={deleteUser} className={style.delete}>
          Удалить аккаунт
        </button>
      </div>
    </>
  );
};

export default Account;
