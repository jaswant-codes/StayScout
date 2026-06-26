import React from 'react';
import { User, Calendar, Shield } from 'lucide-react';
import DrawerPanel from '../DrawerPanel';
import DocumentViewer from './DocumentViewer';
import VerificationActionPanel from './VerificationActionPanel';

export default function VerificationDrawer({ request, isOpen, onClose, onAction }) {
  if (!request) return null;

  const handleApprove = (id) => {
    if (onAction) onAction('approve', id);
  };

  const handleReject = (id, reason) => {
    if (onAction) onAction('reject', id, reason);
  };

  return (
    <DrawerPanel
      isOpen={isOpen}
      onClose={onClose}
      title="Verification Details"
      size="lg"
    >
      <div className="flex flex-col h-full gap-6 p-1">
        {/* User Info & Document Type - Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* User Information */}
          <div className="p-4 bg-dark-800 border border-border rounded-xl flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider flex items-center gap-2">
              <User size={14} />
              User Information
            </h3>
            <div className="flex items-center gap-3 mt-1">
              <div className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-lg font-bold text-white border border-border">
                {request.userName?.charAt(0) || 'U'}
              </div>
              <div>
                <p className="text-white font-medium">{request.userName || 'Unknown User'}</p>
                <p className="text-sm text-text-muted">{request.userEmail || 'No email provided'}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-dark-700">
              <div>
                <p className="text-xs text-text-muted">Role</p>
                <p className="text-sm text-white capitalize">{request.userRole || 'User'}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted">Submitted</p>
                <p className="text-sm text-white flex items-center gap-1">
                  <Calendar size={12} />
                  {request.submittedAt || 'Recent'}
                </p>
              </div>
            </div>
          </div>

          {/* Request Details */}
          <div className="p-4 bg-dark-800 border border-border rounded-xl flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider flex items-center gap-2">
              <Shield size={14} />
              Request Details
            </h3>
            <div className="flex-1 flex flex-col justify-center gap-3 mt-1">
              <div>
                <p className="text-xs text-text-muted">Document Type</p>
                <p className="text-sm font-medium text-white capitalize">{request.documentType || 'ID Document'}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted">Status</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning/10 text-warning border border-warning/20">
                  {request.status || 'Pending'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Document Viewer Section */}
        <div className="flex-1 flex flex-col min-h-[400px]">
          <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
            Document Verification
          </h3>
          <DocumentViewer 
            documentUrl={request.documentUrl} 
            documentType={request.documentType || 'ID'} 
          />
        </div>

        {/* Action Panel */}
        <VerificationActionPanel
          request={request}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    </DrawerPanel>
  );
}
