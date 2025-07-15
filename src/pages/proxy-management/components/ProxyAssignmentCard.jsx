import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProxyAssignmentCard = ({ 
  assignment, 
  onRevokeProxy, 
  onModifyTokens, 
  isRevoking 
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isModifying, setIsModifying] = useState(false);
  const [newTokenAmount, setNewTokenAmount] = useState(assignment.tokensAssigned);

  const handleModifyTokens = () => {
    if (newTokenAmount !== assignment.tokensAssigned && newTokenAmount > 0) {
      onModifyTokens(assignment.id, newTokenAmount);
      setIsModifying(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'active': 'bg-success text-success-foreground',
      'pending': 'bg-warning text-warning-foreground',
      'revoked': 'bg-error text-error-foreground',
      'expired': 'bg-gray-500 text-white'
    };
    return colors[status] || 'bg-gray-500 text-white';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'active': 'CheckCircle',
      'pending': 'Clock',
      'revoked': 'XCircle',
      'expired': 'AlertCircle'
    };
    return icons[status] || 'AlertCircle';
  };

  const canModify = assignment.status === 'active' && !assignment.votingStarted;
  const canRevoke = ['active', 'pending'].includes(assignment.status) && !assignment.votingStarted;

  return (
    <div className="bg-card border border-border rounded-lg p-4 transition-smooth">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Image
            src={assignment.proxyHolder.avatar}
            alt={assignment.proxyHolder.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-foreground">{assignment.proxyHolder.name}</h3>
            <p className="text-sm text-muted-foreground">{assignment.proxyHolder.title}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(assignment.status)}`}>
            <Icon name={getStatusIcon(assignment.status)} size={12} className="inline mr-1" />
            {assignment.status.toUpperCase()}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowDetails(!showDetails)}
            className="h-6 w-6"
          >
            <Icon name={showDetails ? "ChevronUp" : "ChevronDown"} size={14} />
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Coins" size={16} className="text-primary" />
              {isModifying ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={newTokenAmount}
                    onChange={(e) => setNewTokenAmount(parseInt(e.target.value) || 0)}
                    className="w-20 px-2 py-1 text-sm border border-border rounded"
                    min="1"
                    max="1000"
                  />
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={handleModifyTokens}
                    iconName="Check"
                  >
                    Save
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => {
                      setIsModifying(false);
                      setNewTokenAmount(assignment.tokensAssigned);
                    }}
                    iconName="X"
                  />
                </div>
              ) : (
                <span className="font-semibold text-primary">
                  {assignment.tokensAssigned} tokens
                </span>
              )}
            </div>

            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {assignment.type === 'election' ? assignment.electionTitle : 'Blanket Delegation'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {canModify && !isModifying && (
              <Button
                variant="outline"
                size="xs"
                onClick={() => setIsModifying(true)}
                iconName="Edit"
                iconPosition="left"
              >
                Modify
              </Button>
            )}
            {canRevoke && (
              <Button
                variant="destructive"
                size="xs"
                onClick={() => onRevokeProxy(assignment.id)}
                disabled={isRevoking}
                loading={isRevoking}
                iconName="UserMinus"
                iconPosition="left"
              >
                Revoke
              </Button>
            )}
          </div>
        </div>

        {assignment.votingStarted && (
          <div className="p-2 bg-warning/10 border border-warning/20 rounded text-xs text-warning-foreground">
            <Icon name="Lock" size={12} className="inline mr-1" />
            Voting has started - delegation cannot be modified
          </div>
        )}

        {showDetails && (
          <div className="pt-3 border-t border-border space-y-2">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-muted-foreground">Assigned:</span>
                <p className="font-medium">{new Date(assignment.assignedDate).toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Expires:</span>
                <p className="font-medium">
                  {assignment.expiryDate ? new Date(assignment.expiryDate).toLocaleDateString() : 'No expiry'}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Transaction:</span>
                <p className="font-mono text-xs">{assignment.transactionHash.slice(0, 10)}...</p>
              </div>
              <div>
                <span className="text-muted-foreground">Gas Fee:</span>
                <p className="font-medium">{assignment.gasFee} ETH</p>
              </div>
            </div>

            {assignment.type === 'election' && (
              <div>
                <span className="text-xs text-muted-foreground">Election Details:</span>
                <div className="mt-1 p-2 bg-muted rounded text-xs">
                  <p className="font-medium">{assignment.electionTitle}</p>
                  <p className="text-muted-foreground">
                    Voting: {new Date(assignment.votingStartDate).toLocaleDateString()} - {new Date(assignment.votingEndDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}

            {assignment.notes && (
              <div>
                <span className="text-xs text-muted-foreground">Notes:</span>
                <p className="text-xs text-foreground mt-1 p-2 bg-muted rounded">{assignment.notes}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProxyAssignmentCard;