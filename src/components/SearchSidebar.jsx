import { X, RefreshCcw } from 'lucide-react';

const AMENITIES = ['WiFi', 'AC', 'TV', 'Washing Machine', 'Food Included', 'Gym', 'Parking', 'Security', 'Library'];

export default function SearchSidebar({ filters, onFilterChange, onClose, onReset }) {
  const handleCheckbox = (value) => {
    const current = filters.facilities || [];
    const newFacilities = current.includes(value)
      ? current.filter(f => f !== value)
      : [...current, value];
    
    onFilterChange({ ...filters, facilities: newFacilities });
  };

  return (
    <div className="h-full lg:h-auto bg-dark-800 p-6 rounded-2xl border border-border flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Filters</h2>
        <div className="flex items-center gap-2">
          <button 
            onClick={onReset}
            className="text-sm text-accent-500 flex items-center gap-1 hover:text-accent-400 transition-colors"
          >
            <RefreshCcw size={14} /> Reset
          </button>
          <button onClick={onClose} className="p-2 lg:hidden text-text-muted hover:text-white rounded-full bg-dark-700">
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-8 flex-1 overflow-y-auto pr-2 hide-scrollbar">
        
        {/* Property Type */}
        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">Property Type</h3>
          <div className="space-y-3">
            {['all', 'pg', 'hostel', 'flat'].map((type) => (
              <label key={type} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5">
                  <input
                    type="radio"
                    name="propertyType"
                    checked={(filters.propertyType || 'all') === type}
                    onChange={() => onFilterChange({ ...filters, propertyType: type })}
                    className="appearance-none w-5 h-5 border-2 border-dark-600 rounded-full checked:border-accent-500 checked:bg-transparent transition-all peer"
                  />
                  <div className="absolute w-2.5 h-2.5 rounded-full bg-accent-500 opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-text-primary capitalize group-hover:text-white transition-colors">
                  {type === 'all' ? 'Any Type' : type}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">Monthly Rent (₹)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">₹</span>
              <input
                type="number"
                placeholder="Min"
                value={filters.minBudget || ''}
                onChange={(e) => onFilterChange({ ...filters, minBudget: e.target.value })}
                className="w-full bg-dark-700 border-none rounded-xl py-2.5 pl-7 pr-3 text-sm focus:ring-2 focus:ring-accent-500 text-white placeholder:text-text-muted"
              />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">₹</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxBudget || ''}
                onChange={(e) => onFilterChange({ ...filters, maxBudget: e.target.value })}
                className="w-full bg-dark-700 border-none rounded-xl py-2.5 pl-7 pr-3 text-sm focus:ring-2 focus:ring-accent-500 text-white placeholder:text-text-muted"
              />
            </div>
          </div>
        </div>

        {/* Gender Preference */}
        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">Preferred For</h3>
          <div className="flex bg-dark-700 rounded-xl p-1">
            {['any', 'boys', 'girls'].map(pref => (
              <button
                key={pref}
                onClick={() => onFilterChange({ ...filters, preference: pref })}
                className={`flex-1 py-2 text-sm rounded-lg capitalize transition-all ${
                  (filters.preference || 'any') === pref
                    ? 'bg-dark-600 text-white font-medium shadow-sm'
                    : 'text-text-muted hover:text-white'
                }`}
              >
                {pref}
              </button>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">Amenities</h3>
          <div className="space-y-3">
            {AMENITIES.map(amenity => (
              <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={(filters.facilities || []).includes(amenity)}
                  onChange={() => handleCheckbox(amenity)}
                  className="w-5 h-5 rounded border-2 border-dark-600 bg-transparent text-accent-500 focus:ring-0 focus:ring-offset-0 checked:border-accent-500 transition-all cursor-pointer"
                />
                <span className="text-text-primary group-hover:text-white transition-colors text-sm">
                  {amenity}
                </span>
              </label>
            ))}
          </div>
        </div>

      </div>

      <div className="pt-6 lg:hidden">
        <button onClick={onClose} className="btn-primary w-full py-3">
          Apply Filters
        </button>
      </div>
    </div>
  );
}
