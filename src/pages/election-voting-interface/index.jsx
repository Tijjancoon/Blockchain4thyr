import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ElectionStatusBanner from '../../components/ui/ElectionStatusBanner';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ElectionHeader from './components/ElectionHeader';
import VotingPowerCard from './components/VotingPowerCard';
import VotingOptionsCard from './components/VotingOptionsCard';
import ElectionSidebar from './components/ElectionSidebar';
import VoteConfirmationModal from './components/VoteConfirmationModal';
import VoteReceiptModal from './components/VoteReceiptModal';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ElectionVotingInterface = () => {
  const [selectedVotes, setSelectedVotes] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voteReceipt, setVoteReceipt] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  // Mock election data
  const election = {
    id: 'election-2024-q3-board',
    title: 'Q3 2024 Board of Directors Election',
    description: `This election will determine the composition of our Board of Directors for the upcoming quarter. Shareholders are voting on key governance issues including board member appointments, executive compensation packages, and strategic direction for the company's expansion into emerging markets.`,status: 'active',type: 'Board Election',votingType: 'Token-weighted',startDate: '2024-07-10T09:00:00',endDate: '2024-07-16T17:00:00',resultsDate: '2024-07-17T10:00:00',createdDate: '2024-07-05T14:30:00',createdBy: 'Board Secretary',
    participationRate: 67,
    votedCount: 1340,
    totalEligible: 2000,
    quorumRequired: 60
  };

  const votingPower = {
    tokens: 15000,
    percentage: 2.5,
    shareClass: 'Class A Common',
    shareCount: 15000,
    effectiveTokens: 15000,
    proxyDelegated: null
  };

  const agenda = [
    {
      id: 'item-1',
      title: 'Appointment of Sarah Chen as Chief Technology Officer',
      description: `Sarah Chen brings over 15 years of experience in technology leadership at Fortune 500 companies. Her expertise in AI and blockchain technologies aligns with our strategic vision for digital transformation. She previously served as VP of Engineering at TechCorp where she led a team of 200+ engineers and successfully launched 5 major product initiatives.\n\nHer appointment would strengthen our technical capabilities and support our expansion into emerging technologies. The compensation package includes a base salary of $350,000 plus equity incentives tied to performance milestones.`,
      required: true,
      impact: 'This appointment will accelerate our digital transformation initiatives and strengthen our competitive position in the technology sector.',
      attachments: [
        { name: 'Sarah_Chen_Resume.pdf', size: '2.4 MB' },
        { name: 'Compensation_Package_Details.pdf', size: '1.1 MB' },
        { name: 'Reference_Letters.pdf', size: '3.2 MB' }
      ]
    },
    {
      id: 'item-2',
      title: 'Approval of $50M Investment in Renewable Energy Infrastructure',
      description: `This proposal seeks approval for a strategic investment of $50 million in renewable energy infrastructure to support our sustainability goals and reduce operational costs. The investment will fund solar panel installations across our manufacturing facilities and the development of energy storage systems.\n\nProjected ROI is 12-15% over 10 years with significant environmental benefits. This initiative aligns with our ESG commitments and will position us as an industry leader in sustainable operations.`,
      required: true,
      impact: 'Expected to reduce energy costs by 30% within 3 years and achieve carbon neutrality by 2027.',
      attachments: [
        { name: 'Investment_Proposal.pdf', size: '5.8 MB' },
        { name: 'Environmental_Impact_Study.pdf', size: '4.2 MB' },
        { name: 'Financial_Projections.xlsx', size: '1.9 MB' }
      ]
    },
    {
      id: 'item-3',
      title: 'Amendment to Executive Compensation Policy',
      description: `Proposed amendments to the executive compensation policy include performance-based bonuses tied to ESG metrics, increased transparency in compensation reporting, and caps on executive-to-median worker pay ratios.\n\nThese changes respond to shareholder feedback and align with best practices in corporate governance. The policy will apply to all C-level executives and senior vice presidents.`,
      required: false,
      impact: 'Will improve alignment between executive compensation and long-term shareholder value creation.',
      attachments: [
        { name: 'Compensation_Policy_Amendment.pdf', size: '2.7 MB' },
        { name: 'Benchmarking_Analysis.pdf', size: '3.1 MB' }
      ]
    },
    {
      id: 'item-4',
      title: 'Authorization for Share Buyback Program ($100M)',
      description: `Authorization for a share buyback program of up to $100 million over the next 24 months. This program will provide flexibility to return capital to shareholders and optimize our capital structure based on market conditions.\n\nThe buyback will be executed through open market purchases and will not exceed 5% of outstanding shares. Management believes current share prices represent an attractive investment opportunity.`,
      required: false,
      impact: 'Expected to increase earnings per share and provide additional returns to shareholders.',
      attachments: [
        { name: 'Buyback_Program_Details.pdf', size: '2.1 MB' },
        { name: 'Market_Analysis.pdf', size: '1.8 MB' }
      ]
    }
  ];

  const stats = {
    participationRate: 67,
    totalVotes: 1340,
    remainingVoters: 660
  };

  useEffect(() => {
    // Check if user has already voted (mock check)
    const userVotedStatus = localStorage.getItem(`voted_${election.id}`);
    if (userVotedStatus) {
      setHasVoted(true);
    }
  }, [election.id]);

  const handleVoteChange = (itemId, option) => {
    if (hasVoted) return;
    
    setSelectedVotes(prev => ({
      ...prev,
      [itemId]: option
    }));
  };

  const validateVotes = () => {
    const requiredItems = agenda.filter(item => item.required);
    const missingVotes = requiredItems.filter(item => !selectedVotes[item.id]);
    return missingVotes.length === 0;
  };

  const handleSubmitVote = () => {
    if (!validateVotes()) {
      alert('Please vote on all required items before submitting.');
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirmVote = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate mock receipt
      const receipt = {
        electionId: election.id,
        electionTitle: election.title,
        voterAddress: '0x742d35Cc6634C0532925a3b8D4C9db96590b5',
        transactionHash: '0x' + Math.random().toString(16).substr(2, 64),
        verificationHash: 'vh_' + Math.random().toString(36).substr(2, 32),
        timestamp: new Date().toISOString(),
        blockNumber: 18500000 + Math.floor(Math.random() * 1000),
        gasUsed: 125000 + Math.floor(Math.random() * 25000),
        votes: agenda.map(item => ({
          item: item.title,
          choice: selectedVotes[item.id] || 'abstain'
        }))
      };
      
      setVoteReceipt(receipt);
      setHasVoted(true);
      localStorage.setItem(`voted_${election.id}`, 'true');
      setShowConfirmation(false);
      setShowReceipt(true);
    } catch (error) {
      console.error('Vote submission failed:', error);
      alert('Vote submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getVotingProgress = () => {
    const totalItems = agenda.length;
    const votedItems = Object.keys(selectedVotes).length;
    return Math.round((votedItems / totalItems) * 100);
  };

  const requiredItemsVoted = () => {
    const requiredItems = agenda.filter(item => item.required);
    return requiredItems.every(item => selectedVotes[item.id]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ElectionStatusBanner />
      
      <main className="max-w-7xl mx-auto px-6 py-8 mt-16">
        <Breadcrumb />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            <ElectionHeader election={election} />
            
            {hasVoted ? (
              <div className="bg-success/10 border border-success/20 rounded-lg p-6 text-center">
                <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-success mb-2">Vote Successfully Submitted</h3>
                <p className="text-sm text-success/80 mb-4">
                  Your vote has been recorded on the blockchain and cannot be changed.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setShowReceipt(true)}
                  iconName="Receipt"
                  iconPosition="left"
                  className="border-success text-success hover:bg-success/10"
                >
                  View Receipt
                </Button>
              </div>
            ) : (
              <>
                <VotingOptionsCard
                  agenda={agenda}
                  selectedVotes={selectedVotes}
                  onVoteChange={handleVoteChange}
                  disabled={hasVoted}
                />
                
                {/* Voting Progress */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Voting Progress</h3>
                    <span className="text-sm text-muted-foreground">
                      {Object.keys(selectedVotes).length} of {agenda.length} items voted
                    </span>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-3 mb-4">
                    <div 
                      className="bg-primary h-3 rounded-full transition-smooth"
                      style={{ width: `${getVotingProgress()}%` }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {requiredItemsVoted() ? (
                        <span className="text-success">✓ All required items completed</span>
                      ) : (
                        <span className="text-warning">⚠ Required items pending</span>
                      )}
                    </div>
                    
                    <Button
                      variant="default"
                      onClick={handleSubmitVote}
                      disabled={!validateVotes()}
                      iconName="Send"
                      iconPosition="left"
                      size="lg"
                    >
                      Submit Vote to Blockchain
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <VotingPowerCard votingPower={votingPower} />
            <ElectionSidebar election={election} stats={stats} />
          </div>
        </div>
      </main>

      {/* Modals */}
      <VoteConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmVote}
        selectedVotes={selectedVotes}
        agenda={agenda}
        votingPower={votingPower}
        isSubmitting={isSubmitting}
      />

      <VoteReceiptModal
        isOpen={showReceipt}
        onClose={() => setShowReceipt(false)}
        receipt={voteReceipt}
      />
    </div>
  );
};

export default ElectionVotingInterface;