import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DetailedBreakdownTab = ({ selectedElection }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const shareholderBreakdown = [
    {
      category: 'Individual Shareholders',
      total: 850,
      voted: 612,
      approve: 425,
      reject: 142,
      abstain: 45,
      avgHolding: 1250,
      proxyDelegated: 89
    },
    {
      category: 'Institutional Investors',
      total: 45,
      voted: 42,
      approve: 38,
      reject: 3,
      abstain: 1,
      avgHolding: 125000,
      proxyDelegated: 2
    },
    {
      category: 'Proxy Holders',
      total: 125,
      voted: 98,
      approve: 67,
      reject: 23,
      abstain: 8,
      avgHolding: 8500,
      proxyDelegated: 0
    },
    {
      category: 'Board Members',
      total: 12,
      voted: 12,
      approve: 11,
      reject: 1,
      abstain: 0,
      avgHolding: 45000,
      proxyDelegated: 0
    }
  ];

  const regionalBreakdown = [
    { region: 'North America', voted: 456, approve: 312, reject: 98, abstain: 46 },
    { region: 'Europe', voted: 189, approve: 134, reject: 38, abstain: 17 },
    { region: 'Asia Pacific', voted: 98, approve: 71, reject: 19, abstain: 8 },
    { region: 'Other', voted: 21, approve: 15, reject: 4, abstain: 2 }
  ];

  const proxyDelegationData = [
    {
      proxyHolder: 'Sarah Johnson',
      delegatedVotes: 45,
      votingPower: 56250,
      decision: 'Approve',
      delegators: 23,
      region: 'North America'
    },
    {
      proxyHolder: 'Michael Chen',
      votingPower: 38750,
      delegatedVotes: 31,
      decision: 'Approve',
      delegators: 18,
      region: 'Asia Pacific'
    },
    {
      proxyHolder: 'Emma Rodriguez',
      votingPower: 29500,
      delegatedVotes: 24,
      decision: 'Reject',
      delegators: 15,
      region: 'Europe'
    },
    {
      proxyHolder: 'David Thompson',
      votingPower: 22750,
      delegatedVotes: 19,
      decision: 'Approve',
      delegators: 12,
      region: 'North America'
    }
  ];

  const holdingRangeData = [
    { range: '< 1,000 shares', count: 425, approve: 289, reject: 98, abstain: 38 },
    { range: '1,000 - 5,000', count: 234, approve: 167, reject: 45, abstain: 22 },
    { range: '5,000 - 25,000', count: 78, approve: 56, reject: 15, abstain: 7 },
    { range: '25,000 - 100,000', count: 23, approve: 19, reject: 3, abstain: 1 },
    { range: '> 100,000', count: 4, approve: 4, reject: 0, abstain: 0 }
  ];

  const getVotingPowerPercentage = (votes, totalVotes = 764) => {
    return ((votes / totalVotes) * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filters:</span>
          </div>
          
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 text-sm border border-border rounded-md bg-background text-foreground"
          >
            <option value="all">All Categories</option>
            <option value="individual">Individual Shareholders</option>
            <option value="institutional">Institutional Investors</option>
            <option value="proxy">Proxy Holders</option>
            <option value="board">Board Members</option>
          </select>

          <select 
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-3 py-1.5 text-sm border border-border rounded-md bg-background text-foreground"
          >
            <option value="all">All Regions</option>
            <option value="north-america">North America</option>
            <option value="europe">Europe</option>
            <option value="asia-pacific">Asia Pacific</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Shareholder Category Breakdown */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-semibold text-foreground mb-4">Voting Patterns by Shareholder Category</h4>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 text-muted-foreground font-medium">Category</th>
                <th className="text-right py-3 text-muted-foreground font-medium">Eligible</th>
                <th className="text-right py-3 text-muted-foreground font-medium">Voted</th>
                <th className="text-right py-3 text-muted-foreground font-medium">Turnout</th>
                <th className="text-right py-3 text-muted-foreground font-medium">Approve</th>
                <th className="text-right py-3 text-muted-foreground font-medium">Reject</th>
                <th className="text-right py-3 text-muted-foreground font-medium">Abstain</th>
                <th className="text-right py-3 text-muted-foreground font-medium">Avg Holding</th>
              </tr>
            </thead>
            <tbody>
              {shareholderBreakdown.map((item, index) => (
                <tr key={index} className="border-b border-border/50">
                  <td className="py-3 font-medium text-foreground">{item.category}</td>
                  <td className="text-right py-3 text-foreground">{item.total.toLocaleString()}</td>
                  <td className="text-right py-3 text-foreground">{item.voted.toLocaleString()}</td>
                  <td className="text-right py-3 text-foreground">
                    {((item.voted / item.total) * 100).toFixed(1)}%
                  </td>
                  <td className="text-right py-3 text-success">{item.approve.toLocaleString()}</td>
                  <td className="text-right py-3 text-destructive">{item.reject.toLocaleString()}</td>
                  <td className="text-right py-3 text-muted-foreground">{item.abstain.toLocaleString()}</td>
                  <td className="text-right py-3 text-foreground">{item.avgHolding.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Regional Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="text-md font-semibold text-foreground mb-4">Regional Voting Distribution</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="region" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="approve" stackId="a" fill="#10B981" />
                <Bar dataKey="reject" stackId="a" fill="#DC2626" />
                <Bar dataKey="abstain" stackId="a" fill="#6B7280" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="text-md font-semibold text-foreground mb-4">Voting by Shareholding Range</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={holdingRangeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="range" 
                  tick={{ fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="approve" stackId="a" fill="#10B981" />
                <Bar dataKey="reject" stackId="a" fill="#DC2626" />
                <Bar dataKey="abstain" stackId="a" fill="#6B7280" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Proxy Delegation Analysis */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-semibold text-foreground mb-4">Proxy Delegation Analysis</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Users" size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground">Total Proxies</span>
            </div>
            <p className="text-2xl font-bold text-foreground">91</p>
            <p className="text-xs text-muted-foreground">Delegated votes</p>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="UserCheck" size={16} className="text-success" />
              <span className="text-sm text-muted-foreground">Proxy Holders</span>
            </div>
            <p className="text-2xl font-bold text-foreground">4</p>
            <p className="text-xs text-muted-foreground">Active holders</p>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={16} className="text-warning" />
              <span className="text-sm text-muted-foreground">Voting Power</span>
            </div>
            <p className="text-2xl font-bold text-foreground">11.9%</p>
            <p className="text-xs text-muted-foreground">Of total votes</p>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Target" size={16} className="text-accent" />
              <span className="text-sm text-muted-foreground">Efficiency</span>
            </div>
            <p className="text-2xl font-bold text-foreground">98.9%</p>
            <p className="text-xs text-muted-foreground">Proxy utilization</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 text-muted-foreground font-medium">Proxy Holder</th>
                <th className="text-right py-3 text-muted-foreground font-medium">Delegators</th>
                <th className="text-right py-3 text-muted-foreground font-medium">Votes</th>
                <th className="text-right py-3 text-muted-foreground font-medium">Voting Power</th>
                <th className="text-center py-3 text-muted-foreground font-medium">Decision</th>
                <th className="text-center py-3 text-muted-foreground font-medium">Region</th>
              </tr>
            </thead>
            <tbody>
              {proxyDelegationData.map((proxy, index) => (
                <tr key={index} className="border-b border-border/50">
                  <td className="py-3 font-medium text-foreground">{proxy.proxyHolder}</td>
                  <td className="text-right py-3 text-foreground">{proxy.delegators}</td>
                  <td className="text-right py-3 text-foreground">{proxy.delegatedVotes}</td>
                  <td className="text-right py-3 text-foreground">{proxy.votingPower.toLocaleString()}</td>
                  <td className="text-center py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      proxy.decision === 'Approve' ?'bg-success/10 text-success' :'bg-destructive/10 text-destructive'
                    }`}>
                      {proxy.decision}
                    </span>
                  </td>
                  <td className="text-center py-3 text-muted-foreground">{proxy.region}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailedBreakdownTab;