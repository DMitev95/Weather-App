import React, { useState } from "react";
import WeatherList from "./Components/WeatherList";
import "./App.css";
import Search from "./Components/Search/Search";

function App() {
  const [weather, setWeather] = useState([]);
  function fetchData() {
    fetch("https://localhost:7296/WeatherForecast")
      .then((respose) => {
        return respose.json();
      })
      .then((data) => {
        const transformedData = data.map((weatherData) => {
          return {
            date: weatherData.date,
            temperatureC: weatherData.temperatureC,
            temperatureF: weatherData.temperatureF,
            summury: weatherData.summury,
          };
        });
        setWeather(transformedData);
      });
  }

  return (
    <React.Fragment>
      <div className="container">
        <Search />
      </div>
      <section>
        <button onClick={fetchData}>Fetch Weather</button>
      </section>
      <section>
        <WeatherList weathers={weather} />
      </section>
    </React.Fragment>
  );
}

export default App;
