import React from 'react';
import Icon from '../../../components/AppIcon';

const ElectionStatsCards = () => {
  const stats = [
    {
      id: 'active-elections',
      title: 'Active Elections',
      value: 3,
      change: '+1 from last month',
      changeType: 'positive',
      icon: 'Vote',
      color: 'bg-primary',
      description: 'Currently running elections'
    },
    {
      id: 'total-participants',
      title: 'Total Participants',
      value: 1247,
      change: '+89 new registrations',
      changeType: 'positive',
      icon: 'Users',
      color: 'bg-accent',
      description: 'Registered shareholders'
    },
    {
      id: 'pending-approvals',
      title: 'Pending Approvals',
      value: 12,
      change: '3 urgent reviews',
      changeType: 'warning',
      icon: 'Clock',
      color: 'bg-warning',
      description: 'Awaiting admin action'
    },
    {
      id: 'system-health',
      title: 'System Health',
      value: '99.8%',
      change: 'All systems operational',
      changeType: 'positive',
      icon: 'Shield',
      color: 'bg-success',
      description: 'Blockchain uptime'
    }
  ];

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      case 'warning':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div key={stat.id} className="bg-card border border-border rounded-lg p-6 shadow-card hover:shadow-modal transition-smooth">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
              <Icon name={stat.icon} size={24} color="white" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{stat.description}</p>
            <div className={`flex items-center space-x-1 text-sm ${getChangeColor(stat.changeType)}`}>
              <Icon 
                name={stat.changeType === 'positive' ? 'TrendingUp' : stat.changeType === 'negative' ? 'TrendingDown' : 'AlertCircle'} 
                size={14} 
              />
              <span>{stat.change}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ElectionStatsCards;