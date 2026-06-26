import React from 'react';

const AdminActivityFeed = ({ events = [], loading }) => {
  if (loading) {
    return (
      <div className="bg-dark-800 border border-border rounded-xl p-5 h-full">
        <h3 className="text-lg font-medium text-white mb-4">Activity Feed</h3>
        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex space-x-4 animate-pulse-glow">
              <div className="w-2 h-2 mt-2 bg-dark-700 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="w-full h-4 bg-dark-700 rounded"></div>
                <div className="w-24 h-3 bg-dark-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark-800 border border-border rounded-xl p-5 h-full">
      <h3 className="text-lg font-medium text-white mb-4">Recent Admin Activity</h3>
      <div className="relative border-l border-dark-600 ml-3 space-y-6">
        {events.map((event, index) => (
          <div key={index} className="relative pl-6">
            {/* Timeline dot */}
            <span className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-indigo-500 border-2 border-dark-800"></span>
            
            <div className="flex flex-col">
              <p className="text-sm text-gray-200">
                <span className="font-semibold text-white">{event.adminName}</span> {event.action}
              </p>
              <span className="text-xs text-gray-400 mt-1">{event.time}</span>
            </div>
          </div>
        ))}
        {events.length === 0 && (
          <div className="text-center py-6 text-gray-400 pl-4 border-l-0">
            No recent activities
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminActivityFeed;
