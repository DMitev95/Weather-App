import { AsyncPaginate } from "react-select-async-paginate";
import { apiURL, apiOptions } from "../../API";

const iconUrl = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const Search = async (city) => {
  const data = await fetch(apiURL + city)
    .then((respose) => respose.json())
    .then((data) => data)
    .catch((err) => console.error(err));
  console.log(apiURL + `${city}`);
  console.log(data);
  console.log(city);

  const { date, temperatureC, temperatureF, summary } = data[0];

  return {
    date,
    temperatureC,
    temperatureF,
    summary,
  };
};
export default Search;
