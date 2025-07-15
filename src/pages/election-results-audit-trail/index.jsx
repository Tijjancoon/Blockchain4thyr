import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import ElectionStatusBanner from '../../components/ui/ElectionStatusBanner';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ResultsSummaryTab from './components/ResultsSummaryTab';
import DetailedBreakdownTab from './components/DetailedBreakdownTab';
import AuditTrailTab from './components/AuditTrailTab';
import ElectionSidebar from './components/ElectionSidebar';

const ElectionResultsAuditTrail = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [selectedElection, setSelectedElection] = useState('election-2024-q3');

  const tabs = [
    {
      id: 'summary',
      label: 'Results Summary',
      icon: 'BarChart3',
      description: 'Overview of voting outcomes and statistics'
    },
    {
      id: 'breakdown',
      label: 'Detailed Breakdown',
      icon: 'PieChart',
      description: 'Voting patterns and demographic analysis'
    },
    {
      id: 'audit',
      label: 'Audit Trail',
      icon: 'Shield',
      description: 'Blockchain verification and transaction logs'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'summary':
        return <ResultsSummaryTab selectedElection={selectedElection} />;
      case 'breakdown':
        return <DetailedBreakdownTab selectedElection={selectedElection} />;
      case 'audit':
        return <AuditTrailTab selectedElection={selectedElection} />;
      default:
        return <ResultsSummaryTab selectedElection={selectedElection} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ElectionStatusBanner />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Election Results & Audit Trail
                </h1>
                <p className="text-muted-foreground">
                  Transparent access to voting outcomes and blockchain verification data for completed elections.
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="RefreshCw"
                  iconPosition="left"
                  onClick={() => window.location.reload()}
                >
                  Refresh Data
                </Button>
                <Button
                  iconName="Share"
                  iconPosition="left"
                  onClick={() => console.log('Sharing results...')}
                >
                  Share Results
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content Area - 9 columns */}
            <div className="lg:col-span-9 space-y-6">
              {/* Tab Navigation */}
              <div className="bg-card border border-border rounded-lg">
                <div className="border-b border-border">
                  <nav className="flex space-x-0" aria-label="Results tabs">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-smooth ${
                          activeTab === tab.id
                            ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                        aria-selected={activeTab === tab.id}
                      >
                        <Icon name={tab.icon} size={16} />
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Description */}
                <div className="px-6 py-3 bg-muted/30">
                  <p className="text-sm text-muted-foreground">
                    {tabs.find(tab => tab.id === activeTab)?.description}
                  </p>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {renderTabContent()}
                </div>
              </div>
            </div>

            {/* Sidebar - 3 columns */}
            <div className="lg:col-span-3">
              <ElectionSidebar 
                selectedElection={selectedElection}
                onElectionChange={setSelectedElection}
              />
            </div>
          </div>

          {/* Mobile Tab Navigation (Hidden on Desktop) */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex flex-col items-center space-y-1 py-3 text-xs transition-smooth ${
                    activeTab === tab.id
                      ? 'text-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={tab.icon} size={18} />
                  <span className="font-medium">{tab.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ElectionResultsAuditTrail;