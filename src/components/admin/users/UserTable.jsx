import React from 'react';
import { MoreVertical } from 'lucide-react';
import DataTable from '../DataTable';
import StatusBadge from '../StatusBadge';

export default function UserTable({ users, loading, onRowClick, selectedIds = [], onSelect, onSelectAll }) {
  const columns = [
    {
      key: 'checkbox',
      label: (
        <input
          type="checkbox"
          className="w-4 h-4 rounded border-border bg-dark-700 text-accent-500 focus:ring-accent-500"
          checked={selectedIds.length > 0 && selectedIds.length === (users?.length || 0)}
          onChange={onSelectAll}
        />
      ),
      render: (row) => (
        <div onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-border bg-dark-700 text-accent-500 focus:ring-accent-500"
            checked={selectedIds.includes(row.id)}
            onChange={() => onSelect(row.id)}
          />
        </div>
      )
    },
    {
      key: 'user',
      label: 'User',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-dark-700 border border-border overflow-hidden flex items-center justify-center shrink-0">
            {row.avatar ? (
              <img src={row.avatar} alt={row.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-text-secondary font-medium text-sm">{row.name?.charAt(0) || '?'}</span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-white">{row.name || 'Unknown User'}</span>
            <span className="text-xs text-text-secondary">{row.email || 'No email'}</span>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      label: 'Role',
      render: (row) => (
        <span className="capitalize text-sm font-medium text-text-secondary">
          {row.role || 'user'}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <StatusBadge status={row.status || 'active'} type="user" />
    },
    {
      key: 'joinedDate',
      label: 'Joined Date',
      render: (row) => (
        <span className="text-text-secondary text-sm">
          {row.joinedDate ? new Date(row.joinedDate).toLocaleDateString() : 'N/A'}
        </span>
      )
    },
    {
      key: 'lastActive',
      label: 'Last Active',
      render: (row) => (
        <span className="text-text-secondary text-sm">
          {row.lastActive || 'N/A'}
        </span>
      )
    },
    {
      key: 'properties',
      label: 'Properties',
      render: (row) => (
        row.role === 'owner' ? (
          <span className="text-text-secondary text-sm">{row.propertiesCount || 0}</span>
        ) : (
          <span className="text-text-muted text-sm">-</span>
        )
      )
    },
    {
      key: 'actions',
      label: '',
      render: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Action button clicked - maybe show a dropdown menu
          }}
          className="p-1.5 hover:bg-dark-700 rounded-lg transition-colors text-text-secondary hover:text-white ml-auto flex"
        >
          <MoreVertical size={18} />
        </button>
      )
    }
  ];

  return (
    <DataTable
      columns={columns}
      data={users}
      loading={loading}
      onRowClick={onRowClick}
    />
  );
}
