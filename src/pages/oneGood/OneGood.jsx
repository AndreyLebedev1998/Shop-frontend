import React from "react";
import { useParams } from "react-router-dom";

const OneGood = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Один товар</h1>
    </div>
  );
};

export default OneGood;
