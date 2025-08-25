import React, { useState } from 'react';
import { 
  Search, 
  FolderOpen, 
  GitBranch, 
  Bug, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Target,
  TrendingDown,
  Shield,
  Activity,
  Calendar
} from 'lucide-react';

interface JiraIssue {
  id: string;
  title: string;
  status: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  assignee: string;
  daysInStatus: number;
  isBlocked: boolean;
  isStuckInReview: boolean;
  url: string;
}

interface JiraEpic {
  id: string;
  title: string;
  status: string;
  progress: number;
  isBlocked: boolean;
  isStuckInReview: boolean;
  daysInStatus: number;
  startDate: string;
  endDate: string;
  issues: JiraIssue[];
  url: string;
}

interface RelatedProject {
  id: string;
  name: string;
  status: 'on-track' | 'at-risk' | 'off-track';
  progress: number;
  lead: string;
  startDate: string;
  endDate: string;
  dependencyType: 'blocks' | 'blocked-by' | 'related';
  url: string;
}

interface ProjectData {
  id: string;
  name: string;
  status: 'on-track' | 'at-risk' | 'off-track';
  riskLevel: 'low' | 'medium' | 'high';
  relatedProjects: RelatedProject[];
  jiraEpics: JiraEpic[];
}

const ProjectDependencyHealthMonitor: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string>('mobile-app-v2');
  const [expandedEpics, setExpandedEpics] = useState<Set<string>>(new Set());

  const projectsData: ProjectData[] = [
    {
      id: 'mobile-app-v2',
      name: 'Mobile App v2.0 Redesign',
      status: 'at-risk',
      riskLevel: 'high',
      relatedProjects: [
        {
          id: 'design-system-v3',
          name: 'Design System v3.0',
          status: 'off-track',
          progress: 45,
          lead: 'Sarah Kim',
          startDate: '2024-12-01',
          endDate: '2025-02-15',
          dependencyType: 'blocks',
          url: '#'
        },
        {
          id: 'api-gateway',
          name: 'API Gateway Modernization',
          status: 'on-track',
          progress: 78,
          lead: 'Marcus Rodriguez',
          startDate: '2024-11-15',
          endDate: '2025-01-30',
          dependencyType: 'blocks',
          url: '#'
        },
        {
          id: 'user-auth-service',
          name: 'User Authentication Service',
          status: 'at-risk',
          progress: 62,
          lead: 'Emily Watson',
          startDate: '2024-12-10',
          endDate: '2025-02-01',
          dependencyType: 'blocks',
          url: '#'
        }
      ],
      jiraEpics: [
        {
          id: 'MOBILE-100',
          title: 'User Interface Redesign',
          status: 'In Progress',
          progress: 65,
          isBlocked: false,
          isStuckInReview: false,
          daysInStatus: 12,
          startDate: '2024-12-15',
          endDate: '2025-02-28',
          url: '#',
          issues: [
            {
              id: 'MOBILE-101',
              title: 'Implement new navigation component',
              status: 'In Review',
              priority: 'high',
              assignee: 'John Doe',
              daysInStatus: 9,
              isBlocked: false,
              isStuckInReview: true,
              url: '#'
            },
            {
              id: 'MOBILE-103',
              title: 'Responsive layout adjustments',
              status: 'Blocked',
              priority: 'high',
              assignee: 'Mike Johnson',
              daysInStatus: 14,
              isBlocked: true,
              isStuckInReview: false,
              url: '#'
            }
          ]
        },
        {
          id: 'MOBILE-200',
          title: 'Performance Optimization',
          status: 'Blocked',
          progress: 30,
          isBlocked: true,
          isStuckInReview: false,
          daysInStatus: 18,
          startDate: '2025-01-01',
          endDate: '2025-03-15',
          url: '#',
          issues: [
            {
              id: 'MOBILE-201',
              title: 'Optimize image loading',
              status: 'Blocked',
              priority: 'critical',
              assignee: 'Alex Wilson',
              daysInStatus: 18,
              isBlocked: true,
              isStuckInReview: false,
              url: '#'
            }
          ]
        }
      ]
    },
    {
      id: 'e-commerce-platform',
      name: 'E-commerce Platform Upgrade',
      status: 'on-track',
      riskLevel: 'medium',
      relatedProjects: [
        {
          id: 'payment-gateway',
          name: 'Payment Gateway Integration',
          status: 'on-track',
          progress: 90,
          lead: 'Tom Anderson',
          startDate: '2024-11-01',
          endDate: '2025-01-25',
          dependencyType: 'blocks',
          url: '#'
        }
      ],
      jiraEpics: [
        {
          id: 'ECOM-100',
          title: 'Checkout Flow Optimization',
          status: 'Done',
          progress: 100,
          isBlocked: false,
          isStuckInReview: false,
          daysInStatus: 1,
          startDate: '2024-10-01',
          endDate: '2024-12-15',
          url: '#',
          issues: []
        }
      ]
    },
    {
      id: 'data-analytics',
      name: 'Data Analytics Dashboard',
      status: 'on-track',
      riskLevel: 'low',
      relatedProjects: [
        {
          id: 'data-warehouse',
          name: 'Data Warehouse Setup',
          status: 'on-track',
          progress: 85,
          lead: 'Lisa Wang',
          startDate: '2024-10-15',
          endDate: '2025-01-20',
          dependencyType: 'blocks',
          url: '#'
        }
      ],
      jiraEpics: [
        {
          id: 'DATA-100',
          title: 'Dashboard Implementation',
          status: 'In Progress',
          progress: 75,
          isBlocked: false,
          isStuckInReview: false,
          daysInStatus: 5,
          startDate: '2024-11-01',
          endDate: '2025-02-01',
          url: '#',
          issues: []
        }
      ]
    }
  ];

  const availableProjects = [
    { id: 'mobile-app-v2', name: 'Mobile App v2.0 Redesign' },
    { id: 'e-commerce-platform', name: 'E-commerce Platform Upgrade' },
    { id: 'data-analytics', name: 'Data Analytics Dashboard' }
  ];

  const currentProject = projectsData.find(p => p.id === selectedProject);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'text-green-600';
      case 'at-risk': return 'text-orange-600';
      case 'off-track': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const toggleEpicExpansion = (epicId: string) => {
    const newExpanded = new Set(expandedEpics);
    if (newExpanded.has(epicId)) {
      newExpanded.delete(epicId);
    } else {
      newExpanded.add(epicId);
    }
    setExpandedEpics(newExpanded);
  };

  // Calculate health metrics
  const healthMetrics = currentProject ? {
    totalProjects: currentProject.relatedProjects.length,
    onTrackProjects: currentProject.relatedProjects.filter(p => p.status === 'on-track').length,
    problematicProjects: currentProject.relatedProjects.filter(p => p.status !== 'on-track').length,
    totalEpics: currentProject.jiraEpics.length,
    problematicEpics: currentProject.jiraEpics.filter(e => e.isBlocked || e.isStuckInReview).length,
    totalIssues: currentProject.jiraEpics.reduce((acc, epic) => acc + epic.issues.length, 0),
    problematicIssues: currentProject.jiraEpics.reduce((acc, epic) => 
      acc + epic.issues.filter(issue => issue.isBlocked || issue.isStuckInReview).length, 0
    )
  } : null;

  // Generate calendar timeline data
  const generateCalendarData = () => {
    if (!currentProject) return [];
    
    const items = [
      ...currentProject.relatedProjects.map(project => ({
        id: project.id,
        title: project.name,
        type: 'project' as const,
        status: project.status,
        startDate: project.startDate,
        endDate: project.endDate,
        progress: project.progress
      })),
      ...currentProject.jiraEpics.map(epic => ({
        id: epic.id,
        title: epic.title,
        type: 'epic' as const,
        status: epic.isBlocked || epic.isStuckInReview ? 'blocked' : 'active',
        startDate: epic.startDate,
        endDate: epic.endDate,
        progress: epic.progress
      }))
    ];

    return items.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  };

  const calendarItems = generateCalendarData();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Project Dependency Health Monitor</h3>
          <p className="text-sm text-gray-600">Track project dependencies and identify risks</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select 
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
          >
            {availableProjects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {currentProject && healthMetrics && (
        <>
          {/* Risk Assessment Banner */}
          <div className={`mb-6 p-4 rounded-lg border-2 ${getRiskColor(currentProject.riskLevel)}`}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold">{currentProject.name}</h4>
                <p className="text-sm mt-1">
                  Risk Level: <span className="font-medium uppercase">{currentProject.riskLevel}</span>
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm">
                  {healthMetrics.problematicProjects}/{healthMetrics.totalProjects} projects at risk
                </div>
                <div className="text-sm">
                  {healthMetrics.problematicEpics}/{healthMetrics.totalEpics} epics blocked
                </div>
              </div>
            </div>
          </div>

          {/* Simplified Dependencies List */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-gray-900 mb-4">Dependencies Summary</h4>
            
            {/* Related Projects */}
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Related Projects ({currentProject.relatedProjects.length})</h5>
              <div className="space-y-2">
                {currentProject.relatedProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FolderOpen className="h-4 w-4 text-blue-600" />
                      <div>
                        <span className="text-sm font-medium text-gray-900">{project.name}</span>
                        <div className="text-xs text-gray-600">Lead: {project.lead}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${getStatusColor(project.status)}`}>
                        {project.status.replace('-', ' ')}
                      </span>
                      <span className="text-sm text-gray-600">Due: {new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Jira Epics */}
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-2">Jira Epics ({currentProject.jiraEpics.length})</h5>
              <div className="space-y-2">
                {currentProject.jiraEpics.map((epic) => (
                  <div key={epic.id} className="border border-gray-200 rounded-lg">
                    <div 
                      className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleEpicExpansion(epic.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <GitBranch className="h-4 w-4 text-purple-600" />
                        <div>
                          <span className="text-sm font-medium text-gray-900">{epic.title}</span>
                          <div className="text-xs text-gray-600">{epic.id}</div>
                        </div>
                        {(epic.isBlocked || epic.isStuckInReview) && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            {epic.isBlocked ? 'Blocked' : 'Stuck in Review'}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{epic.progress}%</span>
                        {expandedEpics.has(epic.id) ? 
                          <ChevronDown className="h-4 w-4 text-gray-400" /> : 
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        }
                      </div>
                    </div>

                    {expandedEpics.has(epic.id) && epic.issues.length > 0 && (
                      <div className="border-t border-gray-200 bg-gray-50 p-3">
                        <div className="space-y-2">
                          {epic.issues.map((issue) => (
                            <div key={issue.id} className="flex items-center justify-between text-sm">
                              <div className="flex items-center space-x-2">
                                <Bug className="h-3 w-3 text-gray-500" />
                                <span className="text-gray-900">{issue.title}</span>
                                {(issue.isBlocked || issue.isStuckInReview) && (
                                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                    {issue.isBlocked ? 'Blocked' : 'Review'}
                                  </span>
                                )}
                              </div>
                              <span className="text-gray-600">{issue.assignee}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline Calendar View */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="h-5 w-5 text-gray-600" />
              <h4 className="text-md font-medium text-gray-900">Dependency Timeline Calendar</h4>
            </div>
            
            {/* Calendar Header */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-700">
                <div>Dec 2024</div>
                <div>Jan 2025</div>
                <div>Feb 2025</div>
                <div>Mar 2025</div>
                <div>Apr 2025</div>
                <div>May 2025</div>
                <div>Jun 2025</div>
              </div>
            </div>

            {/* Calendar Timeline */}
            <div className="space-y-4">
              {calendarItems.map((item) => {
                const startDate = new Date(item.startDate);
                const endDate = new Date(item.endDate);
                const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
                
                // Calculate position on calendar (simplified for demo)
                const startMonth = startDate.getMonth();
                const endMonth = endDate.getMonth();
                const startCol = Math.max(0, startMonth - 11); // Dec 2024 = 0
                const spanCols = Math.min(7, endMonth - startMonth + 1);
                
                const getRiskColor = (status: string, progress: number) => {
                  if (status === 'blocked' || status === 'off-track') return 'bg-red-500 border-red-600';
                  if (status === 'at-risk' || progress < 50) return 'bg-orange-500 border-orange-600';
                  return 'bg-green-500 border-green-600';
                };

                return (
                  <div key={item.id} className="relative">
                    <div className="flex items-center mb-2">
                      <div className="w-48 flex items-center space-x-2">
                        {item.type === 'project' ? 
                          <FolderOpen className="h-4 w-4 text-blue-600 flex-shrink-0" /> : 
                          <GitBranch className="h-4 w-4 text-purple-600 flex-shrink-0" />
                        }
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">{item.title}</div>
                          <div className="text-xs text-gray-600">
                            {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                        </div>
                      </div>
                      
                      {/* Calendar Timeline Bar */}
                      <div className="flex-1 relative">
                        <div className="grid grid-cols-7 gap-2 h-8">
                          <div 
                            className={`relative rounded border-2 ${getRiskColor(item.status, item.progress)} opacity-80 hover:opacity-100 transition-opacity`}
                            style={{
                              gridColumnStart: startCol + 1,
                              gridColumnEnd: Math.min(8, startCol + spanCols + 1)
                            }}
                          >
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs font-medium text-white">
                                {item.progress}%
                              </span>
                            </div>
                            
                            {/* Progress fill */}
                            <div 
                              className="absolute top-0 left-0 h-full bg-white bg-opacity-30 rounded"
                              style={{ width: `${item.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        {/* End date marker */}
                        <div 
                          className="absolute top-0 w-0.5 h-8 bg-gray-800"
                          style={{ left: `${((endMonth - 11) / 7) * 100}%` }}
                        >
                          <div className="absolute -top-1 -left-2 w-4 h-4 bg-gray-800 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Status indicator */}
                      <div className="w-20 text-right">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'blocked' || item.status === 'off-track' ? 'bg-red-100 text-red-800' :
                          item.status === 'at-risk' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {item.status === 'blocked' ? 'Blocked' :
                           item.status === 'off-track' ? 'Off Track' :
                           item.status === 'at-risk' ? 'At Risk' : 'On Track'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Calendar Legend */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Timeline Legend</h5>
                  <div className="flex items-center space-x-6 text-xs">
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-2 bg-green-500 rounded"></div>
                      <span>On Track</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-2 bg-orange-500 rounded"></div>
                      <span>At Risk</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-2 bg-red-500 rounded"></div>
                      <span>Off Track / Blocked</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                      <span>End Date</span>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-600">
                  Progress bars show completion percentage • End markers show projected finish dates
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectDependencyHealthMonitor;