import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: 'Bank-level security',
      status: 'verified'
    },
    {
      icon: 'Link',
      title: 'Blockchain Secured',
      description: 'Immutable vote records',
      status: 'verified'
    },
    {
      icon: 'Eye',
      title: 'Audit Trail',
      description: 'Full transparency',
      status: 'verified'
    },
    {
      icon: 'Users',
      title: 'Multi-Signature',
      description: 'Admin verification',
      status: 'verified'
    }
  ];

  const recentActivity = {
    activeElections: 2,
    totalVotes: 1247,
    participationRate: 89,
    lastElection: '2024-06-15'
  };

  const complianceInfo = [
    {
      standard: 'SOC 2 Type II',
      status: 'Certified',
      icon: 'CheckCircle'
    },
    {
      standard: 'GDPR Compliant',
      status: 'Verified',
      icon: 'CheckCircle'
    },
    {
      standard: 'ISO 27001',
      status: 'Certified',
      icon: 'CheckCircle'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Security Features */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Shield" size={20} className="text-success" />
          <span>Security Features</span>
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name={feature.icon} size={16} className="text-success" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{feature.title}</p>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-primary/5 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Activity" size={20} className="text-primary" />
          <span>Platform Activity</span>
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Active Elections</span>
            <span className="text-sm font-medium text-foreground">{recentActivity.activeElections}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Votes Cast</span>
            <span className="text-sm font-medium text-foreground">{recentActivity.totalVotes.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Participation Rate</span>
            <span className="text-sm font-medium text-success">{recentActivity.participationRate}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Last Election</span>
            <span className="text-sm font-medium text-foreground">
              {new Date(recentActivity.lastElection).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Compliance Badges */}
      <div className="bg-accent/5 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Award" size={20} className="text-accent" />
          <span>Compliance</span>
        </h3>
        
        <div className="space-y-3">
          {complianceInfo.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{item.standard}</span>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium text-accent">{item.status}</span>
                <Icon name={item.icon} size={14} className="text-accent" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Phone" size={16} className="text-warning mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Need Help?</p>
            <p className="text-xs text-muted-foreground">
              Technical support: +1 (555) 123-4567
            </p>
            <p className="text-xs text-muted-foreground">
              Available 24/7 during voting periods
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;