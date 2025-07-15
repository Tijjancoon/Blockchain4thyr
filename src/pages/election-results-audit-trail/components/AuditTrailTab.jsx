import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AuditTrailTab = ({ selectedElection }) => {
  const [searchHash, setSearchHash] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const auditLogs = [
    {
      id: 'tx_001',
      timestamp: '2024-07-14T09:15:23Z',
      type: 'vote_cast',
      blockHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
      transactionHash: '0x9876543210fedcba0987654321fedcba0987654321fedcba0987654321fedcba',
      voterHash: '0xabc123def456789012345678901234567890abcdef123456789012345678901',
      voteChoice: 'encrypted',
      gasUsed: 21000,
      status: 'confirmed',
      blockNumber: 18234567
    },
    {
      id: 'tx_002',
      timestamp: '2024-07-14T09:16:45Z',
      type: 'proxy_delegation',
      blockHash: '0x2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890ab',
      transactionHash: '0x8765432109edcba09876543210edcba09876543210edcba09876543210edcba0',
      voterHash: '0xdef456789012345678901234567890abcdef123456789012345678901234567',
      proxyHash: '0x123456789012345678901234567890abcdef123456789012345678901234567',
      gasUsed: 35000,
      status: 'confirmed',
      blockNumber: 18234568
    },
    {
      id: 'tx_003',
      timestamp: '2024-07-14T09:18:12Z',
      type: 'vote_cast',
      blockHash: '0x3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcd',
      transactionHash: '0x7654321098dcba098765432109dcba098765432109dcba098765432109dcba09',
      voterHash: '0x456789012345678901234567890abcdef123456789012345678901234567890',
      voteChoice: 'encrypted',
      gasUsed: 21000,
      status: 'confirmed',
      blockNumber: 18234569
    },
    {
      id: 'tx_004',
      timestamp: '2024-07-14T09:19:33Z',
      type: 'election_update',
      blockHash: '0x4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1',
      transactionHash: '0x654321098dcba0987654321098dcba0987654321098dcba0987654321098dcba',
      adminHash: '0x789012345678901234567890abcdef123456789012345678901234567890abc',
      action: 'status_update',
      gasUsed: 45000,
      status: 'confirmed',
      blockNumber: 18234570
    }
  ];

  const blockchainMetrics = {
    totalTransactions: 1829,
    totalBlocks: 234,
    averageGasUsed: 28500,
    networkConfirmations: 12,
    lastBlockTime: '2024-07-14T17:00:15Z',
    consensusAlgorithm: 'Proof of Authority',
    networkId: 'chainvote-mainnet'
  };

  const handleVerifyHash = () => {
    if (!searchHash.trim()) return;

    // Mock verification logic
    const mockResult = {
      found: true,
      transactionHash: searchHash,
      blockNumber: 18234567,
      timestamp: '2024-07-14T09:15:23Z',
      status: 'confirmed',
      voteVerified: true,
      anonymityPreserved: true
    };

    setVerificationResult(mockResult);
  };

  const handleDownloadAuditReport = () => {
    console.log('Downloading comprehensive audit report...');
  };

  const handleExportLogs = () => {
    console.log('Exporting audit logs...');
  };

  const formatHash = (hash) => {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  };

  const getTransactionTypeIcon = (type) => {
    switch (type) {
      case 'vote_cast': return 'Vote';
      case 'proxy_delegation': return 'Users';
      case 'election_update': return 'Settings';
      default: return 'Activity';
    }
  };

  const getTransactionTypeColor = (type) => {
    switch (type) {
      case 'vote_cast': return 'text-success';
      case 'proxy_delegation': return 'text-primary';
      case 'election_update': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Blockchain Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Blockchain Verification</h3>
          <div className="flex items-center space-x-2 text-success">
            <Icon name="Shield" size={20} />
            <span className="text-sm font-medium">Network Secured</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Database" size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground">Total Transactions</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{blockchainMetrics.totalTransactions.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Election period</p>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Blocks" size={16} className="text-success" />
              <span className="text-sm text-muted-foreground">Blocks Mined</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{blockchainMetrics.totalBlocks}</p>
            <p className="text-xs text-muted-foreground">Confirmed blocks</p>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Zap" size={16} className="text-warning" />
              <span className="text-sm text-muted-foreground">Avg Gas Used</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{blockchainMetrics.averageGasUsed.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Per transaction</p>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="CheckCircle" size={16} className="text-accent" />
              <span className="text-sm text-muted-foreground">Confirmations</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{blockchainMetrics.networkConfirmations}</p>
            <p className="text-xs text-muted-foreground">Network depth</p>
          </div>
        </div>
      </div>

      {/* Vote Verification Tool */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-semibold text-foreground mb-4">Vote Verification Tool</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Enter your anonymous vote receipt hash to verify your vote was recorded correctly while maintaining privacy.
        </p>

        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Enter transaction hash (0x...)"
              value={searchHash}
              onChange={(e) => setSearchHash(e.target.value)}
              className="font-mono text-sm"
            />
          </div>
          <Button 
            onClick={handleVerifyHash}
            iconName="Search"
            iconPosition="left"
            disabled={!searchHash.trim()}
          >
            Verify
          </Button>
        </div>

        {verificationResult && (
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <span className="font-semibold text-success">Vote Verified Successfully</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Transaction Hash:</span>
                <p className="font-mono text-foreground break-all">{verificationResult.transactionHash}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Block Number:</span>
                <p className="text-foreground">{verificationResult.blockNumber.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Timestamp:</span>
                <p className="text-foreground">{new Date(verificationResult.timestamp).toLocaleString()}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <p className="text-success font-medium">Confirmed & Immutable</p>
              </div>
            </div>
            <div className="mt-3 flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1 text-success">
                <Icon name="Shield" size={14} />
                <span>Vote integrity verified</span>
              </div>
              <div className="flex items-center space-x-1 text-success">
                <Icon name="Eye" size={14} />
                <span>Anonymity preserved</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Transaction Logs */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-semibold text-foreground">Transaction Audit Trail</h4>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleExportLogs}
              iconName="Download"
              iconPosition="left"
            >
              Export Logs
            </Button>
            <Button 
              size="sm"
              onClick={handleDownloadAuditReport}
              iconName="FileText"
              iconPosition="left"
            >
              Audit Report
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 text-muted-foreground font-medium">Type</th>
                <th className="text-left py-3 text-muted-foreground font-medium">Timestamp</th>
                <th className="text-left py-3 text-muted-foreground font-medium">Transaction Hash</th>
                <th className="text-right py-3 text-muted-foreground font-medium">Block</th>
                <th className="text-right py-3 text-muted-foreground font-medium">Gas Used</th>
                <th className="text-center py-3 text-muted-foreground font-medium">Status</th>
                <th className="text-center py-3 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log.id} className="border-b border-border/50 hover:bg-muted/50 transition-smooth">
                  <td className="py-3">
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={getTransactionTypeIcon(log.type)} 
                        size={16} 
                        className={getTransactionTypeColor(log.type)}
                      />
                      <span className="text-foreground capitalize">
                        {log.type.replace('_', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 text-foreground">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3 font-mono text-foreground">
                    {formatHash(log.transactionHash)}
                  </td>
                  <td className="text-right py-3 text-foreground">
                    {log.blockNumber.toLocaleString()}
                  </td>
                  <td className="text-right py-3 text-foreground">
                    {log.gasUsed.toLocaleString()}
                  </td>
                  <td className="text-center py-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                      {log.status}
                    </span>
                  </td>
                  <td className="text-center py-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedTransaction(log)}
                      iconName="Eye"
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Transaction Details</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedTransaction(null)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Transaction Hash</label>
                    <p className="font-mono text-sm text-foreground break-all bg-muted p-2 rounded">
                      {selectedTransaction.transactionHash}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Block Hash</label>
                    <p className="font-mono text-sm text-foreground break-all bg-muted p-2 rounded">
                      {selectedTransaction.blockHash}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Block Number</label>
                    <p className="text-foreground bg-muted p-2 rounded">
                      {selectedTransaction.blockNumber.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Gas Used</label>
                    <p className="text-foreground bg-muted p-2 rounded">
                      {selectedTransaction.gasUsed.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Timestamp</label>
                    <p className="text-foreground bg-muted p-2 rounded">
                      {new Date(selectedTransaction.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Status</label>
                    <p className="text-success bg-muted p-2 rounded font-medium">
                      {selectedTransaction.status}
                    </p>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Shield" size={16} className="text-success" />
                    <span className="text-sm font-medium text-success">Privacy Protected</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Vote content and voter identity are cryptographically protected. Only vote validity and timestamp are publicly verifiable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditTrailTab;