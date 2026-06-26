import React from 'react';

const ActionItemsPanel = ({ items = [], loading }) => {
  if (loading) {
    return (
      <div className="bg-dark-800 border border-border rounded-xl p-5 h-full">
        <h3 className="text-lg font-medium text-white mb-4">Action Items</h3>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between animate-pulse-glow">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-dark-700 rounded-full"></div>
                <div className="w-32 h-4 bg-dark-700 rounded"></div>
              </div>
              <div className="w-16 h-6 bg-dark-700 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark-800 border border-border rounded-xl p-5 h-full">
      <h3 className="text-lg font-medium text-white mb-4">Action Items</h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-dark-700 transition-colors border border-transparent hover:border-border">
            <div className="flex items-center space-x-3">
              {item.icon && (
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.colorClass || 'bg-indigo-500/20 text-indigo-400'}`}>
                  {item.icon}
                </div>
              )}
              <span className="text-gray-200 font-medium">{item.label}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="bg-dark-900 text-white text-xs font-bold px-2.5 py-1 rounded-full border border-border">
                {item.count}
              </span>
              <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors">
                View All
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-6 text-gray-400">
            No pending action items
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionItemsPanel;
