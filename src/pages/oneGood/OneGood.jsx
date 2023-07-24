import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
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
    <div>
      <h1
        style={{
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        Один товар
      </h1>
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
          <Button
            variant="secondary"
            style={{
              marginBottom: "30px",
            }}
            onClick={goBack}
          >
            Назад
          </Button>
        </>
      ) : (
        <h1>Секундочку...</h1>
      )}
    </div>
  );
};

export default OneGood;
