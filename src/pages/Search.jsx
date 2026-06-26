import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProperties } from '../hooks/useProperties';
import SearchHeader from '../components/SearchHeader';
import SearchSidebar from '../components/SearchSidebar';
import PropertyCard from '../components/PropertyCard';
import PropertyCardSkeleton from '../components/PropertyCardSkeleton';
import EmptyState from '../components/EmptyState';
import { Helmet } from 'react-helmet-async';
import { Map, List } from 'lucide-react';
import { useAnalytics } from '../hooks/useAnalytics';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState(() => localStorage.getItem('stayscout_view_mode') || 'grid');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Convert URLSearchParams to a plain object for the hook
  const filters = Object.fromEntries(searchParams.entries());
  
  // Format facilities array properly
  if (filters.facilities) {
    filters.facilities = filters.facilities.split(',');
  }

  const { properties, loading, hasMore, loadMore, totalCount } = useProperties(filters);
  const { trackPageView, trackSearch } = useAnalytics();

  // Dynamic SEO details based on search
  const locationText = filters.location ? `in ${filters.location}` : 'in India';
  const typeText = filters.propertyType ? filters.propertyType.replace('-', ' ') : 'PGs, Hostels & Rooms';
  const pageTitle = `${typeText} ${locationText} | StayScout`;

  useEffect(() => {
    localStorage.setItem('stayscout_view_mode', viewMode);
  }, [viewMode]);

  useEffect(() => {
    trackPageView(`Search: ${pageTitle}`);
    trackSearch(filters.location || '', filters);
  }, [filters.location, filters.propertyType, filters.budget]);

  const handleFilterChange = (newFilters) => {
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        if (Array.isArray(value) && value.length > 0) {
          params.set(key, value.join(','));
        } else if (!Array.isArray(value)) {
          params.set(key, value);
        }
      }
    });
    setSearchParams(params);
  };

  const handleReset = () => {
    setSearchParams({});
    setIsMobileFiltersOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={`Find the best ${typeText} ${locationText}. Check verified reviews, amenities, and rent prices on StayScout.`} />
      </Helmet>

      <div className="pt-24 pb-20 min-h-screen bg-dark-900">
        <div className="container mx-auto px-4">
          
          {/* Breadcrumbs */}
          <nav className="text-sm text-text-muted mb-6 flex items-center gap-2" aria-label="Breadcrumb">
            <a href="/" className="hover:text-accent-400 transition-colors">Home</a>
            <span>/</span>
            <span className="text-text-primary capitalize">{filters.location || 'All Properties'}</span>
          </nav>

          {/* Search Header */}
          <SearchHeader 
            filters={filters}
            onFilterChange={handleFilterChange}
            totalCount={totalCount}
            viewMode={viewMode}
            setViewMode={setViewMode}
            onToggleMobileFilters={() => setIsMobileFiltersOpen(true)}
          />

          <div className="flex flex-col lg:flex-row gap-8 mt-8">
            {/* Sidebar Filters */}
            <aside className={`
              fixed inset-y-0 left-0 z-50 w-full sm:w-[340px] bg-dark-800 lg:bg-transparent lg:static lg:w-1/4 lg:block transform transition-transform duration-300 ease-in-out
              ${isMobileFiltersOpen ? 'translate-x-0 overflow-y-auto' : '-translate-x-full lg:translate-x-0'}
            `}>
              <SearchSidebar 
                filters={filters} 
                onFilterChange={handleFilterChange} 
                onClose={() => setIsMobileFiltersOpen(false)}
                onReset={handleReset}
              />
            </aside>

            {/* Mobile Filter Backdrop */}
            {isMobileFiltersOpen && (
              <div 
                className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
                onClick={() => setIsMobileFiltersOpen(false)}
              />
            )}

            {/* Main Content */}
            <main className="flex-1">
              {loading && properties.length === 0 ? (
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                  {[1, 2, 3, 4, 5, 6].map(i => <PropertyCardSkeleton key={i} />)}
                </div>
              ) : properties.length === 0 ? (
                <EmptyState onReset={handleReset} />
              ) : (
                <>
                  <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                    {properties.map(property => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>

                  {/* Pagination / Load More */}
                  {hasMore && (
                    <div className="mt-12 flex justify-center">
                      <button 
                        onClick={loadMore}
                        disabled={loading}
                        className="btn-secondary px-8 py-3 rounded-full font-semibold min-w-[200px]"
                      >
                        {loading ? 'Loading...' : 'Load More Properties'}
                      </button>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Map/List Toggle */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 lg:hidden shadow-2xl">
        <div className="flex bg-dark-800 p-1 rounded-full border border-border backdrop-blur-md">
          <button className="flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium bg-dark-700 text-white">
            <List size={16} /> List
          </button>
          <button className="flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium text-text-secondary hover:text-white transition-colors">
            <Map size={16} /> Map
          </button>
        </div>
      </div>
    </>
  );
}
