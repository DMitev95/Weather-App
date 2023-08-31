namespace WeatherAppAPI.Services.Contracts
{
    public interface IWeatherServices
    {
        Task<WeatherForecast> GetWeatherInfo(string city, string units);
    }
}
