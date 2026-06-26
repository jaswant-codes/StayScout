import { Search } from 'lucide-react';

export default function UserFilters({ filters, onChange, searchQuery, onSearchChange }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between glass p-4 rounded-xl">
      <div className="relative w-full md:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="input-field pl-10 w-full"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        <select
          value={filters?.role || ''}
          onChange={(e) => onChange('role', e.target.value)}
          className="input-field"
        >
          <option value="">All Roles</option>
          <option value="student">Student</option>
          <option value="owner">Owner</option>
          <option value="admin">Admin</option>
        </select>
        <select
          value={filters?.status || ''}
          onChange={(e) => onChange('status', e.target.value)}
          className="input-field"
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="banned">Banned</option>
        </select>
      </div>
    </div>
  );
}
