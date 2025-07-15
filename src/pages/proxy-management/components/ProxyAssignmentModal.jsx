import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ProxyAssignmentModal = ({ 
  isOpen, 
  onClose, 
  proxyHolder, 
  userTokens, 
  onConfirmAssignment,
  isProcessing 
}) => {
  const [assignmentData, setAssignmentData] = useState({
    tokensToAssign: 1,
    assignmentType: 'blanket',
    selectedElection: '',
    notes: '',
    expiryDate: ''
  });

  const [errors, setErrors] = useState({});

  const electionOptions = [
    { value: 'election-2024-q3', label: 'Q3 2024 Board of Directors Election' },
    { value: 'election-2024-budget', label: '2024 Budget Approval Vote' },
    { value: 'election-2024-merger', label: 'Merger Proposal Vote' }
  ];

  const assignmentTypeOptions = [
    { value: 'blanket', label: 'Blanket Delegation', description: 'Delegate for all future elections' },
    { value: 'election', label: 'Specific Election', description: 'Delegate for a specific election only' }
  ];

  const handleInputChange = (field, value) => {
    setAssignmentData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!assignmentData.tokensToAssign || assignmentData.tokensToAssign < 1) {
      newErrors.tokensToAssign = 'Please enter a valid number of tokens';
    }

    if (assignmentData.tokensToAssign > userTokens) {
      newErrors.tokensToAssign = `Cannot assign more than ${userTokens} available tokens`;
    }

    if (assignmentData.assignmentType === 'election' && !assignmentData.selectedElection) {
      newErrors.selectedElection = 'Please select an election';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    if (validateForm()) {
      onConfirmAssignment({
        proxyHolderId: proxyHolder.id,
        ...assignmentData
      });
    }
  };

  const estimatedGasFee = 0.0023; // Mock gas fee calculation
  const transactionCost = estimatedGasFee;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
      <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Assign Proxy Delegation</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              disabled={isProcessing}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Proxy Holder Info */}
          <div className="bg-muted rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-4">
              <Image
                src={proxyHolder?.avatar}
                alt={proxyHolder?.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{proxyHolder?.name}</h3>
                <p className="text-sm text-muted-foreground">{proxyHolder?.title}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm">
                  <div className="flex items-center space-x-1">
                    <Icon name="TrendingUp" size={14} className="text-success" />
                    <span>{proxyHolder?.performanceScore}% performance</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={14} className="text-muted-foreground" />
                    <span>{proxyHolder?.currentDelegations}/{proxyHolder?.maxDelegations} delegations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Assignment Form */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Tokens to Assign"
                type="number"
                value={assignmentData.tokensToAssign}
                onChange={(e) => handleInputChange('tokensToAssign', parseInt(e.target.value) || 0)}
                error={errors.tokensToAssign}
                min="1"
                max={userTokens}
                description={`Available: ${userTokens} tokens`}
                required
              />

              <Select
                label="Assignment Type"
                options={assignmentTypeOptions}
                value={assignmentData.assignmentType}
                onChange={(value) => handleInputChange('assignmentType', value)}
                required
              />
            </div>

            {assignmentData.assignmentType === 'election' && (
              <Select
                label="Select Election"
                options={electionOptions}
                value={assignmentData.selectedElection}
                onChange={(value) => handleInputChange('selectedElection', value)}
                error={errors.selectedElection}
                placeholder="Choose an election"
                required
              />
            )}

            {assignmentData.assignmentType === 'blanket' && (
              <Input
                label="Expiry Date (Optional)"
                type="date"
                value={assignmentData.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                description="Leave empty for no expiry"
                min={new Date().toISOString().split('T')[0]}
              />
            )}

            <Input
              label="Notes (Optional)"
              type="text"
              value={assignmentData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Add any specific instructions or notes"
              description="These notes will be visible to the proxy holder"
            />

            {/* Transaction Summary */}
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-3">Transaction Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tokens to assign:</span>
                  <span className="font-medium">{assignmentData.tokensToAssign}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Assignment type:</span>
                  <span className="font-medium capitalize">{assignmentData.assignmentType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated gas fee:</span>
                  <span className="font-medium">{estimatedGasFee} ETH</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2">
                  <span className="text-foreground font-medium">Total cost:</span>
                  <span className="font-semibold">{transactionCost} ETH</span>
                </div>
              </div>
            </div>

            {/* Warning Messages */}
            {assignmentData.assignmentType === 'blanket' && (
              <div className="p-3 bg-warning/10 border border-warning/20 rounded text-sm text-warning-foreground">
                <Icon name="AlertTriangle" size={16} className="inline mr-2" />
                Blanket delegation will apply to all future elections until revoked or expired.
              </div>
            )}

            {assignmentData.tokensToAssign === userTokens && (
              <div className="p-3 bg-error/10 border border-error/20 rounded text-sm text-error-foreground">
                <Icon name="AlertCircle" size={16} className="inline mr-2" />
                You are assigning all your available tokens. You won't be able to vote directly.
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleConfirm}
              disabled={isProcessing || assignmentData.tokensToAssign === 0}
              loading={isProcessing}
              iconName="UserPlus"
              iconPosition="left"
            >
              Confirm Assignment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProxyAssignmentModal;