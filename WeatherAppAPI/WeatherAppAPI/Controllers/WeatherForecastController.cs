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
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "WeatherForecast")]
        public async Task<WeatherForecast> Get([FromQuery] string city)
        {
            var ci = city;
            return await GetWeatherInfo(ci);
        }

        private async Task<WeatherForecast> GetWeatherInfo(string city)
        {
            var reservationList = new WeatherForecast();
            using (var httpClient = new HttpClient())
            {
                var response = await httpClient.GetAsync($"https://api.openweathermap.org/data/2.5/weather?lat=43.204666&lon=27.910543&appid={APIKey}");
                
                var apiResponse = await response.Content.ReadAsStringAsync();
                reservationList = JsonConvert.DeserializeObject<WeatherForecast>(apiResponse);
                
            }
            return reservationList;
        }
    }
}