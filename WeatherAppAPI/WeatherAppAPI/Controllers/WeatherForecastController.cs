using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WeatherAppAPI.Services.Contracts;

namespace WeatherAppAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IWeatherServices weatherServices;
        private readonly string apiKey;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IWeatherServices _weatherServices, IConfiguration configuration)
        {
            _logger = logger;
            weatherServices = _weatherServices;
            apiKey = configuration.GetValue<string>("WeatherAPIKey:Key");
        }

        [HttpGet(Name = "WeatherForecast")]
        public async Task<WeatherForecast> Get([FromQuery] string city, string units)
        {
            return await weatherServices.GetWeatherInfo(city, units, apiKey);
        }      
    }
}