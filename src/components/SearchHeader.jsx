import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { useState, useEffect } from 'react';

export default function SearchHeader({ filters, onFilterChange, totalCount, viewMode, setViewMode, onToggleMobileFilters }) {
  const [localLocation, setLocalLocation] = useState(filters.location || '');
  const debouncedLocation = useDebounce(localLocation, 500);

  useEffect(() => {
    if (debouncedLocation !== filters.location) {
      onFilterChange({ ...filters, location: debouncedLocation });
    }
  }, [debouncedLocation]);

  return (
    <div className="bg-dark-800 p-4 rounded-xl border border-border flex flex-col md:flex-row gap-4 items-center justify-between">
      {/* Global Search Bar */}
      <div className="relative w-full md:w-1/2">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted">
          <Search size={20} />
        </div>
        <input
          type="text"
          value={localLocation}
          onChange={(e) => setLocalLocation(e.target.value)}
          placeholder="Search by city, college, or landmark..."
          className="w-full bg-dark-700 text-white pl-12 pr-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-accent-500 placeholder:text-text-muted transition-all"
        />
      </div>

      <div className="flex items-center justify-between w-full md:w-auto gap-4">
        {/* Results Count */}
        <div className="text-sm text-text-secondary hidden md:block">
          Showing <span className="text-white font-semibold">{totalCount || 0}</span> properties
        </div>

        <div className="flex gap-2 w-full md:w-auto justify-end">
          {/* Mobile Filter Toggle */}
          <button 
            onClick={onToggleMobileFilters}
            className="md:hidden flex-1 flex items-center justify-center gap-2 btn-secondary py-3 text-sm"
          >
            <Filter size={18} /> Filters
          </button>
          
          {/* Sort Dropdown */}
          <div className="relative w-full md:w-48 hidden md:block">
            <select 
              className="w-full bg-dark-700 text-white px-4 py-3 rounded-xl border border-border appearance-none cursor-pointer focus:ring-2 focus:ring-accent-500 outline-none"
              value={filters.sortBy || 'recommended'}
              onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
            >
              <option value="recommended">Recommended</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </select>
            <ArrowUpDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
