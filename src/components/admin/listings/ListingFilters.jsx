import React from 'react';
import { Search } from 'lucide-react';

const ListingFilters = ({ filters, onChange, searchQuery, onSearchChange }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-dark-800 p-4 rounded-xl border border-border">
      {/* Search Input */}
      <div className="relative w-full sm:w-96">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
          <Search size={18} />
        </div>
        <input
          type="text"
          className="input-field w-full pl-10"
          placeholder="Search by name, owner, or ID..."
          value={searchQuery || ''}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex w-full sm:w-auto gap-4">
        <select
          className="input-field w-full sm:w-40"
          value={filters?.type || ''}
          onChange={(e) => onChange('type', e.target.value)}
        >
          <option value="">All Types</option>
          <option value="PG">PG</option>
          <option value="Hostel">Hostel</option>
          <option value="Flat">Flat</option>
        </select>
        
        <select
          className="input-field w-full sm:w-40"
          value={filters?.status || ''}
          onChange={(e) => onChange('status', e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
          <option value="Flagged">Flagged</option>
        </select>
      </div>
    </div>
  );
};

export default ListingFilters;
