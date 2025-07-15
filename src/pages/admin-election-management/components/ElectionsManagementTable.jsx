import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const ElectionsManagementTable = ({ onEditElection, onViewResults }) => {
  const [selectedElections, setSelectedElections] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('deadline');
  const [sortOrder, setSortOrder] = useState('asc');

  const elections = [
    {
      id: 'election-001',
      title: 'Q3 2024 Board of Directors Election',
      type: 'Board Election',
      status: 'active',
      startDate: '2024-07-10T09:00:00',
      endDate: '2024-07-16T17:00:00',
      participationRate: 67,
      totalVotes: 834,
      eligibleVoters: 1247,
      blockchain: 'Ethereum',
      contractAddress: '0x742d35Cc6634C0532925a3b8D4C9db96590b5',
      createdBy: 'Sarah Johnson',
      lastModified: '2024-07-14T10:30:00'
    },
    {
      id: 'election-002',
      title: 'Executive Compensation Package Approval',
      type: 'Resolution',
      status: 'scheduled',
      startDate: '2024-07-20T09:00:00',
      endDate: '2024-07-25T17:00:00',
      participationRate: 0,
      totalVotes: 0,
      eligibleVoters: 1247,
      blockchain: 'Polygon',
      contractAddress: '0x8f3e2d1a9b7c4e5f6a8d9c2b1e4f7a9c8d5e2f1b',
      createdBy: 'Michael Chen',
      lastModified: '2024-07-12T14:15:00'
    },
    {
      id: 'election-003',
      title: 'Merger with TechCorp Industries',
      type: 'M&A Approval',
      status: 'completed',
      startDate: '2024-06-15T09:00:00',
      endDate: '2024-06-22T17:00:00',
      participationRate: 89,
      totalVotes: 1110,
      eligibleVoters: 1247,
      blockchain: 'Ethereum',
      contractAddress: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
      createdBy: 'David Rodriguez',
      lastModified: '2024-06-23T09:45:00'
    },
    {
      id: 'election-004',
      title: 'Environmental Policy Amendment',
      type: 'Policy Vote',
      status: 'draft',
      startDate: '2024-08-01T09:00:00',
      endDate: '2024-08-08T17:00:00',
      participationRate: 0,
      totalVotes: 0,
      eligibleVoters: 1247,
      blockchain: 'BSC',
      contractAddress: null,
      createdBy: 'Lisa Wang',
      lastModified: '2024-07-13T16:20:00'
    },
    {
      id: 'election-005',
      title: 'Q2 2024 Dividend Distribution',
      type: 'Financial',
      status: 'suspended',
      startDate: '2024-07-05T09:00:00',
      endDate: '2024-07-12T17:00:00',
      participationRate: 45,
      totalVotes: 561,
      eligibleVoters: 1247,
      blockchain: 'Ethereum',
      contractAddress: '0x9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d',
      createdBy: 'Robert Kim',
      lastModified: '2024-07-11T11:30:00'
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'draft', label: 'Draft' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const sortOptions = [
    { value: 'deadline', label: 'Deadline' },
    { value: 'title', label: 'Title' },
    { value: 'participation', label: 'Participation Rate' },
    { value: 'created', label: 'Created Date' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      draft: { color: 'bg-muted text-muted-foreground', icon: 'FileText' },
      scheduled: { color: 'bg-primary text-primary-foreground', icon: 'Calendar' },
      active: { color: 'bg-success text-success-foreground', icon: 'Play' },
      completed: { color: 'bg-accent text-accent-foreground', icon: 'CheckCircle' },
      suspended: { color: 'bg-error text-error-foreground', icon: 'Pause' }
    };

    const config = statusConfig[status] || statusConfig.draft;
    
    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon name={config.icon} size={12} />
        <span className="capitalize">{status}</span>
      </span>
    );
  };

  const getParticipationColor = (rate) => {
    if (rate >= 75) return 'text-success';
    if (rate >= 50) return 'text-warning';
    if (rate > 0) return 'text-error';
    return 'text-muted-foreground';
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedElections(filteredElections.map(e => e.id));
    } else {
      setSelectedElections([]);
    }
  };

  const handleSelectElection = (electionId, checked) => {
    if (checked) {
      setSelectedElections([...selectedElections, electionId]);
    } else {
      setSelectedElections(selectedElections.filter(id => id !== electionId));
    }
  };

  const filteredElections = elections.filter(election => {
    const matchesStatus = filterStatus === 'all' || election.status === filterStatus;
    const matchesSearch = election.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         election.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const sortedElections = [...filteredElections].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'deadline':
        aValue = new Date(a.endDate);
        bValue = new Date(b.endDate);
        break;
      case 'title':
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      case 'participation':
        aValue = a.participationRate;
        bValue = b.participationRate;
        break;
      case 'created':
        aValue = new Date(a.lastModified);
        bValue = new Date(b.lastModified);
        break;
      default:
        return 0;
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on elections:`, selectedElections);
    setSelectedElections([]);
  };

  const handleExport = () => {
    console.log('Exporting elections data...');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      {/* Table Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Elections Management</h3>
            <p className="text-sm text-muted-foreground">Manage and monitor all corporate elections</p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Input
              placeholder="Search elections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64"
            />
            
            <Select
              options={statusOptions}
              value={filterStatus}
              onChange={setFilterStatus}
              className="w-full sm:w-40"
            />
            
            <Button
              variant="outline"
              onClick={handleExport}
              iconName="Download"
              iconPosition="left"
              size="sm"
            >
              Export
            </Button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedElections.length > 0 && (
          <div className="mt-4 p-3 bg-muted rounded-md">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                {selectedElections.length} election(s) selected
              </span>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('suspend')}
                  iconName="Pause"
                  iconPosition="left"
                >
                  Suspend
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('archive')}
                  iconName="Archive"
                  iconPosition="left"
                >
                  Archive
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleBulkAction('delete')}
                  iconName="Trash2"
                  iconPosition="left"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Sort Controls */}
        <div className="mt-4 flex items-center space-x-3">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            className="w-40"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            iconName={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'}
            iconPosition="left"
          >
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="w-12 p-4">
                <Checkbox
                  checked={selectedElections.length === filteredElections.length && filteredElections.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className="text-left p-4 font-medium text-foreground">Election Details</th>
              <th className="text-left p-4 font-medium text-foreground">Status</th>
              <th className="text-left p-4 font-medium text-foreground">Schedule</th>
              <th className="text-left p-4 font-medium text-foreground">Participation</th>
              <th className="text-left p-4 font-medium text-foreground">Blockchain</th>
              <th className="text-right p-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedElections.map((election) => (
              <tr key={election.id} className="border-b border-border hover:bg-muted/50 transition-smooth">
                <td className="p-4">
                  <Checkbox
                    checked={selectedElections.includes(election.id)}
                    onChange={(e) => handleSelectElection(election.id, e.target.checked)}
                  />
                </td>
                
                <td className="p-4">
                  <div>
                    <h4 className="font-medium text-foreground">{election.title}</h4>
                    <p className="text-sm text-muted-foreground">{election.type}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Created by {election.createdBy} • Modified {formatDate(election.lastModified)}
                    </p>
                  </div>
                </td>
                
                <td className="p-4">
                  {getStatusBadge(election.status)}
                </td>
                
                <td className="p-4">
                  <div className="text-sm">
                    <p className="text-foreground">Start: {formatDate(election.startDate)}</p>
                    <p className="text-muted-foreground">End: {formatDate(election.endDate)}</p>
                  </div>
                </td>
                
                <td className="p-4">
                  <div className="text-sm">
                    <p className={`font-medium ${getParticipationColor(election.participationRate)}`}>
                      {election.participationRate}%
                    </p>
                    <p className="text-muted-foreground">
                      {election.totalVotes.toLocaleString()} / {election.eligibleVoters.toLocaleString()} votes
                    </p>
                  </div>
                </td>
                
                <td className="p-4">
                  <div className="text-sm">
                    <p className="font-medium text-foreground">{election.blockchain}</p>
                    {election.contractAddress && (
                      <p className="text-xs text-muted-foreground font-mono">
                        {election.contractAddress.slice(0, 8)}...{election.contractAddress.slice(-6)}
                      </p>
                    )}
                  </div>
                </td>
                
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditElection(election)}
                      iconName="Edit"
                      iconPosition="left"
                    >
                      Edit
                    </Button>
                    
                    {election.status === 'completed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewResults(election)}
                        iconName="BarChart3"
                        iconPosition="left"
                      >
                        Results
                      </Button>
                    )}
                    
                    {election.status === 'active' && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => console.log('Suspending election:', election.id)}
                        iconName="Pause"
                        iconPosition="left"
                      >
                        Suspend
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {sortedElections.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Vote" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No elections found</h3>
          <p className="text-muted-foreground">
            {searchTerm || filterStatus !== 'all' ?'Try adjusting your search or filter criteria' :'Create your first election to get started'
            }
          </p>
        </div>
      )}

      {/* Pagination */}
      {sortedElections.length > 0 && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {sortedElections.length} of {elections.length} elections
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                <Icon name="ChevronLeft" size={16} />
              </Button>
              <span className="text-sm text-foreground px-3 py-1 bg-primary text-primary-foreground rounded">1</span>
              <Button variant="outline" size="sm" disabled>
                <Icon name="ChevronRight" size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ElectionsManagementTable;