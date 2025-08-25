import React, { useState } from 'react';
import Header from './components/Header';
import TeamWorkloadAggregator from './components/TeamWorkloadAggregator';
import CrossTeamBlockerHeatmap from './components/CrossTeamBlockerHeatmap';
import ProjectDependencyHealthMonitor from './components/ProjectDependencyHealthMonitor';

function App() {
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [timeRange, setTimeRange] = useState('quarterly');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        selectedTeam={selectedTeam} 
        setSelectedTeam={setSelectedTeam}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Resource Planning Dashboard
          </h1>
          <p className="text-gray-600">
            Optimize team capacity and workload distribution with data-driven insights
          </p>
        </div>

        <div className="mb-6">
          <CrossTeamBlockerHeatmap />
        </div>

        <div className="mb-6">
          <TeamWorkloadAggregator />
        </div>

        <div className="mb-6">
          <ProjectDependencyHealthMonitor />
        </div>
      </main>
    </div>
  );
}

export default App;