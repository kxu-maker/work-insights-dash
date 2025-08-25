import React from 'react';
import { TrendingUp } from 'lucide-react';

interface CapacityChartProps {
  timeRange: string;
}

const CapacityChart: React.FC<CapacityChartProps> = ({ timeRange }) => {
  const data = [
    { period: 'Q1 2024', capacity: 120, workload: 95, utilization: 79 },
    { period: 'Q2 2024', capacity: 125, workload: 110, utilization: 88 },
    { period: 'Q3 2024', capacity: 130, workload: 115, utilization: 88 },
    { period: 'Q4 2024', capacity: 128, workload: 122, utilization: 95 },
    { period: 'Q1 2025', capacity: 135, workload: 125, utilization: 93 },
    { period: 'Q2 2025', capacity: 140, workload: 135, utilization: 96 }
  ];

  const maxValue = Math.max(...data.map(d => Math.max(d.capacity, d.workload)));

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Capacity vs Workload Analysis</h3>
          <p className="text-sm text-gray-600">Team capacity and workload distribution over time</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Capacity</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Workload</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900">{item.period}</span>
              <span className="text-sm text-gray-600">{item.utilization}% utilization</span>
            </div>
            <div className="relative">
              <div className="flex space-x-1">
                <div className="relative flex-1 h-8 bg-gray-100 rounded">
                  <div 
                    className="absolute top-0 left-0 h-full bg-blue-500 rounded transition-all duration-300"
                    style={{ width: `${(item.capacity / maxValue) * 100}%` }}
                  ></div>
                  <div 
                    className="absolute top-0 left-0 h-full bg-red-500 rounded transition-all duration-300"
                    style={{ width: `${(item.workload / maxValue) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Capacity: {item.capacity}h</span>
                <span>Workload: {item.workload}h</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <strong>Trend:</strong> Capacity utilization increasing by 3% quarterly
          </div>
          <div className="flex items-center space-x-1 text-sm text-orange-600">
            <TrendingUp className="h-4 w-4" />
            <span>Action needed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapacityChart;