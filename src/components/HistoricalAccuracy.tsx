import React from 'react';
import { Target, TrendingUp, CheckCircle } from 'lucide-react';

const HistoricalAccuracy: React.FC = () => {
  const accuracyData = [
    {
      quarter: 'Q1 2024',
      predicted: 85,
      actual: 79,
      accuracy: 93,
      variance: -6
    },
    {
      quarter: 'Q2 2024',
      predicted: 90,
      actual: 88,
      accuracy: 98,
      variance: -2
    },
    {
      quarter: 'Q3 2024',
      predicted: 92,
      actual: 88,
      accuracy: 96,
      variance: -4
    },
    {
      quarter: 'Q4 2024',
      predicted: 95,
      actual: 95,
      accuracy: 100,
      variance: 0
    }
  ];

  const avgAccuracy = accuracyData.reduce((acc, d) => acc + d.accuracy, 0) / accuracyData.length;
  const trend = accuracyData[accuracyData.length - 1].accuracy > accuracyData[0].accuracy;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Historical Planning Accuracy</h3>
          <p className="text-sm text-gray-600">Accuracy of capacity predictions vs actual utilization</p>
        </div>
        <div className="flex items-center space-x-1 text-sm text-green-600">
          <TrendingUp className="h-4 w-4" />
          <span>Improving</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-900">Average Accuracy</span>
          <span className="text-2xl font-bold text-green-600">{avgAccuracy.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="h-2 bg-green-500 rounded-full transition-all duration-300"
            style={{ width: `${avgAccuracy}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-4">
        {accuracyData.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">{item.quarter}</span>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-green-600">{item.accuracy}%</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-600">Predicted</div>
                <div className="font-medium">{item.predicted}% utilization</div>
              </div>
              <div>
                <div className="text-gray-600">Actual</div>
                <div className="font-medium">{item.actual}% utilization</div>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Variance</span>
                <span className={`text-xs font-medium ${
                  item.variance >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.variance >= 0 ? '+' : ''}{item.variance}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Target className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-green-900">Key Insights</h4>
              <ul className="text-sm text-green-800 mt-1 space-y-1">
                <li>• Planning accuracy improved by 7% over the year</li>
                <li>• Q4 achieved perfect prediction accuracy</li>
                <li>• Consistent under-prediction trend identified</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalAccuracy;