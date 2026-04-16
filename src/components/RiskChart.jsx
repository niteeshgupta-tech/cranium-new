import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './RiskChart.css';

const data = [
  { name: 'Jan', risk: 20 },
  { name: 'Feb', risk: 30 },
  { name: 'Mar', risk: 25 },
  { name: 'Apr', risk: 40 },
];

function RiskChart() {
  return (
    <div className="chart-box">
      <h2>Risk Over Time</h2>
      <LineChart width={400} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="risk" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}

export default RiskChart;