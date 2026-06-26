import React, { useState } from 'react';
import { CheckCircle, XCircle, ShieldAlert } from 'lucide-react';
import ConfirmDialog from '../ConfirmDialog';

export default function ReportActionPanel({ report, onResolve, onDismiss }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [actionDetails, setActionDetails] = useState('');

  const handleResolve = () => {
    onResolve(report.id, actionDetails);
    setShowConfirm(false);
    setActionDetails('');
  };

  return (
    <div className="bg-dark-800 rounded-lg border border-border p-4 space-y-4">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <ShieldAlert className="w-5 h-5 text-warning" />
        Actions
      </h3>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => setShowConfirm(true)}
          className="flex-1 btn-primary flex items-center justify-center gap-2 !bg-success !border-success hover:!bg-success/80"
        >
          <CheckCircle className="w-5 h-5" />
          Take Action & Resolve
        </button>
        <button
          onClick={() => onDismiss(report.id)}
          className="flex-1 btn-secondary flex items-center justify-center gap-2"
        >
          <XCircle className="w-5 h-5" />
          Dismiss Report
        </button>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        title="Resolve Report"
        message="Please provide details about the action taken."
        confirmText="Confirm Resolution"
        cancelText="Cancel"
        onConfirm={handleResolve}
        onCancel={() => setShowConfirm(false)}
      >
        <div className="mt-4">
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Action Details (e.g. Banned User, Removed Review)
          </label>
          <textarea
            value={actionDetails}
            onChange={(e) => setActionDetails(e.target.value)}
            className="input-field min-h-[100px] w-full"
            placeholder="Describe the action taken..."
            required
          />
        </div>
      </ConfirmDialog>
    </div>
  );
}
