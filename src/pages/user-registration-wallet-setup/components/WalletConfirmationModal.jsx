import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WalletConfirmationModal = ({ isOpen, onClose, walletData, onContinue }) => {
  if (!isOpen) return null;

  const mockWalletData = {
    address: '0x742d35Cc6634C0532925a3b8D4C9db96590b5',
    balance: 0,
    network: 'Ethereum Mainnet',
    walletType: 'MetaMask',
    votingTokens: 150,
    shareholdingPercentage: 2.5
  };

  const data = walletData || mockWalletData;

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
      <div className="bg-card border border-border rounded-lg max-w-md w-full shadow-modal">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                <Icon name="CheckCircle" size={24} className="text-success" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Wallet Connected</h2>
                <p className="text-sm text-muted-foreground">Successfully linked to ChainVote</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          {/* Wallet Details */}
          <div className="space-y-4 mb-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-3">Wallet Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Wallet Type:</span>
                  <span className="text-sm font-medium text-foreground">{data.walletType}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Address:</span>
                  <span className="text-sm font-mono text-foreground">{formatAddress(data.address)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Network:</span>
                  <span className="text-sm font-medium text-foreground">{data.network}</span>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-3">Voting Rights</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Voting Tokens:</span>
                  <span className="text-sm font-semibold text-primary">{data.votingTokens} CVT</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Shareholding:</span>
                  <span className="text-sm font-medium text-foreground">{data.shareholdingPercentage}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground text-sm mb-1">Important Security Notice</h4>
                <p className="text-xs text-muted-foreground">
                  Your wallet is now connected to ChainVote. Keep your private keys secure and never share them with anyone. 
                  Your voting tokens will be automatically allocated based on your shareholding percentage.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="flex-1"
            >
              Close
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={onContinue}
              iconName="ArrowRight"
              iconPosition="right"
              className="flex-1"
            >
              Continue to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletConfirmationModal;