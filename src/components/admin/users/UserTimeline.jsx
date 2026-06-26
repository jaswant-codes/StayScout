import React from 'react';
import { Clock, CheckCircle, AlertTriangle, XCircle, LogIn, User } from 'lucide-react';

const getIcon = (type) => {
  switch (type) {
    case 'login':
      return <LogIn className="w-4 h-4 text-accent-500" />;
    case 'status_change':
      return <CheckCircle className="w-4 h-4 text-success" />;
    case 'warning':
      return <AlertTriangle className="w-4 h-4 text-warning" />;
    case 'ban':
      return <XCircle className="w-4 h-4 text-error" />;
    default:
      return <User className="w-4 h-4 text-muted" />;
  }
};

const UserTimeline = ({ events = [] }) => {
  if (!events || events.length === 0) {
    return (
      <div className="text-center text-sm text-muted py-8 border border-dashed border-border rounded-xl">
        No timeline events found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {events.map((event, index) => (
        <div key={event.id || index} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-dark-700 border border-border flex items-center justify-center shrink-0">
              {getIcon(event.type)}
            </div>
            {index < events.length - 1 && (
              <div className="w-px h-full bg-border my-2"></div>
            )}
          </div>
          <div className="pb-6 pt-1">
            <p className="text-sm text-white font-medium">{event.title}</p>
            <p className="text-sm text-muted mt-1">{event.description}</p>
            <p className="text-xs text-muted mt-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {new Date(event.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserTimeline;
