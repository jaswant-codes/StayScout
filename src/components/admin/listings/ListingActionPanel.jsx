import React, { useState } from 'react';
import { CheckCircle, XCircle, Flag } from 'lucide-react';
import ConfirmDialog from '../ConfirmDialog';

const ListingActionPanel = ({ listing, onApprove, onReject, onFlag }) => {
  const [dialogConfig, setDialogConfig] = useState({ isOpen: false, type: null });
  const [reason, setReason] = useState('');

  const handleOpenDialog = (type) => {
    setDialogConfig({ isOpen: true, type });
    setReason('');
  };

  const handleCloseDialog = () => {
    setDialogConfig({ isOpen: false, type: null });
  };

  const handleConfirm = () => {
    if (dialogConfig.type === 'reject') {
      onReject(listing.id, reason);
    } else if (dialogConfig.type === 'flag') {
      onFlag(listing.id, reason);
    }
    handleCloseDialog();
  };

  return (
    <div className="space-y-6">
      <div className="bg-dark-800 border border-border rounded-lg p-5">
        <h3 className="text-lg font-medium text-white mb-4">Moderation Actions</h3>
        
        <div className="space-y-4">
          <p className="text-sm text-text-muted">
            Current Status: <span className="font-semibold text-white capitalize">{listing?.status || 'Pending'}</span>
          </p>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onApprove(listing.id)}
              className="flex items-center gap-2 px-4 py-2 bg-success/10 text-success hover:bg-success/20 border border-success/20 rounded-md transition-colors"
            >
              <CheckCircle size={18} />
              Approve Listing
            </button>
            
            <button
              onClick={() => handleOpenDialog('flag')}
              className="flex items-center gap-2 px-4 py-2 bg-warning/10 text-warning hover:bg-warning/20 border border-warning/20 rounded-md transition-colors"
            >
              <Flag size={18} />
              Flag for Review
            </button>
            
            <button
              onClick={() => handleOpenDialog('reject')}
              className="flex items-center gap-2 px-4 py-2 bg-error/10 text-error hover:bg-error/20 border border-error/20 rounded-md transition-colors"
            >
              <XCircle size={18} />
              Reject Listing
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={dialogConfig.isOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirm}
        title={dialogConfig.type === 'reject' ? 'Reject Listing' : 'Flag Listing'}
        message={`Are you sure you want to ${dialogConfig.type} this listing? Please provide a reason below.`}
        confirmText={dialogConfig.type === 'reject' ? 'Reject' : 'Flag'}
        confirmStyle={dialogConfig.type === 'reject' ? 'danger' : 'warning'}
      >
        <div className="mt-4">
          <label className="block text-sm font-medium text-text-secondary mb-1">
            Reason (Required for {dialogConfig.type})
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full bg-dark-900 border border-border rounded-md p-3 text-white focus:outline-none focus:border-accent-500"
            rows={3}
            placeholder={`Enter reason for ${dialogConfig.type}...`}
            required
          />
        </div>
      </ConfirmDialog>
    </div>
  );
};

export default ListingActionPanel;
