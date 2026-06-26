import React from 'react';
import { Search } from 'lucide-react';

const TicketFilters = ({ filters, onChange, searchQuery, onSearchChange }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-dark-800 p-4 rounded-xl border border-border">
      {/* Search */}
      <div className="relative flex-1 max-w-md w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tickets by subject, user, or ID..."
          className="input-field pl-10 w-full bg-dark-900 border-border"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
        <select
          value={filters?.status || ''}
          onChange={(e) => onChange({ ...filters, status: e.target.value })}
          className="input-field w-full sm:w-auto bg-dark-900 border-border"
        >
          <option value="">All Statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>

        <select
          value={filters?.priority || ''}
          onChange={(e) => onChange({ ...filters, priority: e.target.value })}
          className="input-field w-full sm:w-auto bg-dark-900 border-border"
        >
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
    </div>
  );
};

export default TicketFilters;
