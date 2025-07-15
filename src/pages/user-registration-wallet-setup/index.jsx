import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PreAuthHeader from './components/PreAuthHeader';
import RegistrationForm from './components/RegistrationForm';
import WalletConnection from './components/WalletConnection';
import OnboardingGuide from './components/OnboardingGuide';
import WalletConfirmationModal from './components/WalletConfirmationModal';
import Icon from '../../components/AppIcon';

const UserRegistrationWalletSetup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('registration'); // 'registration', 'wallet', 'confirmation'
  const [isLoading, setIsLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const [walletData, setWalletData] = useState(null);

  const handleRegistrationSubmit = async (formData) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setRegistrationData(formData);
      setCurrentStep('wallet');
      setIsLoading(false);
    }, 2000);
  };

  const handleWalletConnect = async (walletType) => {
    setIsConnecting(true);
    
    // Simulate wallet connection
    setTimeout(() => {
      const mockWalletData = {
        address: '0x742d35Cc6634C0532925a3b8D4C9db96590b5',
        balance: 0,
        network: 'Ethereum Mainnet',
        walletType: walletType === 'metamask' ? 'MetaMask' : 'Company Wallet',
        votingTokens: 150,
        shareholdingPercentage: 2.5
      };
      
      setWalletData(mockWalletData);
      setIsConnecting(false);
      setShowConfirmationModal(true);
    }, 3000);
  };

  const handleContinueToDashboard = () => {
    setShowConfirmationModal(false);
    navigate('/dashboard');
  };

  const handleCloseModal = () => {
    setShowConfirmationModal(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <PreAuthHeader />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Join ChainVote Platform
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Secure, transparent, and auditable voting for corporate governance. 
            Register your account and connect your blockchain wallet to get started.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${
              currentStep === 'registration' ? 'text-primary' : 
              currentStep === 'wallet' ? 'text-success' : 'text-success'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 'registration' ? 'bg-primary text-primary-foreground' :
                currentStep === 'wallet' ? 'bg-success text-success-foreground' : 'bg-success text-success-foreground'
              }`}>
                {currentStep === 'registration' ? (
                  <Icon name="User" size={16} />
                ) : (
                  <Icon name="Check" size={16} />
                )}
              </div>
              <span className="font-medium">Registration</span>
            </div>
            
            <div className={`w-12 h-0.5 ${
              currentStep === 'wallet' ? 'bg-primary' : 'bg-border'
            }`} />
            
            <div className={`flex items-center space-x-2 ${
              currentStep === 'wallet' ? 'text-primary' : 'text-muted-foreground'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 'wallet' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                <Icon name="Wallet" size={16} />
              </div>
              <span className="font-medium">Wallet Setup</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2">
            {currentStep === 'registration' && (
              <RegistrationForm 
                onSubmit={handleRegistrationSubmit}
                isLoading={isLoading}
              />
            )}
            
            {currentStep === 'wallet' && (
              <WalletConnection 
                onWalletConnect={handleWalletConnect}
                isConnecting={isConnecting}
              />
            )}
          </div>

          {/* Right Column - Guidance */}
          <div className="lg:col-span-1">
            <OnboardingGuide />
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-12 border-t border-border">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-2">Trusted by Leading Companies</h2>
            <p className="text-muted-foreground">
              Enterprise-grade security and compliance for corporate governance
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <Icon name="Shield" size={20} />
              <span className="font-medium">SSL Secured</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <Icon name="Lock" size={20} />
              <span className="font-medium">256-bit Encryption</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <Icon name="Award" size={20} />
              <span className="font-medium">SOC 2 Compliant</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <Icon name="CheckCircle" size={20} />
              <span className="font-medium">GDPR Ready</span>
            </div>
          </div>
        </div>
      </main>

      {/* Wallet Confirmation Modal */}
      <WalletConfirmationModal
        isOpen={showConfirmationModal}
        onClose={handleCloseModal}
        walletData={walletData}
        onContinue={handleContinueToDashboard}
      />
    </div>
  );
};

export default UserRegistrationWalletSetup;