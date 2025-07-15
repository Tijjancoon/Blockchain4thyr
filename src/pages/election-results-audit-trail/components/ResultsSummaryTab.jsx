import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const ResultsSummaryTab = ({ selectedElection }) => {
  const voteData = [
    { option: 'Approve', votes: 1247, percentage: 68.2 },
    { option: 'Reject', votes: 423, percentage: 23.1 },
    { option: 'Abstain', votes: 159, percentage: 8.7 }
  ];

  const participationData = [
    { category: 'Individual Shareholders', total: 850, voted: 612, percentage: 72.0 },
    { category: 'Institutional Investors', total: 45, voted: 42, percentage: 93.3 },
    { category: 'Proxy Holders', total: 125, voted: 98, percentage: 78.4 },
    { category: 'Board Members', total: 12, voted: 12, percentage: 100.0 }
  ];

  const timelineData = [
    { time: '09:00', votes: 45 },
    { time: '10:00', votes: 123 },
    { time: '11:00', votes: 287 },
    { time: '12:00', votes: 456 },
    { time: '13:00', votes: 623 },
    { time: '14:00', votes: 789 },
    { time: '15:00', votes: 945 },
    { time: '16:00', votes: 1156 },
    { time: '17:00', votes: 1289 }
  ];

  const COLORS = ['#10B981', '#DC2626', '#6B7280'];

  return (
    <div className="space-y-6">
      {/* Election Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Election Overview</h3>
          <div className="flex items-center space-x-2 text-success">
            <Icon name="CheckCircle" size={20} />
            <span className="text-sm font-medium">Election Completed</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Users" size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground">Total Eligible</span>
            </div>
            <p className="text-2xl font-bold text-foreground">1,032</p>
            <p className="text-xs text-muted-foreground">Shareholders</p>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Vote" size={16} className="text-success" />
              <span className="text-sm text-muted-foreground">Votes Cast</span>
            </div>
            <p className="text-2xl font-bold text-foreground">764</p>
            <p className="text-xs text-success">74.0% turnout</p>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-warning" />
              <span className="text-sm text-muted-foreground">Duration</span>
            </div>
            <p className="text-2xl font-bold text-foreground">8h</p>
            <p className="text-xs text-muted-foreground">Voting period</p>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Shield" size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground">Quorum</span>
            </div>
            <p className="text-2xl font-bold text-success">Met</p>
            <p className="text-xs text-muted-foreground">65% required</p>
          </div>
        </div>
      </div>

      {/* Vote Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="text-md font-semibold text-foreground mb-4">Vote Distribution</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={voteData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ option, percentage }) => `${option}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="votes"
                >
                  {voteData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {voteData.map((item, index) => (
              <div key={item.option} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-foreground">{item.option}</span>
                </div>
                <span className="font-medium text-foreground">{item.votes} votes</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="text-md font-semibold text-foreground mb-4">Participation by Category</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={participationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="category" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="voted" fill="#10B981" />
                <Bar dataKey="total" fill="#E5E7EB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Voting Timeline */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-semibold text-foreground mb-4">Voting Timeline</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="votes" 
                stroke="#1E3A8A" 
                strokeWidth={2}
                dot={{ fill: '#1E3A8A', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Final Results Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-semibold text-foreground">Final Results</h4>
          <div className="flex items-center space-x-2 text-success">
            <Icon name="Award" size={16} />
            <span className="text-sm font-medium">Motion Approved</span>
          </div>
        </div>

        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Icon name="TrendingUp" size={20} className="text-success" />
            <span className="font-semibold text-success">Resolution Passed</span>
          </div>
          <p className="text-sm text-foreground mb-2">
            The motion to approve the Q3 2024 strategic initiatives has been approved with a decisive majority.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <p className="text-lg font-bold text-success">68.2%</p>
              <p className="text-xs text-muted-foreground">Approval Rate</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">1,247</p>
              <p className="text-xs text-muted-foreground">Approve Votes</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">582</p>
              <p className="text-xs text-muted-foreground">Margin of Victory</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsSummaryTab;