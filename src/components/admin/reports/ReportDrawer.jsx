import React from 'react';
import { AlertTriangle, User, FileText, Calendar, Info } from 'lucide-react';
import DrawerPanel from '../DrawerPanel';
import ReportActionPanel from './ReportActionPanel';

export default function ReportDrawer({ report, isOpen, onClose, onAction }) {
  if (!report) return null;

  const handleResolve = (id, details) => {
    onAction(id, 'resolve', details);
  };

  const handleDismiss = (id) => {
    onAction(id, 'dismiss');
  };

  return (
    <DrawerPanel
      isOpen={isOpen}
      onClose={onClose}
      title="Report Details"
      icon={<AlertTriangle className="w-5 h-5 text-warning" />}
    >
      <div className="flex flex-col h-full p-4 space-y-6 bg-dark-800 text-white overflow-y-auto">
        
        {/* Status */}
        <div className="flex items-center justify-between bg-dark-900 p-3 rounded-lg border border-border">
          <span className="text-text-secondary text-sm font-medium">Status</span>
          <span className={`tag ${report.status === 'resolved' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
            {report.status || 'Pending'}
          </span>
        </div>

        {/* Two-column layout for details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Target Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4" /> Target Details
            </h3>
            <div className="bg-dark-900 p-4 rounded-lg border border-border space-y-2 h-full">
              <p><span className="text-text-muted text-sm block">Type</span> {report.targetType || 'N/A'}</p>
              <p><span className="text-text-muted text-sm block">ID</span> <span className="font-mono text-xs break-all">{report.targetId || 'N/A'}</span></p>
              {report.targetName && <p><span className="text-text-muted text-sm block">Name</span> {report.targetName}</p>}
            </div>
          </div>

          {/* Reporter Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4" /> Reporter Details
            </h3>
            <div className="bg-dark-900 p-4 rounded-lg border border-border space-y-2 h-full">
              <p><span className="text-text-muted text-sm block">ID</span> <span className="font-mono text-xs break-all">{report.reporterId || 'N/A'}</span></p>
              {report.reporterName && <p><span className="text-text-muted text-sm block">Name</span> {report.reporterName}</p>}
              {report.createdAt && (
                <div>
                  <span className="text-text-muted text-sm block">Date</span>
                  <span className="flex items-center gap-2 text-sm mt-1">
                    <Calendar className="w-4 h-4 text-text-muted" />
                    {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reason / Description */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider flex items-center gap-2">
            <Info className="w-4 h-4" /> Report Information
          </h3>
          <div className="bg-dark-900 p-4 rounded-lg border border-border">
            <p className="font-medium text-error mb-2">{report.reason || 'No specific reason provided'}</p>
            {report.description && (
              <p className="text-text-secondary text-sm whitespace-pre-wrap">{report.description}</p>
            )}
          </div>
        </div>

        {/* Action Panel */}
        <div className="mt-auto pt-4">
          <ReportActionPanel
            report={report}
            onResolve={handleResolve}
            onDismiss={handleDismiss}
          />
        </div>
      </div>
    </DrawerPanel>
  );
}
