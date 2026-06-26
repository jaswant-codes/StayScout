import React from 'react';

const KPIBar = ({ kpis = [], loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-dark-800 border border-border rounded-xl p-4 animate-pulse-glow h-24"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {kpis.map((kpi, index) => (
        <div key={index} className="bg-dark-800 border border-border rounded-xl p-4 flex flex-col justify-center">
          <span className="text-sm text-gray-400 mb-1 truncate">{kpi.label}</span>
          <span className="text-2xl font-bold text-white">{kpi.value}</span>
        </div>
      ))}
    </div>
  );
};

export default KPIBar;
