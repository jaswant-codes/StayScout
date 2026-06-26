import React from 'react';
import { Eye, Users, Heart, Star, TrendingUp, TrendingDown } from 'lucide-react';

const PerformanceSnapshot = ({ property }) => {
  const metrics = [
    {
      label: 'Views',
      value: '2.4k',
      icon: Eye,
      trend: '+12.5%',
      isPositive: true
    },
    {
      label: 'Leads',
      value: '148',
      icon: Users,
      trend: '+5.2%',
      isPositive: true
    },
    {
      label: 'Wishlist Saves',
      value: '324',
      icon: Heart,
      trend: '-2.1%',
      isPositive: false
    },
    {
      label: 'Avg Rating',
      value: property?.rating || '4.8',
      icon: Star,
      trend: '+0.2',
      isPositive: true
    }
  ];

  return (
    <div className="card glass-strong p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Performance Snapshot</h3>
        <span className="text-xs text-muted">Last 30 Days</span>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-dark-800 border border-border rounded-xl p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-dark-700 rounded-lg">
                  <Icon className="w-5 h-5 text-accent-400" />
                </div>
                <div className={`flex items-center text-xs font-medium ${metric.isPositive ? 'text-success' : 'text-error'}`}>
                  {metric.isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {metric.trend}
                </div>
              </div>
              <p className="text-muted text-sm mb-1">{metric.label}</p>
              <p className="text-2xl font-bold text-white">{metric.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PerformanceSnapshot;
