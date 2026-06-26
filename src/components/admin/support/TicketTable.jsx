import React from 'react';
import { Eye } from 'lucide-react';
import DataTable from '../DataTable';
import StatusBadge from '../StatusBadge';

const TicketTable = ({ tickets, loading, onRowClick }) => {
  const columns = [
    {
      key: 'subject',
      label: 'Ticket',
      render: (ticket) => (
        <div>
          <div className="font-medium text-white">{ticket.subject}</div>
          <div className="text-xs text-muted">#{ticket.id}</div>
        </div>
      ),
    },
    {
      key: 'user',
      label: 'User',
      render: (ticket) => (
        <div>
          <div className="text-sm text-white">{ticket.userName}</div>
          <div className="text-xs text-muted">{ticket.userType}</div>
        </div>
      ),
    },
    {
      key: 'priority',
      label: 'Priority',
      render: (ticket) => {
        const priorityColors = {
          low: 'text-success bg-success/10',
          medium: 'text-warning bg-warning/10',
          high: 'text-error bg-error/10',
          urgent: 'text-error bg-error/20 font-bold',
        };
        const defaultColor = 'text-muted bg-dark-600';
        const colorClass = priorityColors[ticket.priority?.toLowerCase()] || defaultColor;
        
        return (
          <span className={`inline-block px-2 py-1 rounded text-xs capitalize ${colorClass}`}>
            {ticket.priority}
          </span>
        );
      },
    },
    {
      key: 'category',
      label: 'Category',
      render: (ticket) => (
        <span className="text-sm text-muted capitalize">{ticket.category}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (ticket) => (
        <StatusBadge status={ticket.status} />
      ),
    },
    {
      key: 'createdAt',
      label: 'Created At',
      render: (ticket) => {
        if (!ticket.createdAt) return <span className="text-sm text-muted">-</span>;
        const date = ticket.createdAt?.toDate ? ticket.createdAt.toDate() : new Date(ticket.createdAt);
        return (
          <span className="text-sm text-muted">
            {date.toLocaleDateString()}
          </span>
        );
      },
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (ticket) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onRowClick) onRowClick(ticket);
          }}
          className="p-1.5 text-muted hover:text-white hover:bg-dark-600 rounded transition-colors"
          title="View Ticket"
        >
          <Eye size={18} />
        </button>
      ),
    },
  ];

  return (
    <div className="bg-dark-800 border border-border rounded-lg overflow-hidden">
      <DataTable
        columns={columns}
        data={tickets}
        loading={loading}
        onRowClick={onRowClick}
        emptyMessage="No support tickets found."
      />
    </div>
  );
};

export default TicketTable;
