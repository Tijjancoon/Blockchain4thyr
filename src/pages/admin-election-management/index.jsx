import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import ElectionStatusBanner from '../../components/ui/ElectionStatusBanner';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ElectionStatsCards from './components/ElectionStatsCards';
import ElectionCreationWizard from './components/ElectionCreationWizard';
import ElectionsManagementTable from './components/ElectionsManagementTable';
import RealTimeMonitoringPanel from './components/RealTimeMonitoringPanel';

const AdminElectionManagement = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedView, setSelectedView] = useState('overview');

  const handleCreateElection = () => {
    setIsWizardOpen(true);
  };

  const handleWizardComplete = (electionData) => {
    console.log('New election created:', electionData);
    // Here you would typically send the data to your backend
  };

  const handleEditElection = (election) => {
    console.log('Editing election:', election);
    // Navigate to edit mode or open edit modal
  };

  const handleViewResults = (election) => {
    console.log('Viewing results for:', election);
    // Navigate to results page
  };

  const viewOptions = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'monitoring', label: 'Live Monitoring', icon: 'Activity' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ElectionStatusBanner />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Election Management</h1>
              <p className="text-muted-foreground">
                Create, configure, and monitor corporate elections with comprehensive administrative tools
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-6 lg:mt-0">
              <Button
                variant="outline"
                onClick={() => console.log('Importing shareholders...')}
                iconName="Upload"
                iconPosition="left"
              >
                Import Shareholders
              </Button>
              
              <Button
                onClick={handleCreateElection}
                iconName="Plus"
                iconPosition="left"
                className="bg-primary hover:bg-primary/90"
              >
                Create New Election
              </Button>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-1 mb-6 bg-muted p-1 rounded-lg w-fit">
            {viewOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedView(option.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                  selectedView === option.id
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={option.icon} size={16} />
                <span>{option.label}</span>
              </button>
            ))}
          </div>

          {/* Content based on selected view */}
          {selectedView === 'overview' ? (
            <div className="space-y-8">
              {/* Statistics Cards */}
              <ElectionStatsCards />

              {/* Elections Management Table */}
              <ElectionsManagementTable
                onEditElection={handleEditElection}
                onViewResults={handleViewResults}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Main monitoring content */}
              <div className="xl:col-span-2">
                <ElectionStatsCards />
              </div>
              
              {/* Right panel - Real-time monitoring */}
              <div className="xl:col-span-1">
                <RealTimeMonitoringPanel />
              </div>
            </div>
          )}

          {/* Quick Actions Panel */}
          <div className="mt-12 bg-card border border-border rounded-lg p-6 shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                onClick={() => console.log('Managing users...')}
                iconName="Users"
                iconPosition="left"
                className="justify-start h-auto py-4"
              >
                <div className="text-left">
                  <div className="font-medium">Manage Users</div>
                  <div className="text-xs text-muted-foreground">Add or remove shareholders</div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => console.log('Viewing audit logs...')}
                iconName="FileText"
                iconPosition="left"
                className="justify-start h-auto py-4"
              >
                <div className="text-left">
                  <div className="font-medium">Audit Logs</div>
                  <div className="text-xs text-muted-foreground">Review system activity</div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => console.log('System settings...')}
                iconName="Settings"
                iconPosition="left"
                className="justify-start h-auto py-4"
              >
                <div className="text-left">
                  <div className="font-medium">System Settings</div>
                  <div className="text-xs text-muted-foreground">Configure platform</div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => console.log('Generating reports...')}
                iconName="BarChart3"
                iconPosition="left"
                className="justify-start h-auto py-4"
              >
                <div className="text-left">
                  <div className="font-medium">Generate Reports</div>
                  <div className="text-xs text-muted-foreground">Export election data</div>
                </div>
              </Button>
            </div>
          </div>

          {/* Multi-signature Authentication Notice */}
          <div className="mt-8 bg-primary/10 border border-primary/20 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={24} className="text-primary mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Multi-Signature Authentication</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Critical administrative actions require approval from multiple authorized administrators 
                  to ensure security and prevent unauthorized changes to election configurations.
                </p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="CheckCircle" size={14} className="text-success" />
                    <span>2 of 3 signatures required</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} className="text-warning" />
                    <span>24-hour approval window</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Shield" size={14} className="text-primary" />
                    <span>Hardware wallet protected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Election Creation Wizard Modal */}
      <ElectionCreationWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onComplete={handleWizardComplete}
      />
    </div>
  );
};

export default AdminElectionManagement;