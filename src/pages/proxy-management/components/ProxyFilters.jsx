import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const ProxyFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters,
  proxyHolders 
}) => {
  const expertiseOptions = [
    { value: '', label: 'All Expertise Areas' },
    { value: 'Corporate Governance', label: 'Corporate Governance' },
    { value: 'Financial Management', label: 'Financial Management' },
    { value: 'Technology Strategy', label: 'Technology Strategy' },
    { value: 'Legal Affairs', label: 'Legal Affairs' },
    { value: 'Operations', label: 'Operations' },
    { value: 'Marketing', label: 'Marketing' }
  ];

  const performanceOptions = [
    { value: '', label: 'All Performance Levels' },
    { value: '90+', label: 'Excellent (90%+)' },
    { value: '75-89', label: 'Good (75-89%)' },
    { value: '60-74', label: 'Average (60-74%)' },
    { value: '<60', label: 'Below Average (<60%)' }
  ];

  const availabilityOptions = [
    { value: '', label: 'All Availability' },
    { value: 'available', label: 'Available for Delegation' },
    { value: 'limited', label: 'Limited Capacity' },
    { value: 'full', label: 'At Maximum Capacity' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'performance', label: 'Performance Score' },
    { value: 'experience', label: 'Experience' },
    { value: 'availability', label: 'Availability' },
    { value: 'recent', label: 'Recently Active' }
  ];

  const hasActiveFilters = Object.values(filters).some(value => value !== '');
  const filteredCount = proxyHolders?.length || 0;

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Filter" size={18} />
          <span>Filter Proxy Holders</span>
        </h3>
        
        <div className="flex items-center space-x-3">
          <span className="text-sm text-muted-foreground">
            {filteredCount} proxy holders found
          </span>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <Input
          label="Search by Name"
          type="search"
          placeholder="Enter proxy holder name"
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
          className="col-span-1 md:col-span-2 lg:col-span-1"
        />

        <Select
          label="Expertise Area"
          options={expertiseOptions}
          value={filters.expertise}
          onChange={(value) => onFilterChange('expertise', value)}
        />

        <Select
          label="Performance"
          options={performanceOptions}
          value={filters.performance}
          onChange={(value) => onFilterChange('performance', value)}
        />

        <Select
          label="Availability"
          options={availabilityOptions}
          value={filters.availability}
          onChange={(value) => onFilterChange('availability', value)}
        />

        <Select
          label="Sort By"
          options={sortOptions}
          value={filters.sortBy}
          onChange={(value) => onFilterChange('sortBy', value)}
        />
      </div>

      {/* Quick Filter Buttons */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
        <span className="text-sm text-muted-foreground mr-2">Quick filters:</span>
        
        <Button
          variant={filters.availability === 'available' ? 'default' : 'outline'}
          size="xs"
          onClick={() => onFilterChange('availability', filters.availability === 'available' ? '' : 'available')}
          iconName="UserCheck"
          iconPosition="left"
        >
          Available
        </Button>

        <Button
          variant={filters.performance === '90+' ? 'default' : 'outline'}
          size="xs"
          onClick={() => onFilterChange('performance', filters.performance === '90+' ? '' : '90+')}
          iconName="TrendingUp"
          iconPosition="left"
        >
          Top Performers
        </Button>

        <Button
          variant={filters.expertise === 'Corporate Governance' ? 'default' : 'outline'}
          size="xs"
          onClick={() => onFilterChange('expertise', filters.expertise === 'Corporate Governance' ? '' : 'Corporate Governance')}
          iconName="Building"
          iconPosition="left"
        >
          Governance
        </Button>

        <Button
          variant={filters.expertise === 'Financial Management' ? 'default' : 'outline'}
          size="xs"
          onClick={() => onFilterChange('expertise', filters.expertise === 'Financial Management' ? '' : 'Financial Management')}
          iconName="DollarSign"
          iconPosition="left"
        >
          Financial
        </Button>
      </div>

      {hasActiveFilters && (
        <div className="mt-3 p-2 bg-primary/10 border border-primary/20 rounded text-sm text-primary">
          <Icon name="Info" size={14} className="inline mr-1" />
          Active filters applied. {filteredCount} proxy holders match your criteria.
        </div>
      )}
    </div>
  );
};

export default ProxyFilters;