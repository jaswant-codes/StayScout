import { RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState({ onReset }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center glass rounded-3xl border border-border">
      <div className="w-48 h-48 mb-8 opacity-80">
        <img 
          src="https://illustrations.popsy.co/amber/page-not-found.svg" 
          alt="No properties found" 
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="text-2xl font-bold text-text-primary mb-3">No properties match your filters</h3>
      <p className="text-text-secondary max-w-md mx-auto mb-8">
        Try adjusting your search criteria, removing some filters, or zooming out on the map to find what you're looking for.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        {onReset && (
          <button 
            onClick={onReset}
            className="btn-secondary h-14 px-8 rounded-xl font-semibold flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <RefreshCcw size={18} />
            Reset Filters
          </button>
        )}
        <Link 
          to="/search" 
          onClick={onReset}
          className="btn-primary h-14 px-8 rounded-xl font-semibold flex items-center justify-center w-full sm:w-auto"
        >
          Browse All Properties
        </Link>
      </div>
    </div>
  );
}
