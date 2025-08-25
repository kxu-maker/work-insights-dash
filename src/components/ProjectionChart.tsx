import React from 'react';
import { TrendingUp, AlertTriangle } from 'lucide-react';

const ProjectionChart: React.FC = () => {
  const projections = [
    {
      month: 'Jan 2025',
      demand: 145,
      capacity: 135,
      gap: 10,
      severity: 'high'
    },
    {
      month: 'Feb 2025',
      demand: 150,
      capacity: 140,
      gap: 10,
      severity: 'high'
    },
    {
      month: 'Mar 2025',
      demand: 142,
      capacity: 145,
      gap: -3,
      severity: 'low'
    },
    {
      month: 'Apr 2025',
      demand: 155,
      capacity: 150,
      gap: 5,
      severity: 'medium'
    },
    {
      month: 'May 2025',
      demand: 160,
      capacity: 155,
      gap: 5,
      severity: 'medium'
    },
    {
      month: 'Jun 2025',
      demand: 165,
      capacity: 160,
      gap: 5,
      severity: 'medium'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const maxValue = Math.max(...projections.map(p => Math.max(p.demand, p.capacity)));

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Capacity Projections</h3>
          <p className="text-sm text-gray-600">Projected capacity constraints for next 6 months</p>
        </div>
        <div className="flex items-center space-x-1 text-sm text-orange-600">
          <AlertTriangle className="h-4 w-4" />
          <span>3 high-risk periods</span>
        </div>
      </div>

      <div className="space-y-4">
        {projections.map((projection, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900">{projection.month}</span>
              <span className={`text-sm font-medium ${getSeverityColor(projection.severity)}`}>
                {projection.gap > 0 ? '+' : ''}{projection.gap}h gap
              </span>
            </div>
            <div className="relative">
              <div className="flex space-x-1">
                <div className="relative flex-1 h-6 bg-gray-100 rounded">
                  <div 
                    className="absolute top-0 left-0 h-full bg-blue-500 rounded transition-all duration-300"
                    style={{ width: `${(projection.capacity / maxValue) * 100}%` }}
                  ></div>
                  <div 
                    className="absolute top-0 left-0 h-full bg-red-500 opacity-75 rounded transition-all duration-300"
                    style={{ width: `${(projection.demand / maxValue) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Capacity: {projection.capacity}h</span>
                <span>Demand: {projection.demand}h</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-orange-900">Recommendations</h4>
              <ul className="text-sm text-orange-800 mt-1 space-y-1">
                <li>• Consider hiring 2-3 additional engineers for Q1 2025</li>
                <li>• Explore contractor options for peak periods</li>
                <li>• Reassess project priorities to reduce demand</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectionChart;