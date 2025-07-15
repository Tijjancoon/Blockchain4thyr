import React from 'react';
import Icon from '../../../components/AppIcon';

const ElectionHeader = ({ election }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeRemaining = () => {
    const now = new Date();
    const endDate = new Date(election.endDate);
    const diff = endDate - now;
    
    if (diff <= 0) return 'Voting has ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h remaining`;
    if (hours > 0) return `${hours}h ${minutes}m remaining`;
    return `${minutes}m remaining`;
  };

  const getStatusColor = () => {
    const now = new Date();
    const endDate = new Date(election.endDate);
    const diff = endDate - now;
    const hoursRemaining = diff / (1000 * 60 * 60);
    
    if (hoursRemaining <= 0) return 'text-error';
    if (hoursRemaining <= 6) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-2xl font-bold text-foreground">{election.title}</h1>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              election.status === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
            }`}>
              <Icon name="Circle" size={8} className="mr-1.5 fill-current" />
              {election.status.charAt(0).toUpperCase() + election.status.slice(1)}
            </span>
          </div>
          <p className="text-muted-foreground text-sm mb-4 max-w-3xl">{election.description}</p>
        </div>
        
        <div className="text-right">
          <div className={`text-sm font-medium ${getStatusColor()}`}>
            <Icon name="Clock" size={16} className="inline mr-1" />
            {getTimeRemaining()}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Ends: {formatDate(election.endDate)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Users" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Participation</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{election.participationRate}%</div>
          <div className="text-xs text-muted-foreground">{election.votedCount} of {election.totalEligible} voted</div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Shield" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Security</span>
          </div>
          <div className="text-sm font-bold text-foreground">Blockchain</div>
          <div className="text-xs text-muted-foreground">End-to-end encrypted</div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Vote" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Voting Type</span>
          </div>
          <div className="text-sm font-bold text-foreground">{election.votingType}</div>
          <div className="text-xs text-muted-foreground">Token-weighted</div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="FileText" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Quorum</span>
          </div>
          <div className="text-sm font-bold text-foreground">{election.quorumRequired}%</div>
          <div className="text-xs text-muted-foreground">
            {election.participationRate >= election.quorumRequired ? 'Met' : 'Pending'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionHeader;