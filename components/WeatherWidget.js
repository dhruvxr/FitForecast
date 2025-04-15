import React, { useEffect, useState } from "react";
import axios from "axios";

const WeatherWidget = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // You can use a city name or coordinates
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"5e960bde50fecc592861bb88a63ff770"}&units=metric`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Weather fetch error:", error);
      }
    };

    if (city) fetchWeather();
  }, [city, API_KEY]);

  if (!weather) return <div>Loading weather data…</div>;

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h3 className="text-xl font-bold">{weather.name}</h3>
      <p>Temperature: {weather.main.temp} °C</p>
      <p>Humidity: {weather.main.humidity} %</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default WeatherWidget;
