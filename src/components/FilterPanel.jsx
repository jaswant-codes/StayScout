import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import FacilityTag from './FacilityTag';
import { FACILITIES_LIST } from '../utils/helpers';
import { useDebounce } from '../hooks/useDebounce';

export default function FilterPanel({ filters, onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [localLocation, setLocalLocation] = useState(filters.location || '');

  // Debounce the location search
  const debouncedLocation = useDebounce(localLocation, 300);

  // Sync debounced value to parent
  useEffect(() => {
    if (debouncedLocation !== filters.location) {
      onFilterChange({ ...filters, location: debouncedLocation });
    }
  }, [debouncedLocation]);

  const updateFilter = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const toggleFacility = (facility) => {
    const current = filters.facilities || [];
    const updated = current.includes(facility)
      ? current.filter((f) => f !== facility)
      : [...current, facility];
    updateFilter('facilities', updated);
  };

  const clearFilters = () => {
    setLocalLocation('');
    onFilterChange({
      location: '',
      minBudget: '',
      maxBudget: '',
      facilities: [],
    });
  };

  const hasActiveFilters =
    filters.location || filters.minBudget || filters.maxBudget || filters.facilities?.length > 0;

  return (
    <div className="w-full" role="search" aria-label="Property filters">
      {/* Search Bar */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} aria-hidden="true" />
          <input
            type="text"
            placeholder="Search by city or area..."
            value={localLocation}
            onChange={(e) => setLocalLocation(e.target.value)}
            className="input-field pl-11"
            aria-label="Search by city or area"
          />
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`btn-secondary flex items-center gap-2 ${isOpen ? 'border-accent-500 text-accent-400' : ''}`}
          aria-expanded={isOpen}
          aria-controls="filter-panel"
          aria-label="Toggle filters"
        >
          <SlidersHorizontal size={16} />
          <span className="hidden sm:inline">Filters</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-accent-500" aria-label="Active filters" />
          )}
        </button>
      </div>

      {/* Filter Panel */}
      {isOpen && (
        <div id="filter-panel" className="glass rounded-xl p-5 mb-6 animate-fade-in" role="region" aria-label="Filter options">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">Filters</h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-accent-400 hover:text-accent-300 flex items-center gap-1"
                aria-label="Clear all filters"
              >
                <X size={12} /> Clear all
              </button>
            )}
          </div>

          {/* Budget Range */}
          <div className="mb-5">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2 block">
              Budget Range (₹/month)
            </label>
            <div className="flex gap-3">
              <input
                type="number"
                placeholder="Min"
                value={filters.minBudget || ''}
                onChange={(e) => updateFilter('minBudget', e.target.value)}
                className="input-field w-1/2"
                aria-label="Minimum budget"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxBudget || ''}
                onChange={(e) => updateFilter('maxBudget', e.target.value)}
                className="input-field w-1/2"
                aria-label="Maximum budget"
              />
            </div>
          </div>

          {/* Facilities */}
          <div>
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2 block">
              Facilities
            </label>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Facility filters">
              {FACILITIES_LIST.map((facility) => (
                <FacilityTag
                  key={facility}
                  facility={facility}
                  selected={filters.facilities?.includes(facility)}
                  onClick={() => toggleFacility(facility)}
                  small
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
