import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WalletConnectionModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [connectionStatus, setConnectionStatus] = useState('idle'); // idle, connecting, connected, error
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const walletOptions = [
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: 'Wallet',
      description: 'Connect using MetaMask browser extension',
      installed: true,
      recommended: true
    },
    {
      id: 'company-wallet',
      name: 'Company Wallet',
      icon: 'Building',
      description: 'Use your company-issued wallet',
      installed: true,
      recommended: false
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: 'Smartphone',
      description: 'Connect with mobile wallet apps',
      installed: true,
      recommended: false
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      icon: 'CreditCard',
      description: 'Connect using Coinbase Wallet',
      installed: false,
      recommended: false
    }
  ];

  useEffect(() => {
    if (!isOpen) {
      setConnectionStatus('idle');
      setSelectedWallet(null);
      setErrorMessage('');
    }
  }, [isOpen]);

  const handleWalletSelect = async (wallet) => {
    setSelectedWallet(wallet.id);
    setConnectionStatus('connecting');
    setErrorMessage('');

    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (wallet.installed) {
        setConnectionStatus('connected');
        
        // Simulate successful connection
        setTimeout(() => {
          navigate('/dashboard');
          onClose();
        }, 1500);
      } else {
        throw new Error(`${wallet.name} is not installed. Please install the wallet extension first.`);
      }
    } catch (error) {
      setConnectionStatus('error');
      setErrorMessage(error.message);
    }
  };

  const handleRetry = () => {
    setConnectionStatus('idle');
    setSelectedWallet(null);
    setErrorMessage('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Connect Wallet</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            disabled={connectionStatus === 'connecting'}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6">
          {connectionStatus === 'idle' && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground mb-6">
                Choose your preferred wallet to securely access your voting dashboard.
              </p>

              {walletOptions.map((wallet) => (
                <button
                  key={wallet.id}
                  onClick={() => handleWalletSelect(wallet)}
                  className="w-full p-4 border border-border rounded-lg hover:bg-muted/50 transition-smooth text-left group"
                  disabled={!wallet.installed}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={wallet.icon} size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-foreground">{wallet.name}</h3>
                        {wallet.recommended && (
                          <span className="text-xs bg-success/10 text-success px-2 py-1 rounded">
                            Recommended
                          </span>
                        )}
                        {!wallet.installed && (
                          <span className="text-xs bg-warning/10 text-warning px-2 py-1 rounded">
                            Not Installed
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{wallet.description}</p>
                    </div>
                    <Icon 
                      name="ChevronRight" 
                      size={16} 
                      className={`text-muted-foreground group-hover:text-foreground transition-smooth ${
                        !wallet.installed ? 'opacity-50' : ''
                      }`} 
                    />
                  </div>
                </button>
              ))}

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Icon name="Info" size={16} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Secure Connection</p>
                    <p className="text-xs text-muted-foreground">
                      Your wallet connection is encrypted and secure. We never store your private keys.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {connectionStatus === 'connecting' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="animate-spin">
                  <Icon name="Loader2" size={24} className="text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Connecting...</h3>
              <p className="text-sm text-muted-foreground">
                Please approve the connection in your {walletOptions.find(w => w.id === selectedWallet)?.name} wallet.
              </p>
            </div>
          )}

          {connectionStatus === 'connected' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={24} className="text-success" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Connected Successfully!</h3>
              <p className="text-sm text-muted-foreground">
                Redirecting to your dashboard...
              </p>
            </div>
          )}

          {connectionStatus === 'error' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="AlertCircle" size={24} className="text-error" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Connection Failed</h3>
              <p className="text-sm text-muted-foreground mb-6">{errorMessage}</p>
              
              <div className="space-y-3">
                <Button
                  variant="default"
                  onClick={handleRetry}
                  iconName="RefreshCw"
                  iconPosition="left"
                  fullWidth
                >
                  Try Again
                </Button>
                <Button
                  variant="outline"
                  onClick={onClose}
                  fullWidth
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletConnectionModal;