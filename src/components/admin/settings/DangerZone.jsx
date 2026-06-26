import React, { useState } from 'react';
import { AlertTriangle, Trash2, LogOut, RefreshCcw } from 'lucide-react';
import ConfirmDialog from '../ConfirmDialog';

export default function DangerZone({ onAction }) {
  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    title: '',
    message: '',
    actionType: null,
    confirmText: 'Confirm'
  });

  const handleOpenConfirm = (type, title, message, confirmText = 'Confirm') => {
    setConfirmState({
      isOpen: true,
      title,
      message,
      actionType: type,
      confirmText
    });
  };

  const handleCloseConfirm = () => {
    setConfirmState({
      isOpen: false,
      title: '',
      message: '',
      actionType: null,
      confirmText: 'Confirm'
    });
  };

  const handleConfirm = () => {
    if (confirmState.actionType && onAction) {
      onAction(confirmState.actionType);
    }
    handleCloseConfirm();
  };

  const actions = [
    {
      id: 'clear_cache',
      title: 'Clear System Cache',
      description: 'Removes all cached data. This may temporarily slow down the application as data is refetched.',
      icon: RefreshCcw,
      confirmMessage: 'Are you sure you want to clear the system cache? This action cannot be undone.',
      confirmText: 'Clear Cache'
    },
    {
      id: 'force_logout',
      title: 'Force Logout All Users',
      description: 'Immediately terminates all active user sessions. Users will need to log in again.',
      icon: LogOut,
      confirmMessage: 'Are you sure you want to force logout all users? This will disrupt active sessions.',
      confirmText: 'Force Logout'
    },
    {
      id: 'delete_mock_data',
      title: 'Delete All Mock Data',
      description: 'Permanently removes all mock data from the database. This action is irreversible.',
      icon: Trash2,
      confirmMessage: 'Are you absolutely sure you want to delete all mock data? This cannot be undone.',
      confirmText: 'Delete Data'
    }
  ];

  return (
    <div className="bg-dark-800 rounded-xl border border-error/20 p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-error/10 rounded-lg">
          <AlertTriangle className="w-6 h-6 text-error" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Danger Zone</h2>
          <p className="text-sm text-text-muted">Irreversible and destructive actions</p>
        </div>
      </div>

      <div className="space-y-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <div 
              key={action.id} 
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-dark-900/50 border border-border"
            >
              <div>
                <h3 className="text-white font-medium mb-1">{action.title}</h3>
                <p className="text-sm text-text-secondary">{action.description}</p>
              </div>
              <button
                onClick={() => handleOpenConfirm(action.id, action.title, action.confirmMessage, action.confirmText)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-error hover:bg-error/80 text-white rounded-lg transition-colors text-sm font-medium whitespace-nowrap"
              >
                <Icon className="w-4 h-4" />
                {action.title}
              </button>
            </div>
          );
        })}
      </div>

      <ConfirmDialog
        isOpen={confirmState.isOpen}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirm}
        title={confirmState.title}
        message={confirmState.message}
        confirmText={confirmState.confirmText}
        isDestructive={true}
      />
    </div>
  );
}
