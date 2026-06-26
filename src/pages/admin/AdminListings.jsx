import React, { useState } from 'react';
import { useAdminListings } from '../../hooks/admin/useAdminListings';
import ListingStatsBar from '../../components/admin/listings/ListingStatsBar';
import ListingFilters from '../../components/admin/listings/ListingFilters';
import ListingTable from '../../components/admin/listings/ListingTable';
import ListingModerationDrawer from '../../components/admin/listings/ListingModerationDrawer';

export default function AdminListings() {
  const {
    listings,
    loading,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    stats,
    updateListingStatus
  } = useAdminListings();

  const [activeListingId, setActiveListingId] = useState(null);

  const activeListing = listings.find(l => l.id === activeListingId);

  return (
    <div className="space-y-6 animate-fade-in pb-12 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Property Moderation</h1>
          <p className="text-text-secondary text-sm">Review, approve, and manage listings submitted by owners.</p>
        </div>
      </div>

      <ListingStatsBar stats={stats} loading={loading} />

      <div className="bg-dark-800 border border-border rounded-2xl overflow-hidden shadow-2xl">
        <ListingFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filters}
          onChange={setFilters}
        />
        
        <ListingTable 
          listings={listings}
          loading={loading}
          onRowClick={(listing) => setActiveListingId(listing.id)}
        />
      </div>

      <ListingModerationDrawer 
        listing={activeListing}
        isOpen={!!activeListingId}
        onClose={() => setActiveListingId(null)}
        onAction={updateListingStatus}
      />
    </div>
  );
}
