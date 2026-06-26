import React from 'react';
import { Home, Eye, Heart, Users, TrendingUp, TrendingDown } from 'lucide-react';

const StatsGrid = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="glass-strong rounded-2xl p-6 border border-border animate-pulse-glow h-32">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-dark-700 rounded-xl"></div>
              <div className="w-20 h-4 bg-dark-700 rounded"></div>
            </div>
            <div className="mt-4 w-24 h-8 bg-dark-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: 'Active Listings',
      value: stats?.activeListings || 0,
      icon: Home,
      trend: stats?.listingsTrend || '+2.5%',
      isPositive: true,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Total Views',
      value: stats?.totalViews || 0,
      icon: Eye,
      trend: stats?.viewsTrend || '+12.5%',
      isPositive: true,
      color: 'text-accent-500',
      bgColor: 'bg-accent-500/10'
    },
    {
      title: 'Wishlist Saves',
      value: stats?.wishlistSaves || 0,
      icon: Heart,
      trend: stats?.savesTrend || '+5.2%',
      isPositive: true,
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10'
    },
    {
      title: 'Leads Generated',
      value: stats?.leads || 0,
      icon: Users,
      trend: stats?.leadsTrend || '-1.5%',
      isPositive: false,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <div 
          key={index} 
          className="glass-strong rounded-2xl p-6 border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent-500/10"
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${stat.bgColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${stat.isPositive ? 'text-success' : 'text-error'}`}>
              {stat.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {stat.trend}
            </div>
          </div>
          <div>
            <h3 className="text-text-muted font-medium mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-white">{stat.value.toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
