import React from 'react';
import { Search } from 'lucide-react';

const VerificationFilters = ({ filters, onChange, searchQuery, onSearchChange }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-dark-800 p-4 rounded-xl border border-border">
      <div className="w-full md:w-1/2 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={searchQuery || ''}
          onChange={(e) => onSearchChange(e.target.value)}
          className="input-field pl-10 w-full"
        />
      </div>
      
      <div className="flex w-full md:w-auto gap-4">
        <select
          value={filters?.type || 'All'}
          onChange={(e) => onChange('type', e.target.value)}
          className="input-field flex-1 md:w-40"
        >
          <option value="All">All Types</option>
          <option value="Aadhaar">Aadhaar</option>
          <option value="PAN">PAN</option>
          <option value="GST">GST</option>
        </select>
        
        <select
          value={filters?.status || 'All'}
          onChange={(e) => onChange('status', e.target.value)}
          className="input-field flex-1 md:w-40"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
    </div>
  );
};

export default VerificationFilters;
