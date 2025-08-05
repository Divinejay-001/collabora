import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell
} from 'recharts';

const getBarColor = (priority) => {
  switch (priority) {
    case 'Low':
      return '#020C7D';
    case 'Medium':
      return '#FE9900';
    case 'High':
      return '#FF1F57';
    default:
      return '#00BC7D';
  }
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { priority, count } = payload[0].payload;
    return (
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-2 border border-gray-300 dark:border-gray-700">
        <p className="text-xs font-semibold text-purple-800 dark:text-purple-300 mb-1">
          {priority}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Count:{' '}
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {count}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomBarChart = ({ data }) => {
  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-gray-200 mt-6 p-4 rounded-xl shadow-sm">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
          <XAxis
            dataKey="priority"
            tick={{ fontSize: 12, fill: '#555' }}
            stroke="none"
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#555' }}
            stroke="none"
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
          <Bar
            dataKey="count"
            radius={[10, 10, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(entry.priority)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
