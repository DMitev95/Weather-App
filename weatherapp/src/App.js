import React, { useEffect, useState } from "react";

import cloudy from "./Assets/WheatherIcons/cloudy.png";
import hotBg from "./Assets/hot.jpg";
import coldBg from "./Assets/cold.jpg";

import "./App.css";
import Search from "./Components/Search/Search";
import Description from "./Components/Description";

function App() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Search("varna");
      // console.log(data);
      setWeather(data);
    };
    fetchData();
  }, []);

  return (
    <div className="app" style={{ backgroundImage: `url(${coldBg})` }}>
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
                <h3>Varna, BG</h3>
                {/* The URL to the image */}
                <img src={cloudy} />
                {/* This will be the description */}
                <h3>Cloudy</h3>
              </div>
              <div className="temperature">
                {/* Curent temperature */}
                <h1> {weather.temperatureC} °C</h1>
              </div>
            </div>
            <Description weather={weather} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
