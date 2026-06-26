import { Search } from 'lucide-react';

export default function ReportFilters({ filters = {}, onChange, searchQuery = '', onSearchChange }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-dark-800 border border-border p-4 rounded-xl text-white">
      {/* Left side: Search input */}
      <div className="relative w-full md:w-96">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-text-muted" />
        </div>
        <input
          type="text"
          placeholder="Search reports..."
          value={searchQuery}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          className="input-field pl-10 w-full"
        />
      </div>

      {/* Right side: Filter dropdowns */}
      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        <select
          value={filters.type || 'all'}
          onChange={(e) => onChange && onChange({ ...filters, type: e.target.value })}
          className="input-field"
        >
          <option value="all">All Types</option>
          <option value="listing">Listing</option>
          <option value="user">User</option>
          <option value="review">Review</option>
        </select>

        <select
          value={filters.status || 'all'}
          onChange={(e) => onChange && onChange({ ...filters, status: e.target.value })}
          className="input-field"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="resolved">Resolved</option>
          <option value="dismissed">Dismissed</option>
        </select>
      </div>
    </div>
  );
}
