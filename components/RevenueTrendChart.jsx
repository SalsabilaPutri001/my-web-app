'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function RevenueTrendChart({ data }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Trend Revenue (30 Hari)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="rental_date" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value?.toFixed(2) || 0}`} />
          <Legend />
          <Line type="monotone" dataKey="daily_revenue" stroke="#82ca9d" name="Daily Revenue" />
          <Line type="monotone" dataKey="rental_count" stroke="#ffc658" name="Rental Count" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
