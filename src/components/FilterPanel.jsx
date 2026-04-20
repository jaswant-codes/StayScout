import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import FacilityTag from './FacilityTag';
import { FACILITIES_LIST } from '../utils/helpers';

export default function FilterPanel({ filters, onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="w-full">
      {/* Search Bar */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <input
            type="text"
            placeholder="Search by city or area..."
            value={filters.location || ''}
            onChange={(e) => updateFilter('location', e.target.value)}
            className="input-field pl-11"
          />
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`btn-secondary flex items-center gap-2 ${isOpen ? 'border-accent-500 text-accent-400' : ''}`}
        >
          <SlidersHorizontal size={16} />
          <span className="hidden sm:inline">Filters</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-accent-500" />
          )}
        </button>
      </div>

      {/* Filter Panel */}
      {isOpen && (
        <div className="glass rounded-xl p-5 mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">Filters</h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-accent-400 hover:text-accent-300 flex items-center gap-1"
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
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxBudget || ''}
                onChange={(e) => updateFilter('maxBudget', e.target.value)}
                className="input-field w-1/2"
              />
            </div>
          </div>

          {/* Facilities */}
          <div>
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2 block">
              Facilities
            </label>
            <div className="flex flex-wrap gap-2">
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
