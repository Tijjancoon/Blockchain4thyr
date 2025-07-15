import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VoteConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  selectedVotes, 
  agenda, 
  votingPower, 
  isSubmitting 
}) => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  if (!isOpen) return null;

  const getVoteLabel = (vote) => {
    switch (vote) {
      case 'yes': return { label: 'Yes', color: 'text-success', icon: 'CheckCircle' };
      case 'no': return { label: 'No', color: 'text-error', icon: 'XCircle' };
      case 'abstain': return { label: 'Abstain', color: 'text-warning', icon: 'MinusCircle' };
      default: return { label: 'Not Voted', color: 'text-muted-foreground', icon: 'Circle' };
    }
  };

  const estimatedGasFee = 0.0025; // ETH
  const estimatedGasFeeUSD = 2.50;

  const handleConfirm = () => {
    if (agreedToTerms) {
      onConfirm();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
      <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Vote" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Confirm Your Vote</h3>
                <p className="text-sm text-muted-foreground">Review your selections before submitting</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              disabled={isSubmitting}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Vote Summary */}
          <div>
            <h4 className="font-medium text-foreground mb-4">Vote Summary</h4>
            <div className="space-y-3">
              {agenda.map((item, index) => {
                const vote = selectedVotes[item.id];
                const voteInfo = getVoteLabel(vote);
                
                return (
                  <div key={item.id} className="flex items-start justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                          {index + 1}
                        </span>
                        <span className="text-sm font-medium text-foreground">{item.title}</span>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-1 ${voteInfo.color}`}>
                      <Icon name={voteInfo.icon} size={16} />
                      <span className="text-sm font-medium">{voteInfo.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Voting Power */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3">Your Voting Power</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Token Balance</div>
                <div className="text-lg font-bold text-foreground">{votingPower.tokens.toLocaleString()} CVT</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Voting Weight</div>
                <div className="text-lg font-bold text-foreground">{votingPower.percentage}%</div>
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3">Transaction Details</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Network</span>
                <span className="text-foreground">Ethereum Mainnet</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated Gas Fee</span>
                <span className="text-foreground">{estimatedGasFee} ETH (~${estimatedGasFeeUSD})</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Transaction Type</span>
                <span className="text-foreground">Vote Submission</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Confirmation Time</span>
                <span className="text-foreground">~2-5 minutes</span>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
              <div>
                <h5 className="font-medium text-foreground mb-2">Important Notice</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Your vote is final and cannot be changed after blockchain confirmation</li>
                  <li>• The transaction will be recorded permanently on the blockchain</li>
                  <li>• You will receive a cryptographic receipt for verification</li>
                  <li>• Gas fees are non-refundable even if the transaction fails</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="terms-agreement"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1"
              disabled={isSubmitting}
            />
            <label htmlFor="terms-agreement" className="text-sm text-muted-foreground">
              I understand that my vote is final and cannot be changed. I agree to the blockchain transaction 
              and acknowledge the gas fees. I confirm that my vote selections are accurate.
            </label>
          </div>
        </div>

        <div className="p-6 border-t border-border">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleConfirm}
              disabled={!agreedToTerms || isSubmitting}
              loading={isSubmitting}
              iconName="Send"
              iconPosition="left"
            >
              {isSubmitting ? 'Submitting Vote...' : 'Submit Vote to Blockchain'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteConfirmationModal;