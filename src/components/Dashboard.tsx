'use client'

import React, { useState, useEffect } from 'react';

// Define types for the data
type CampaignData = {
  impressions: number;
  clicks: number;
  ctr: number;
  cpi: number;
  cpc: number;
};

type TrafficData = {
  month: string;
  dailyVisitsInPerson: number[];
  dailyVisitsControl: number[];
  cumulativeVisitsInPerson: number[];
  cumulativeVisitsControl: number[];
};

// Main component
const Dashboard: React.FC = () => {
  const [campaignData, setCampaignData] = useState<CampaignData | null>(null);
  const [trafficData, setTrafficData] = useState<TrafficData[]>([]);

  // Fetch campaign data
  useEffect(() => {
    fetch('https://api.yourdomain.com/campaign')
      .then(response => response.json())
      .then(data => setCampaignData(data))
      .catch(error => console.error('Error fetching campaign data:', error));
  }, []);

  // Fetch traffic data
  useEffect(() => {
    fetch('https://api.yourdomain.com/traffic')
      .then(response => response.json())
      .then(data => setTrafficData(data))
      .catch(error => console.error('Error fetching traffic data:', error));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <h1 className="text-3xl font-bold mb-5">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-bold text-gray-700">Campaign Performance</h2>
          {campaignData && (
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-2">
                <div className="text-2xl">{campaignData.impressions.toLocaleString()} MM</div>
                <div className="text-sm text-gray-600">Impressions</div>
              </div>
              <div className="p-2">
                <div className="text-2xl">{campaignData.clicks.toLocaleString()} K</div>
                <div className="text-sm text-gray-600">Clicks</div>
              </div>
              <div className="p-2">
                <div className="text-2xl">{campaignData.ctr.toFixed(2)}%</div>
                <div className="text-sm text-gray-600">CTR</div>
              </div>
            </div>
          )}
        </div>
        <div className="md:col-span-2 bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-bold text-gray-700">Foot Traffic Measurement</h2>
          <div>
            {trafficData.map((data, index) => (
              <div key={index} className="p-2">
                <h3 className="text-lg text-gray-800">{data.month}</h3>
                <div className="flex justify-between items-center">
                  <div>{data.dailyVisitsInPerson.map((visit, idx) => <span key={idx} className="text-sm">{visit}</span>)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
