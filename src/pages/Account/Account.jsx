import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./account.module.css";
import {
  updateUser,
  changeFullName,
  getAuthMe,
  changeLastName,
  changeAdress,
  changeTelephone,
} from "../../store/slices/authorization";

const Account = () => {
  const auth = useSelector((state) => state.auth.auth.data);
  const fullName = useSelector((state) => state.auth.fullName.text);
  const lastName = useSelector((state) => state.auth.lastName.text);
  const adress = useSelector((state) => state.auth.adress.text);
  const telephone = useSelector((state) => state.auth.telephone.text);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthMe());
  }, []);

  const chacngeUserData = (params) => {
    dispatch(updateUser(params));
  };

  return (
    <>
      <h1>Ваши данные</h1>
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
          <input type="checkbox" id="man" />
          <label for="man">Мужской</label>
          <input type="checkbox" id="women" />
          <label for="women">Женский</label>
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
              adress,
              telephone,
            })
          }
        >
          Изменить
        </button>
      </div>
    </>
  );
};

export default Account;
