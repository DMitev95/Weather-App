using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace WeatherAppAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string APIKey = "ee59d4f915912231c84736af71086070";

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "WeatherForecast")]
        public async Task<WeatherForecast> Get([FromQuery] string city, string units)
        {
            var ci = city;
            return await GetWeatherInfo(ci, units);
        }

        private async Task<WeatherForecast> GetWeatherInfo(string city, string units)
        {
            var geoLocation = await GetGeoLocation(city);
            var weatherInfo = new WeatherForecast();
            using (var httpClient = new HttpClient())
            {
            
                var response = await httpClient.GetAsync($"https://api.openweathermap.org/data/2.5/weather?lat={geoLocation.Lat.Value}&lon={geoLocation.Lon.Value}&appid={APIKey}&units={units}");


                var apiResponse = await response.Content.ReadAsStringAsync();
                weatherInfo = JsonConvert.DeserializeObject<WeatherForecast>(apiResponse);
                
            }
            return weatherInfo;
        }

        private async Task<GeoLocation> GetGeoLocation(string city)
        {
            var geoLocationInfo = new List<GeoLocation>();
            using (var httpClient = new HttpClient())
            {

                var response = await httpClient.GetAsync($"http://api.openweathermap.org/geo/1.0/direct?q={city}&appid={APIKey}");


                var apiResponse = await response.Content.ReadAsStringAsync();
                geoLocationInfo = JsonConvert.DeserializeObject<List<GeoLocation>>(apiResponse);

            }

            return geoLocationInfo[0];
        }
    }
}