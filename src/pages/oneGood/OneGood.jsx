import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";

const OneGood = () => {
  const [oneGood, setOneGood] = useState();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/goods/${id}`)
      .then((res) => res.data)
      .then((data) => setOneGood(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Один товар</h1>
      {oneGood ? (
        <div className="product">
          <h1>{oneGood.name}</h1>
          <img src={oneGood.imageUrl} />
          <p>{oneGood.price} рублей</p>
        </div>
      ) : (
        <h1>Секундочку...</h1>
      )}
    </div>
  );
};

export default OneGood;
