using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Newtonsoft.Json;
using WeatherAppAPI.Services.Contracts;

namespace WeatherAppAPI.Services
{
    public class WeatherServices : IWeatherServices
    {
        public async Task<WeatherForecast> GetWeatherInfo(string city, string units, string key)
        {
            //var geoLocation = await GetGeoLocation(city, key);
            var weatherInfo = new WeatherForecast();
            using (var httpClient = new HttpClient())
            {

                var response = await httpClient.GetAsync($"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={key}&units={units}");


                var apiResponse = await response.Content.ReadAsStringAsync();
                weatherInfo = JsonConvert.DeserializeObject<WeatherForecast>(apiResponse);

            }
            return weatherInfo;
        }
        //private async Task<GeoLocation> GetGeoLocation(string city, string key)
        //{
        //    var geoLocationInfo = new List<GeoLocation>();
        //    using (var httpClient = new HttpClient())
        //    {

        //        var response = await httpClient.GetAsync($"http://api.openweathermap.org/geo/1.0/direct?q={city}&appid={key}");


        //        var apiResponse = await response.Content.ReadAsStringAsync();
        //        geoLocationInfo = JsonConvert.DeserializeObject<List<GeoLocation>>(apiResponse);

        //    }

        //    return geoLocationInfo[0];
        //}
    }
}
