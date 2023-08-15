import React from "react";

const Weather = (props) => {
  return (
    <li>
      <h2>{props.date}</h2>
      <h3>{props.temperatureC}</h3>
      <p>{props.temperatureF}</p>
      <p>{props.summary}</p>
    </li>
  );
};

export default Weather;
