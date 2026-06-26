import React from 'react';
import { Eye } from 'lucide-react';
import DataTable from '../DataTable';
import StatusBadge from '../StatusBadge';

export default function ReportTable({ reports, loading, onRowClick }) {
  const columns = [
    {
      key: 'target',
      label: 'Target',
      render: (report) => (
        <div className="flex flex-col">
          <span className="font-medium text-white">{report.targetName || 'Unknown'}</span>
          <span className="text-xs text-muted">{report.targetId ? `ID: ${report.targetId}` : ''}</span>
        </div>
      )
    },
    {
      key: 'type',
      label: 'Type',
      render: (report) => (
        <span className="capitalize">{report.type || 'N/A'}</span>
      )
    },
    {
      key: 'reportedBy',
      label: 'Reported By',
      render: (report) => report.reportedByName || 'Unknown'
    },
    {
      key: 'reason',
      label: 'Reason',
      render: (report) => (
        <span className="truncate max-w-[200px] inline-block" title={report.reason}>
          {report.reason || 'No reason provided'}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (report) => <StatusBadge status={report.status} />
    },
    {
      key: 'createdAt',
      label: 'Date',
      render: (report) => {
        if (!report.createdAt) return 'N/A';
        // Handle Firebase timestamp or standard date string
        const date = report.createdAt?.toDate ? report.createdAt.toDate() : new Date(report.createdAt);
        return date.toLocaleDateString();
      }
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (report) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRowClick?.(report);
          }}
          className="p-1.5 text-muted hover:text-white hover:bg-dark-600 rounded-md transition-colors"
          title="View Report"
        >
          <Eye size={18} />
        </button>
      )
    }
  ];

  return (
    <div className="bg-dark-800 border border-border rounded-lg overflow-hidden">
      <DataTable
        columns={columns}
        data={reports}
        loading={loading}
        onRowClick={onRowClick}
        emptyMessage="No reports found."
      />
    </div>
  );
}
