import React from 'react';
import { Edit2, PauseCircle, Archive, Eye, Users, MapPin, IndianRupee } from 'lucide-react';
import Loader from '../Loader';

const ListingsTable = ({ properties = [], loading = false }) => {
  if (loading) {
    return <Loader text="Loading properties..." />;
  }

  if (!properties.length) {
    return (
      <div className="card p-8 text-center text-text-muted">
        No properties found. Add your first listing!
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-dark-800">
      <table className="w-full text-left text-sm text-text-secondary">
        <thead className="bg-dark-700/50 text-xs uppercase text-text-muted border-b border-border">
          <tr>
            <th className="px-6 py-4 font-medium">Property</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium">Rent</th>
            <th className="px-6 py-4 font-medium">Stats</th>
            <th className="px-6 py-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {properties.map((property) => (
            <tr key={property.id} className="hover:bg-dark-700/30 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-dark-600">
                    {property.images?.[0] ? (
                      <img
                        src={property.images[0]}
                        alt={property.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-text-muted">
                        <MapPin size={20} />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary mb-1 line-clamp-1">{property.name}</div>
                    <div className="flex items-center text-xs text-text-muted">
                      <MapPin size={12} className="mr-1" />
                      {property.location?.address || 'Address not available'}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`tag ${property.status === 'active' ? 'tag-active' : 'bg-dark-600 text-text-muted border border-border'}`}>
                  {property.status || 'Active'}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center text-text-primary font-medium">
                  <IndianRupee size={14} className="mr-1" />
                  {property.price?.toLocaleString()}
                </div>
                <div className="text-xs text-text-muted">/ month</div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center text-xs" title="Total Views">
                    <Eye size={14} className="mr-2 text-text-muted" />
                    <span>{property.stats?.views || 0}</span>
                  </div>
                  <div className="flex items-center text-xs" title="Total Leads">
                    <Users size={14} className="mr-2 text-text-muted" />
                    <span>{property.stats?.leads || 0}</span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-3">
                  <button className="text-text-muted hover:text-accent-400 transition-colors" title="Edit">
                    <Edit2 size={18} />
                  </button>
                  <button className="text-text-muted hover:text-warning transition-colors" title="Pause">
                    <PauseCircle size={18} />
                  </button>
                  <button className="text-text-muted hover:text-error transition-colors" title="Archive">
                    <Archive size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListingsTable;
