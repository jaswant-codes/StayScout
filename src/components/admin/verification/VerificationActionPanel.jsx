import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import ConfirmDialog from '../ConfirmDialog';

export default function VerificationActionPanel({ request, onApprove, onReject }) {
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const handleApprove = () => {
    onApprove(request?.id);
  };

  const handleRejectConfirm = () => {
    if (!rejectReason.trim()) return; // Prevent empty rejection
    onReject(request?.id, rejectReason);
    setIsRejectDialogOpen(false);
    setRejectReason('');
  };

  return (
    <div className="mt-6 flex flex-col gap-3 border-t border-border pt-4">
      <h4 className="text-sm font-medium text-white mb-2">Actions</h4>
      <div className="flex items-center gap-3">
        <button
          onClick={handleApprove}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-success/10 text-success border border-success/20 rounded-lg hover:bg-success/20 transition-colors font-medium text-sm"
        >
          <Check size={16} />
          Approve
        </button>
        <button
          onClick={() => setIsRejectDialogOpen(true)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-error/10 text-error border border-error/20 rounded-lg hover:bg-error/20 transition-colors font-medium text-sm"
        >
          <X size={16} />
          Reject
        </button>
      </div>

      <ConfirmDialog
        isOpen={isRejectDialogOpen}
        onClose={() => setIsRejectDialogOpen(false)}
        onConfirm={handleRejectConfirm}
        title="Reject Verification"
        confirmText="Confirm Rejection"
        confirmVariant="danger"
      >
        <div className="flex flex-col gap-3">
          <p className="text-sm text-text-secondary">
            Please provide a reason for rejecting this verification request. This will be sent to the user.
          </p>
          <textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="e.g. Blurry image, Name mismatch..."
            className="w-full p-3 bg-dark-900 border border-border rounded-lg text-white placeholder:text-text-muted focus:outline-none focus:border-accent-500 resize-none h-24 text-sm"
          />
        </div>
      </ConfirmDialog>
    </div>
  );
}
