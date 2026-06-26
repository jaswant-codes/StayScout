import React from 'react';
import { Activity, Clock } from 'lucide-react';

const ActivityLog = ({ activityLog = [] }) => {
  return (
    <div className="card glass-strong p-6">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-accent-400" />
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
      </div>

      {activityLog.length === 0 ? (
        <div className="text-center py-8 text-text-muted">
          <p>No recent activity found.</p>
        </div>
      ) : (
        <div className="relative border-l border-dark-600 ml-3 space-y-6">
          {activityLog.map((activity, index) => (
            <div key={index} className="relative pl-6">
              {/* Timeline dot */}
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
              
              <div className="bg-dark-800 rounded-lg p-4 border border-border hover:border-border-hover transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-medium">{activity.title || activity.action}</h4>
                  <div className="flex items-center gap-1 text-xs text-text-muted">
                    <Clock className="w-3 h-3" />
                    <span>{activity.date || activity.timestamp}</span>
                  </div>
                </div>
                <p className="text-sm text-text-muted">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityLog;
