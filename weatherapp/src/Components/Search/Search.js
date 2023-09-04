import { apiURL, apiOptions } from "../../API";

const makeIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const Search = async (city, units) => {
  const data = await fetch(apiURL + `?city=${city}` + `&units=${units}`)
    .then((respose) => respose.json())
    .then((data) => data)
    .catch((err) => console.error(err));

  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    sys: { country },
    name,
  } = data;

  const { description, icon } = weather[0];

  return {
    description,
    iconURL: makeIconURL(icon),
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    speed,
    country,
    name,
  };
};
export default Search;
