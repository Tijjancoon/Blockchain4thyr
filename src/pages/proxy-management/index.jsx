import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ElectionStatusBanner from '../../components/ui/ElectionStatusBanner';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProxyHolderCard from './components/ProxyHolderCard';
import ProxyAssignmentCard from './components/ProxyAssignmentCard';
import TokenBalance from './components/TokenBalance';
import ProxyAssignmentModal from './components/ProxyAssignmentModal';
import ProxyFilters from './components/ProxyFilters';

const ProxyManagement = () => {
  const [draggedProxy, setDraggedProxy] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedProxy, setSelectedProxy] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRevoking, setIsRevoking] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    expertise: '',
    performance: '',
    availability: '',
    sortBy: 'name'
  });

  // Mock user data
  const [userTokens, setUserTokens] = useState({
    total: 250,
    assigned: 75,
    available: 175
  });

  // Mock proxy holders data
  const [proxyHolders] = useState([
    {
      id: 'proxy-1',
      name: 'Sarah Chen',
      title: 'Corporate Governance Specialist',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      expertiseAreas: ['Corporate Governance', 'Legal Affairs'],
      experience: 12,
      performanceScore: 94,
      currentDelegations: 8,
      maxDelegations: 15,
      electionsParticipated: 47,
      acceptanceRate: 98,
      avgResponseTime: '2.3 hours',
      isOnline: true,
      recentActivity: 'Participated in Q2 2024 Board Election with 100% voting completion rate'
    },
    {
      id: 'proxy-2',
      name: 'Michael Rodriguez',
      title: 'Financial Strategy Advisor',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      expertiseAreas: ['Financial Management', 'Operations'],
      experience: 15,
      performanceScore: 91,
      currentDelegations: 12,
      maxDelegations: 20,
      electionsParticipated: 62,
      acceptanceRate: 95,
      avgResponseTime: '1.8 hours',
      isOnline: true,
      recentActivity: 'Led proxy voting for merger approval with detailed analysis reports'
    },
    {
      id: 'proxy-3',
      name: 'Dr. Emily Watson',
      title: 'Technology & Innovation Lead',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      expertiseAreas: ['Technology Strategy', 'Corporate Governance'],
      experience: 8,
      performanceScore: 88,
      currentDelegations: 5,
      maxDelegations: 12,
      electionsParticipated: 23,
      acceptanceRate: 92,
      avgResponseTime: '3.1 hours',
      isOnline: false,
      recentActivity: 'Provided technical expertise for digital transformation voting initiatives'
    },
    {
      id: 'proxy-4',
      name: 'James Thompson',
      title: 'Legal Affairs Director',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      expertiseAreas: ['Legal Affairs', 'Corporate Governance', 'Operations'],
      experience: 18,
      performanceScore: 96,
      currentDelegations: 15,
      maxDelegations: 15,
      electionsParticipated: 78,
      acceptanceRate: 99,
      avgResponseTime: '1.2 hours',
      isOnline: true,
      recentActivity: 'Successfully managed complex proxy voting for regulatory compliance matters'
    },
    {
      id: 'proxy-5',
      name: 'Lisa Park',
      title: 'Marketing & Communications Head',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
      expertiseAreas: ['Marketing', 'Operations'],
      experience: 10,
      performanceScore: 85,
      currentDelegations: 7,
      maxDelegations: 18,
      electionsParticipated: 34,
      acceptanceRate: 89,
      avgResponseTime: '4.2 hours',
      isOnline: true,
      recentActivity: 'Coordinated stakeholder communication for brand strategy voting'
    },
    {
      id: 'proxy-6',
      name: 'Robert Kim',
      title: 'Operations Excellence Manager',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      expertiseAreas: ['Operations', 'Financial Management'],
      experience: 14,
      performanceScore: 90,
      currentDelegations: 3,
      maxDelegations: 10,
      electionsParticipated: 41,
      acceptanceRate: 94,
      avgResponseTime: '2.7 hours',
      isOnline: false,
      recentActivity: 'Optimized proxy delegation processes for operational efficiency votes'
    }
  ]);

  // Mock current assignments
  const [assignments, setAssignments] = useState([
    {
      id: 'assignment-1',
      proxyHolder: {
        id: 'proxy-1',
        name: 'Sarah Chen',
        title: 'Corporate Governance Specialist',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
      },
      tokensAssigned: 50,
      type: 'election',
      electionTitle: 'Q3 2024 Board of Directors Election',
      votingStartDate: '2024-07-20T09:00:00',
      votingEndDate: '2024-07-22T17:00:00',
      status: 'active',
      assignedDate: '2024-07-10T14:30:00',
      transactionHash: '0x742d35Cc6634C0532925a3b8D4C9db96590b5',
      gasFee: 0.0023,
      votingStarted: false,
      notes: 'Focus on governance and compliance matters'
    },
    {
      id: 'assignment-2',
      proxyHolder: {
        id: 'proxy-2',
        name: 'Michael Rodriguez',
        title: 'Financial Strategy Advisor',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
      },
      tokensAssigned: 25,
      type: 'blanket',
      status: 'active',
      assignedDate: '2024-07-05T10:15:00',
      expiryDate: '2024-12-31T23:59:59',
      transactionHash: '0x8f3e2a1b9c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f',
      gasFee: 0.0018,
      votingStarted: false,
      notes: 'Blanket delegation for financial and operational decisions'
    }
  ]);

  const filteredProxyHolders = proxyHolders.filter(holder => {
    const matchesSearch = !filters.search || 
      holder.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      holder.title.toLowerCase().includes(filters.search.toLowerCase());

    const matchesExpertise = !filters.expertise || 
      holder.expertiseAreas.includes(filters.expertise);

    const matchesPerformance = !filters.performance || 
      (filters.performance === '90+' && holder.performanceScore >= 90) ||
      (filters.performance === '75-89' && holder.performanceScore >= 75 && holder.performanceScore < 90) ||
      (filters.performance === '60-74' && holder.performanceScore >= 60 && holder.performanceScore < 75) ||
      (filters.performance === '<60' && holder.performanceScore < 60);

    const matchesAvailability = !filters.availability ||
      (filters.availability === 'available' && holder.currentDelegations < holder.maxDelegations) ||
      (filters.availability === 'limited' && holder.currentDelegations >= holder.maxDelegations * 0.8 && holder.currentDelegations < holder.maxDelegations) ||
      (filters.availability === 'full' && holder.currentDelegations >= holder.maxDelegations);

    return matchesSearch && matchesExpertise && matchesPerformance && matchesAvailability;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'performance':
        return b.performanceScore - a.performanceScore;
      case 'experience':
        return b.experience - a.experience;
      case 'availability':
        return (a.currentDelegations / a.maxDelegations) - (b.currentDelegations / b.maxDelegations);
      case 'recent':
        return b.electionsParticipated - a.electionsParticipated;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleDragStart = (proxy) => {
    setDraggedProxy(proxy);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (draggedProxy && userTokens.available > 0) {
      setSelectedProxy(draggedProxy);
      setIsModalOpen(true);
    }
    setDraggedProxy(null);
  };

  const handleAssignProxy = (proxy) => {
    if (userTokens.available > 0) {
      setSelectedProxy(proxy);
      setIsModalOpen(true);
    }
  };

  const handleConfirmAssignment = async (assignmentData) => {
    setIsProcessing(true);
    
    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newAssignment = {
        id: `assignment-${Date.now()}`,
        proxyHolder: {
          id: selectedProxy.id,
          name: selectedProxy.name,
          title: selectedProxy.title,
          avatar: selectedProxy.avatar
        },
        tokensAssigned: assignmentData.tokensToAssign,
        type: assignmentData.assignmentType,
        electionTitle: assignmentData.assignmentType === 'election' ? 'Q3 2024 Board of Directors Election' : undefined,
        votingStartDate: assignmentData.assignmentType === 'election'? '2024-07-20T09:00:00' : undefined,
        votingEndDate: assignmentData.assignmentType === 'election'? '2024-07-22T17:00:00' : undefined,
        status: 'pending',
        assignedDate: new Date().toISOString(),
        expiryDate: assignmentData.expiryDate || null,
        transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`,
        gasFee: 0.0023,
        votingStarted: false,
        notes: assignmentData.notes
      };

      setAssignments(prev => [...prev, newAssignment]);
      setUserTokens(prev => ({
        ...prev,
        assigned: prev.assigned + assignmentData.tokensToAssign,
        available: prev.available - assignmentData.tokensToAssign
      }));

      setIsModalOpen(false);
      setSelectedProxy(null);
    } catch (error) {
      console.error('Assignment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRevokeProxy = async (assignmentId) => {
    setIsRevoking(true);
    
    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const assignment = assignments.find(a => a.id === assignmentId);
      if (assignment) {
        setAssignments(prev => prev.filter(a => a.id !== assignmentId));
        setUserTokens(prev => ({
          ...prev,
          assigned: prev.assigned - assignment.tokensAssigned,
          available: prev.available + assignment.tokensAssigned
        }));
      }
    } catch (error) {
      console.error('Revocation failed:', error);
    } finally {
      setIsRevoking(false);
    }
  };

  const handleModifyTokens = async (assignmentId, newTokenAmount) => {
    try {
      const assignment = assignments.find(a => a.id === assignmentId);
      if (assignment) {
        const tokenDifference = newTokenAmount - assignment.tokensAssigned;
        
        if (tokenDifference > userTokens.available) {
          alert('Insufficient available tokens');
          return;
        }

        setAssignments(prev => prev.map(a => 
          a.id === assignmentId 
            ? { ...a, tokensAssigned: newTokenAmount }
            : a
        ));

        setUserTokens(prev => ({
          ...prev,
          assigned: prev.assigned + tokenDifference,
          available: prev.available - tokenDifference
        }));
      }
    } catch (error) {
      console.error('Token modification failed:', error);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      expertise: '',
      performance: '',
      availability: '',
      sortBy: 'name'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ElectionStatusBanner />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Proxy Management</h1>
              <p className="text-muted-foreground">
                Delegate your voting rights to trusted representatives through secure blockchain transactions
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="History"
                iconPosition="left"
              >
                Transaction History
              </Button>
              <Button
                variant="outline"
                iconName="HelpCircle"
                iconPosition="left"
              >
                Help & Guide
              </Button>
            </div>
          </div>

          {/* Filters */}
          <ProxyFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            proxyHolders={filteredProxyHolders}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Available Proxy Holders */}
            <div className="lg:col-span-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground flex items-center space-x-2">
                  <Icon name="Users" size={24} />
                  <span>Available Proxy Holders</span>
                </h2>
                <span className="text-sm text-muted-foreground">
                  {filteredProxyHolders.length} available
                </span>
              </div>

              <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2">
                {filteredProxyHolders.map((proxyHolder) => (
                  <ProxyHolderCard
                    key={proxyHolder.id}
                    proxyHolder={proxyHolder}
                    onDragStart={handleDragStart}
                    onAssignProxy={handleAssignProxy}
                    isDragOver={draggedProxy?.id === proxyHolder.id}
                    userTokens={userTokens.available}
                    isAssigning={isProcessing}
                  />
                ))}

                {filteredProxyHolders.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No proxy holders found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters to find suitable proxy holders
                    </p>
                    <Button
                      variant="outline"
                      onClick={handleClearFilters}
                      className="mt-4"
                      iconName="RotateCcw"
                      iconPosition="left"
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Token Balance & Current Assignments */}
            <div className="lg:col-span-6">
              {/* Token Balance */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className="mb-6"
              >
                <TokenBalance
                  totalTokens={userTokens.total}
                  assignedTokens={userTokens.assigned}
                  availableTokens={userTokens.available}
                  isDragging={isDragOver}
                />
              </div>

              {/* Current Assignments */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground flex items-center space-x-2">
                    <Icon name="UserCheck" size={24} />
                    <span>Current Assignments</span>
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {assignments.length} active
                  </span>
                </div>

                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {assignments.map((assignment) => (
                    <ProxyAssignmentCard
                      key={assignment.id}
                      assignment={assignment}
                      onRevokeProxy={handleRevokeProxy}
                      onModifyTokens={handleModifyTokens}
                      isRevoking={isRevoking}
                    />
                  ))}

                  {assignments.length === 0 && (
                    <div className="text-center py-12 bg-card border border-border rounded-lg">
                      <Icon name="UserX" size={48} className="mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">No proxy assignments</h3>
                      <p className="text-muted-foreground mb-4">
                        You haven't assigned any voting tokens to proxy holders yet
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Drag proxy holders from the left panel or use the assign button to delegate your voting rights
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-12 bg-muted rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
              <Icon name="Info" size={20} />
              <span>How Proxy Delegation Works</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground font-semibold">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Select Proxy Holder</h4>
                  <p className="text-muted-foreground">
                    Choose a trusted representative based on their expertise and performance history
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground font-semibold">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Assign Tokens</h4>
                  <p className="text-muted-foreground">
                    Drag and drop or use the assign button to delegate your voting tokens securely
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground font-semibold">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Monitor & Manage</h4>
                  <p className="text-muted-foreground">
                    Track your delegations and revoke or modify them before voting periods begin
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Assignment Modal */}
      <ProxyAssignmentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProxy(null);
        }}
        proxyHolder={selectedProxy}
        userTokens={userTokens.available}
        onConfirmAssignment={handleConfirmAssignment}
        isProcessing={isProcessing}
      />
    </div>
  );
};

export default ProxyManagement;