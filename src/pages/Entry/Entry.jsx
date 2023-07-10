import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./entry.module.css";
import { authorization } from "../../store/slices/authorization";
import { Navigate } from "react-router-dom";

const Entry = () => {
  const auth = useSelector((state) => state.auth.auth.data);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const entry = (params) => {
    dispatch(authorization(params));
  };

  if (auth) {
    window.localStorage.setItem("token", auth.token);
  }

  if (auth && auth.token) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className={style.entry}>
        <h1>Вход</h1>
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
        <button onClick={() => entry({ email, password })}>Войти</button>
      </div>
    </>
  );
};

export default Entry;
