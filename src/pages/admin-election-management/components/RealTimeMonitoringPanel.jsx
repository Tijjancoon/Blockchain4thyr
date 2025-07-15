import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RealTimeMonitoringPanel = () => {
  const [systemHealth, setSystemHealth] = useState({
    blockchain: 99.8,
    api: 100,
    database: 99.9,
    network: 98.5
  });

  const [liveStats, setLiveStats] = useState({
    activeVoters: 234,
    votesPerMinute: 12,
    pendingTransactions: 3,
    avgResponseTime: 1.2
  });

  const [alerts, setAlerts] = useState([
    {
      id: 'alert-001',
      type: 'warning',
      title: 'High Transaction Volume',
      message: 'Ethereum network experiencing higher than normal gas fees',
      timestamp: new Date(Date.now() - 300000),
      action: 'Monitor'
    },
    {
      id: 'alert-002',
      type: 'info',
      title: 'Election Milestone',
      message: 'Q3 2024 Board Election reached 50% participation',
      timestamp: new Date(Date.now() - 900000),
      action: 'View'
    },
    {
      id: 'alert-003',
      type: 'success',
      title: 'System Update',
      message: 'Smart contract successfully deployed for Executive Compensation vote',
      timestamp: new Date(Date.now() - 1800000),
      action: 'Verify'
    }
  ]);

  const [voteSubmissionData, setVoteSubmissionData] = useState([
    { time: '10:00', votes: 45 },
    { time: '10:30', votes: 67 },
    { time: '11:00', votes: 89 },
    { time: '11:30', votes: 123 },
    { time: '12:00', votes: 156 },
    { time: '12:30', votes: 178 },
    { time: '13:00', votes: 201 },
    { time: '13:30', votes: 234 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setLiveStats(prev => ({
        ...prev,
        activeVoters: prev.activeVoters + Math.floor(Math.random() * 5) - 2,
        votesPerMinute: Math.max(0, prev.votesPerMinute + Math.floor(Math.random() * 6) - 3),
        pendingTransactions: Math.max(0, prev.pendingTransactions + Math.floor(Math.random() * 3) - 1),
        avgResponseTime: Math.max(0.1, prev.avgResponseTime + (Math.random() * 0.4) - 0.2)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getHealthColor = (percentage) => {
    if (percentage >= 99) return 'text-success';
    if (percentage >= 95) return 'text-warning';
    return 'text-error';
  };

  const getHealthIcon = (percentage) => {
    if (percentage >= 99) return 'CheckCircle';
    if (percentage >= 95) return 'AlertTriangle';
    return 'XCircle';
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error':
        return 'XCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'success':
        return 'CheckCircle';
      default:
        return 'Info';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'error':
        return 'text-error bg-error/10 border-error/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'success':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-primary bg-primary/10 border-primary/20';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const diff = Date.now() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  const handleEmergencyAction = (action) => {
    console.log(`Emergency action triggered: ${action}`);
  };

  const handleAlertAction = (alert, action) => {
    console.log(`Alert action: ${action} for alert:`, alert.id);
  };

  return (
    <div className="space-y-6">
      {/* System Health Overview */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">System Health</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm text-success font-medium">All Systems Operational</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(systemHealth).map(([system, health]) => (
            <div key={system} className="flex items-center justify-between p-3 bg-muted rounded-md">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getHealthIcon(health)} 
                  size={16} 
                  className={getHealthColor(health)} 
                />
                <span className="text-sm font-medium text-foreground capitalize">
                  {system === 'api' ? 'API' : system}
                </span>
              </div>
              <span className={`text-sm font-bold ${getHealthColor(health)}`}>
                {health}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Statistics */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Live Statistics</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-primary/10 rounded-md">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Icon name="Users" size={20} className="text-primary" />
              <span className="text-2xl font-bold text-primary">{liveStats.activeVoters}</span>
            </div>
            <p className="text-sm text-muted-foreground">Active Voters</p>
          </div>

          <div className="text-center p-4 bg-accent/10 rounded-md">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={20} className="text-accent" />
              <span className="text-2xl font-bold text-accent">{liveStats.votesPerMinute}</span>
            </div>
            <p className="text-sm text-muted-foreground">Votes/Minute</p>
          </div>

          <div className="text-center p-4 bg-warning/10 rounded-md">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Icon name="Clock" size={20} className="text-warning" />
              <span className="text-2xl font-bold text-warning">{liveStats.pendingTransactions}</span>
            </div>
            <p className="text-sm text-muted-foreground">Pending TX</p>
          </div>

          <div className="text-center p-4 bg-success/10 rounded-md">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Icon name="Zap" size={20} className="text-success" />
              <span className="text-2xl font-bold text-success">{liveStats.avgResponseTime.toFixed(1)}s</span>
            </div>
            <p className="text-sm text-muted-foreground">Avg Response</p>
          </div>
        </div>
      </div>

      {/* Vote Submission Chart */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Vote Submission Rate</h3>
        
        <div className="h-32 flex items-end justify-between space-x-1">
          {voteSubmissionData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-primary rounded-t transition-all duration-300"
                style={{ height: `${(data.votes / 250) * 100}%` }}
                title={`${data.time}: ${data.votes} votes`}
              />
              <span className="text-xs text-muted-foreground mt-2">{data.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Controls */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Emergency Controls</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            variant="destructive"
            onClick={() => handleEmergencyAction('suspend-all')}
            iconName="Pause"
            iconPosition="left"
            className="justify-start"
          >
            Suspend All Elections
          </Button>
          
          <Button
            variant="warning"
            onClick={() => handleEmergencyAction('extend-deadline')}
            iconName="Clock"
            iconPosition="left"
            className="justify-start"
          >
            Extend Voting Deadline
          </Button>
          
          <Button
            variant="outline"
            onClick={() => handleEmergencyAction('backup-data')}
            iconName="Download"
            iconPosition="left"
            className="justify-start"
          >
            Emergency Backup
          </Button>
          
          <Button
            variant="outline"
            onClick={() => handleEmergencyAction('notify-users')}
            iconName="Bell"
            iconPosition="left"
            className="justify-start"
          >
            Send Alert Notification
          </Button>
        </div>
      </div>

      {/* Alert Notifications */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Alerts</h3>
          <Button variant="ghost" size="sm" iconName="RefreshCw" iconPosition="left">
            Refresh
          </Button>
        </div>

        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className={`p-4 rounded-md border ${getAlertColor(alert.type)}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <Icon name={getAlertIcon(alert.type)} size={20} className="mt-0.5" />
                  <div>
                    <h4 className="font-medium">{alert.title}</h4>
                    <p className="text-sm opacity-90 mt-1">{alert.message}</p>
                    <p className="text-xs opacity-70 mt-2">{formatTimeAgo(alert.timestamp)}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleAlertAction(alert, alert.action)}
                >
                  {alert.action}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {alerts.length === 0 && (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-3" />
            <p className="text-muted-foreground">No active alerts</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealTimeMonitoringPanel;