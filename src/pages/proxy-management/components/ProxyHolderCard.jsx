import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProxyHolderCard = ({ 
  proxyHolder, 
  onDragStart, 
  onAssignProxy, 
  isDragOver, 
  userTokens,
  isAssigning 
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', proxyHolder.id);
    onDragStart(proxyHolder);
  };

  const getExpertiseColor = (area) => {
    const colors = {
      'Corporate Governance': 'bg-blue-100 text-blue-800',
      'Financial Management': 'bg-green-100 text-green-800',
      'Technology Strategy': 'bg-purple-100 text-purple-800',
      'Legal Affairs': 'bg-red-100 text-red-800',
      'Operations': 'bg-orange-100 text-orange-800',
      'Marketing': 'bg-pink-100 text-pink-800'
    };
    return colors[area] || 'bg-gray-100 text-gray-800';
  };

  const getPerformanceColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-warning';
    return 'text-error';
  };

  const canAcceptMoreDelegations = proxyHolder.currentDelegations < proxyHolder.maxDelegations;

  return (
    <div
      draggable={canAcceptMoreDelegations}
      onDragStart={handleDragStart}
      className={`bg-card border border-border rounded-lg p-4 transition-smooth cursor-move hover:shadow-card ${
        isDragOver ? 'ring-2 ring-primary bg-primary/5' : ''
      } ${!canAcceptMoreDelegations ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
      <div className="flex items-start space-x-3">
        <div className="relative">
          <Image
            src={proxyHolder.avatar}
            alt={proxyHolder.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
            proxyHolder.isOnline ? 'bg-success' : 'bg-gray-400'
          }`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground truncate">{proxyHolder.name}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowDetails(!showDetails)}
              className="h-6 w-6"
            >
              <Icon name={showDetails ? "ChevronUp" : "ChevronDown"} size={14} />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mb-2">{proxyHolder.title}</p>

          <div className="flex flex-wrap gap-1 mb-2">
            {proxyHolder.expertiseAreas.slice(0, 2).map((area) => (
              <span
                key={area}
                className={`px-2 py-1 text-xs rounded-full ${getExpertiseColor(area)}`}
              >
                {area}
              </span>
            ))}
            {proxyHolder.expertiseAreas.length > 2 && (
              <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                +{proxyHolder.expertiseAreas.length - 2}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">
                  {proxyHolder.currentDelegations}/{proxyHolder.maxDelegations}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="TrendingUp" size={14} className={getPerformanceColor(proxyHolder.performanceScore)} />
                <span className={getPerformanceColor(proxyHolder.performanceScore)}>
                  {proxyHolder.performanceScore}%
                </span>
              </div>
            </div>

            {canAcceptMoreDelegations && (
              <Button
                variant="outline"
                size="xs"
                onClick={() => onAssignProxy(proxyHolder)}
                disabled={isAssigning || userTokens === 0}
                iconName="UserPlus"
                iconPosition="left"
              >
                Assign
              </Button>
            )}
          </div>

          {showDetails && (
            <div className="mt-3 pt-3 border-t border-border space-y-2">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-muted-foreground">Experience:</span>
                  <p className="font-medium">{proxyHolder.experience} years</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Elections:</span>
                  <p className="font-medium">{proxyHolder.electionsParticipated}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Acceptance Rate:</span>
                  <p className="font-medium">{proxyHolder.acceptanceRate}%</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Response Time:</span>
                  <p className="font-medium">{proxyHolder.avgResponseTime}</p>
                </div>
              </div>

              <div>
                <span className="text-xs text-muted-foreground">Recent Activity:</span>
                <p className="text-xs text-foreground mt-1">{proxyHolder.recentActivity}</p>
              </div>

              <div>
                <span className="text-xs text-muted-foreground">All Expertise Areas:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {proxyHolder.expertiseAreas.map((area) => (
                    <span
                      key={area}
                      className={`px-2 py-1 text-xs rounded-full ${getExpertiseColor(area)}`}
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!canAcceptMoreDelegations && (
            <div className="mt-2 p-2 bg-warning/10 border border-warning/20 rounded text-xs text-warning-foreground">
              <Icon name="AlertTriangle" size={12} className="inline mr-1" />
              Maximum delegations reached
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProxyHolderCard;