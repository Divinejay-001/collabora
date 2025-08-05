import React from 'react';

const CustomToolTip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div className="rounded-lg border border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700 shadow-lg p-3">
        <p className="text-xs font-semibold text-purple-700 dark:text-purple-400 mb-1">
          {label || item.name}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-200">
          Count: <span className="font-medium text-gray-900 dark:text-white">{item.value}</span>
        </p>
      </div>
    );
  }

  return null;
};

export default CustomToolTip;
