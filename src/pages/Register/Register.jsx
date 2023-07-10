import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { register } from "../../store/slices/authorization";
import style from "./register.module.css";

const Register = () => {
  const auth = useSelector((state) => state.auth.auth.data);
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (auth) {
    window.localStorage.setItem("token", auth.token);
  }

  if (auth && auth.token) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className={style.register}>
        <h1>Регистрация</h1>
        <input
          type="text"
          placeholder="Ваше имя"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Ваш email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Ваш пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={() => dispatch(register({ fullName, email, password }))}
        >
          Зарегестрироваться
        </button>
      </div>
    </>
  );
};

export default Register;
