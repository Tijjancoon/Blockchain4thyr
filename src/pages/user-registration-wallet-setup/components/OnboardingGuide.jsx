import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OnboardingGuide = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 'register',
      title: 'Create Account',
      description: 'Provide your shareholder details and company verification code',
      icon: 'UserPlus',
      status: 'current'
    },
    {
      id: 'wallet',
      title: 'Connect Wallet',
      description: 'Link your blockchain wallet to receive voting tokens',
      icon: 'Wallet',
      status: 'pending'
    },
    {
      id: 'verify',
      title: 'Verify Identity',
      description: 'Complete identity verification for secure voting access',
      icon: 'Shield',
      status: 'pending'
    },
    {
      id: 'tokens',
      title: 'Receive Tokens',
      description: 'Get your voting tokens based on shareholding percentage',
      icon: 'Coins',
      status: 'pending'
    }
  ];

  const securityFeatures = [
    {
      icon: 'Lock',
      title: 'End-to-End Encryption',
      description: 'All voting data is encrypted and secured'
    },
    {
      icon: 'Shield',
      title: 'Blockchain Verified',
      description: 'Immutable voting records on blockchain'
    },
    {
      icon: 'Eye',
      title: 'Anonymous Voting',
      description: 'Your vote remains private and anonymous'
    },
    {
      icon: 'CheckCircle',
      title: 'Audit Trail',
      description: 'Complete transparency with audit capabilities'
    }
  ];

  const complianceBadges = [
    { name: 'SOC 2 Compliant', icon: 'Award' },
    { name: 'GDPR Ready', icon: 'Shield' },
    { name: 'ISO 27001', icon: 'Certificate' }
  ];

  return (
    <div className="space-y-8">
      {/* Setup Progress */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Setup Progress</h3>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                index === activeStep 
                  ? 'bg-primary text-primary-foreground' 
                  : index < activeStep 
                    ? 'bg-success text-success-foreground'
                    : 'bg-muted text-muted-foreground'
              }`}>
                {index < activeStep ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step.icon} size={16} />
                )}
              </div>
              <div className="flex-1">
                <h4 className={`font-medium ${
                  index === activeStep ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Features */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Security & Trust</h3>
        <div className="grid grid-cols-1 gap-4">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={feature.icon} size={16} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground text-sm">{feature.title}</h4>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Badges */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Compliance</h3>
        <div className="grid grid-cols-1 gap-3">
          {complianceBadges.map((badge, index) => (
            <div key={index} className="flex items-center space-x-3 p-2 bg-muted/50 rounded-md">
              <Icon name={badge.icon} size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">{badge.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Need Assistance?</h3>
        <div className="space-y-3">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="MessageCircle"
            iconPosition="left"
          >
            Live Chat Support
          </Button>
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            iconName="FileText"
            iconPosition="left"
          >
            Setup Guide
          </Button>
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            iconName="Phone"
            iconPosition="left"
          >
            Call Support: 1-800-VOTE-NOW
          </Button>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Quick Tip</h4>
            <p className="text-sm text-muted-foreground">
              Make sure to save your wallet recovery phrase in a secure location. 
              You'll need it to access your voting tokens if you change devices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingGuide;