import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TwoFactorModal = ({ isOpen, onClose, userEmail }) => {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);

  // Mock 2FA code for demonstration
  const mockTwoFactorCode = '123456';

  useEffect(() => {
    if (!isOpen) {
      setVerificationCode('');
      setError('');
      setTimeRemaining(300);
      setCanResend(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setVerificationCode(value);
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (verificationCode.length !== 6) {
      setError('Please enter a 6-digit verification code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (verificationCode === mockTwoFactorCode) {
        navigate('/dashboard');
        onClose();
      } else {
        setError('Invalid verification code. Use: 123456');
      }
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setCanResend(false);
    setTimeRemaining(300);
    setError('');
    
    try {
      // Simulate resend API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Verification code resent');
    } catch (error) {
      setError('Failed to resend code. Please try again.');
    }
  };

  const handleUseBackupCode = () => {
    console.log('Use backup code clicked');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Two-Factor Authentication</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            disabled={isLoading}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Shield" size={24} className="text-primary" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">Verify Your Identity</h3>
            <p className="text-sm text-muted-foreground">
              We've sent a 6-digit verification code to{' '}
              <span className="font-medium text-foreground">{userEmail}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-error/10 border border-error/20 rounded-md">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertCircle" size={16} className="text-error" />
                  <p className="text-sm text-error">{error}</p>
                </div>
              </div>
            )}

            <div>
              <Input
                label="Verification Code"
                type="text"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={handleCodeChange}
                error={error}
                required
                disabled={isLoading}
                className="text-center text-lg tracking-widest"
              />
              
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Code expires in: {formatTime(timeRemaining)}
                </span>
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="text-primary hover:text-primary/80 font-medium transition-smooth"
                    disabled={isLoading}
                  >
                    Resend Code
                  </button>
                ) : (
                  <span className="text-muted-foreground">Resend available in {formatTime(timeRemaining)}</span>
                )}
              </div>
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              fullWidth
              loading={isLoading}
              iconName="Shield"
              iconPosition="left"
              disabled={verificationCode.length !== 6}
            >
              Verify & Continue
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleUseBackupCode}
                className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                disabled={isLoading}
              >
                Use backup code instead
              </button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Security Notice</p>
                <p className="text-xs text-muted-foreground">
                  This additional security step helps protect your voting rights and ensures only authorized access to your account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorModal;