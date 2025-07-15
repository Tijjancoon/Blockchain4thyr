import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ElectionStatusBanner = () => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  // Mock election data
  const activeElection = {
    id: 'election-2024-q3',
    title: 'Q3 2024 Board of Directors Election',
    endDate: new Date('2024-07-16T17:00:00'),
    status: 'active',
    participationRate: 67,
    userVoted: false,
    urgentDeadline: true
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = activeElection.endDate - now;
      
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        setTimeRemaining({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [activeElection.endDate]);

  const handleVoteNow = () => {
    console.log('Navigating to voting interface...');
  };

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  if (isDismissed || !activeElection) {
    return null;
  }

  const getStatusColor = () => {
    if (timeRemaining.days === 0 && timeRemaining.hours < 6) {
      return 'bg-error border-error text-error-foreground';
    } else if (timeRemaining.days === 0 && timeRemaining.hours < 24) {
      return 'bg-warning border-warning text-warning-foreground';
    } else if (!activeElection.userVoted) {
      return 'bg-primary border-primary text-primary-foreground';
    }
    return 'bg-success border-success text-success-foreground';
  };

  const getStatusIcon = () => {
    if (timeRemaining.days === 0 && timeRemaining.hours < 6) {
      return 'AlertTriangle';
    } else if (!activeElection.userVoted) {
      return 'Clock';
    }
    return 'CheckCircle';
  };

  const getStatusMessage = () => {
    if (!activeElection.userVoted) {
      return 'Your vote is required';
    }
    return 'Vote submitted successfully';
  };

  return (
    <div className={`w-full border-l-4 ${getStatusColor()} transition-smooth`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Icon name={getStatusIcon()} size={24} />
            
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-1">
                <h3 className="font-semibold text-lg">{activeElection.title}</h3>
                <span className="text-sm opacity-90">
                  {getStatusMessage()}
                </span>
              </div>
              
              <div className="flex items-center space-x-6 text-sm opacity-90">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} />
                  <span>
                    Ends in: {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} />
                  <span>{activeElection.participationRate}% participation</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} />
                  <span>Blockchain secured</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {!activeElection.userVoted && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleVoteNow}
                iconName="Vote"
                iconPosition="left"
                className="bg-white/20 hover:bg-white/30 text-current border-white/30"
              >
                Vote Now
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDismiss}
              className="text-current hover:bg-white/20"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 bg-white/20 rounded-full h-2">
          <div 
            className="bg-white/60 h-2 rounded-full transition-smooth"
            style={{ width: `${activeElection.participationRate}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ElectionStatusBanner;