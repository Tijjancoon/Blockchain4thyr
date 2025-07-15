import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ElectionSidebar = ({ selectedElection, onElectionChange }) => {
  const elections = [
    {
      id: 'election-2024-q3',
      title: 'Q3 2024 Board Election',
      status: 'completed',
      endDate: '2024-07-14',
      totalVotes: 764,
      quorumMet: true,
      certified: true
    },
    {
      id: 'election-2024-q2',
      title: 'Q2 Strategic Initiatives',
      status: 'completed',
      endDate: '2024-04-15',
      totalVotes: 689,
      quorumMet: true,
      certified: true
    },
    {
      id: 'election-2024-q1',
      title: 'Annual Budget Approval',
      status: 'completed',
      endDate: '2024-01-30',
      totalVotes: 712,
      quorumMet: true,
      certified: true
    }
  ];

  const currentElection = elections.find(e => e.id === selectedElection) || elections[0];

  const handleDownloadReport = () => {
    console.log('Downloading official election report...');
  };

  const handleDownloadCertificate = () => {
    console.log('Downloading election certificate...');
  };

  const handleExportData = () => {
    console.log('Exporting election data...');
  };

  return (
    <div className="space-y-6">
      {/* Election Selector */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-md font-semibold text-foreground mb-3">Select Election</h3>
        <div className="space-y-2">
          {elections.map((election) => (
            <button
              key={election.id}
              onClick={() => onElectionChange(election.id)}
              className={`w-full text-left p-3 rounded-md transition-smooth ${
                selectedElection === election.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80 text-foreground'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">{election.title}</span>
                <div className="flex items-center space-x-1">
                  {election.certified && (
                    <Icon name="Award" size={14} className="text-success" />
                  )}
                  <Icon name="CheckCircle" size={14} className="text-success" />
                </div>
              </div>
              <div className="text-xs opacity-80">
                Ended: {new Date(election.endDate).toLocaleDateString()}
              </div>
              <div className="text-xs opacity-80">
                {election.totalVotes} votes cast
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Election Metadata */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-md font-semibold text-foreground mb-3">Election Details</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted-foreground">Election ID</label>
            <p className="text-sm font-mono text-foreground">{currentElection.id}</p>
          </div>
          
          <div>
            <label className="text-xs text-muted-foreground">Status</label>
            <div className="flex items-center space-x-2 mt-1">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                Completed
              </span>
              {currentElection.certified && (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  Certified
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground">Voting Period</label>
            <p className="text-sm text-foreground">
              July 14, 2024<br />
              09:00 AM - 05:00 PM EST
            </p>
          </div>

          <div>
            <label className="text-xs text-muted-foreground">Total Eligible Voters</label>
            <p className="text-sm text-foreground">1,032 shareholders</p>
          </div>

          <div>
            <label className="text-xs text-muted-foreground">Quorum Requirement</label>
            <p className="text-sm text-foreground">65% (671 votes)</p>
          </div>

          <div>
            <label className="text-xs text-muted-foreground">Final Turnout</label>
            <p className="text-sm text-success font-medium">74.0% (764 votes)</p>
          </div>
        </div>
      </div>

      {/* Certification Status */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-md font-semibold text-foreground mb-3">Certification</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-sm text-success font-medium">Blockchain Verified</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Award" size={16} className="text-success" />
            <span className="text-sm text-success font-medium">Officially Certified</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="FileCheck" size={16} className="text-success" />
            <span className="text-sm text-success font-medium">Audit Complete</span>
          </div>

          <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-md">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="User" size={14} className="text-success" />
              <span className="text-xs font-medium text-success">Certified By</span>
            </div>
            <p className="text-xs text-foreground">Board Secretary</p>
            <p className="text-xs text-muted-foreground">July 14, 2024 at 6:15 PM</p>
          </div>
        </div>
      </div>

      {/* Download Options */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-md font-semibold text-foreground mb-3">Download Reports</h3>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={handleDownloadReport}
            iconName="FileText"
            iconPosition="left"
          >
            Official Report
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={handleDownloadCertificate}
            iconName="Award"
            iconPosition="left"
          >
            Certificate
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={handleExportData}
            iconName="Download"
            iconPosition="left"
          >
            Raw Data (CSV)
          </Button>
        </div>
      </div>

      {/* Compliance Information */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-md font-semibold text-foreground mb-3">Compliance</h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={12} className="text-success" />
            <span className="text-foreground">SOX Compliant</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={12} className="text-success" />
            <span className="text-foreground">SEC Reporting Ready</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={12} className="text-success" />
            <span className="text-foreground">GDPR Compliant</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={12} className="text-success" />
            <span className="text-foreground">Audit Trail Complete</span>
          </div>
        </div>

        <div className="mt-3 p-2 bg-muted rounded text-xs text-muted-foreground">
          All election data is retained for 7 years in compliance with corporate governance regulations.
        </div>
      </div>
    </div>
  );
};

export default ElectionSidebar;