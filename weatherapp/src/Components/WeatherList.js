import React from "react";

import Weather from "./Weather";

const WeatherList = (props) => {
  return (
    <ul>
      {props.weathers.map((weather) => (
        <Weather
          date={weather.date}
          temperatureC={weather.temperatureC}
          temperatureF={weather.temperatureF}
          summury={weather.summary}
        />
      ))}
    </ul>
  );
};

export default WeatherList;
