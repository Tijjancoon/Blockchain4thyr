import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const WalletConnection = ({ onWalletConnect, isConnecting }) => {
  const [selectedWallet, setSelectedWallet] = useState(null);

  const walletOptions = [
    {
      id: 'metamask',
      name: 'MetaMask',
      description: 'Connect using your MetaMask browser extension',
      icon: 'Wallet',
      isRecommended: true,
      isAvailable: true
    },
    {
      id: 'company-wallet',
      name: 'Company Wallet',
      description: 'Use your company-issued blockchain wallet',
      icon: 'Building',
      isRecommended: false,
      isAvailable: true
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      description: 'Connect with mobile wallet apps',
      icon: 'Smartphone',
      isRecommended: false,
      isAvailable: false
    }
  ];

  const handleWalletSelect = (walletId) => {
    setSelectedWallet(walletId);
    onWalletConnect(walletId);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-8 shadow-card">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Connect Your Wallet</h2>
        <p className="text-muted-foreground">
          Choose a wallet to securely store your voting tokens and participate in elections
        </p>
      </div>

      <div className="space-y-4">
        {walletOptions.map((wallet) => (
          <div
            key={wallet.id}
            className={`relative border rounded-lg p-4 transition-smooth cursor-pointer ${
              wallet.isAvailable
                ? selectedWallet === wallet.id
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50' :'border-border bg-muted/30 cursor-not-allowed opacity-60'
            }`}
            onClick={() => wallet.isAvailable && handleWalletSelect(wallet.id)}
          >
            {wallet.isRecommended && (
              <div className="absolute -top-2 left-4">
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                  Recommended
                </span>
              </div>
            )}

            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                wallet.isAvailable ? 'bg-primary/10' : 'bg-muted'
              }`}>
                <Icon 
                  name={wallet.icon} 
                  size={24} 
                  color={wallet.isAvailable ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} 
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-foreground">{wallet.name}</h3>
                  {!wallet.isAvailable && (
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      Coming Soon
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{wallet.description}</p>
              </div>

              {wallet.isAvailable && (
                <div className="flex items-center">
                  {selectedWallet === wallet.id && isConnecting ? (
                    <Icon name="Loader2" size={20} className="animate-spin text-primary" />
                  ) : (
                    <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Security Notice</h4>
            <p className="text-sm text-muted-foreground">
              Your wallet will be used to receive voting tokens and cast votes securely on the blockchain. 
              Never share your private keys or seed phrases with anyone.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button
          variant="outline"
          size="sm"
          fullWidth
          iconName="HelpCircle"
          iconPosition="left"
        >
          Need Help Setting Up a Wallet?
        </Button>
      </div>
    </div>
  );
};

export default WalletConnection;