import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./style.scss";

const CircleRating = ({ rating }) => {
  return (
    <div className="circleRating">
      <p className="CircularProgressbar-text">{rating}</p>
    </div>
  );
};

export default CircleRating;
