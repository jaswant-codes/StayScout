import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  BarChart, Bar, CartesianGrid
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-strong border border-border p-3 rounded-lg shadow-xl">
        <p className="text-text-muted text-xs mb-1">{label}</p>
        <p className="text-white font-medium">
          {payload[0].value} {payload[0].name}
        </p>
      </div>
    );
  }
  return null;
};

const AnalyticsCharts = ({ viewsData, leadsData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Views Chart */}
      <div className="glass-strong rounded-2xl p-6 border border-border">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white">Property Views</h3>
          <select className="bg-dark-800 border border-border text-text-secondary text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-accent-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This year</option>
          </select>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={viewsData || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#94a3b8" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
              />
              <YAxis 
                stroke="#94a3b8" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="views" 
                name="Views"
                stroke="#6366f1" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorViews)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Leads Chart */}
      <div className="glass-strong rounded-2xl p-6 border border-border">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white">Leads Generated</h3>
          <select className="bg-dark-800 border border-border text-text-secondary text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-accent-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This year</option>
          </select>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={leadsData || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#94a3b8" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
              />
              <YAxis 
                stroke="#94a3b8" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#334155', opacity: 0.4 }} />
              <Bar 
                dataKey="leads" 
                name="Leads"
                fill="#10b981" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
