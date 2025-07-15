import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VoteReceiptModal = ({ isOpen, onClose, receipt }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !receipt) return null;

  const handleCopyReceipt = async () => {
    try {
      await navigator.clipboard.writeText(receipt.verificationHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy receipt:', err);
    }
  };

  const handleDownloadReceipt = () => {
    const receiptData = {
      electionId: receipt.electionId,
      electionTitle: receipt.electionTitle,
      voterAddress: receipt.voterAddress,
      transactionHash: receipt.transactionHash,
      verificationHash: receipt.verificationHash,
      timestamp: receipt.timestamp,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed,
      votes: receipt.votes
    };

    const blob = new Blob([JSON.stringify(receiptData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vote-receipt-${receipt.electionId}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
      <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                <Icon name="CheckCircle" size={20} className="text-success" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Vote Submitted Successfully</h3>
                <p className="text-sm text-muted-foreground">Your cryptographic receipt is ready</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Success Message */}
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="Shield" size={20} className="text-success" />
              <div>
                <h4 className="font-medium text-success">Vote Recorded on Blockchain</h4>
                <p className="text-sm text-success/80 mt-1">
                  Your vote has been permanently recorded and cannot be altered. The transaction is now immutable.
                </p>
              </div>
            </div>
          </div>

          {/* Receipt Details */}
          <div>
            <h4 className="font-medium text-foreground mb-4">Receipt Details</h4>
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Election</div>
                  <div className="text-sm font-medium text-foreground">{receipt.electionTitle}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Submission Time</div>
                  <div className="text-sm font-medium text-foreground">{formatDate(receipt.timestamp)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Voter Address</div>
                  <div className="text-sm font-mono text-foreground">{formatAddress(receipt.voterAddress)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Block Number</div>
                  <div className="text-sm font-mono text-foreground">#{receipt.blockNumber}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Hash */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Blockchain Transaction</h4>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Transaction Hash</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(`https://etherscan.io/tx/${receipt.transactionHash}`, '_blank')}
                  iconName="ExternalLink"
                  iconPosition="right"
                  className="text-xs"
                >
                  View on Etherscan
                </Button>
              </div>
              <div className="text-sm font-mono text-foreground bg-background p-2 rounded border break-all">
                {receipt.transactionHash}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Gas Used: {receipt.gasUsed.toLocaleString()}</span>
                <span>Network: Ethereum Mainnet</span>
              </div>
            </div>
          </div>

          {/* Verification Hash */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Anonymous Verification</h4>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Verification Hash</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyReceipt}
                  iconName={copied ? "Check" : "Copy"}
                  iconPosition="left"
                  className="text-xs"
                >
                  {copied ? 'Copied!' : 'Copy Hash'}
                </Button>
              </div>
              <div className="text-sm font-mono text-foreground bg-background p-2 rounded border break-all">
                {receipt.verificationHash}
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Use this hash to verify your vote in the audit trail without revealing your identity
              </div>
            </div>
          </div>

          {/* Vote Summary */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Your Votes</h4>
            <div className="space-y-2">
              {receipt.votes.map((vote, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm text-foreground">{vote.item}</span>
                  <span className={`text-sm font-medium ${
                    vote.choice === 'yes' ? 'text-success' : 
                    vote.choice === 'no' ? 'text-error' : 'text-warning'
                  }`}>
                    {vote.choice.charAt(0).toUpperCase() + vote.choice.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-warning mt-0.5" />
              <div>
                <h5 className="font-medium text-foreground mb-2">Keep This Receipt Safe</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Save the verification hash to verify your vote later</li>
                  <li>• The transaction hash proves your vote was recorded</li>
                  <li>• This receipt does not reveal how you voted to others</li>
                  <li>• Download a copy for your records</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleDownloadReceipt}
              iconName="Download"
              iconPosition="left"
            >
              Download Receipt
            </Button>
            <Button
              variant="default"
              onClick={onClose}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteReceiptModal;