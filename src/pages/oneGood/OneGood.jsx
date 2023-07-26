import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Accordion, Container, Row, Col } from "react-bootstrap";
import axios from "../../axios";
import style from "./oneGood.module.css";

const OneGood = () => {
  const [oneGood, setOneGood] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const goBack = () => navigate(-1);

  useEffect(() => {
    axios
      .get(`/goods/${id}`)
      .then((res) => res.data)
      .then((data) => setOneGood(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container>
      {oneGood ? (
        <>
          <div className="product">
            <h2
              style={{
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              {oneGood.name}
            </h2>
            <img src={oneGood.imageUrl} className={style.img} />
            <p>{oneGood.price} рублей</p>
          </div>
          <Row>
            <Col
              xs={10}
              sm={10}
              md={8}
              lg={8}
              xl={8}
              style={{
                margin: "auto",
              }}
            >
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Описание</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
          <Button
            variant="secondary"
            style={{
              margin: "50px",
            }}
            onClick={goBack}
          >
            Назад
          </Button>
        </>
      ) : (
        <h1>Секундочку...</h1>
      )}
    </Container>
  );
};

export default OneGood;
