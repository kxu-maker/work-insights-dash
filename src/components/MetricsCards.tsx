import React from 'react';
import { TrendingUp, AlertTriangle, CheckCircle, Clock, Target, Users } from 'lucide-react';

const MetricsCards: React.FC = () => {
  const metrics = [
    {
      title: 'Current Capacity Utilization',
      value: '87%',
      change: '+5%',
      changeType: 'increase',
      icon: Target,
      color: 'blue',
      description: 'vs last quarter'
    },
    {
      title: 'Teams at Risk',
      value: '3',
      change: '-1',
      changeType: 'decrease',
      icon: AlertTriangle,
      color: 'red',
      description: 'over capacity'
    },
    {
      title: 'Planning Accuracy',
      value: '92%',
      change: '+8%',
      changeType: 'increase',
      icon: CheckCircle,
      color: 'green',
      description: 'vs predicted'
    },
    {
      title: 'Upcoming Constraints',
      value: '14',
      change: '+6',
      changeType: 'increase',
      icon: Clock,
      color: 'orange',
      description: 'next 3 months'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-50 text-blue-600',
      red: 'bg-red-50 text-red-600',
      green: 'bg-green-50 text-green-600',
      orange: 'bg-orange-50 text-orange-600'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-50 text-gray-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg ${getColorClasses(metric.color)}`}>
              <metric.icon className="h-5 w-5" />
            </div>
            <div className={`text-sm font-medium ${
              metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
            }`}>
              {metric.change}
            </div>
          </div>
          <div className="mb-1">
            <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
            <div className="text-sm font-medium text-gray-900">{metric.title}</div>
          </div>
          <div className="text-sm text-gray-600">{metric.description}</div>
        </div>
      ))}
    </div>
  );
};

export default MetricsCards;