"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface WeatherData {
  Weekend: number;
  "temperature_2m (°C)": number;
  "relative_humidity_2m (%)": number;
  "precipitation (mm)": number;
  "rain (mm)": number;
  "cloud_cover (%)": number;
  "wind_speed_100m (km/h)": number;
  "direct_radiation (W/m²)": number;
  "is_day ()": number;
  date: number;
  month: number;
  season: number;
  hour: number;
  is_festival: boolean;
}

interface DailyPrediction {
  day: number;
  hour: number;
  demand: number;
}

const API_KEY = "a41e1c074bb7041238ca24c0035b18da";

function WeeklyDemandPrediction() {
  const [startDate, setStartDate] = useState("");
  const [isFestival, setIsFestival] = useState(false);
  const [weeklyPredictions, setWeeklyPredictions] = useState<DailyPrediction[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeatherData = async (date: string) => {
    const location = "Delhi";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;

    try {
      const response = await axios.get(apiUrl);
      const weather = response.data;

      return {
        temperature_2m: weather.main.temp,
        relative_humidity_2m: weather.main.humidity,
        precipitation: weather.rain?.["1h"] || 0,
        rain: weather.rain?.["1h"] || 0,
        cloud_cover: weather.clouds.all,
        wind_speed_100m: weather.wind.speed * 3.6,
        direct_radiation: 0,
        is_day:
          weather.sys.sunrise <= Date.now() / 1000 &&
          weather.sys.sunset >= Date.now() / 1000
            ? 1
            : 0,
      };
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  };

  const getSeason = (month: number) => {
    if (month >= 3 && month <= 5) return 0;
    if (month >= 6 && month <= 8) return 1;
    if (month >= 9 && month <= 11) return 2;
    return 3;
  };

  const isWeekend = (dateObj: Date) => {
    const day = dateObj.getDay();
    return day === 0 || day === 6 ? 1 : 0;
  };

  const sendToMLModel = async (formattedData: WeatherData) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formattedData
      );
      return response.data.predicted_hourly_demand;
    } catch (error) {
      console.error("Error sending data to Flask ML model:", error);
      throw error;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setWeeklyPredictions([]);

    try {
      const startDateObj = new Date(startDate);
      const predictions: DailyPrediction[] = [];

      for (let day = 0; day < 7; day++) {
        const currentDate = new Date(startDateObj);
        currentDate.setDate(startDateObj.getDate() + day);

        const month = currentDate.getMonth() + 1;
        const weekend = isWeekend(currentDate);
        const season = getSeason(month);

        const weatherData = await fetchWeatherData(
          currentDate.toISOString().split("T")[0]
        );

        for (let hour = 0; hour < 24; hour++) {
          const formattedData: WeatherData = {
            Weekend: weekend,
            "temperature_2m (°C)": weatherData.temperature_2m,
            "relative_humidity_2m (%)": weatherData.relative_humidity_2m,
            "precipitation (mm)": weatherData.precipitation,
            "rain (mm)": weatherData.rain,
            "cloud_cover (%)": weatherData.cloud_cover,
            "wind_speed_100m (km/h)": weatherData.wind_speed_100m,
            "direct_radiation (W/m²)": weatherData.direct_radiation,
            "is_day ()": hour >= 6 && hour < 18 ? 1 : 0,
            date: currentDate.getDate(),
            month: month,
            season: season,
            hour: hour,
            is_festival: isFestival,
          };

          const demand = await sendToMLModel(formattedData);
          predictions.push({ day, hour, demand });
        }
      }

      setWeeklyPredictions(predictions);
    } catch (error) {
      console.error("Error processing data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Weekly Demand Prediction
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date:
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">
              Is Festival:
            </label>
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
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Submit"}
          </button>
        </form>

        {weeklyPredictions.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Weekly Demand Predictions
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={weeklyPredictions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="hour"
                  label={{
                    value: "Hour",
                    position: "insideBottom",
                    offset: -10,
                  }}
                  ticks={[0, 6, 12, 18, 23]}
                  padding={{ left: 10, right: 10 }} // Added padding to X-axis
                  domain={[0, 23]} // Ensures the full range is displayed
                />
                <YAxis
                  label={{
                    value: "Predicted Demand",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  labelFormatter={(label) => {
                    const day = Math.floor(label / 24);
                    const hour = label % 24;
                    return `Day ${day + 1}, Hour ${hour}`;
                  }}
                  formatter={(value, name, props) => [
                    `${value.toFixed(2)}`,
                    "Demand",
                  ]}
                />
                <Legend />
                {/* Create a line for each day */}
                {Array.from({ length: 7 }).map((_, day) => (
                  <Line
                    key={day}
                    type="monotone"
                    dataKey="demand"
                    data={weeklyPredictions.filter((p) => p.day === day)}
                    name={`Day ${day + 1}`}
                    stroke={`hsl(${(day * 360) / 7}, 70%, 50%)`}
                    dot={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeeklyDemandPrediction;
