import React, { useEffect, useState } from "react";

import cloudy from "./Assets/WheatherIcons/cloudy.png";
import coldBg from "./Assets/cold.jpg";
import sunnyBg from "./Assets/SunnyWeather.jpg";

import "./App.css";
import Search from "./Components/Search/Search";
import Description from "./Components/Description";

function App() {
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");

  useEffect(() => {
    const fetchData = async () => {
      const data = await Search("varna", units);
      setWeather(data);
    };
    fetchData();
  }, []);

  return (
    <div className="app" style={{ backgroundImage: `url(${sunnyBg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input type="text" name="city" placeholder="Enter City..." />
              <button>°C</button>
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
