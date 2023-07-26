import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { RiLockPasswordFill } from "react-icons/ri";
import { register } from "../../store/slices/authorization";

const Register = () => {
  const auth = useSelector((state) => state.auth.auth.data);
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (auth) {
    window.localStorage.setItem("token", auth.token);
  }

  if (auth && auth.token) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Введите корректные данные</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Имя должно составлять не менее 3 символов</p>
          <p>Введите корректный email</p>
          <p>Пароль должен быть не менее 5 символов</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <h1>Регистрация</h1>
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
              <InputGroup.Text id="basic-addon1">Имя</InputGroup.Text>
              <Form.Control
                aria-label="Username"
                aria-describedby="basic-addon1"
                type="text"
                placeholder="Ваше имя"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              <Form.Control
                aria-label="Username"
                aria-describedby="basic-addon1"
                type="email"
                placeholder="Ваш email"
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

        <Button
          variant="success"
          onClick={() =>
            dispatch(register({ fullName, email, password })).then((res) => {
              if (res.error) {
                handleShow();
              }
            })
          }
        >
          Зарегестрироваться
        </Button>
      </Container>
    </>
  );
};

export default Register;
