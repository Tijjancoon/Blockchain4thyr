import React from 'react';
import Icon from '../../../components/AppIcon';

const TokenBalance = ({ 
  totalTokens, 
  assignedTokens, 
  availableTokens, 
  isDragging 
}) => {
  const assignedPercentage = (assignedTokens / totalTokens) * 100;
  const availablePercentage = (availableTokens / totalTokens) * 100;

  return (
    <div className={`bg-card border border-border rounded-lg p-4 transition-smooth ${
      isDragging ? 'ring-2 ring-primary bg-primary/5' : ''
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Coins" size={20} className="text-primary" />
          <span>Voting Tokens</span>
        </h3>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{availableTokens}</p>
          <p className="text-xs text-muted-foreground">Available</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Total Tokens:</span>
          <span className="font-semibold text-foreground">{totalTokens}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Assigned:</span>
          <span className="font-semibold text-warning">{assignedTokens}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Available:</span>
          <span className="font-semibold text-success">{availableTokens}</span>
        </div>

        {/* Visual Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="flex h-3 rounded-full overflow-hidden">
              <div 
                className="bg-warning transition-smooth"
                style={{ width: `${assignedPercentage}%` }}
              />
              <div 
                className="bg-success transition-smooth"
                style={{ width: `${availablePercentage}%` }}
              />
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Assigned ({assignedPercentage.toFixed(1)}%)</span>
            <span>Available ({availablePercentage.toFixed(1)}%)</span>
          </div>
        </div>

        {isDragging && (
          <div className="mt-3 p-2 bg-primary/10 border border-primary/20 rounded text-xs text-primary">
            <Icon name="MousePointer" size={12} className="inline mr-1" />
            Drag tokens to assign to proxy holders
          </div>
        )}

        {availableTokens === 0 && (
          <div className="mt-3 p-2 bg-warning/10 border border-warning/20 rounded text-xs text-warning-foreground">
            <Icon name="AlertTriangle" size={12} className="inline mr-1" />
            All tokens have been assigned
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenBalance;