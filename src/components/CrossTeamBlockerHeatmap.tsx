import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Clock, 
  Users, 
  ArrowRight, 
  ExternalLink,
  Filter,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface BlockerIssue {
  id: string;
  title: string;
  blockedTeam: string;
  ownerTeam: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  daysSinceUpdate: number;
  status: string;
  assignee: string;
  url: string;
  impact: 'high' | 'medium' | 'low';
}

interface TeamBlockerData {
  team: string;
  blockedByTeams: {
    [key: string]: {
      count: number;
      staleCount: number;
      avgDaysStale: number;
      issues: BlockerIssue[];
    };
  };
}

const CrossTeamBlockerHeatmap: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState('engineering');
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [filterPriority, setFilterPriority] = useState('all');

  const blockerData: TeamBlockerData[] = [
    {
      team: 'engineering',
      blockedByTeams: {
        'design': {
          count: 8,
          staleCount: 5,
          avgDaysStale: 12,
          issues: [
            {
              id: 'PROJ-456',
              title: 'Mobile app wireframes for checkout flow',
              blockedTeam: 'engineering',
              ownerTeam: 'design',
              priority: 'high',
              daysSinceUpdate: 14,
              status: 'In Review',
              assignee: 'Sarah Kim',
              url: '#',
              impact: 'high'
            },
            {
              id: 'PROJ-789',
              title: 'Dashboard component specifications',
              blockedTeam: 'engineering',
              ownerTeam: 'design',
              priority: 'medium',
              daysSinceUpdate: 9,
              status: 'In Progress',
              assignee: 'Mike Chen',
              url: '#',
              impact: 'medium'
            },
            {
              id: 'PROJ-234',
              title: 'User onboarding flow design',
              blockedTeam: 'engineering',
              ownerTeam: 'design',
              priority: 'critical',
              daysSinceUpdate: 18,
              status: 'Blocked',
              assignee: 'Lisa Wang',
              url: '#',
              impact: 'high'
            }
          ]
        },
        'product': {
          count: 6,
          staleCount: 3,
          avgDaysStale: 8,
          issues: [
            {
              id: 'PROJ-567',
              title: 'Feature requirements for payment integration',
              blockedTeam: 'engineering',
              ownerTeam: 'product',
              priority: 'high',
              daysSinceUpdate: 11,
              status: 'Under Review',
              assignee: 'John Smith',
              url: '#',
              impact: 'high'
            },
            {
              id: 'PROJ-890',
              title: 'API endpoint specifications',
              blockedTeam: 'engineering',
              ownerTeam: 'product',
              priority: 'medium',
              daysSinceUpdate: 7,
              status: 'Draft',
              assignee: 'Emma Davis',
              url: '#',
              impact: 'medium'
            }
          ]
        },
        'qa': {
          count: 3,
          staleCount: 2,
          avgDaysStale: 15,
          issues: [
            {
              id: 'PROJ-345',
              title: 'Test environment setup requirements',
              blockedTeam: 'engineering',
              ownerTeam: 'qa',
              priority: 'medium',
              daysSinceUpdate: 16,
              status: 'Waiting',
              assignee: 'Alex Johnson',
              url: '#',
              impact: 'low'
            }
          ]
        },
        'security': {
          count: 2,
          staleCount: 1,
          avgDaysStale: 21,
          issues: [
            {
              id: 'PROJ-123',
              title: 'Security audit findings resolution',
              blockedTeam: 'engineering',
              ownerTeam: 'security',
              priority: 'critical',
              daysSinceUpdate: 21,
              status: 'Pending',
              assignee: 'David Wilson',
              url: '#',
              impact: 'high'
            }
          ]
        }
      }
    }
  ];

  const teams = ['engineering', 'design', 'product', 'qa', 'security'];
  const currentTeamData = blockerData.find(data => data.team === selectedTeam);

  const getHeatmapColor = (staleCount: number, totalCount: number) => {
    const ratio = staleCount / totalCount;
    if (ratio >= 0.7) return 'bg-red-500';
    if (ratio >= 0.5) return 'bg-orange-500';
    if (ratio >= 0.3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getHeatmapIntensity = (staleCount: number) => {
    if (staleCount >= 5) return 'opacity-100';
    if (staleCount >= 3) return 'opacity-75';
    if (staleCount >= 1) return 'opacity-50';
    return 'opacity-25';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const totalBlockers = currentTeamData ? 
    Object.values(currentTeamData.blockedByTeams).reduce((acc, team) => acc + team.count, 0) : 0;
  
  const totalStaleBlockers = currentTeamData ? 
    Object.values(currentTeamData.blockedByTeams).reduce((acc, team) => acc + team.staleCount, 0) : 0;

  const criticalBlockers = currentTeamData ? 
    Object.values(currentTeamData.blockedByTeams)
      .flatMap(team => team.issues)
      .filter(issue => issue.priority === 'critical' && issue.daysSinceUpdate > 7).length : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Cross-team Blocker Heat-map</h3>
          <p className="text-sm text-gray-600">Dependencies blocking your team from other teams (stale &gt; 7 days)</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {teams.map((team) => (
              <option key={team} value={team}>
                {team.charAt(0).toUpperCase() + team.slice(1)} Team
              </option>
            ))}
          </select>
          <select 
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-blue-900">{totalBlockers}</div>
              <div className="text-sm text-blue-700">Total Blockers</div>
            </div>
          </div>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-red-600" />
            <div>
              <div className="text-2xl font-bold text-red-900">{totalStaleBlockers}</div>
              <div className="text-sm text-red-700">Stale Blockers</div>
            </div>
          </div>
        </div>
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <div>
              <div className="text-2xl font-bold text-orange-900">{criticalBlockers}</div>
              <div className="text-sm text-orange-700">Critical Stale</div>
            </div>
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-green-900">
                {totalBlockers > 0 ? Math.round((totalStaleBlockers / totalBlockers) * 100) : 0}%
              </div>
              <div className="text-sm text-green-700">Stale Ratio</div>
            </div>
          </div>
        </div>
      </div>

      {/* Heat-map Grid */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">Blocker Dependencies by Team</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {currentTeamData && Object.entries(currentTeamData.blockedByTeams).map(([team, data]) => (
            <div 
              key={team}
              className="relative cursor-pointer transform hover:scale-105 transition-transform"
              onClick={() => setShowDetails(showDetails === team ? null : team)}
            >
              <div className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900 capitalize">{team}</span>
                  <div className={`w-4 h-4 rounded-full ${getHeatmapColor(data.staleCount, data.count)} ${getHeatmapIntensity(data.staleCount)}`}></div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-medium">{data.count}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Stale:</span>
                    <span className="font-medium text-red-600">{data.staleCount}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Avg Days:</span>
                    <span className="font-medium">{data.avgDaysStale}</span>
                  </div>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
                  <div 
                    className={`h-1 rounded-full ${getHeatmapColor(data.staleCount, data.count)}`}
                    style={{ width: `${(data.staleCount / data.count) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Issue List */}
      {showDetails && currentTeamData?.blockedByTeams[showDetails] && (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-md font-medium text-gray-900">
              Issues blocked by {showDetails.charAt(0).toUpperCase() + showDetails.slice(1)} Team
            </h4>
            <button 
              onClick={() => setShowDetails(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          <div className="space-y-3">
            {currentTeamData.blockedByTeams[showDetails].issues
              .filter(issue => filterPriority === 'all' || issue.priority === filterPriority)
              .filter(issue => issue.daysSinceUpdate > 7)
              .map((issue) => (
                <div key={issue.id} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-gray-900">{issue.id}</span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(issue.priority)}`}>
                          {issue.priority}
                        </span>
                        <span className={`text-xs font-medium ${getImpactColor(issue.impact)}`}>
                          {issue.impact} impact
                        </span>
                      </div>
                      <h5 className="text-sm font-medium text-gray-900 mb-2">{issue.title}</h5>
                      <div className="flex items-center space-x-4 text-xs text-gray-600">
                        <span>Assignee: {issue.assignee}</span>
                        <span>Status: {issue.status}</span>
                        <span className="flex items-center space-x-1 text-red-600">
                          <Clock className="h-3 w-3" />
                          <span>{issue.daysSinceUpdate} days stale</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-xs">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Heat-map Legend</h4>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Low Risk (&lt;30% stale)</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Medium Risk (30-50% stale)</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>High Risk (50-70% stale)</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Critical Risk (&gt;70% stale)</span>
              </div>
            </div>
          </div>
          <div className="bg-red-50 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-red-900">Action Required</div>
                <div className="text-xs text-red-800">
                  {criticalBlockers} critical blockers need immediate attention
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrossTeamBlockerHeatmap;