import React, { useState } from 'react';
import { ShieldAlert, ShieldBan, Trash2, UserCheck, Shield } from 'lucide-react';
import ConfirmDialog from '../ConfirmDialog';

export default function UserActionPanel({ user, onRoleChange, onStatusChange }) {
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    action: null,
    title: '',
    message: '',
    isDestructive: false
  });
  const [reason, setReason] = useState('');

  if (!user) return null;

  const handleActionClick = (action) => {
    let title = '';
    let message = '';
    let isDestructive = true;

    switch(action) {
      case 'suspend':
        title = 'Suspend User';
        message = `Are you sure you want to suspend ${user.name}? They will temporarily lose access to their account.`;
        break;
      case 'ban':
        title = 'Ban User';
        message = `Are you sure you want to permanently ban ${user.name}? This action cannot be easily undone.`;
        break;
      case 'delete':
        title = 'Delete User';
        message = `Are you sure you want to permanently delete ${user.name}'s account and all associated data? This cannot be undone.`;
        break;
      case 'restore':
        title = 'Restore User';
        message = `Are you sure you want to restore ${user.name}'s account? They will regain full access.`;
        isDestructive = false;
        break;
      default:
        break;
    }

    setDialogState({
      isOpen: true,
      action,
      title,
      message,
      isDestructive
    });
    setReason('');
  };

  const handleConfirm = () => {
    if (dialogState.action === 'delete') {
      onStatusChange(user.id, 'deleted', reason);
    } else if (dialogState.action === 'restore') {
      onStatusChange(user.id, 'active', reason);
    } else if (dialogState.action === 'suspend') {
      onStatusChange(user.id, 'suspended', reason);
    } else if (dialogState.action === 'ban') {
      onStatusChange(user.id, 'banned', reason);
    }
    
    setDialogState(prev => ({ ...prev, isOpen: false }));
  };

  const status = user.status?.toLowerCase() || 'active';

  return (
    <div className="bg-dark-800 border border-border rounded-xl p-6">
      <h3 className="text-lg font-bold text-white mb-6">User Roles & Actions</h3>
      
      <div className="flex flex-col gap-6">
        {/* Role Change */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-text-secondary">
            <Shield size={18} />
            <span className="text-sm font-medium">Role:</span>
          </div>
          <select 
            value={user.role || 'user'} 
            onChange={(e) => onRoleChange && onRoleChange(user.id, e.target.value)}
            className="input-field max-w-[200px] text-sm py-2"
          >
            <option value="user">User</option>
            <option value="owner">Owner</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        
        <div className="h-px bg-border w-full"></div>

        {/* Status Actions */}
        <div className="flex flex-wrap gap-3">
          {(status === 'active' || status === 'suspended') && status !== 'banned' && (
            <button
              onClick={() => handleActionClick('ban')}
              className="flex items-center gap-2 px-4 py-2 bg-error/10 text-error hover:bg-error/20 border border-error/20 rounded-lg transition-colors text-sm font-medium"
            >
              <ShieldBan size={18} />
              Ban User
            </button>
          )}

          {status === 'active' && (
            <button
              onClick={() => handleActionClick('suspend')}
              className="flex items-center gap-2 px-4 py-2 bg-warning/10 text-warning hover:bg-warning/20 border border-warning/20 rounded-lg transition-colors text-sm font-medium"
            >
              <ShieldAlert size={18} />
              Suspend User
            </button>
          )}

          {(status === 'suspended' || status === 'banned') && (
            <button
              onClick={() => handleActionClick('restore')}
              className="flex items-center gap-2 px-4 py-2 bg-success/10 text-success hover:bg-success/20 border border-success/20 rounded-lg transition-colors text-sm font-medium"
            >
              <UserCheck size={18} />
              Restore User
            </button>
          )}
          
          <button
            onClick={() => handleActionClick('delete')}
            className="flex items-center gap-2 px-4 py-2 bg-error/10 text-error hover:bg-error/20 border border-error/20 rounded-lg transition-colors text-sm font-medium ml-auto"
          >
            <Trash2 size={18} />
            Delete Account
          </button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={dialogState.isOpen}
        onClose={() => setDialogState(prev => ({ ...prev, isOpen: false }))}
        onConfirm={handleConfirm}
        title={dialogState.title}
        message={dialogState.message}
        isDestructive={dialogState.isDestructive}
        confirmText={dialogState.action === 'restore' ? 'Restore' : 'Confirm'}
      >
        <div className="flex flex-col gap-2">
          <label className="text-sm text-text-secondary font-medium">
            Reason {dialogState.isDestructive ? '(Required)' : '(Optional)'}
          </label>
          <textarea
            className="input-field min-h-[100px] resize-y"
            placeholder={`Explain why you are ${dialogState.action}ing this user...`}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
      </ConfirmDialog>
    </div>
  );
}
