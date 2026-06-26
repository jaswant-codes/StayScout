import React from 'react';
import { Users, CalendarCheck, TrendingUp } from 'lucide-react';

export default function LeadStatsGrid({ stats }) {
  const metrics = [
    {
      label: 'New Leads',
      value: stats?.new || 0,
      trend: '+12% this week',
      trendUp: true,
      icon: Users,
      color: 'text-accent-500',
      bgColor: 'bg-accent-500/10'
    },
    {
      label: 'Visits Scheduled',
      value: stats?.visits || 0,
      trend: '+5% this week',
      trendUp: true,
      icon: CalendarCheck,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-400/10'
    },
    {
      label: 'Conversion Rate',
      value: `${stats?.conversionRate || 0}%`,
      trend: '+2% this month',
      trendUp: true,
      icon: TrendingUp,
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-dark-800 border border-border rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="text-muted text-sm font-medium mb-1">{metric.label}</p>
            <h3 className="text-2xl font-bold text-white mb-2">{metric.value}</h3>
            <span className={`text-xs font-medium ${metric.trendUp ? 'text-success' : 'text-error'}`}>
              {metric.trend}
            </span>
          </div>
          <div className={`p-3 rounded-lg ${metric.bgColor}`}>
            <metric.icon className={`w-6 h-6 ${metric.color}`} />
          </div>
        </div>
      ))}
    </div>
  );
}
