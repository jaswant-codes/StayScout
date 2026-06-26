import { User, FileText, Calendar, ShieldAlert, Eye } from 'lucide-react';
import DataTable from '../DataTable';
import StatusBadge from '../StatusBadge';

export default function VerificationTable({ requests, loading, onRowClick }) {
  const columns = [
    {
      label: 'User',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center border border-border shrink-0">
            {row.user?.avatar || row.avatar ? (
              <img 
                src={row.user?.avatar || row.avatar} 
                alt="Avatar" 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-5 h-5 text-text-secondary" />
            )}
          </div>
          <div>
            <div className="font-medium text-text-primary">
              {row.user?.name || row.userName || 'Unknown User'}
            </div>
            <div className="text-xs text-text-muted">
              {row.user?.email || row.userEmail || 'No email provided'}
            </div>
          </div>
        </div>
      ),
    },
    {
      label: 'Document Type',
      render: (row) => (
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-text-secondary" />
          <span className="text-text-primary">{row.documentType || 'Unknown'}</span>
        </div>
      ),
    },
    {
      label: 'Submitted On',
      render: (row) => {
        const dateString = row.submittedAt || row.createdAt || row.date;
        const formattedDate = dateString ? new Date(dateString).toLocaleDateString() : 'N/A';
        
        return (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-text-secondary" />
            <span className="text-text-secondary">{formattedDate}</span>
          </div>
        );
      },
    },
    {
      label: 'Status',
      render: (row) => (
        <StatusBadge status={row.status} type="verification" />
      ),
    },
    {
      label: 'Risk Score',
      render: (row) => {
        const score = row.riskScore?.toLowerCase() || 'low';
        let colorClass = 'text-success bg-success/10 border-success/20';
        
        if (score === 'high') {
          colorClass = 'text-error bg-error/10 border-error/20';
        } else if (score === 'medium') {
          colorClass = 'text-warning bg-warning/10 border-warning/20';
        }
        
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${colorClass}`}>
            <ShieldAlert className="w-3.5 h-3.5" />
            <span className="capitalize">{row.riskScore || 'Low'}</span>
          </span>
        );
      },
    },
    {
      label: 'Actions',
      render: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onRowClick) onRowClick(row);
          }}
          className="p-2 rounded-lg bg-dark-700 text-text-secondary hover:text-white hover:bg-dark-600 transition-colors border border-border"
          aria-label="Review Request"
          title="Review"
        >
          <Eye className="w-4 h-4" />
        </button>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={requests}
      loading={loading}
      onRowClick={onRowClick}
    />
  );
}
