import React from 'react';
import { Eye, Star, Heart, MessageSquare, MapPin } from 'lucide-react';

const RecentActivity = ({ activity }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'view': return <Eye className="w-4 h-4 text-accent-500" />;
      case 'review': return <Star className="w-4 h-4 text-yellow-500" />;
      case 'save': return <Heart className="w-4 h-4 text-pink-500" />;
      case 'message': return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case 'visit': return <MapPin className="w-4 h-4 text-emerald-500" />;
      default: return <Eye className="w-4 h-4 text-text-muted" />;
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case 'view': return 'bg-accent-500/10 border-accent-500/20';
      case 'review': return 'bg-yellow-500/10 border-yellow-500/20';
      case 'save': return 'bg-pink-500/10 border-pink-500/20';
      case 'message': return 'bg-blue-500/10 border-blue-500/20';
      case 'visit': return 'bg-emerald-500/10 border-emerald-500/20';
      default: return 'bg-dark-700 border-border';
    }
  };

  if (!activity || activity.length === 0) {
    return (
      <div className="glass-strong rounded-2xl p-6 border border-border h-full">
        <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-12 h-12 bg-dark-700 rounded-full flex items-center justify-center mb-3">
            <MapPin className="w-6 h-6 text-text-muted" />
          </div>
          <p className="text-text-secondary font-medium">No recent activity</p>
          <p className="text-text-muted text-sm mt-1">Activities will show up here as users interact with your listings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-strong rounded-2xl p-6 border border-border">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white">Recent Activity</h3>
        <button className="text-sm text-accent-500 hover:text-accent-400 font-medium transition-colors">
          View All
        </button>
      </div>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-4 bottom-4 w-px bg-dark-600"></div>
        
        <div className="space-y-6">
          {activity.map((item, index) => (
            <div key={index} className="relative flex gap-4">
              <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 z-10 ${getBgColor(item.type)}`}>
                {getIcon(item.type)}
              </div>
              <div className="flex-1 pt-1">
                <p className="text-white text-sm">
                  <span className="font-medium">{item.user}</span> {item.action}{' '}
                  <span className="font-medium text-accent-400">{item.property}</span>
                </p>
                <p className="text-xs text-text-muted mt-1">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
