import React from "react";
import "./Description.css";

import { FaArrowDown } from "react-icons/fa";

const Description = ({ weather, units }) => {
  const tempUnit = units === "metric" ? "°C" : "°F";
  const windUnit = units === "metric" ? "m/s" : "k/h";

  console.log(weather);
  console.log(weather.date);
  return (
    <div className="section section__description">
      <div className="card">
        <div className="description__card-icon">
          <FaArrowDown />
          <small> {weather.date}</small>
        </div>
        <h2>{weather.temperatureF} °F</h2>
        <h2>{weather.temperatureC} °C</h2>
        <h2>{weather.summary}</h2>
      </div>
    </div>
  );
};
{
  /* <h2>{props.date}</h2>
      <h3>{props.temperatureC}</h3>
      <p>{props.temperatureF}</p>
      <p>{props.summary}</p> */
}

export default Description;
