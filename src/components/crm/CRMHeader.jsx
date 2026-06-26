import React, { useState, useEffect } from 'react';
import { Search, LayoutDashboard, Table as TableIcon } from 'lucide-react';

export default function CRMHeader({ stats, searchQuery, setSearchQuery, view, setView }) {
  const [localSearch, setLocalSearch] = useState(searchQuery || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (setSearchQuery) {
        setSearchQuery(localSearch);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, setSearchQuery]);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Lead Management</h1>
        <p className="text-muted text-sm mt-1">Welcome back! Here's your pipeline overview.</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search leads..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="pl-9 pr-4 py-2 bg-dark-800 border border-border rounded-lg text-white placeholder:text-muted focus:outline-none focus:border-accent-500 w-64 transition-colors"
          />
        </div>

        <div className="flex items-center bg-dark-800 border border-border rounded-lg p-1">
          <button
            onClick={() => setView && setView('kanban')}
            className={`p-1.5 rounded-md transition-colors ${
              view === 'kanban' ? 'bg-dark-600 text-white' : 'text-muted hover:text-white'
            }`}
            title="Kanban View"
          >
            <LayoutDashboard className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView && setView('table')}
            className={`p-1.5 rounded-md transition-colors ${
              view === 'table' ? 'bg-dark-600 text-white' : 'text-muted hover:text-white'
            }`}
            title="Table View"
          >
            <TableIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
