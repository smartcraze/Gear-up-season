"use client"
import React, { useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, LabelList } from 'recharts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

interface HourlyPrediction {
  hour: number;
  demand: number;
}

const API_KEY = "a41e1c074bb7041238ca24c0035b18da";

function Commercial() {
  const [date, setDate] = useState("");
  const [isFestival, setIsFestival] = useState(false);
  const [hourlyPredictions, setHourlyPredictions] = useState<HourlyPrediction[]>([]);
  const [totalDemand, setTotalDemand] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [highDemandThreshold, setHighDemandThreshold] = useState(0);
  const [lowDemandThreshold, setLowDemandThreshold] = useState(0);
  const [highDemandText, setHighDemandText] = useState<string[]>([]);
  const [lowDemandText, setLowDemandText] = useState<string[]>([]);

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
        is_day: weather.sys.sunrise <= Date.now() / 1000 && weather.sys.sunset >= Date.now() / 1000 ? 1 : 0,
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
      const response = await axios.post("http://127.0.0.1:5000/predict/model3", formattedData);
      return response.data.predicted_hourly_demand;
    } catch (error) {
      console.error("Error sending data to Flask ML model:", error);
      throw error;
    }
  };

  const calculatePercentiles = (demandValues: number[]) => {
    const sortedDemands = [...demandValues].sort((a, b) => a - b);
    const p95 = sortedDemands[Math.floor(sortedDemands.length * 0.97)];
    const p30 = sortedDemands[Math.floor(sortedDemands.length * 0.20)];
    const p20 = sortedDemands[Math.floor(sortedDemands.length * 0.05)];
    return { p95, p30, p20 };
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setHourlyPredictions([]);
    setTotalDemand(0);
    setHighDemandText([]);
    setLowDemandText([]);

    try {
      const dateObj = new Date(date);
      const month = dateObj.getMonth() + 1;
      const weekend = isWeekend(dateObj);
      const season = getSeason(month);

      const weatherData = await fetchWeatherData(date);

      const predictions: HourlyPrediction[] = [];
      let total = 0;
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
          date: dateObj.getDate(),
          month: month,
          season: season,
          hour: hour,
          is_festival: isFestival,
        };

        const demand = await sendToMLModel(formattedData);
        predictions.push({ hour, demand });
        total += demand;
      }

      setHourlyPredictions(predictions);
      setTotalDemand(total);

      // Calculate thresholds
      const demandValues = predictions.map(p => p.demand);
      const { p95, p30, p20 } = calculatePercentiles(demandValues);
      setHighDemandThreshold(p95);
      setLowDemandThreshold(p30); // Using the 30th percentile as low demand threshold

      // Generate text data for alerts
      const highDemandTextList = predictions.filter(p => p.demand >= p95)
        .map(p => `Hour ${p.hour}: ${p.demand.toFixed(2)} (High Demand)`);
      setHighDemandText(highDemandTextList);

      const lowDemandTextList = predictions.filter(p => p.demand >= p20 && p.demand < p30)
        .map(p => `Hour ${p.hour}: ${p.demand.toFixed(2)} (Low Demand)`);
      setLowDemandText(lowDemandTextList);

      // Show alerts based on demand thresholds
      predictions.forEach(p => {
        if (p.demand >= p95) {
          toast.error(`High Demand Alert: Hour ${p.hour} has high electricity demand. Consider implementing demand response measures.`);
        }
        if (p.demand >= p20 && p.demand < p30) {
          toast.info(`Low Demand Alert: Hour ${p.hour} has low electricity demand. You may divert electricity to different areas.`);
        }
      });
    } catch (error) {
      console.error("Error processing data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen p-6 flex items-center justify-center"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Commercial Demand Prediction
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
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
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Submit"}
          </button>
        </form>

        {hourlyPredictions.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Hourly Demand Predictions</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={hourlyPredictions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <ReferenceLine y={highDemandThreshold} stroke="red" strokeDasharray="3 3" label="High Demand Threshold" />
                <ReferenceLine y={lowDemandThreshold} stroke="blue" strokeDasharray="3 3" label="Low Demand Threshold" />
                <Line type="monotone" dataKey="demand" stroke="#8884d8" />
                <LabelList dataKey="demand" position="top" />
              </LineChart>
            </ResponsiveContainer>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">High Demand Hours</h3>
              <ul className="list-disc list-inside text-red-600">
                {highDemandText.map((text, index) => (
                  <li key={index}>{text}</li>
                ))}
              </ul>
              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Low Demand Hours</h3>
              <ul className="list-disc list-inside text-green-600">
                {lowDemandText.map((text, index) => (
                  <li key={index}>{text}</li>
                ))}
              </ul>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">Total Consumption</h3>
              <p className="text-gray-800">{totalDemand.toFixed(2)} kWh</p>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Commercial;
