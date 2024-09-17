'use client';

import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Bargraph: React.FC = () => {
  // State for input fields
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [apiData, setApiData] = useState<any>(null);

  // Function to handle card click and show input field for that metric
  const handleCardClick = (metric: string) => {
    setSelectedMetric(metric);
  };

  // Function to handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Function to fetch data from the API
  const fetchData = async () => {
    const url = 'https://api.example.com/data'; // Replace with your actual API endpoint
    const payload = {
      metric: selectedMetric,
      value: inputValue,
    };

    try {
      const response = await fetch(url, {
        method: 'POST', // Assuming POST request
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      setApiData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Sample data for the bar chart (will eventually come from the API)
  const chartData = apiData
    ? {
        labels: apiData.labels,
        datasets: [
          {
            label: 'Data from API',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            data: apiData.data,
          },
        ],
      }
    : {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Sample Data',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            data: [300, 450, 500, 600, 700, 650, 400, 350, 500, 600, 700, 750],
          },
        ],
      };

  return (
    <>
      <div style={{ margin: '20px' }}>
        {/* Statistics Cards */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
          <div
            style={{ backgroundColor: '#3f51b5', color: 'white', padding: '20px', textAlign: 'center', cursor: 'pointer' }}
            onClick={() => handleCardClick('Hourly')}
          >
            <h5>5.3 MM</h5>
            <p>Hourly</p>
          </div>
          <div
            style={{ backgroundColor: '#00acc1', color: 'white', padding: '20px', textAlign: 'center', cursor: 'pointer' }}
            onClick={() => handleCardClick('Weekly')}
          >
            <h5>58K</h5>
            <p>Weekly</p>
          </div>
          <div
            style={{ backgroundColor: '#4caf50', color: 'white', padding: '20px', textAlign: 'center', cursor: 'pointer' }}
            onClick={() => handleCardClick('Monthly')}
          >
            <h5>1.03%</h5>
            <p>Monthly</p>
          </div>
          <div
            style={{ backgroundColor: '#ff9800', color: 'white', padding: '20px', textAlign: 'center', cursor: 'pointer' }}
            onClick={() => handleCardClick('Yearly')}
          >
            <h5>$0.15</h5>
            <p>Yearly</p>
          </div>
        </div>

        {/* Input Field for selected metric */}
        {selectedMetric && (
          <div style={{ marginTop: '20px' }}>
            <h6>Enter value for {selectedMetric}</h6>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={`${selectedMetric} Value`}
              style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
            />
            <button onClick={fetchData} style={{ padding: '10px 20px', backgroundColor: '#3f51b5', color: 'white', cursor: 'pointer' }}>
              Fetch Data
            </button>
          </div>
        )}

        {/* Bar Chart */}
        <div style={{ marginTop: '40px' }}>
          <h6>Data Visualization</h6>
          <Bar data={chartData} />
        </div>
      </div>
    </>
  );
};

export default Bargraph;
