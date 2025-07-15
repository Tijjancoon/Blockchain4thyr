import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import LoginForm from './components/LoginForm';
import TrustIndicators from './components/TrustIndicators';
import WalletConnectionModal from './components/WalletConnectionModal';
import TwoFactorModal from './components/TwoFactorModal';
import SessionTimeoutWarning from './components/SessionTimeoutWarning';

const ShareholderLogin = () => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isTwoFactorModalOpen, setIsTwoFactorModalOpen] = useState(false);
  const [isSessionWarningVisible, setIsSessionWarningVisible] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // Simulate session timeout warning after 25 minutes of inactivity
  useEffect(() => {
    const sessionTimer = setTimeout(() => {
      setIsSessionWarningVisible(true);
    }, 25 * 60 * 1000); // 25 minutes

    return () => clearTimeout(sessionTimer);
  }, []);

  const handleWalletConnect = () => {
    setIsWalletModalOpen(true);
  };

  const handleTwoFactorRequired = (email = 'john.smith@company.com') => {
    setUserEmail(email);
    setIsTwoFactorModalOpen(true);
  };

  const handleExtendSession = () => {
    setIsSessionWarningVisible(false);
    console.log('Session extended');
  };

  const handleSessionLogout = () => {
    setIsSessionWarningVisible(false);
    console.log('Session expired - logging out');
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Shareholder Login - ChainVote</title>
        <meta name="description" content="Secure login for shareholders to access their voting dashboard and participate in corporate governance decisions." />
      </Helmet>

      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="LogIn" size={32} className="text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Shareholder Login
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access your secure voting dashboard to participate in corporate governance decisions and manage your voting rights.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Login Form Section */}
            <div className="flex flex-col justify-center">
              <div className="bg-card border border-border rounded-lg shadow-card p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-muted-foreground">
                    Sign in to your account to access voting dashboard
                  </p>
                </div>

                <LoginForm
                  onWalletConnect={handleWalletConnect}
                  onTwoFactorRequired={handleTwoFactorRequired}
                />

                {/* Demo Credentials Info */}
                <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Icon name="Info" size={16} className="text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Demo Credentials</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Email: john.smith@company.com
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Password: ChainVote2024!
                      </p>
                      <p className="text-xs text-muted-foreground">
                        2FA Code: 123456
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators Section */}
            <div className="flex flex-col justify-center">
              <div className="space-y-6">
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    Secure & Transparent
                  </h2>
                  <p className="text-muted-foreground">
                    Your voting rights are protected by enterprise-grade security and blockchain technology.
                  </p>
                </div>

                <TrustIndicators />
              </div>
            </div>
          </div>

          {/* Additional Security Information */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-muted/30 rounded-lg p-8">
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Why Choose ChainVote?
                </h3>
                <p className="text-muted-foreground">
                  Built for modern corporate governance with uncompromising security
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon name="Shield" size={24} className="text-primary" />
                  </div>
                  <h4 className="font-medium text-foreground mb-2">Bank-Level Security</h4>
                  <p className="text-sm text-muted-foreground">
                    Multi-layer encryption and secure key management protect your voting rights
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon name="Eye" size={24} className="text-success" />
                  </div>
                  <h4 className="font-medium text-foreground mb-2">Full Transparency</h4>
                  <p className="text-sm text-muted-foreground">
                    Complete audit trails and verifiable results ensure election integrity
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon name="Zap" size={24} className="text-accent" />
                  </div>
                  <h4 className="font-medium text-foreground mb-2">Real-Time Results</h4>
                  <p className="text-sm text-muted-foreground">
                    Instant vote counting and live election monitoring for immediate insights
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <WalletConnectionModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />

      <TwoFactorModal
        isOpen={isTwoFactorModalOpen}
        onClose={() => setIsTwoFactorModalOpen(false)}
        userEmail={userEmail}
      />

      <SessionTimeoutWarning
        isVisible={isSessionWarningVisible}
        onExtendSession={handleExtendSession}
        onLogout={handleSessionLogout}
        timeRemaining={300}
      />
    </div>
  );
};

export default ShareholderLogin;