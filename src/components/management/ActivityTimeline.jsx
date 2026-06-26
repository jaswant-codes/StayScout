import React from 'react';
import { Activity, Rocket, UserPlus, Star, Edit3, MessageSquare } from 'lucide-react';

const ActivityTimeline = ({ propertyId }) => {
  const events = [
    {
      id: 1,
      type: 'review',
      title: 'New Review Received',
      description: '5-star rating from Rahul Sharma',
      time: '2 hours ago',
      icon: Star,
      iconColor: 'text-warning',
      iconBg: 'bg-warning/10'
    },
    {
      id: 2,
      type: 'lead',
      title: 'New Lead Generated',
      description: 'Priya requested a callback for single sharing room',
      time: '1 day ago',
      icon: UserPlus,
      iconColor: 'text-accent-400',
      iconBg: 'bg-accent-400/10'
    },
    {
      id: 3,
      type: 'edit',
      title: 'Property Updated',
      description: 'Monthly rent updated from ₹8000 to ₹8500',
      time: '2 days ago',
      icon: Edit3,
      iconColor: 'text-secondary',
      iconBg: 'bg-dark-600'
    },
    {
      id: 4,
      type: 'message',
      title: 'Inquiry Received',
      description: 'Message from Amit regarding food menu',
      time: '3 days ago',
      icon: MessageSquare,
      iconColor: 'text-blue-400',
      iconBg: 'bg-blue-400/10'
    },
    {
      id: 5,
      type: 'publish',
      title: 'Property Live',
      description: 'Listing approved and published on StayScout',
      time: '1 week ago',
      icon: Rocket,
      iconColor: 'text-success',
      iconBg: 'bg-success/10'
    }
  ];

  return (
    <div className="card glass-strong p-6 mb-6">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-accent-400" />
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
      </div>

      <div className="relative pl-6 border-l border-border space-y-8 ml-2">
        {events.map((event) => {
          const Icon = event.icon;
          return (
            <div key={event.id} className="relative">
              {/* Timeline dot */}
              <div className={`absolute -left-[35px] p-1.5 rounded-full ${event.iconBg} border-4 border-dark-900`}>
                <Icon className={`w-4 h-4 ${event.iconColor}`} />
              </div>
              
              <div className="bg-dark-800 border border-border rounded-xl p-4 ml-2">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-medium text-white">{event.title}</h4>
                  <span className="text-xs text-muted whitespace-nowrap ml-2">{event.time}</span>
                </div>
                <p className="text-sm text-secondary">{event.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityTimeline;
