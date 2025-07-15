import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SessionTimeoutWarning = ({ isVisible, onExtendSession, onLogout, timeRemaining = 300 }) => {
  const [countdown, setCountdown] = useState(timeRemaining);

  useEffect(() => {
    if (!isVisible) return;

    setCountdown(timeRemaining);
    
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          onLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible, timeRemaining, onLogout]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-md">
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Clock" size={24} className="text-warning" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">Session Expiring Soon</h3>
            <p className="text-sm text-muted-foreground">
              Your session will expire in{' '}
              <span className="font-medium text-warning">{formatTime(countdown)}</span>
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Important Notice</p>
                  <p className="text-xs text-muted-foreground">
                    For security reasons, your session will automatically expire. Any unsaved voting progress will be lost.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="default"
                onClick={onExtendSession}
                iconName="RefreshCw"
                iconPosition="left"
                className="flex-1"
              >
                Extend Session
              </Button>
              
              <Button
                variant="outline"
                onClick={onLogout}
                iconName="LogOut"
                iconPosition="left"
                className="flex-1"
              >
                Sign Out
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Session timeout helps protect your account during critical voting periods
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionTimeoutWarning;