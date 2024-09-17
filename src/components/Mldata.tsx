"use client";

import React, { useState } from "react";
import axios from "axios";

interface WeatherData {
  Weekend: boolean;
  "temperature_2m (°C)": number;
  "relative_humidity_2m (%)": number;
  "precipitation (mm)": number;
  "rain (mm)": number;
  "cloud_cover (%)": number;
  "wind_speed_100m (km/h)": number;
  "direct_radiation (W/m²)": number;
  "is_day ()": boolean;
  date: string;
  month: number;
  year: number;
  season: string;
  hour: number;
  is_festival: boolean;
}

function Mldata() {
  const [date, setDate] = useState("");
  const [isFestival, setIsFestival] = useState(false);
  const [data, setData] = useState<WeatherData | null>(null);

  const fetchWeatherData = async (date: string) => {
    const apiKey = "a41e1c074bb7041238ca24c0035b18da"; // Replace with your OpenWeatherMap API key
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=YOUR_LAT&lon=YOUR_LON&dt=${Math.floor(
      new Date(date).getTime() / 1000
    )}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(weatherApiUrl);
      return response.data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const getSeason = (month: number) => {
    if (month >= 3 && month <= 5) return "Spring";
    if (month >= 6 && month <= 8) return "Summer";
    if (month >= 9 && month <= 11) return "Fall";
    return "Winter";
  };

  const isWeekend = (dateObj: Date) => {
    const day = dateObj.getDay();
    return day === 0 || day === 6;
  };

  const sendToMLModel = async (formattedData: WeatherData) => {
    try {
      const response = await axios.post("http://localhost:5000/predict", formattedData); // Replace with your Flask endpoint URL
      console.log("Response from Flask API:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error sending data to Flask API:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const dateObj = new Date(date);

    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    const hour = dateObj.getHours();
    const weekend = isWeekend(dateObj);
    const season = getSeason(month);

    const weatherData = await fetchWeatherData(date);
    if (!weatherData) return;

    const formattedData: WeatherData = {
      Weekend: weekend,
      "temperature_2m (°C)": weatherData.current.temp,
      "relative_humidity_2m (%)": weatherData.current.humidity,
      "precipitation (mm)": weatherData.current.precipitation || 0,
      "rain (mm)": weatherData.current.rain || 0,
      "cloud_cover (%)": weatherData.current.clouds,
      "wind_speed_100m (km/h)": weatherData.current.wind_speed,
      "direct_radiation (W/m²)": weatherData.current.uvi,
      "is_day ()": weatherData.current.dt > weatherData.current.sunset,
      date: date,
      month: month,
      year: year,
      season: season,
      hour: hour,
      is_festival: isFestival,
    };

    setData(formattedData);

    // Send the data to the ML model in Flask
    const mlResponse = await sendToMLModel(formattedData);
    console.log("Response from ML Model:", mlResponse);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Weather & Date Information
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date:
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Is Festival:</label>
            <input
              type="checkbox"
              checked={isFestival}
              onChange={(e) => setIsFestival(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-indigo-700 transition"
          >
            Submit
          </button>
        </form>

        {data && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Extracted Data</h2>
            <pre className="text-sm text-gray-700 bg-white p-4 rounded-md shadow-inner">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Mldata;
