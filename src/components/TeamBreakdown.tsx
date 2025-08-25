import React from 'react';
import { Users, AlertTriangle, CheckCircle } from 'lucide-react';

interface TeamBreakdownProps {
  selectedTeam: string;
}

const TeamBreakdown: React.FC<TeamBreakdownProps> = ({ selectedTeam }) => {
  const teams = [
    {
      name: 'Engineering',
      members: 24,
      capacity: 960,
      workload: 890,
      utilization: 93,
      status: 'healthy',
      projects: ['Mobile App v2.0', 'API Refactoring', 'Performance Optimization']
    },
    {
      name: 'Design',
      members: 8,
      capacity: 320,
      workload: 340,
      utilization: 106,
      status: 'over-capacity',
      projects: ['Design System v3', 'Mobile UX Research', 'Brand Guidelines']
    },
    {
      name: 'Product',
      members: 12,
      capacity: 480,
      workload: 425,
      utilization: 89,
      status: 'healthy',
      projects: ['Roadmap Planning', 'User Analytics', 'Feature Prioritization']
    },
    {
      name: 'QA',
      members: 6,
      capacity: 240,
      workload: 280,
      utilization: 117,
      status: 'over-capacity',
      projects: ['Automated Testing', 'Performance Testing', 'Security Audit']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-50';
      case 'over-capacity': return 'text-red-600 bg-red-50';
      case 'under-capacity': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return CheckCircle;
      case 'over-capacity': return AlertTriangle;
      default: return Users;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Team Breakdown</h3>
          <p className="text-sm text-gray-600">Current capacity status by team</p>
        </div>
      </div>

      <div className="space-y-4">
        {teams.map((team, index) => {
          const StatusIcon = getStatusIcon(team.status);
          return (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getStatusColor(team.status)}`}>
                    <StatusIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{team.name}</h4>
                    <p className="text-sm text-gray-600">{team.members} members</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-semibold ${
                    team.utilization > 100 ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {team.utilization}%
                  </div>
                  <div className="text-sm text-gray-600">utilization</div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Capacity: {team.capacity}h</span>
                  <span>Workload: {team.workload}h</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      team.utilization > 100 ? 'bg-red-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.min(team.utilization, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-900 mb-1">Active Projects:</div>
                <div className="flex flex-wrap gap-1">
                  {team.projects.map((project, idx) => (
                    <span key={idx} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      {project}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamBreakdown;