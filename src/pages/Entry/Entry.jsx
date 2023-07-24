import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  Alert,
} from "react-bootstrap";
import { RiLockPasswordFill } from "react-icons/ri";
import style from "./entry.module.css";
import { authorization } from "../../store/slices/authorization";

const Entry = () => {
  const auth = useSelector((state) => state.auth.auth.data);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const entry = (params) => {
    dispatch(authorization(params)).then((res) => {
      if (res.error) {
        alert("Неправильный логин или пароль");
      }
    });
  };

  if (auth) {
    window.localStorage.setItem("token", auth.token);
  }

  if (auth && auth.token) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h1>Вход</h1>
      <Container>
        <Row>
          <Col
            lg={6}
            xs={10}
            xl={6}
            style={{
              margin: "auto",
            }}
          >
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Ваш email"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col
            lg={6}
            xs={10}
            xl={6}
            style={{
              margin: "auto",
            }}
          >
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <RiLockPasswordFill
                  style={{
                    fontSize: "1.4rem",
                  }}
                />
              </InputGroup.Text>
              <Form.Control
                aria-label="Username"
                aria-describedby="basic-addon1"
                type="password"
                placeholder="Ваш пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>

        <Button variant="success" onClick={() => entry({ email, password })}>
          Войти
        </Button>
      </Container>
    </>
  );
};

export default Entry;
