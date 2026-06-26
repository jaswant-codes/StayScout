import React from 'react';
import { Download, UserX, AlertTriangle } from 'lucide-react';

const AccountSettings = () => {
  return (
    <div className="card glass-strong p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Account Settings</h3>
        <p className="text-sm text-text-muted">Manage your account data and status.</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-xl bg-dark-800 border border-border">
          <div className="flex items-start gap-3">
            <Download className="w-5 h-5 text-accent-400 mt-0.5" />
            <div>
              <h4 className="text-white font-medium">Export Account Data</h4>
              <p className="text-sm text-text-muted mt-1">Download a copy of all your personal data, properties, and reviews.</p>
            </div>
          </div>
          <button className="btn-secondary whitespace-nowrap">
            Export Data
          </button>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl bg-dark-800 border border-error/20">
          <div className="flex items-start gap-3">
            <UserX className="w-5 h-5 text-error mt-0.5" />
            <div>
              <h4 className="text-white font-medium">Deactivate Account</h4>
              <p className="text-sm text-text-muted mt-1">Temporarily hide your profile and properties from all users.</p>
            </div>
          </div>
          <button className="btn-danger whitespace-nowrap flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Deactivate
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
