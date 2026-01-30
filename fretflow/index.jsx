import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// Mock D365 batch job data - in real implementation would come from API
const MOCK_JOBS = [
  { id: 'cust-sync', name: 'Customer Data Sync', expectedInterval: 2, lastRun: Date.now() - (8 * 60 * 60 * 1000), avgRunTime: 15 },
  { id: 'inv-update', name: 'Inventory Update', expectedInterval: 1, lastRun: Date.now() - (45 * 60 * 1000), avgRunTime: 8 },
  { id: 'report-gen', name: 'Daily Report Generation', expectedInterval: 24, lastRun: Date.now() - (2 * 60 * 1000), avgRunTime: 22 },
  { id: 'backup-proc', name: 'Database Backup Process', expectedInterval: 12, lastRun: Date.now() - (4 * 60 * 60 * 1000), avgRunTime: 45 },
  { id: 'email-queue', name: 'Email Queue Processor', expectedInterval: 0.5, lastRun: Date.now() - (35 * 60 * 1000), avgRunTime: 3 },
  { id: 'cleanup-temp', name: 'Temp File Cleanup', expectedInterval: 6, lastRun: Date.now() - (3 * 60 * 60 * 1000), avgRunTime: 5 }
];

function BatchPulse() {
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [showNotification, setShowNotification] = useState(false);
  const [timeSaved, setTimeSaved] = useState(47);
  const [selectedJob, setSelectedJob] = useState(null);
  const [pulseAnimation, setPulseAnimation] = useState({});

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setJobs(prev => prev.map(job => ({
        ...job,
        // Randomly update some jobs to simulate real monitoring
        lastRun: Math.random() > 0.8 ? Date.now() : job.lastRun
      })));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Show morning notification on first load
  useEffect(() => {
    const hasShownToday = localStorage.getItem('batchpulse-shown-' + new Date().toDateString());
    if (!hasShownToday) {
      setTimeout(() => {
        setShowNotification(true);
        localStorage.setItem('batchpulse-shown-' + new Date().toDateString(), 'true');
      }, 1000);
    }
  }, []);

  const getJobStatus = (job) => {
    const hoursSinceRun = (Date.now() - job.lastRun) / (1000 * 60 * 60);
    const expectedHours = job.expectedInterval;
    
    if (hoursSinceRun > expectedHours * 2) return 'critical';
    if (hoursSinceRun > expectedHours * 1.2) return 'warning';
    return 'healthy';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      case 'healthy': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'critical': return '🔴';
      case 'warning': return '🟡';
      case 'healthy': return '🟢';
      default: return '⚪';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const minutes = Math.floor((Date.now() - timestamp) / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'just now';
  };

  const criticalJobs = jobs.filter(job => getJobStatus(job) === 'critical');
  const warningJobs = jobs.filter(job => getJobStatus(job) === 'warning');
  const healthyJobs = jobs.filter(job => getJobStatus(job) === 'healthy');

  const handleJobClick = (job) => {
    setSelectedJob(job);
    // Trigger pulse animation
    setPulseAnimation(prev => ({ ...prev, [job.id]: true }));
    setTimeout(() => {
      setPulseAnimation(prev => ({ ...prev, [job.id]: false }));
    }, 600);
  };

  const openD365Admin = (job) => {
    // In real implementation, this would open the actual D365 admin portal
    window.open(`https://admin.businesscentral.dynamics.com/jobs/${job.id}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-mono">
      {/* Header */}
      <div className="bg-black border-b border-gray-700 p-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-green-400">BatchPulse</h1>
            <p className="text-xs text-gray-400">D365 batch jobs. Dead simple monitoring.</p>
          </div>
          <div className="text-right text-xs">
            <div className="text-green-400">{healthyJobs.length} healthy</div>
            <div className="text-yellow-400">{warningJobs.length} warning</div>
            <div className="text-red-400">{criticalJobs.length} critical</div>
          </div>
        </div>
      </div>

      {/* Morning Notification */}
      {showNotification && (
        <div className="bg-green-800 border-b border-green-600 p-3 animate-pulse">
          <div className="max-w-md mx-auto flex items-center justify-between">
            <div className="text-sm">
              <span className="text-green-300">✅ All systems green</span>
              <div className="text-xs text-green-400 mt-1">
                (fixed Customer Data Sync saved {timeSaved} minutes yesterday)
              </div>
            </div>
            <button 
              onClick={() => setShowNotification(false)}
              className="text-green-300 hover:text-white text-xl"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Job List */}
      <div className="max-w-md mx-auto p-4 space-y-3">
        {jobs.map(job => {
          const status = getJobStatus(job);
          const isSelected = selectedJob?.id === job.id;
          
          return (
            <div key={job.id} className="relative">
              {/* Heartbeat line animation */}
              <div className={`absolute -top-1 left-0 right-0 h-0.5 overflow-hidden ${
                status === 'healthy' ? 'bg-green-900' : 
                status === 'warning' ? 'bg-yellow-900' : 'bg-red-900'
              }`}>
                <div className={`h-full w-full transform transition-transform duration-1000 ${
                  pulseAnimation[job.id] ? 'translate-x-0' : '-translate-x-full'
                } ${
                  status === 'healthy' ? 'bg-green-400' : 
                  status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                }`} />
              </div>
              
              {/* Job Card */}
              <div 
                onClick={() => handleJobClick(job)}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                  isSelected ? 'ring-2 ring-blue-500 border-blue-500' :
                  status === 'healthy' ? 'bg-gray-800 border-green-500/30 hover:border-green-500' :
                  status === 'warning' ? 'bg-gray-800 border-yellow-500/30 hover:border-yellow-500' :
                  'bg-gray-800 border-red-500/30 hover:border-red-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {/* Status Indicator */}
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(status)} ${
                      status === 'healthy' ? 'animate-pulse' : ''
                    }`} />
                    
                    <div>
                      <div className="font-medium text-sm">{job.name}</div>
                      <div className={`text-xs ${
                        status === 'critical' ? 'text-red-400' :
                        status === 'warning' ? 'text-yellow-400' :
                        'text-green-400'
                      }`}>
                        {formatTimeAgo(job.lastRun)}
                        {status === 'critical' && ' ⚠️'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right text-xs text-gray-400">
                    <div>every {job.expectedInterval}h</div>
                    <div>~{job.avgRunTime}m runtime</div>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {isSelected && (
                <div className="mt-2 p-3 bg-gray-800 rounded-lg border border-gray-600 animate-fade-in">
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Expected interval:</span>
                      <span>Every {job.expectedInterval} hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last successful:</span>
                      <span>{new Date(job.lastRun).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Avg runtime:</span>
                      <span>{job.avgRunTime} minutes</span>
                    </div>
                    
                    <button
                      onClick={() => openD365Admin(job)}
                      className="w-full mt-3 py-2 px-3 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors"
                    >
                      Check D365 Job Details →
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Stats */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-700 p-3">
        <div className="max-w-md mx-auto text-center text-xs text-gray-400">
          <div>Last updated: {new Date().toLocaleTimeString()}</div>
          <div className="mt-1">Monitoring {jobs.length} batch jobs</div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

// Mount the app
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<BatchPulse />);

// HTML template
const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BatchPulse - D365 Batch Job Monitor</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { margin: 0; font-family: 'SF Mono', Consolas, monospace; }
        .font-mono { font-family: 'SF Mono', Consolas, 'Liberation Mono', Menlo, Courier, monospace; }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        // Component code goes here (same as above)
    </script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</body>
</html>`;

export default BatchPulse;