import React, { useState } from 'react';
import { 
  User, 
  GitPullRequest, 
  Bug, 
  Lightbulb, 
  FolderOpen, 
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  TrendingUp,
  Filter
} from 'lucide-react';

interface WorkloadItem {
  id: string;
  title: string;
  type: 'jira' | 'jsm' | 'project' | 'jpd' | 'github';
  priority: 'high' | 'medium' | 'low';
  status: string;
  estimatedHours?: number;
  dueDate?: string;
  url?: string;
}

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
  team: string;
  totalWorkload: number;
  capacity: number;
  utilization: number;
  workItems: WorkloadItem[];
}

const TeamWorkloadAggregator: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState('engineering');
  const [expandedMembers, setExpandedMembers] = useState<Set<string>>(new Set());
  const [filterType, setFilterType] = useState('all');

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      role: 'Senior Frontend Developer',
      team: 'engineering',
      totalWorkload: 42,
      capacity: 40,
      utilization: 105,
      workItems: [
        {
          id: 'PROJ-123',
          title: 'Implement user authentication flow',
          type: 'jira',
          priority: 'high',
          status: 'In Progress',
          estimatedHours: 16,
          dueDate: '2025-01-15',
          url: '#'
        },
        {
          id: 'PR-456',
          title: 'Fix responsive layout issues',
          type: 'github',
          priority: 'medium',
          status: 'Review Required',
          estimatedHours: 4,
          url: '#'
        },
        {
          id: 'INC-789',
          title: 'Login page not loading for Safari users',
          type: 'jsm',
          priority: 'high',
          status: 'Investigating',
          estimatedHours: 8,
          dueDate: '2025-01-12',
          url: '#'
        },
        {
          id: 'IDEA-101',
          title: 'Dark mode implementation',
          type: 'jpd',
          priority: 'low',
          status: 'Research',
          estimatedHours: 12,
          url: '#'
        },
        {
          id: 'PROJ-MOBILE',
          title: 'Mobile App Redesign',
          type: 'project',
          priority: 'medium',
          status: 'Planning',
          estimatedHours: 2,
          url: '#'
        }
      ]
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      role: 'Backend Developer',
      team: 'engineering',
      totalWorkload: 35,
      capacity: 40,
      utilization: 88,
      workItems: [
        {
          id: 'PROJ-234',
          title: 'API rate limiting implementation',
          type: 'jira',
          priority: 'high',
          status: 'Code Review',
          estimatedHours: 12,
          dueDate: '2025-01-18',
          url: '#'
        },
        {
          id: 'PR-567',
          title: 'Database optimization queries',
          type: 'github',
          priority: 'medium',
          status: 'Draft',
          estimatedHours: 6,
          url: '#'
        },
        {
          id: 'INC-890',
          title: 'API timeout errors in production',
          type: 'jsm',
          priority: 'high',
          status: 'Resolved',
          estimatedHours: 4,
          url: '#'
        },
        {
          id: 'PROJ-API',
          title: 'API Documentation Update',
          type: 'project',
          priority: 'low',
          status: 'In Progress',
          estimatedHours: 8,
          url: '#'
        },
        {
          id: 'IDEA-202',
          title: 'GraphQL migration strategy',
          type: 'jpd',
          priority: 'medium',
          status: 'Evaluation',
          estimatedHours: 5,
          url: '#'
        }
      ]
    },
    {
      id: '3',
      name: 'Emily Watson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      role: 'DevOps Engineer',
      team: 'engineering',
      totalWorkload: 48,
      capacity: 40,
      utilization: 120,
      workItems: [
        {
          id: 'PROJ-345',
          title: 'CI/CD pipeline optimization',
          type: 'jira',
          priority: 'medium',
          status: 'Testing',
          estimatedHours: 20,
          dueDate: '2025-01-20',
          url: '#'
        },
        {
          id: 'PR-678',
          title: 'Docker container security updates',
          type: 'github',
          priority: 'high',
          status: 'Ready to Merge',
          estimatedHours: 8,
          url: '#'
        },
        {
          id: 'INC-901',
          title: 'Production deployment failures',
          type: 'jsm',
          priority: 'high',
          status: 'In Progress',
          estimatedHours: 12,
          dueDate: '2025-01-14',
          url: '#'
        },
        {
          id: 'PROJ-INFRA',
          title: 'Infrastructure Modernization',
          type: 'project',
          priority: 'high',
          status: 'Execution',
          estimatedHours: 6,
          url: '#'
        },
        {
          id: 'IDEA-303',
          title: 'Kubernetes migration plan',
          type: 'jpd',
          priority: 'medium',
          status: 'Planning',
          estimatedHours: 2,
          url: '#'
        }
      ]
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'jira': return Bug;
      case 'jsm': return AlertCircle;
      case 'project': return FolderOpen;
      case 'jpd': return Lightbulb;
      case 'github': return GitPullRequest;
      default: return Bug;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'jira': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'jsm': return 'bg-red-50 text-red-600 border-red-200';
      case 'project': return 'bg-purple-50 text-purple-600 border-purple-200';
      case 'jpd': return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'github': return 'bg-gray-50 text-gray-600 border-gray-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization > 100) return 'text-red-600 bg-red-50';
    if (utilization > 90) return 'text-orange-600 bg-orange-50';
    return 'text-green-600 bg-green-50';
  };

  const toggleMemberExpansion = (memberId: string) => {
    const newExpanded = new Set(expandedMembers);
    if (newExpanded.has(memberId)) {
      newExpanded.delete(memberId);
    } else {
      newExpanded.add(memberId);
    }
    setExpandedMembers(newExpanded);
  };

  const filteredMembers = teamMembers.filter(member => member.team === selectedTeam);

  const workloadSummary = {
    totalMembers: filteredMembers.length,
    overCapacity: filteredMembers.filter(m => m.utilization > 100).length,
    avgUtilization: Math.round(filteredMembers.reduce((acc, m) => acc + m.utilization, 0) / filteredMembers.length),
    totalWorkItems: filteredMembers.reduce((acc, m) => acc + m.workItems.length, 0)
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Team Workload Aggregator</h3>
          <p className="text-sm text-gray-600">Individual workload across all Atlassian tools and GitHub</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="engineering">Engineering</option>
            <option value="design">Design</option>
            <option value="product">Product</option>
            <option value="qa">QA</option>
          </select>
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Items</option>
            <option value="jira">Jira Issues</option>
            <option value="jsm">JSM Incidents</option>
            <option value="project">Projects</option>
            <option value="jpd">JPD Ideas</option>
            <option value="github">GitHub PRs</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-blue-900">{workloadSummary.totalMembers}</div>
              <div className="text-sm text-blue-700">Team Members</div>
            </div>
          </div>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <div>
              <div className="text-2xl font-bold text-red-900">{workloadSummary.overCapacity}</div>
              <div className="text-sm text-red-700">Over Capacity</div>
            </div>
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-green-900">{workloadSummary.avgUtilization}%</div>
              <div className="text-sm text-green-700">Avg Utilization</div>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-purple-600" />
            <div>
              <div className="text-2xl font-bold text-purple-900">{workloadSummary.totalWorkItems}</div>
              <div className="text-sm text-purple-700">Active Items</div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members List */}
      <div className="space-y-4">
        {filteredMembers.map((member) => (
          <div key={member.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <div 
              className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleMemberExpansion(member.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img 
                    src={member.avatar} 
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${getUtilizationColor(member.utilization)}`}>
                      {member.utilization}% utilized
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {member.totalWorkload}h / {member.capacity}h capacity
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      {member.workItems.length} items
                    </span>
                    {expandedMembers.has(member.id) ? 
                      <ChevronDown className="h-5 w-5 text-gray-400" /> : 
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    }
                  </div>
                </div>
              </div>
            </div>

            {expandedMembers.has(member.id) && (
              <div className="border-t border-gray-200 bg-gray-50 p-4">
                <div className="space-y-3">
                  {member.workItems
                    .filter(item => filterType === 'all' || item.type === filterType)
                    .map((item) => {
                      const TypeIcon = getTypeIcon(item.type);
                      return (
                        <div key={item.id} className="bg-white rounded-lg p-3 border border-gray-200">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3 flex-1">
                              <div className={`p-1.5 rounded border ${getTypeColor(item.type)}`}>
                                <TypeIcon className="h-4 w-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h5 className="text-sm font-medium text-gray-900 truncate">
                                    {item.title}
                                  </h5>
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                                    {item.priority}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-4 text-xs text-gray-600">
                                  <span>{item.id}</span>
                                  <span>Status: {item.status}</span>
                                  {item.estimatedHours && (
                                    <span>{item.estimatedHours}h estimated</span>
                                  )}
                                  {item.dueDate && (
                                    <span className="text-orange-600">Due: {item.dueDate}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-900">Workload Optimization Recommendations</h4>
              <ul className="text-sm text-blue-800 mt-1 space-y-1">
                <li>• Emily Watson is 20% over capacity - consider redistributing 2 work items</li>
                <li>• Sarah Chen has 3 high-priority items - may need support or deadline adjustment</li>
                <li>• Marcus Rodriguez has available capacity for additional work</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamWorkloadAggregator;