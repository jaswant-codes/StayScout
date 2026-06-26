import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export default function OfflineState() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-warning/15 border-b border-warning/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-2">
        <WifiOff size={16} className="text-warning" />
        <span className="text-warning text-sm font-medium">
          You are currently offline. Some features may be unavailable.
        </span>
      </div>
    </div>
  );
}
