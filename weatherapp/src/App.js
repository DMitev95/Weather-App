import React, { useEffect, useState } from "react";

import cloudy from "./Assets/WheatherIcons/cloudy.png";
import sunny from "./Assets/WheatherIcons/sunny.png";
import fewClouds from "./Assets/WheatherIcons/fewClouds.png";

import coldBg from "./Assets/cold.jpg";
import sunnyBg from "./Assets/SunnyWeather.jpg";

import "./App.css";
import Search from "./Components/Search/Search";
import Description from "./Components/Description";

function App() {
  const [city, setCity] = useState("varna");
  const [weather, setWeather] = useState("");
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(sunnyBg);
  const [weatherIcon, setWeatherIcon] = useState("sunny");

  const handleClick = (b) => {
    const button = b.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isCelcius = currentUnit === "C";
    button.innerText = isCelcius ? "°F" : "°C";
    setUnits(isCelcius ? "metric" : "imperial");
  };

  const enterKeyPressed = (key) => {
    if (key.keyCode === 13) {
      setCity(key.currentTarget.value);
      key.currentTarget.blur();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await Search(city, units);
      setWeather(data);

      // dynamic bg
      const temperature = units === "metric" ? 20 : 60;

      // if (weather.description === "clear sky") {
      //   setBg(coldBg);
      //   setWeatherIcon(sunny);
      // } else if (
      //   weather.description === "broken clouds" &&
      //   weather.description === "scattered clouds"
      // ) {
      //   setBg(coldBg);
      //   setWeatherIcon(cloudy);
      // } else if (weather.description === "few clouds") {
      //   setWeatherIcon(fewClouds);
      // }
    };
    fetchData();
  }, [units, city, weather.description]);

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City..."
              />
              <button onClick={(e) => handleClick(e)}>°F</button>
            </div>
            <div className="section section__temperature">
              <div className="icon">
                {/* Here will be the name and the country. */}
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                {/* The URL to the image */}
                <img src={weather.iconURL} />
                {/* This will be the description */}
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                {/* Curent temperature */}
                <h1>
                  {`${weather.temp.toFixed()} °${
                    units === "metric" ? "C" : "F"
                  }`}
                </h1>
              </div>
            </div>
            <Description weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
