import { useState } from 'react';
import { ShieldAlert, Ban, ShieldCheck } from 'lucide-react';
import ConfirmDialog from '../ConfirmDialog';

export default function BulkActionsBar({ selectedCount, onAction }) {
  const [dialogConfig, setDialogConfig] = useState({ isOpen: false, type: null });

  if (!selectedCount || selectedCount === 0) return null;

  const handleActionClick = (type) => {
    setDialogConfig({ isOpen: true, type });
  };

  const handleConfirm = () => {
    if (dialogConfig.type) {
      onAction(dialogConfig.type);
    }
    setDialogConfig({ isOpen: false, type: null });
  };

  const getDialogContent = () => {
    switch(dialogConfig.type) {
      case 'suspend': 
        return { 
          title: 'Suspend Users', 
          message: `Are you sure you want to suspend ${selectedCount} user${selectedCount > 1 ? 's' : ''}?`, 
          confirmText: 'Suspend', 
          isDestructive: true 
        };
      case 'ban': 
        return { 
          title: 'Ban Users', 
          message: `Are you sure you want to ban ${selectedCount} user${selectedCount > 1 ? 's' : ''}?`, 
          confirmText: 'Ban', 
          isDestructive: true 
        };
      case 'restore': 
        return { 
          title: 'Restore Users', 
          message: `Are you sure you want to restore ${selectedCount} user${selectedCount > 1 ? 's' : ''}?`, 
          confirmText: 'Restore', 
          isDestructive: false 
        };
      default: 
        return { title: '', message: '', confirmText: '' };
    }
  };

  const content = getDialogContent();

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-dark-800 border-t border-border p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] animate-slide-in">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-white font-medium bg-accent-500/20 px-4 py-1.5 rounded-full text-accent-400 border border-accent-500/30">
              {selectedCount} user{selectedCount > 1 ? 's' : ''} selected
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleActionClick('suspend')} 
              className="btn-secondary flex items-center gap-2"
            >
              <ShieldAlert size={18} /> 
              <span className="hidden sm:inline">Bulk Suspend</span>
            </button>
            <button 
              onClick={() => handleActionClick('ban')} 
              className="btn-danger flex items-center gap-2"
            >
              <Ban size={18} /> 
              <span className="hidden sm:inline">Bulk Ban</span>
            </button>
            <button 
              onClick={() => handleActionClick('restore')} 
              className="btn-primary flex items-center gap-2"
            >
              <ShieldCheck size={18} /> 
              <span className="hidden sm:inline">Bulk Restore</span>
            </button>
          </div>
        </div>
      </div>
      
      <ConfirmDialog
        isOpen={dialogConfig.isOpen}
        onClose={() => setDialogConfig({ isOpen: false, type: null })}
        onConfirm={handleConfirm}
        title={content.title}
        message={content.message}
        confirmText={content.confirmText}
        isDestructive={content.isDestructive}
      />
    </>
  );
}
