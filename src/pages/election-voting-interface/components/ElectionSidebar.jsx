import React from 'react';
import Icon from '../../../components/AppIcon';

const ElectionSidebar = ({ election, stats }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const timelineEvents = [
    {
      id: 1,
      title: 'Election Created',
      date: election.createdDate,
      status: 'completed',
      icon: 'Plus'
    },
    {
      id: 2,
      title: 'Voting Opens',
      date: election.startDate,
      status: 'completed',
      icon: 'Play'
    },
    {
      id: 3,
      title: 'Voting Closes',
      date: election.endDate,
      status: 'pending',
      icon: 'Square'
    },
    {
      id: 4,
      title: 'Results Published',
      date: election.resultsDate,
      status: 'pending',
      icon: 'BarChart3'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success';
      case 'active': return 'text-primary bg-primary';
      case 'pending': return 'text-muted-foreground bg-muted-foreground';
      default: return 'text-muted-foreground bg-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Election Metadata */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-semibold text-foreground mb-4">Election Details</h4>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Election ID</span>
            <span className="font-mono text-xs text-foreground">{election.id}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Type</span>
            <span className="text-foreground">{election.type}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Quorum</span>
            <span className="text-foreground">{election.quorumRequired}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Created By</span>
            <span className="text-foreground">{election.createdBy}</span>
          </div>
        </div>
      </div>

      {/* Voting Timeline */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-semibold text-foreground mb-4">Timeline</h4>
        <div className="space-y-4">
          {timelineEvents.map((event, index) => (
            <div key={event.id} className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(event.status)}`}>
                <Icon name={event.icon} size={14} color="white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground">{event.title}</div>
                <div className="text-xs text-muted-foreground">{formatDate(event.date)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Statistics */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-semibold text-foreground mb-4">Live Statistics</h4>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Participation</span>
              <span className="text-foreground">{stats.participationRate}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-smooth"
                style={{ width: `${stats.participationRate}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Quorum Progress</span>
              <span className="text-foreground">{Math.min(stats.participationRate, election.quorumRequired)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-smooth ${
                  stats.participationRate >= election.quorumRequired ? 'bg-success' : 'bg-warning'
                }`}
                style={{ width: `${Math.min((stats.participationRate / election.quorumRequired) * 100, 100)}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">{stats.totalVotes}</div>
              <div className="text-xs text-muted-foreground">Total Votes</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">{stats.remainingVoters}</div>
              <div className="text-xs text-muted-foreground">Remaining</div>
            </div>
          </div>
        </div>
      </div>

      {/* Blockchain Info */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-semibold text-foreground mb-4">Blockchain Security</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-sm text-foreground">End-to-end encrypted</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Lock" size={16} className="text-success" />
            <span className="text-sm text-foreground">Immutable records</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Eye" size={16} className="text-success" />
            <span className="text-sm text-foreground">Publicly auditable</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="UserX" size={16} className="text-success" />
            <span className="text-sm text-foreground">Anonymous voting</span>
          </div>
        </div>

        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">Network</div>
          <div className="text-sm font-medium text-foreground">Ethereum Mainnet</div>
          <div className="text-xs text-muted-foreground mt-1">Gas fee: ~$2.50</div>
        </div>
      </div>

      {/* Help & Support */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-semibold text-foreground mb-4">Need Help?</h4>
        <div className="space-y-2">
          <button className="w-full text-left p-2 text-sm text-primary hover:bg-primary/10 rounded transition-smooth">
            <Icon name="HelpCircle" size={14} className="inline mr-2" />
            Voting Guide
          </button>
          <button className="w-full text-left p-2 text-sm text-primary hover:bg-primary/10 rounded transition-smooth">
            <Icon name="MessageCircle" size={14} className="inline mr-2" />
            Contact Support
          </button>
          <button className="w-full text-left p-2 text-sm text-primary hover:bg-primary/10 rounded transition-smooth">
            <Icon name="FileText" size={14} className="inline mr-2" />
            Technical FAQ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElectionSidebar;