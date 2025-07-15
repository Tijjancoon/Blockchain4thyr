import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ElectionCreationWizard = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    startDate: '',
    endDate: '',
    votingOptions: ['Yes', 'No', 'Abstain'],
    participants: [],
    requiresApproval: false,
    allowProxyVoting: true,
    blockchainNetwork: 'ethereum'
  });

  const steps = [
    { id: 1, title: 'Basic Information', icon: 'FileText' },
    { id: 2, title: 'Voting Configuration', icon: 'Settings' },
    { id: 3, title: 'Participant Selection', icon: 'Users' },
    { id: 4, title: 'Schedule & Deployment', icon: 'Calendar' },
    { id: 5, title: 'Review & Deploy', icon: 'CheckCircle' }
  ];

  const electionTypes = [
    { value: 'board-election', label: 'Board of Directors Election' },
    { value: 'resolution', label: 'Shareholder Resolution' },
    { value: 'merger-approval', label: 'Merger & Acquisition Approval' },
    { value: 'policy-vote', label: 'Corporate Policy Vote' },
    { value: 'compensation', label: 'Executive Compensation' }
  ];

  const blockchainNetworks = [
    { value: 'ethereum', label: 'Ethereum Mainnet' },
    { value: 'polygon', label: 'Polygon Network' },
    { value: 'bsc', label: 'Binance Smart Chain' },
    { value: 'private', label: 'Private Consortium Chain' }
  ];

  const participantGroups = [
    { value: 'all-shareholders', label: 'All Shareholders', count: 1247 },
    { value: 'board-members', label: 'Board Members Only', count: 12 },
    { value: 'preferred-shareholders', label: 'Preferred Shareholders', count: 89 },
    { value: 'common-shareholders', label: 'Common Shareholders', count: 1158 },
    { value: 'custom-group', label: 'Custom Group', count: 0 }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Creating election:', formData);
    onComplete(formData);
    onClose();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <Input
              label="Election Title"
              placeholder="e.g., Q3 2024 Board of Directors Election"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <textarea
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                rows={4}
                placeholder="Provide detailed information about this election..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>

            <Select
              label="Election Type"
              options={electionTypes}
              value={formData.type}
              onChange={(value) => handleInputChange('type', value)}
              placeholder="Select election type"
              required
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">Voting Options</label>
              <div className="space-y-2">
                {formData.votingOptions.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...formData.votingOptions];
                        newOptions[index] = e.target.value;
                        handleInputChange('votingOptions', newOptions);
                      }}
                      className="flex-1"
                    />
                    {formData.votingOptions.length > 2 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newOptions = formData.votingOptions.filter((_, i) => i !== index);
                          handleInputChange('votingOptions', newOptions);
                        }}
                      >
                        <Icon name="X" size={16} />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleInputChange('votingOptions', [...formData.votingOptions, ''])}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Add Option
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Checkbox
                label="Require admin approval for votes"
                description="All votes will need manual approval before being counted"
                checked={formData.requiresApproval}
                onChange={(e) => handleInputChange('requiresApproval', e.target.checked)}
              />
              
              <Checkbox
                label="Allow proxy voting"
                description="Shareholders can delegate their voting rights to others"
                checked={formData.allowProxyVoting}
                onChange={(e) => handleInputChange('allowProxyVoting', e.target.checked)}
              />
            </div>

            <Select
              label="Blockchain Network"
              options={blockchainNetworks}
              value={formData.blockchainNetwork}
              onChange={(value) => handleInputChange('blockchainNetwork', value)}
              description="Choose the blockchain network for vote recording"
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">Select Participants</label>
              <div className="space-y-3">
                {participantGroups.map((group) => (
                  <div key={group.value} className="flex items-center justify-between p-3 border border-border rounded-md">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={formData.participants.includes(group.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleInputChange('participants', [...formData.participants, group.value]);
                          } else {
                            handleInputChange('participants', formData.participants.filter(p => p !== group.value));
                          }
                        }}
                      />
                      <div>
                        <p className="font-medium text-foreground">{group.label}</p>
                        <p className="text-sm text-muted-foreground">{group.count} eligible voters</p>
                      </div>
                    </div>
                    <Icon name="Users" size={20} className="text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Start Date & Time"
                type="datetime-local"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                required
              />
              
              <Input
                label="End Date & Time"
                type="datetime-local"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                required
              />
            </div>

            <div className="bg-muted p-4 rounded-md">
              <h4 className="font-medium text-foreground mb-2">Deployment Information</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Smart contract will be deployed to {blockchainNetworks.find(n => n.value === formData.blockchainNetwork)?.label}</p>
                <p>• Estimated gas cost: 0.05 ETH (~$125 USD)</p>
                <p>• Deployment time: 2-5 minutes</p>
                <p>• All votes will be cryptographically secured and immutable</p>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="font-semibold text-foreground mb-4">Election Summary</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Title:</span>
                  <span className="font-medium">{formData.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium">{electionTypes.find(t => t.value === formData.type)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Participants:</span>
                  <span className="font-medium">{formData.participants.length} groups selected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Voting Options:</span>
                  <span className="font-medium">{formData.votingOptions.length} options</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">
                    {formData.startDate && formData.endDate ? 
                      `${new Date(formData.startDate).toLocaleDateString()} - ${new Date(formData.endDate).toLocaleDateString()}` : 
                      'Not set'
                    }
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-warning/10 border border-warning/20 rounded-md p-4">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
                <div>
                  <h5 className="font-medium text-foreground">Important Notice</h5>
                  <p className="text-sm text-muted-foreground mt-1">
                    Once deployed, this election cannot be modified. Please review all details carefully before proceeding.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Create New Election</h2>
            <p className="text-sm text-muted-foreground">Step {currentStep} of {steps.length}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'border-border text-muted-foreground'
                }`}>
                  {currentStep > step.id ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={step.icon} size={16} />
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-primary' : 'bg-border'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>
          
          <div className="flex space-x-3">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            {currentStep === steps.length ? (
              <Button
                onClick={handleSubmit}
                iconName="Rocket"
                iconPosition="left"
                className="bg-success hover:bg-success/90"
              >
                Deploy Election
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                iconName="ChevronRight"
                iconPosition="right"
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionCreationWizard;