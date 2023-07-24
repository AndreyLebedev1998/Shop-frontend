import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Button,
  Alert,
} from "react-bootstrap";
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
  const telephone = useSelector((state) => state.auth.telephone.text);
  const updateUserState = useSelector((state) => state.auth.updateUser.data);
  const deleteUserState = useSelector((state) => state.auth.deleteUser.data);
  const dispatch = useDispatch();
  const [gender, setGender] = useState(0);
  const [man, setMan] = useState("");
  const [women, setWomen] = useState("");
  const [removeAccount, setRemoveAccount] = useState(false);

  useEffect(() => {
    if (auth) {
      dispatch(getAuthMe(auth._id));
    }
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
    dispatch(deleteAccount(auth._id)).then(() => dispatch(loginOut()));
  };

  return (
    <>
      <h1
        style={{
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        Ваши данные
      </h1>
      <Container>
        {removeAccount ? (
          <Row>
            <Col className={style.container} xs={10} sm={10} lg={6}>
              <Alert
                variant="warning"
                onClose={() => setRemoveAccount(!removeAccount)}
                dismissible
              >
                <Alert.Heading>Удаление аккаунта</Alert.Heading>
                <p>
                  Вы действительно хотите удалить свой аккаунт. Это действие
                  отменить будет невозможно.
                </p>
                <Button variant="danger" onClick={deleteUser}>
                  Удалить
                </Button>
              </Alert>
            </Col>
          </Row>
        ) : (
          ""
        )}
        <Row>
          <Col className={style.container} xs={10} sm={10} lg={4}>
            {updateUserState ? (
              <Alert variant="success">
                <h5>Данные успешно обновлены</h5>
              </Alert>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Col className={style.container} xs={10} sm={10} lg={4}>
            <p>Здесь вы можете изменить свои данные</p>
          </Col>
        </Row>

        <Row>
          <Col className={style.container} xs={10} sm={10} lg={4}>
            <p>Ваш email: {auth ? auth.email : ""}</p>
          </Col>
        </Row>
        <Row>
          <Col className={style.container} xs={10} sm={10} lg={4}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Имя</InputGroup.Text>
              <Form.Control
                placeholder="Ваше имя"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={fullName}
                onChange={(e) => dispatch(changeFullName(e.target.value))}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col className={style.container} xs={10} sm={10} lg={4}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Фамилия</InputGroup.Text>
              <Form.Control
                placeholder="Ваша фамилия"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={lastName}
                onChange={(e) => dispatch(changeLastName(e.target.value))}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col className={style.container} lg={4}>
            <Form>
              <Form.Check
                inline
                label="М"
                name="group1"
                type="radio"
                id={`inline-radio-1`}
                value="1"
                checked={gender == "1" ? true : false}
                onChange={changeGender}
              />
              <Form.Check
                inline
                label="Ж"
                name="group2"
                type="radio"
                id={`inline-radio-2`}
                value="2"
                checked={gender == "2" ? true : false}
                onChange={changeGender}
              />
            </Form>
          </Col>
        </Row>
        <Row>
          <Col className={style.container} xs={10} sm={10} lg={4}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Тел</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Ваша телефон"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={telephone}
                onChange={(e) => dispatch(changeTelephone(e.target.value))}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col
            style={{
              marginBottom: "20px",
            }}
          >
            <Button
              variant="success"
              onClick={() =>
                chacngeUserData({
                  _id: auth._id,
                  fullName,
                  lastName,
                  gender: man ? man : women,
                  telephone,
                })
              }
            >
              Изменить
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={() => setRemoveAccount(true)} variant="danger">
              Удалить аккаунт
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Account;
