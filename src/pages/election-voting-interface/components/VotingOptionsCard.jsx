import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VotingOptionsCard = ({ agenda, onVoteChange, selectedVotes, disabled }) => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleVoteSelect = (itemId, option) => {
    onVoteChange(itemId, option);
  };

  const getVoteIcon = (option) => {
    switch (option) {
      case 'yes': return 'CheckCircle';
      case 'no': return 'XCircle';
      case 'abstain': return 'MinusCircle';
      default: return 'Circle';
    }
  };

  const getVoteColor = (option, isSelected) => {
    if (!isSelected) return 'text-muted-foreground border-border hover:border-primary/50';
    
    switch (option) {
      case 'yes': return 'text-success border-success bg-success/10';
      case 'no': return 'text-error border-error bg-error/10';
      case 'abstain': return 'text-warning border-warning bg-warning/10';
      default: return 'text-muted-foreground border-border';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Vote" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Voting Agenda</h3>
        <span className="text-sm text-muted-foreground">({agenda.length} items)</span>
      </div>

      <div className="space-y-6">
        {agenda.map((item, index) => (
          <div key={item.id} className="border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    {index + 1}
                  </span>
                  <h4 className="font-medium text-foreground">{item.title}</h4>
                  {item.required && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-error/10 text-error">
                      Required
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {expandedItems[item.id] ? item.description : `${item.description.substring(0, 150)}...`}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpanded(item.id)}
                  iconName={expandedItems[item.id] ? "ChevronUp" : "ChevronDown"}
                  iconPosition="right"
                  className="text-xs"
                >
                  {expandedItems[item.id] ? 'Show Less' : 'Read More'}
                </Button>
              </div>
            </div>

            {expandedItems[item.id] && item.attachments && (
              <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Paperclip" size={14} className="text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">Supporting Documents</span>
                </div>
                <div className="space-y-1">
                  {item.attachments.map((doc, docIndex) => (
                    <div key={docIndex} className="flex items-center space-x-2 text-xs">
                      <Icon name="FileText" size={12} className="text-primary" />
                      <span className="text-primary hover:underline cursor-pointer">{doc.name}</span>
                      <span className="text-muted-foreground">({doc.size})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {['yes', 'no', 'abstain'].map((option) => {
                const isSelected = selectedVotes[item.id] === option;
                const colorClass = getVoteColor(option, isSelected);
                
                return (
                  <button
                    key={option}
                    onClick={() => handleVoteSelect(item.id, option)}
                    disabled={disabled}
                    className={`flex items-center justify-center space-x-2 p-3 border-2 rounded-lg transition-smooth hover-scale ${colorClass} ${
                      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                    }`}
                  >
                    <Icon name={getVoteIcon(option)} size={18} />
                    <span className="font-medium capitalize">{option}</span>
                    {isSelected && (
                      <Icon name="Check" size={14} className="ml-auto" />
                    )}
                  </button>
                );
              })}
            </div>

            {item.impact && (
              <div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="Info" size={16} className="text-primary mt-0.5" />
                  <div>
                    <div className="text-xs font-medium text-primary mb-1">Expected Impact</div>
                    <div className="text-xs text-muted-foreground">{item.impact}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="AlertCircle" size={16} className="text-warning" />
          <span className="text-sm font-medium text-foreground">Voting Guidelines</span>
        </div>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Your vote is final and cannot be changed after submission</li>
          <li>• All votes are recorded on the blockchain for transparency</li>
          <li>• Abstaining still counts toward quorum requirements</li>
          <li>• Required items must be voted on to complete submission</li>
        </ul>
      </div>
    </div>
  );
};

export default VotingOptionsCard;