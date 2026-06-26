import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Calendar, Bell, CheckCircle2 } from 'lucide-react';

export default function NotificationDropdown({ notifications, markAsRead, markAllAsRead, onClose }) {
  const navigate = useNavigate();

  const getIcon = (type) => {
    switch (type) {
      case 'message': return <MessageCircle size={16} className="text-accent-400" />;
      case 'visit': return <Calendar size={16} className="text-success" />;
      default: return <Bell size={16} className="text-warning" />;
    }
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleNotificationClick = (notif) => {
    if (!notif.isRead) {
      markAsRead(notif.id);
    }
    if (notif.link) {
      navigate(notif.link);
      onClose();
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl glass-strong shadow-2xl border border-border overflow-hidden animate-fade-in flex flex-col max-h-[400px] z-50">
      
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between bg-dark-900/50 shrink-0">
        <h3 className="font-bold text-white">Notifications</h3>
        {notifications.some(n => !n.isRead) && (
          <button 
            onClick={markAllAsRead}
            className="text-xs font-medium text-accent-400 hover:text-accent-300 flex items-center gap-1 transition-colors"
          >
            <CheckCircle2 size={14} /> Mark all read
          </button>
        )}
      </div>

      {/* Body */}
      <div className="overflow-y-auto flex-1">
        {notifications.length === 0 ? (
          <div className="py-10 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-dark-800 flex items-center justify-center mb-3">
              <Bell size={20} className="text-text-muted" />
            </div>
            <p className="text-sm font-medium text-text-primary">No notifications yet</p>
            <p className="text-xs text-text-muted mt-1">We'll let you know when something happens</p>
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {notifications.map((notif) => (
              <button
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                className={`w-full text-left p-4 transition-colors flex items-start gap-3 relative hover:bg-dark-800 ${
                  !notif.isRead ? 'bg-dark-800/60' : 'bg-transparent'
                }`}
              >
                {!notif.isRead && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-full bg-accent-500 rounded-r-md"></span>
                )}
                <div className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center shrink-0 border border-border">
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0 pr-4">
                  <h4 className="text-sm font-bold text-white mb-0.5">{notif.title}</h4>
                  <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                    {notif.message}
                  </p>
                  <span className="text-[10px] text-text-muted mt-1.5 block">
                    {formatTime(notif.createdAt)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
