import { Bell, Info, CheckCircle, AlertTriangle } from 'lucide-react';

const NotificationPanel = ({ notifications = [] }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-accent-500" />;
    }
  };

  return (
    <div className="card glass p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <Bell className="w-5 h-5 text-accent-400" />
          Notifications
        </h3>
        <span className="text-sm text-accent-400 hover:text-accent-300 cursor-pointer transition-colors">
          Mark all as read
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-4 rounded-xl border flex gap-4 relative transition-colors
                ${notif.unread ? 'bg-dark-800/80 border-accent-500/30' : 'bg-dark-900/50 border-border'}
              `}
            >
              {notif.unread && (
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-accent-500 animate-pulse-glow" />
              )}
              <div className="shrink-0 mt-1">
                {getIcon(notif.type)}
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium mb-1 pr-6">{notif.title}</h4>
                <p className="text-sm text-muted mb-2">{notif.message}</p>
                <span className="text-xs text-muted/70">{notif.time}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <Bell className="w-10 h-10 text-muted mb-3 opacity-20" />
            <p className="text-muted">No new notifications</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
