import React from 'react';
import StatCard from '../StatCard';

const TicketStatsBar = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 animate-pulse-glow">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-dark-800 rounded-xl border border-border"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats?.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default TicketStatsBar;
