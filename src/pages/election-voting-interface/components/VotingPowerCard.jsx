import React from 'react';
import Icon from '../../../components/AppIcon';

const VotingPowerCard = ({ votingPower }) => {
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getVotingPowerLevel = () => {
    if (votingPower.percentage >= 10) return { level: 'Major', color: 'text-primary', bg: 'bg-primary/10' };
    if (votingPower.percentage >= 5) return { level: 'Significant', color: 'text-accent', bg: 'bg-accent/10' };
    if (votingPower.percentage >= 1) return { level: 'Standard', color: 'text-success', bg: 'bg-success/10' };
    return { level: 'Minor', color: 'text-muted-foreground', bg: 'bg-muted' };
  };

  const powerLevel = getVotingPowerLevel();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Your Voting Power</h3>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${powerLevel.bg} ${powerLevel.color}`}>
          {powerLevel.level} Shareholder
        </span>
      </div>

      <div className="space-y-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Token Balance</span>
            <Icon name="Coins" size={16} className="text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground">{formatNumber(votingPower.tokens)}</div>
          <div className="text-xs text-muted-foreground">CVT Tokens</div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Voting Weight</span>
            <Icon name="Percent" size={16} className="text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground">{votingPower.percentage}%</div>
          <div className="text-xs text-muted-foreground">of total voting power</div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Share Class</span>
            <Icon name="Award" size={16} className="text-primary" />
          </div>
          <div className="text-sm font-bold text-foreground">{votingPower.shareClass}</div>
          <div className="text-xs text-muted-foreground">{votingPower.shareCount} shares</div>
        </div>

        {votingPower.proxyDelegated && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="UserCheck" size={16} className="text-warning" />
              <span className="text-sm font-medium text-warning">Proxy Delegated</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {votingPower.proxyDelegated.tokens} tokens delegated to {votingPower.proxyDelegated.to}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Effective Voting Power</span>
            <span className="font-medium text-foreground">
              {formatNumber(votingPower.effectiveTokens)} CVT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingPowerCard;