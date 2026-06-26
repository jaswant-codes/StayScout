import React from 'react';
import { MoreVertical, MapPin } from 'lucide-react';
import DataTable from '../DataTable';
import StatusBadge from '../StatusBadge';

const ListingTable = ({ listings = [], loading = false, onRowClick }) => {
  const columns = [
    {
      header: 'Property',
      accessor: 'property',
      render: (listing) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md bg-dark-700">
            {listing.thumbnail ? (
              <img src={listing.thumbnail} alt={listing.name || 'Property'} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-dark-700 text-dark-400">
                <MapPin className="h-5 w-5" />
              </div>
            )}
          </div>
          <div>
            <div className="font-medium text-white line-clamp-1">{listing.name || 'Unnamed Property'}</div>
            <div className="text-xs text-text-muted flex items-center gap-1 mt-0.5">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate max-w-[150px]">{listing.location || listing.address || 'Unknown Location'}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Owner',
      accessor: 'owner',
      render: (listing) => (
        <div>
          <div className="font-medium text-white">{listing.owner?.name || 'Unknown'}</div>
          <div className="text-xs text-text-muted">{listing.owner?.email || 'N/A'}</div>
        </div>
      )
    },
    {
      header: 'Type',
      accessor: 'type',
      render: (listing) => (
        <span className="capitalize text-text-secondary">{listing.type || 'N/A'}</span>
      )
    },
    {
      header: 'Rent',
      accessor: 'rent',
      render: (listing) => (
        <span className="text-white font-medium">₹{listing.rent?.toLocaleString() || 0}</span>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (listing) => (
        <StatusBadge status={listing.status} />
      )
    },
    {
      header: 'Added Date',
      accessor: 'createdAt',
      render: (listing) => (
        <span className="text-text-secondary">
          {listing.createdAt ? new Date(listing.createdAt).toLocaleDateString() : 'N/A'}
        </span>
      )
    },
    {
      header: 'Quality Score',
      accessor: 'qualityScore',
      render: (listing) => {
        const score = listing.qualityScore || 0;
        let colorClass = 'bg-error';
        if (score >= 80) colorClass = 'bg-success';
        else if (score >= 50) colorClass = 'bg-warning';

        return (
          <div className="w-full min-w-[80px]">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-text-secondary">Score</span>
              <span className="text-white">{score}%</span>
            </div>
            <div className="h-1.5 w-full bg-dark-700 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${colorClass}`}
                style={{ width: `${score}%` }}
              ></div>
            </div>
          </div>
        );
      }
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (listing) => (
        <div className="flex justify-end">
          <button 
            className="p-1.5 text-text-muted hover:text-white hover:bg-dark-700 rounded-md transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              // Menu implementation goes here
            }}
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="bg-dark-800 border border-border rounded-lg overflow-hidden">
      <DataTable 
        columns={columns} 
        data={listings} 
        loading={loading}
        onRowClick={onRowClick}
      />
    </div>
  );
};

export default ListingTable;
